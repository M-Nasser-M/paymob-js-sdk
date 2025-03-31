import * as v from "valibot";

export const AuthResponseSchema = v.object({
  token: v.string(),
  profile: v.object({
    id: v.number(),
  }),
});
export type AuthResponseInput = v.InferInput<typeof AuthResponseSchema>;
export type AuthResponseOutput = v.InferOutput<typeof AuthResponseSchema>;

// Transaction Inquiry Request Schemas
export const TransactionInquiryByMerchantOrderSchema = v.object({
  auth_token: v.string(),
  merchant_order_id: v.string(),
});

export const TransactionInquiryByOrderIdSchema = v.object({
  auth_token: v.string(),
  order_id: v.string(),
});

// Common Transaction Response Fields
const TransactionBaseSchema = v.object({
  id: v.number(),
  created_at: v.string(),
  amount_cents: v.number(),
  currency: v.string(),
  merchant_order_id: v.string(),
  order_id: v.number(),
  payment_key_claims: v.object({
    amount_cents: v.number(),
    currency: v.string(),
    integration_id: v.number(),
  }),
  is_refunded: v.boolean(),
  is_void: v.boolean(),
  is_voided: v.boolean(),
  is_captured: v.boolean(),
  captured_amount: v.number(),
  owner: v.number(),
  source_data: v.object({
    type: v.string(),
    pan: v.string(),
    sub_type: v.string(),
  }),
  data: v.object({
    merchant_order_id: v.string(),
    amount_cents: v.number(),
    order_id: v.number(),
    currency: v.string(),
  }),
  error_occured: v.boolean(),
  has_parent_transaction: v.boolean(),
  merchant: v.object({
    id: v.number(),
    created_at: v.string(),
    phones: v.array(v.string()),
    company_emails: v.array(v.string()),
    company_name: v.string(),
    state: v.string(),
    country: v.string(),
    city: v.string(),
  }),
  order: v.object({
    id: v.number(),
    created_at: v.string(),
    delivery_needed: v.boolean(),
    amount_cents: v.number(),
    currency: v.string(),
    merchant_order_id: v.string(),
  }),
});

export const TransactionResponseSchema = TransactionBaseSchema;
export type TransactionResponseInput = v.InferInput<typeof TransactionResponseSchema>;
export type TransactionResponseOutput = v.InferOutput<typeof TransactionResponseSchema>;

export const refundRequestSchema = v.object({
  transaction_id: v.string(),
  amount_cents: v.union([v.string(), v.number()]),
});
export type RefundRequestInput = v.InferInput<typeof refundRequestSchema>;
export type RefundRequestOutput = v.InferOutput<typeof refundRequestSchema>;

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

export const captureRequestSchema = v.object({
  transaction_id: v.string(),
  amount_cents: v.union([v.string(), v.number()]),
});
export type CaptureRequestInput = v.InferInput<typeof captureRequestSchema>;
export type CaptureRequestOutput = v.InferOutput<typeof captureRequestSchema>;

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

export const voidRequestSchema = v.object({
  transaction_id: v.string(),
});
export type VoidRequestInput = v.InferInput<typeof voidRequestSchema>;
export type VoidRequestOutput = v.InferOutput<typeof voidRequestSchema>;

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
