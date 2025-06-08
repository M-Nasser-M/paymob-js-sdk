import type { PaymobHTTPClient } from "../../core/client.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import { compareHMACWebhook, compareHMACPaymentRedirect } from "../../utils/compare-hmac.js";
import type { PaymentRedirectResponseInput, WebhookResponse } from "../../types/webhook-response.js";

export default class HMAC {
	private client: PaymobHTTPClient;
	private paymobConfig: PaymobConfig;

	constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
		this.client = client;
		this.paymobConfig = paymobConfig;
	}

    public comareHMACWebhook(data: WebhookResponse, hmac: string): boolean{

		return compareHMACWebhook(data, hmac, this.paymobConfig.PAYMOB_HMAC_SECRET);
	}
    
    public comareHMACRedirect(data: PaymentRedirectResponseInput, hmac: string): boolean{
		return compareHMACPaymentRedirect(data, hmac, this.paymobConfig.PAYMOB_HMAC_SECRET);
	}
}
