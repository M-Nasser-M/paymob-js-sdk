import * as v from "valibot";

export const motoIntentionResponseSchema = v.object({
	payment_keys: v.array(
		v.object({
			integration: v.number(),
			payment_key: v.string(),
		}),
	),
});

export type MotoIntentionResponseInput = v.InferInput<typeof motoIntentionResponseSchema>;
export type MotoIntentionResponseOutput = v.InferOutput<typeof motoIntentionResponseSchema>;

// MOTO request schema
export const motoRequestSchema = v.object({
	source: v.object({
		identifier: v.string(),
		subtype: v.optional(v.string(), "TOKEN"),
	}),
	payment_token: v.string(),
});

export type MotoRequestInput = v.InferInput<typeof motoRequestSchema>;
export type MotoRequestOutput = v.InferOutput<typeof motoRequestSchema>;

// MOTO response schema
export const motoResponseSchema = v.object({
	id: v.number(),
	amount_cents: v.number(),
	created_at: v.string(),
	currency: v.string(),
	success: v.boolean(),
	is_auth: v.boolean(),
	is_capture: v.boolean(),
	is_refunded: v.boolean(),
	transaction_id: v.string(),
});

export type MotoResponseInput = v.InferInput<typeof motoResponseSchema>;
export type MotoResponseOutput = v.InferOutput<typeof motoResponseSchema>;
