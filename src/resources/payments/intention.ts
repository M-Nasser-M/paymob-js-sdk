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
	createIntentionRequestSchema,
} from "../../types/intention";
import { type PaymobConfigOutput } from "../../types/config";
import { CaptureRequestInput, captureRequestSchema, CaptureResponseOutput, RefundRequestInput, refundRequestSchema, RefundResponseOutput, VoidRequestInput, voidRequestSchema, VoidResponseOutput } from "../../types/transactions";

export class IntentionResource {
	private client: HttpClient;
	private readonly config: Required<PaymobConfigOutput>;

	constructor(client: HttpClient, config: Required<PaymobConfigOutput>) {
		this.client = client;
		this.config = config;
	}

	public async create(
		params: CreateIntentionRequestInput,
	): Promise<CreateIntentionResponseOutput> {
		const defaults = {
			payment_methods: this.config.payment_methods,
			notification_url: this.config.notification_url,
			redirection_url: this.config.redirection_url,
		};
		const completeParams = { ...defaults, ...params };

		this.validateCreateIntentionRequest(completeParams);

		return this.client.post<CreateIntentionResponseOutput>("/v1/intention/", completeParams);
	}

	public async refund(params: RefundRequestInput): Promise<RefundResponseOutput> {
		const result = v.safeParse(refundRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<RefundResponseOutput>("/api/acceptance/void_refund/refund", params);
	}

	public async capture(params: CaptureRequestInput): Promise<CaptureResponseOutput> {
		const result = v.safeParse(captureRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<CaptureResponseOutput>("/api/acceptance/capture", params);
	}

	public async void(params: VoidRequestInput): Promise<VoidResponseOutput> {
		const result = v.safeParse(voidRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}

		return this.client.post<VoidResponseOutput>("/api/acceptance/void_refund/void", params);
	}

	public getCheckoutUrl(clientSecret: string): string {
		return `https://accept.paymob.com/unifiedcheckout/?publicKey=${this.config.publicKey}&clientSecret=${clientSecret}`;
	}

	private validateCreateIntentionRequest(params: CreateIntentionRequestInput): void {
		const result = v.safeParse(createIntentionRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}
	}
}
