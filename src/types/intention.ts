import * as v from "valibot";
import {
	BillingDataSchema,
	ItemSchema,
	MetadataSchema,
	PaymentMethodsSchema,
	amountCents,
	emailValidation,
	timestampValidation,
} from "./common.js";

/**
 * Schema for creating a Payment Intention request.
 */
export const CreateIntentionRequestSchema = v.object({
	amount: amountCents(), // Amount in lowest currency unit (e.g., cents, piastres)
	currency: v.string(), // e.g., 'EGP', 'USD'
	payment_methods: PaymentMethodsSchema,
	items: v.optional(v.array(ItemSchema)),
	billing_data: v.optional(BillingDataSchema),
	customer: v.optional(
		v.object({
			first_name: v.optional(v.string()),
			last_name: v.optional(v.string()),
			email: v.optional(emailValidation()),
			phone_number: v.optional(v.string()),
		}),
	),
	metadata: v.optional(MetadataSchema), // Optional metadata
	setup_future_usage: v.optional(v.picklist(["on_session", "off_session"])), // For tokenization
	merchant_order_id: v.optional(v.string()), // Your internal order ID
});
export type CreateIntentionRequest = v.InferInput<typeof CreateIntentionRequestSchema>;

export const CreateIntentionResponseSchema = v.object({
	id: v.string(), // Intention ID
	client_secret: v.string(),
	amount: amountCents(),
	currency: v.string(),
	status: v.string(),
	created_at: timestampValidation(),
});
export type CreateIntentionResponse = v.InferInput<typeof CreateIntentionResponseSchema>;

export const IntentionSchema = v.object({
	id: v.string(),
	client_secret: v.string(),
	amount: amountCents(),
	currency: v.string(),
	status: v.string(),
	payment_method_options: v.object({
		card: v.object({
			request_three_d_secure: v.string(),
		}),
	}),
	created_at: timestampValidation(),
	metadata: v.optional(MetadataSchema),
});
export type Intention = v.InferInput<typeof IntentionSchema>;
