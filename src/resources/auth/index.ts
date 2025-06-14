import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import { ConfigurationError, PaymobAPIError } from "../../errors/index.js";
import type { AuthResponse } from "../../types/auth.js";
import type { PaymobConfig } from "../../types/paymob-config.js";

export default class Auth {
	private client: PaymobHTTPClient;
	private paymobConfig: PaymobConfig;
	private cachedToken: string | null = null;
	private tokenExpiryTime: number | null = null;

	constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
		if (!paymobConfig?.PAYMOB_API_KEY) {
			throw new ConfigurationError("PAYMOB_API_KEY is required");
		}
		this.client = client;
		this.paymobConfig = paymobConfig;
	}

	public async getAccessToken(): Promise<string> {
		if (this.isTokenValid()) {
			return this.cachedToken!;
		}

		try {
			const response = await this.client
				.post<AuthResponse>(DEFAULT_PAYMOB_ENDPOINTS.AUTH, {
					body: JSON.stringify({
						api_key: this.paymobConfig.PAYMOB_API_KEY,
					}),
				})
				.json();

			if (!response.token) {
				throw new PaymobAPIError("Invalid auth response: missing token");
			}

			this.cachedToken = response.token;
			// Cache token for 55 minutes (tokens typically expire after 1 hour)
			this.tokenExpiryTime = Date.now() + 55 * 60 * 1000;

			return response.token;
		} catch (error) {
			this.cachedToken = null;
			this.tokenExpiryTime = null;
			
			if (error instanceof PaymobAPIError) {
				throw error;
			}
			throw new PaymobAPIError(`Authentication failed: ${error}`);
		}
	}

	public clearCache(): void {
		this.cachedToken = null;
		this.tokenExpiryTime = null;
	}

	private isTokenValid(): boolean {
		return !!(
			this.cachedToken &&
			this.tokenExpiryTime &&
			Date.now() < this.tokenExpiryTime
		);
	}
}
