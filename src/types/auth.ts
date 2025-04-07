import * as v from "valibot";
import { emailValidation, integer } from "./common.js";

export const AuthApiKeyRequestSchema = v.object({
  api_key: v.string(),
});
export type AuthApiKeyRequest = v.InferInput<typeof AuthApiKeyRequestSchema>;

export const AuthUsernamePasswordRequestSchema = v.object({
  username: v.string(),
  password: v.string(),
  expiration: v.optional(integer(0)), // Optional expiration time in seconds
});
export type AuthUsernamePasswordRequest = v.InferInput<
  typeof AuthUsernamePasswordRequestSchema
>;

export const AuthProfileSchema = v.object({
  id: integer(),
  user: v.object({
    id: integer(),
    username: v.string(),
    first_name: v.string(),
    last_name: v.string(),
    email: emailValidation(),
  }),
});
export type AuthProfile = v.InferInput<typeof AuthProfileSchema>;

export const AuthResponseSchema = v.object({
  token: v.string(),
  profile: AuthProfileSchema,
});

export type AuthResponse = v.InferInput<typeof AuthResponseSchema>;
