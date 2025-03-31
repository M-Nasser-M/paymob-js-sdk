/**
 * Paymob SDK Types
 * These types define the shapes for API requests and responses
 */

import * as v from "valibot";
import { DEFAULT_API_BASE_URL, DEFAULT_TIMEOUT, DEFAULT_RETRY_ATTEMPTS } from "../defaults";

export const paymobConfigSchema = v.object({
	secretKey: v.string(),
	publicKey: v.string(),
	notification_url: v.pipe(v.string(), v.url()),
	redirection_url: v.pipe(v.string(), v.url()),
	apiBaseUrl: v.optional(v.pipe(v.string(), v.url()), DEFAULT_API_BASE_URL),
	timeout: v.optional(v.number(), DEFAULT_TIMEOUT),
	retryAttempts: v.optional(v.number(), DEFAULT_RETRY_ATTEMPTS),
});

export type PaymobConfigInput = v.InferInput<typeof paymobConfigSchema>;
export type PaymobConfigOutput = v.InferOutput<typeof paymobConfigSchema>;

// Item schema for intention creation
export const paymobItemSchema = v.object({
	name: v.string(),
	amount: v.number(),
	description: v.string(),
	quantity: v.number(),
});

export type PaymobItemInput = v.InferInput<typeof paymobItemSchema>;
export type PaymobItemOutput = v.InferOutput<typeof paymobItemSchema>;

// Billing data schema for intention creation
export const billingDataSchema = v.object({
	apartment: v.optional(v.string()),
	first_name: v.string(),
	last_name: v.string(),
	street: v.optional(v.string()),
	building: v.optional(v.string()),
	phone_number: v.string(),
	city: v.optional(v.string()),
	country: v.optional(v.string()),
	email: v.pipe(v.string(), v.email()),
	floor: v.optional(v.string()),
	state: v.optional(v.string()),
});

export type BillingDataInput = v.InferInput<typeof billingDataSchema>;
export type BillingDataOutput = v.InferOutput<typeof billingDataSchema>;

// Create intention request schema
export const createIntentionRequestSchema = v.object({
	amount: v.number(),
	currency: v.string(),
	payment_methods: v.array(v.number()),
	items: v.array(paymobItemSchema),
	billing_data: billingDataSchema,
	extras: v.optional(v.record(v.string(), v.unknown())),
	special_reference: v.optional(v.string()),
	notification_url: v.optional(v.pipe(v.string(), v.url())),
	redirection_url: v.optional(v.pipe(v.string(), v.url())),
});

export type CreateIntentionRequestInput = v.InferInput<typeof createIntentionRequestSchema>;
export type CreateIntentionRequestOutput = v.InferOutput<typeof createIntentionRequestSchema>;

// Create intention response schema
export const createIntentionResponseSchema = v.object({
	id: v.string(),
	client_secret: v.string(),
	amount_cents: v.number(),
	currency: v.string(),
	created_at: v.string(),
	status: v.string(),
	payment_methods: v.array(v.number()),
});

export type CreateIntentionResponseInput = v.InferInput<typeof createIntentionResponseSchema>;
export type CreateIntentionResponseOutput = v.InferOutput<typeof createIntentionResponseSchema>;

// Refund request schema
export const refundRequestSchema = v.object({
	transaction_id: v.string(),
	amount_cents: v.union([v.string(), v.number()]),
});

export type RefundRequestInput = v.InferInput<typeof refundRequestSchema>;
export type RefundRequestOutput = v.InferOutput<typeof refundRequestSchema>;

// Refund response schema
export const refundResponseSchema = v.object({
	id: v.number(),
	amount_cents: v.number(),
	created_at: v.string(),
	currency: v.string(),
	order_id: v.string(),
	transaction_id: v.string(),
	status: v.string(),
});

export type RefundResponseInput = v.InferInput<typeof refundResponseSchema>;
export type RefundResponseOutput = v.InferOutput<typeof refundResponseSchema>;

// Capture request schema
export const captureRequestSchema = v.object({
	transaction_id: v.string(),
	amount_cents: v.union([v.string(), v.number()]),
});

export type CaptureRequestInput = v.InferInput<typeof captureRequestSchema>;
export type CaptureRequestOutput = v.InferOutput<typeof captureRequestSchema>;

// Capture response schema
export const captureResponseSchema = v.object({
	id: v.number(),
	amount_cents: v.number(),
	created_at: v.string(),
	currency: v.string(),
	pending: v.boolean(),
	success: v.boolean(),
	transaction_id: v.string(),
});

export type CaptureResponseInput = v.InferInput<typeof captureResponseSchema>;
export type CaptureResponseOutput = v.InferOutput<typeof captureResponseSchema>;

// Void request schema
export const voidRequestSchema = v.object({
	transaction_id: v.string(),
});

export type VoidRequestInput = v.InferInput<typeof voidRequestSchema>;
export type VoidRequestOutput = v.InferOutput<typeof voidRequestSchema>;

// Void response schema
export const voidResponseSchema = v.object({
	id: v.number(),
	amount_cents: v.number(),
	created_at: v.string(),
	currency: v.string(),
	transaction_id: v.string(),
	success: v.boolean(),
});

export type VoidResponseInput = v.InferInput<typeof voidResponseSchema>;
export type VoidResponseOutput = v.InferOutput<typeof voidResponseSchema>;

// Moto request schema
export const motoRequestSchema = v.object({
	source: v.object({
		identifier: v.string(),
		subtype: v.optional(v.string(), "TOKEN"),
	}),
	payment_token: v.string(),
});

export type MotoRequestInput = v.InferInput<typeof motoRequestSchema>;
export type MotoRequestOutput = v.InferOutput<typeof motoRequestSchema>;

// Moto response schema
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

// API Error schema
export const apiErrorSchema = v.object({
	statusCode: v.number(),
	error: v.string(),
	message: v.string(),
	details: v.optional(v.unknown()),
});

export type ApiErrorInput = v.InferInput<typeof apiErrorSchema>;
export type ApiErrorOutput = v.InferOutput<typeof apiErrorSchema>;
