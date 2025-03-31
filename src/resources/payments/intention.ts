/**
 * Payment Intention Resource
 * Handles creation and management of payment intentions
 */

import type { HttpClient } from "../../core/client";
import { ValidationError } from "../../errors";
import type {
	CreateIntentionRequest,
	CreateIntentionResponse,
	RefundRequest,
	RefundResponse,
	CaptureRequest,
	CaptureResponse,
	VoidRequest,
	VoidResponse,
} from "../../types";

export class IntentionResource {
	private client: HttpClient;

	constructor(client: HttpClient) {
		this.client = client;
	}

	/**
	 * Create a new payment intention
	 */
	public async create(
		params: CreateIntentionRequest,
	): Promise<CreateIntentionResponse> {
		this.validateCreateIntentionRequest(params);

		return this.client.post<CreateIntentionResponse>("/v1/intention/", params);
	}

	/**
	 * Process a refund for a transaction
	 */
	public async refund(params: RefundRequest): Promise<RefundResponse> {
		if (!params.transaction_id) {
			throw new ValidationError("transaction_id is required");
		}

		if (!params.amount_cents) {
			throw new ValidationError("amount_cents is required");
		}

		return this.client.post<RefundResponse>(
			"/api/acceptance/void_refund/refund",
			params,
		);
	}

	/**
	 * Capture a previously authorized payment
	 */
	public async capture(params: CaptureRequest): Promise<CaptureResponse> {
		if (!params.transaction_id) {
			throw new ValidationError("transaction_id is required");
		}

		if (!params.amount_cents) {
			throw new ValidationError("amount_cents is required");
		}

		return this.client.post<CaptureResponse>("/api/acceptance/capture", params);
	}

	/**
	 * Void (cancel) a transaction
	 */
	public async void(params: VoidRequest): Promise<VoidResponse> {
		if (!params.transaction_id) {
			throw new ValidationError("transaction_id is required");
		}

		return this.client.post<VoidResponse>(
			"/api/acceptance/void_refund/void",
			params,
		);
	}

	/**
	 * Get the checkout URL for a created intention
	 */
	public getCheckoutUrl(publicKey: string, clientSecret: string): string {
		if (!publicKey) {
			throw new ValidationError("publicKey is required");
		}

		if (!clientSecret) {
			throw new ValidationError("clientSecret is required");
		}

		return `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${clientSecret}`;
	}

	/**
	 * Validate the create intention request
	 */
	private validateCreateIntentionRequest(params: CreateIntentionRequest): void {
		if (!params.amount) {
			throw new ValidationError("amount is required");
		}

		if (!params.currency) {
			throw new ValidationError("currency is required");
		}

		if (!params.payment_methods || params.payment_methods.length === 0) {
			throw new ValidationError("payment_methods are required");
		}

		if (!params.items || params.items.length === 0) {
			throw new ValidationError("items are required");
		}

		if (!params.billing_data) {
			throw new ValidationError("billing_data is required");
		}

		// Validate mandatory billing data fields
		const { billing_data } = params;
		if (!billing_data.first_name) {
			throw new ValidationError("billing_data.first_name is required");
		}

		if (!billing_data.last_name) {
			throw new ValidationError("billing_data.last_name is required");
		}

		if (!billing_data.phone_number) {
			throw new ValidationError("billing_data.phone_number is required");
		}

		if (!billing_data.email) {
			throw new ValidationError("billing_data.email is required");
		}

		// Validate that items total amount matches the intention amount
		const itemsTotal = params.items.reduce((total, item) => {
			return total + item.amount * item.quantity;
		}, 0);

		if (itemsTotal !== params.amount) {
			throw new ValidationError(
				"Total items amount must equal the intention amount",
				{ itemsTotal, intentionAmount: params.amount },
			);
		}
	}
}
