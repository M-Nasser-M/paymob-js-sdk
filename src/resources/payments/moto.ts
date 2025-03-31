/**
 * Moto Resource
 * Handles Mail Order/Telephone Order payment operations
 */

import type { HttpClient } from "../../core/client";
import { ValidationError } from "../../errors";
import { motoRequestSchema, type MotoRequestInput, type MotoResponseOutput } from "../../types";
import * as v from "valibot";

export class MotoResource {
	private client: HttpClient;
	constructor(client: HttpClient) {
		this.client = client;
	}

	/**
	 * Process a MOTO payment using a stored card token
	 */
	public async pay(params: MotoRequestInput): Promise<MotoResponseOutput> {
		this.validateMotoRequest(params);

		return this.client.post<MotoResponseOutput>("/api/acceptance/payments/pay", params);
	}

	/**
	 * Validate MOTO payment request
	 */
	private validateMotoRequest(params: MotoRequestInput): void {
		const result = v.safeParse(motoRequestSchema, params);

		if (!result.success) {
			throw new ValidationError(result.issues.map((issue) => issue.message).join(", "));
		}
	}
}
