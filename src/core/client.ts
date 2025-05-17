import ky from "ky";
import type { Options } from "ky";
import {
	DEFAULT_API_BASE_URL,
	DEFAULT_RETRY_ATTEMPTS,
	DEFAULT_TIMEOUT,
} from "../defaults/index.js";

export const PaymobHTTPClient = (secretKey: string, options: Options = {}) =>
	ky.create({
		prefixUrl: DEFAULT_API_BASE_URL,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Token ${secretKey}`,
		},
		retry: DEFAULT_RETRY_ATTEMPTS,
		timeout: DEFAULT_TIMEOUT,
		...options,
	});

export type PaymobHTTPClient = ReturnType<typeof PaymobHTTPClient>;
