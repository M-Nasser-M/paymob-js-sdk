/**
 * Paymob Intention resource tests
 * Using real API calls with test keys
 */

import { describe, test, expect } from "bun:test";
import { Paymob } from "../core/paymob";
import { ENV } from "../env";

// Test keys for Paymob API
// Replace these with your actual test keys
const TEST_SECRET_KEY = ENV.PAYMOB_SECRET_KEY;
const TEST_PUBLIC_KEY = ENV.PAYMOB_PUBLIC_KEY;
const TEST_INTEGRATION_ID = ENV.CARD_INTEGERATION_ID;
// const TEST_INTEGRATION_ID2 = ENV.MOBILE_WALLET_INTEGERATION_ID;
const TEST_NOTIFICATION_URL = ENV.PAYMOB_NOTIFICATION_URL;
const TEST_REDIRECTION_URL = ENV.PAYMOB_REDIRECTION_URL;

// Initialize SDK with test keys
const paymob = new Paymob({
	secretKey: TEST_SECRET_KEY,
	publicKey: TEST_PUBLIC_KEY,
	timeout: 20000,
	notification_url: TEST_NOTIFICATION_URL,
	redirection_url: TEST_REDIRECTION_URL,
});

// Sample test data
const TEST_DATA = {
	amount: 10000,
	currency: "EGP",
	payment_methods: [TEST_INTEGRATION_ID],
	items: [
		{
			name: "Test Product",
			amount: 10000,
			description: "SDK Test Item",
			quantity: 1,
		},
	],
	billing_data: {
		first_name: "John",
		last_name: "Doe",
		phone_number: "+201234567890",
		email: "test@example.com",
		apartment: "123",
		floor: "5",
		street: "Test Street",
		building: "123",
		city: "Cairo",
		country: "Egypt",
		state: "Cairo",
	},
	special_reference: `sdk-test-${Date.now()}`,
};

describe("Paymob Intention API", () => {
	let intentionId: string;
	let clientSecret: string;
	// let transactionId: string;

	test("should create an intention successfully", async () => {
		try {
			// Create intention using real API call
			const result = await paymob.intentions.create(TEST_DATA);

			// Validate response fields
			expect(result).toBeDefined();
			expect(result.id).toBeDefined();
			expect(result.client_secret).toBeDefined();

			// Store IDs for subsequent tests
			intentionId = result.id;
			clientSecret = result.client_secret;

			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			console.log("Created intention:", intentionId);
		} catch (error) {
			console.error("Error creating intention:", error);
			throw error;
		}
	});

	test("should generate correct checkout URL", () => {
		expect(clientSecret).toBeDefined();

		const url = paymob.getCheckoutUrl(clientSecret);
		expect(url).toBe(
			`https://accept.paymob.com/unifiedcheckout/?publicKey=${TEST_PUBLIC_KEY}&clientSecret=${clientSecret}`,
		);

		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log("Checkout URL:", url);
	});

	// Note: The following tests depend on having actual transaction IDs
	// from a completed payment flow. These should be replaced with actual
	// transaction IDs from your Paymob test account or commented out
	// during automated testing.
	/*
	test("should refund a transaction", async () => {
		expect(transactionId).toBeDefined();
		
		const result = await paymob.intentions.refund({
			transaction_id: transactionId,
			amount_cents: TEST_DATA.amount,
		});
		
		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});
	
	test("should void a transaction", async () => {
		expect(transactionId).toBeDefined();
		
		const result = await paymob.intentions.void({
			transaction_id: transactionId,
		});
		
		expect(result).toBeDefined();
		expect(result.success).toBe(true);
	});
	*/
});
