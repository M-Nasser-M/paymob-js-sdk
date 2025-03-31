import * as v from "valibot";

const ENVSchema = v.object({
	MOBILE_WALLET_INTEGERATION_ID: v.number(),
	CARD_INTEGERATION_ID: v.number(),
	PAYMOB_API_KEY: v.string(),
	PAYMOB_PUBLIC_KEY: v.string(),
	PAYMOB_SECRET_KEY: v.string(),
});

const env = Bun.env;

const envResult = v.parse(ENVSchema, env);

export const ENV = envResult;
