import { z } from "zod";

export const createUserWithEmaiAndPasswordInputModel = z.object({
  fullName: z.string().describe("User's full name"),
  email: z.string().email().describe("User's email"),
  password: z.string().describe("User's password"),
});
export const createUserWithEmaiAndPasswordOutputModel = z.object({
  id: z.string().describe("User's id"),
});
