import * as v from "valibot";
import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import { CreateIntentionRequestSchema } from "../../types/intention.js";
import type { CreateIntentionRequest, CreateIntentionResponse } from "../../types/intention.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import type { RefundResponse, VoidResponse } from "../../types/transaction.js";
import { getFormattedUnifiedCheckoutUrl } from "../../utils/format-checkout-url.js";

export class Payment {
	private client: PaymobHTTPClient;
	private paymobConfig: PaymobConfig;

	constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
		this.client = client;
		this.paymobConfig = paymobConfig;
	}

	public async createIntention(
		createIntentionRequest: CreateIntentionRequest,
	): Promise<CreateIntentionResponse> {
		const validatedCreateIntentionRequest = v.parse(
			CreateIntentionRequestSchema,
			createIntentionRequest,
		);

		return this.client
			.post<CreateIntentionResponse>(DEFAULT_PAYMOB_ENDPOINTS.INTENTION, {
				body: JSON.stringify(validatedCreateIntentionRequest),
			})
			.json();
	}

	public async getPaymentUrl(client_secret: string): Promise<string> {
		return getFormattedUnifiedCheckoutUrl(client_secret);
	}

	public async createIntentionAndGetUrl(
		createIntentionRequest: CreateIntentionRequest,
	): Promise<string> {
		const { client_secret } = await this.createIntention(createIntentionRequest);
		return getFormattedUnifiedCheckoutUrl(client_secret);
	}

	public async voidTransaction(transactionID: string) {
		return this.client
			.post<VoidResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.VOID, {
				body: JSON.stringify({
					transaction_id: transactionID,
				}),
			})
			.json();
	}

	public async refundTransaction(transactionID: string, amountCents: number) {
		return this.client
			.post<RefundResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.REFUND, {
				body: JSON.stringify({
					transaction_id: transactionID,
					amount_cents: amountCents,
				}),
			})
			.json();
	}

	public async captureTransaction(transactionID: string, amountCents: number) {
		return this.client
			.post<RefundResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.CAPTURE, {
				body: JSON.stringify({
					transaction_id: transactionID,
					amount_cents: amountCents,
				}),
			})
			.json();
	}
}
