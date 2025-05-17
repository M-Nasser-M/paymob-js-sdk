import * as v from "valibot";

export const WebhookResponseSchema = v.object({
	type: v.string(),
	obj: v.object({
		id: v.number(),
		pending: v.boolean(),
		amount_cents: v.number(),
		success: v.boolean(),
		is_auth: v.boolean(),
		is_capture: v.boolean(),
		is_standalone_payment: v.boolean(),
		is_voided: v.boolean(),
		is_refunded: v.boolean(),
		is_3d_secure: v.boolean(),
		integration_id: v.number(),
		has_parent_transaction: v.boolean(),
		created_at: v.string(),
		currency: v.string(),
		error_occured: v.boolean(),
		order: v.object({
			id: v.number(),
		}),
		owner: v.number(),
		source_data: v.object({
			pan: v.string(),
			type: v.string(),
			sub_type: v.string(),
		}),
	}),
});

export type WebhookResponse = v.InferOutput<typeof WebhookResponseSchema>;

export const paymentRedirectResponseSchema = v.pipe(
	v.object({
		"https://accept.paymobsolutions.com/api/acceptance/post_pay?id": v.number(),
		pending: v.boolean(),
		amount_cents: v.number(),
		success: v.boolean(),
		is_auth: v.boolean(),
		is_capture: v.boolean(),
		is_standalone_payment: v.boolean(),
		is_voided: v.boolean(),
		is_refunded: v.boolean(),
		is_3d_secure: v.boolean(),
		integration_id: v.number(),
		has_parent_transaction: v.boolean(),
		order: v.number(),
		created_at: v.string(),
		currency: v.string(),
		error_occured: v.boolean(),
		owner: v.number(),
		"source_data.pan": v.string(),
		"source_data.type": v.string(),
		"source_data.sub_type": v.string(),
		txn_response_code: v.number(),
		hmac: v.string(),
	}),
	v.transform((data) => {
		return {
			...data,
			id: data["https://accept.paymobsolutions.com/api/acceptance/post_pay?id"],
		};
	}),
);

export type PaymentRedirectResponseInput = v.InferInput<typeof paymentRedirectResponseSchema>;
export type PaymentRedirectResponseOutput = v.InferOutput<typeof paymentRedirectResponseSchema>;
