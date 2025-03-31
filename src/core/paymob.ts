/**
 * Main Paymob SDK class
 * Provides access to all API resources
 */

import { HttpClient } from "./client";
import { ConfigurationError } from "../errors";
import { IntentionResource } from "../resources/payments/intention";
import { MotoResource } from "../resources/payments/moto";
import { paymobConfigSchema, type PaymobConfigInput } from "../types";
import * as v from "valibot";

export class Paymob {
	/** HTTP client for API calls */
	private readonly client: HttpClient;

	/** API resources */
	public readonly intentions: IntentionResource;
	public readonly moto: MotoResource;

	/**
	 * Create a new Paymob SDK instance
	 */
	constructor(config: PaymobConfigInput) {
		const parsedConfig = v.safeParse(paymobConfigSchema, config);
		if (!parsedConfig.success) {
			throw new ConfigurationError("Invalid configuration");
		}
		// Initialize the HTTP client
		this.client = new HttpClient(parsedConfig.output);

		// Initialize API resources
		this.intentions = new IntentionResource(this.client);
		this.moto = new MotoResource(this.client);
	}

	/**
	 * Get the checkout URL for a created intention
	 * @param clientSecret Client secret from the created intention
	 * @returns Full checkout URL to redirect the customer
	 */
	public getCheckoutUrl(clientSecret: string): string {
		const config = this.client.config;

		if (!config.publicKey) {
			throw new ConfigurationError("publicKey is required to generate checkout URL");
		}

		return this.intentions.getCheckoutUrl(config.publicKey, clientSecret);
	}
}
