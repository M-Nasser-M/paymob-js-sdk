import * as v from "valibot";

export const paymobConfigSchema = v.object({
  PAYMOB_API_KEY: v.string("API key is required"),
  PAYMOB_PUBLIC_KEY: v.string("Public key is required"),
  PAYMOB_SECRET_KEY: v.string("Secret key is required"),
  PAYMOB_NOTIFICATION_URL: v.pipe(
    v.string("notification URL is required"),
    v.url("notification URL is not a valid URL")
  ),
  PAYMOB_REDIRECTION_URL: v.pipe(
    v.string("redirection URL is required"),
    v.url("redirection URL is not a valid URL")
  ),
});

export type PaymobConfig = v.InferOutput<typeof paymobConfigSchema>;
