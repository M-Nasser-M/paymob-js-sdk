import type { PaymobHTTPClient } from "../../core/client.js";
import type { PaymobConfig } from "../../types/paymob-config.js";

export class Payment {
  private client: PaymobHTTPClient;
  private paymobConfig: PaymobConfig;

  constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
    this.client = client;
    this.paymobConfig = paymobConfig;
  }
}
