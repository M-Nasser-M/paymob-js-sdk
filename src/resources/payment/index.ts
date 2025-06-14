import { z } from "zod";
import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import { PaymobAPIError, ValidationError } from "../../errors/index.js";
import { CreateIntentionRequestSchema } from "../../types/intention.js";
import type { CreateIntentionRequest, CreateIntentionResponse } from "../../types/intention.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import type { CaptureResponse, RefundResponse, VoidResponse } from "../../types/transaction.js";
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
		try {
			const validatedCreateIntentionRequest =
				CreateIntentionRequestSchema.parse(createIntentionRequest);

			return await this.client
				.post<CreateIntentionResponse>(DEFAULT_PAYMOB_ENDPOINTS.INTENTION, {
					body: JSON.stringify(validatedCreateIntentionRequest),
				})
				.json();
		} catch (error) {
			if (error instanceof z.ZodError) {
				throw new ValidationError(`Invalid intention request: ${error.message}`);
			}
			throw new PaymobAPIError(`Failed to create intention: ${error}`);
		}
	}

	public async getPaymentUrl(client_secret: string): Promise<string> {
		if (!client_secret || typeof client_secret !== "string") {
			throw new ValidationError("client_secret is required and must be a string");
		}

		if (!this.paymobConfig.PAYMOB_PUBLIC_KEY) {
			throw new ValidationError("PAYMOB_PUBLIC_KEY is required for payment URL generation");
		}

		return getFormattedUnifiedCheckoutUrl(client_secret, this.paymobConfig.PAYMOB_PUBLIC_KEY);
	}

	public async createIntentionAndGetUrl(
		createIntentionRequest: CreateIntentionRequest,
	): Promise<string> {
		const { client_secret } = await this.createIntention(createIntentionRequest);
		return this.getPaymentUrl(client_secret);
	}

	public async voidTransaction(transactionID: string): Promise<VoidResponse> {
		this.validateTransactionID(transactionID);

		try {
			return await this.client
				.post<VoidResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.VOID, {
					body: JSON.stringify({
						transaction_id: transactionID,
					}),
				})
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to void transaction ${transactionID}: ${error}`);
		}
	}

	public async refundTransaction(transactionID: string, amountCents: number): Promise<RefundResponse> {
		this.validateTransactionID(transactionID);
		this.validateAmount(amountCents);

		try {
			return await this.client
				.post<RefundResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.REFUND, {
					body: JSON.stringify({
						transaction_id: transactionID,
						amount_cents: amountCents,
					}),
				})
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to refund transaction ${transactionID}: ${error}`);
		}
	}

	public async captureTransaction(transactionID: string, amountCents: number): Promise<CaptureResponse> {
		this.validateTransactionID(transactionID);
		this.validateAmount(amountCents);

		try {
			return await this.client
				.post<CaptureResponse>(DEFAULT_PAYMOB_ENDPOINTS.PAYMENT_ACTIONS.CAPTURE, {
					body: JSON.stringify({
						transaction_id: transactionID,
						amount_cents: amountCents,
					}),
				})
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to capture transaction ${transactionID}: ${error}`);
		}
	}

	private validateTransactionID(transactionID: string): void {
		if (!transactionID || typeof transactionID !== "string" || transactionID.trim() === "") {
			throw new ValidationError("Transaction ID is required and must be a non-empty string");
		}
	}

	private validateAmount(amountCents: number): void {
		if (typeof amountCents !== "number" || amountCents <= 0 || !Number.isInteger(amountCents)) {
			throw new ValidationError("Amount must be a positive integer representing cents");
		}
	}
}
