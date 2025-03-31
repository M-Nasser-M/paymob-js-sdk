import * as v from "valibot";
import { DEFAULT_API_BASE_URL, DEFAULT_TIMEOUT, DEFAULT_RETRY_ATTEMPTS } from "../defaults";

export const HttpClientConfigSchema = v.object({
	secretKey: v.string(),
	apiBaseUrl: v.optional(v.pipe(v.string(), v.url()), DEFAULT_API_BASE_URL),
	timeout: v.optional(v.number(), DEFAULT_TIMEOUT),
	retryAttempts: v.optional(v.number(), DEFAULT_RETRY_ATTEMPTS),
});
export type HttpClientConfigInput = v.InferInput<typeof HttpClientConfigSchema>;
export type HttpClientConfigOutput = v.InferOutput<typeof HttpClientConfigSchema>;

export const paymobConfigSchema = v.object({
	secretKey: v.string(),
	publicKey: v.string(),
	apiKey: v.string(),
	notification_url: v.pipe(v.string(), v.url()),
	redirection_url: v.pipe(v.string(), v.url()),
	apiBaseUrl: v.optional(v.pipe(v.string(), v.url()), DEFAULT_API_BASE_URL),
	timeout: v.optional(v.number(), DEFAULT_TIMEOUT),
	retryAttempts: v.optional(v.number(), DEFAULT_RETRY_ATTEMPTS),
	payment_methods: v.array(v.union([v.number(), v.string()])),
});
export type PaymobConfigInput = v.InferInput<typeof paymobConfigSchema>;
export type PaymobConfigOutput = v.InferOutput<typeof paymobConfigSchema>;
