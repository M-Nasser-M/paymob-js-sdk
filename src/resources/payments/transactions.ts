/**
 * Transaction Resource
 * Handles transaction inquiries and operations
 */

import type { AuthResponseOutput, TransactionResponseOutput } from "../../types/transactions";
import { paymobConfigSchema, type PaymobConfigOutput } from "../../types";
import type { HttpClient } from "../../core/client";
import { ConfigurationError } from "../../errors";
import * as v from "valibot";

export class TransactionResource {
	private client: HttpClient;
	private readonly config: Required<PaymobConfigOutput>;

	constructor(client: HttpClient, config: Required<PaymobConfigOutput>) {
		this.client = client;
		const result = v.safeParse(paymobConfigSchema, config);
		if (!result.success) {
			throw new ConfigurationError("Invalid configuration");
		}
		this.config = result.output;
	}

	private async AuthUsingApiKey(): Promise<AuthResponseOutput> {
		return this.client.post<AuthResponseOutput>("/api/auth/tokens", {
			api_key: this.config.apiKey,
		});
	}

	/**
	 * Get transaction details using merchant order ID
	 * @param merchantOrderId - The merchant's unique order ID
	 * @returns Transaction details
	 */
	public async getTransactionByMerchantOrderId(
		merchantOrderId: string,
	): Promise<TransactionResponseOutput> {
		const authResponse = await this.AuthUsingApiKey();
		const headers = { Authorization: `Bearer ${authResponse.token}` };
		const response = await this.client.post<TransactionResponseOutput>(
			"/api/ecommerce/orders/transaction_inquiry",
			{ merchant_order_id: merchantOrderId },
			headers,
		);
		return response;
	}

	/**
	 * Get transaction details using Paymob order ID
	 * @param orderId - The Paymob order ID
	 * @returns Transaction details
	 */
	public async getTransactionByOrderId(orderId: string): Promise<TransactionResponseOutput> {
		const authResponse = await this.AuthUsingApiKey();
		const headers = { Authorization: `Bearer ${authResponse.token}` };
		const response = await this.client.post<TransactionResponseOutput>(
			"/api/ecommerce/orders/transaction_inquiry",
			{ order_id: orderId },
			headers,
		);
		return response;
	}

	/**
	 * Get transaction details using Paymob transaction ID
	 * @param transactionId - The Paymob transaction ID
	 * @returns Transaction details
	 */
	public async getTransactionByTransactionId(
		transactionId: string,
	): Promise<TransactionResponseOutput> {
		const authResponse = await this.AuthUsingApiKey();
		const headers = { Authorization: `Bearer ${authResponse.token}` };
		const response = await this.client.get<TransactionResponseOutput>(
			`/api/acceptance/transactions/${transactionId}`,
			headers,
		);
		return response;
	}
}
