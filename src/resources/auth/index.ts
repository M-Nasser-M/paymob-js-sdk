import type { PaymobConfig } from "../../types/paymob-config.js";
import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import type { AuthResponse } from "../../types/auth.js";

export default class Auth {
  private client: PaymobHTTPClient;
  private paymobConfig: PaymobConfig;

  constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
    this.client = client;
    this.paymobConfig = paymobConfig;
  }

  public async getAccessToken(): Promise<string> {
    return this.client
      .post<AuthResponse>(DEFAULT_PAYMOB_ENDPOINTS.AUTH, {
        body: JSON.stringify({
          api_key: this.paymobConfig.PAYMOB_API_KEY,
        }),
      })
      .json()
      .then((res) => res.token);
  }
}
