import * as v from "valibot";

const ENVSchema = v.object({
  MOBILE_WALLET_INTEGERATION_ID: v.pipe(
    v.string(),
    v.transform((input) => Number(input)),
    v.number()
  ),
  CARD_INTEGERATION_ID: v.pipe(
    v.string(),
    v.transform((input) => Number(input)),
    v.number()
  ),
  PAYMOB_API_KEY: v.string(),
  PAYMOB_PUBLIC_KEY: v.string(),
  PAYMOB_SECRET_KEY: v.string(),
  PAYMOB_NOTIFICATION_URL: v.pipe(v.string(), v.url()),
  PAYMOB_REDIRECTION_URL: v.pipe(v.string(), v.url()),
});

const env = process.env;

const envResult = v.parse(ENVSchema, env);

export const ENV = envResult;
