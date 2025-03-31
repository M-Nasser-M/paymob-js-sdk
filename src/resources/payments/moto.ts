/**
 * Moto Resource
 * Handles Mail Order/Telephone Order payment operations
 */

import type { HttpClient } from "../../core/client";
import { ValidationError } from "../../errors";
import type { MotoRequest, MotoResponse } from "../../types";

export class MotoResource {
	private client: HttpClient;

	constructor(client: HttpClient) {
		this.client = client;
	}

	/**
	 * Process a MOTO payment using a stored card token
	 */
	public async pay(params: MotoRequest): Promise<MotoResponse> {
		this.validateMotoRequest(params);

		return this.client.post<MotoResponse>("/api/acceptance/payments/pay", params);
	}

	/**
	 * Validate MOTO payment request
	 */
	private validateMotoRequest(params: MotoRequest): void {
		if (!params.source) {
			throw new ValidationError("source is required");
		}

		if (!params.source.identifier) {
			throw new ValidationError("source.identifier (card token) is required");
		}

		if (!params.source.subtype || params.source.subtype !== "TOKEN") {
			throw new ValidationError('source.subtype must be "TOKEN"');
		}

		if (!params.payment_token) {
			throw new ValidationError("payment_token is required");
		}
	}
}
