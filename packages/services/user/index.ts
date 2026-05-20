import { randomBytes, createHmac } from "node:crypto";

import { createUserWithEmaiAndPasswordType, createUserWithEmaiAndPasswordInput } from "./model";
import { db, eq } from "@repo/database";
import { usersTable } from "@repo/database/models/user";

export class UserService {
  public async createUserWithEmailAndPassword(payload: createUserWithEmaiAndPasswordType) {
    const { fullName, email, password } =
      await createUserWithEmaiAndPasswordInput.parseAsync(payload);

    if (!fullName || !email || !password) {
      throw new Error("All fields are required");
    }

    const findExistingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (findExistingUser.length > 0) {
      throw new Error("User already exists");
    }

    const salt = randomBytes(16).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");

    const createUser = await db
      .insert(usersTable)
      .values({ fullName, email, password: hash, salt })
      .returning({ id: usersTable.id });

    if (!createUser || createUser.length === 0 || !createUser[0]?.id) {
      throw new Error("Failed to create user");
    }

    return createUser[0].id;
  }
}
