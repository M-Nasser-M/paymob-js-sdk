import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import { PaymobAPIError, ValidationError } from "../../errors/index.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import type { TransactionResponse } from "../../types/transaction.js";
import Auth from "../auth/index.js";

export class TransactionInquiry {
	private client: PaymobHTTPClient;
	private paymobConfig: PaymobConfig;
	private auth: Auth;

	constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
		this.client = client;
		this.paymobConfig = paymobConfig;
		this.auth = new Auth(client, paymobConfig);
	}

	public async getTransactionUsingOrderID(orderID: string | number): Promise<TransactionResponse> {
		this.validateOrderID(orderID);

		try {
			const accessToken = await this.auth.getAccessToken();
			
			return await this.client
				.post<TransactionResponse>(DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.ORDER_ID, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						order_id: orderID,
					}),
				})
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to retrieve transaction using order ID ${orderID}: ${error}`);
		}
	}

	public async getTransactionUsingTransactionID(
		transactionID: string,
	): Promise<TransactionResponse> {
		this.validateTransactionID(transactionID);

		try {
			const accessToken = await this.auth.getAccessToken();
			
			return await this.client
				.get<TransactionResponse>(
					DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.TRANSACTION_ID.replace(
						"TRANSACTION_ID_PLACEHOLDER",
						transactionID,
					),
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					},
				)
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to retrieve transaction using transaction ID ${transactionID}: ${error}`);
		}
	}

	public async getTransactionUsingMerchantOrderID(
		merchantOrderID: string,
	): Promise<TransactionResponse> {
		this.validateMerchantOrderID(merchantOrderID);

		try {
			const accessToken = await this.auth.getAccessToken();
			
			return await this.client
				.post<TransactionResponse>(
					DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.MERCHANT_ORDER_ID,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
						body: JSON.stringify({
							merchant_order_id: merchantOrderID,
						}),
					},
				)
				.json();
		} catch (error) {
			throw new PaymobAPIError(`Failed to retrieve transaction using merchant order ID ${merchantOrderID}: ${error}`);
		}
	}

	/**
	 * Get shared auth instance for other resources to use
	 * This helps avoid creating multiple auth instances across resources
	 */
	public getAuthInstance(): Auth {
		return this.auth;
	}

	private validateOrderID(orderID: string | number): void {
		if (!orderID || (typeof orderID !== "string" && typeof orderID !== "number") || 
			(typeof orderID === "string" && orderID.trim() === "")) {
			throw new ValidationError("Order ID is required and must be a non-empty string or number");
		}
	}

	private validateTransactionID(transactionID: string): void {
		if (!transactionID || typeof transactionID !== "string" || transactionID.trim() === "") {
			throw new ValidationError("Transaction ID is required and must be a non-empty string");
		}
	}

	private validateMerchantOrderID(merchantOrderID: string): void {
		if (!merchantOrderID || typeof merchantOrderID !== "string" || merchantOrderID.trim() === "") {
			throw new ValidationError("Merchant Order ID is required and must be a non-empty string");
		}
	}
}
