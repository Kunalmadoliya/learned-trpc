import { z } from "zod";

export const createUserWithEmaiAndPasswordInput = z.object({
  fullName: z.string().describe("Enter your first name"),
  email: z.string().email().describe("Enter email"),
  password: z.string().describe("Enter your password"),
});

export type createUserWithEmaiAndPasswordType = z.infer<typeof createUserWithEmaiAndPasswordInput>;
