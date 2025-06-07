import { z } from "zod";

const ENVSchema = z.object({
	INTEGRATION_IDs: z.string().transform((val) => val.split(",").map((id) => Number(id))),
	PAYMOB_API_KEY: z.string(),
	PAYMOB_PUBLIC_KEY: z.string(),
	PAYMOB_SECRET_KEY: z.string(),
	PAYMOB_NOTIFICATION_URL: z.string().url(),
	PAYMOB_REDIRECTION_URL: z.string().url(),
	PAYMOB_HMAC_SECRET: z.string(),
});

const env = process.env;

const envResult = ENVSchema.parse(env);

export const ENV = envResult;
