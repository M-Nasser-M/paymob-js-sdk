/**
 * Main Paymob SDK class
 * Provides access to all API resources
 */

import { HttpClient } from "./client";
import { ConfigurationError } from "../errors";
import { IntentionResource } from "../resources/payments/intention";
import { MotoResource } from "../resources/payments/moto";
import { type PaymobConfigOutput, paymobConfigSchema, type PaymobConfigInput } from "../types";
import * as v from "valibot";

export class Paymob {
	/** HTTP client for API calls */
	private readonly client: HttpClient;
	/** Configuration for the Paymob SDK */
	private readonly config: Required<PaymobConfigOutput>;

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
		this.config = parsedConfig.output;
		// Initialize the HTTP client
		this.client = new HttpClient(parsedConfig.output);

		// Initialize API resources
		this.intentions = new IntentionResource(this.client, parsedConfig.output);
		this.moto = new MotoResource(this.client);
	}

	/**
	 * Get the checkout URL for a created intention
	 * @param clientSecret Client secret from the created intention
	 * @returns Full checkout URL to redirect the customer
	 */
	public getCheckoutUrl(clientSecret: string): string {
		return this.intentions.getCheckoutUrl(clientSecret);
	}
}
