/**
 * Payment Intention Resource
 * Handles creation and management of payment intentions
 */

import type { HttpClient } from "../../core/client";
import { ValidationError } from "../../errors";
import * as v from "valibot";
import {
	type CreateIntentionRequestInput,
	type CreateIntentionResponseOutput,
	type RefundRequestInput,
	type RefundResponseOutput,
	type CaptureRequestInput,
	type CaptureResponseOutput,
	type VoidRequestInput,
	type VoidResponseOutput,
	createIntentionRequestSchema,
	voidRequestSchema,
	captureRequestSchema,
	refundRequestSchema,
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
		params: CreateIntentionRequestInput,
	): Promise<CreateIntentionResponseOutput> {
		this.validateCreateIntentionRequest(params);

		return this.client.post<CreateIntentionResponseOutput>("/v1/intention/", params);
	}

	/**
	 * Process a refund for a transaction
	 */
	public async refund(params: RefundRequestInput): Promise<RefundResponseOutput> {
		const result = v.safeParse(refundRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<RefundResponseOutput>("/api/acceptance/void_refund/refund", params);
	}

	/**
	 * Capture a previously authorized payment
	 */
	public async capture(params: CaptureRequestInput): Promise<CaptureResponseOutput> {
		const result = v.safeParse(captureRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<CaptureResponseOutput>("/api/acceptance/capture", params);
	}

	/**
	 * Void (cancel) a transaction
	 */
	public async void(params: VoidRequestInput): Promise<VoidResponseOutput> {
		const result = v.safeParse(voidRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<VoidResponseOutput>("/api/acceptance/void_refund/void", params);
	}

	/**
	 * Get the checkout URL for a created intention
	 */
	public getCheckoutUrl(publicKey: string, clientSecret: string): string {
		return `https://accept.paymob.com/unifiedcheckout/?publicKey=${publicKey}&clientSecret=${clientSecret}`;
	}

	/**
	 * Validate the create intention request
	 */
	private validateCreateIntentionRequest(params: CreateIntentionRequestInput): void {
		const result = v.safeParse(createIntentionRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}
	}
}
