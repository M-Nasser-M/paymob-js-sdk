import * as z from "zod";

export const paymobConfigSchema = z.object({
	PAYMOB_API_KEY: z.string().min(1, "API key is required"),
	PAYMOB_PUBLIC_KEY: z.string().min(1, "Public key is required"),
	PAYMOB_SECRET_KEY: z.string().min(1, "Secret key is required"),
	PAYMOB_NOTIFICATION_URL: z
		.string()
		.min(1, "notification URL is required")
		.url({ message: "notification URL is not a valid URL" }),
	PAYMOB_REDIRECTION_URL: z
		.string()
		.min(1, "redirection URL is required")
		.url({ message: "redirection URL is not a valid URL" }),
	INTEGRATION_IDs: z.string().transform((val) => val.split(",").map((id) => Number(id))),
	PAYMOB_HMAC_SECRET: z.string().min(1, "HMAC secret is required"),
});

export type PaymobConfig = z.output<typeof paymobConfigSchema>;
