import * as v from "valibot";

export const paymobItemSchema = v.object({
  name: v.string(),
  amount: v.number(),
  description: v.string(),
  quantity: v.number(),
});

export type PaymobItemInput = v.InferInput<typeof paymobItemSchema>;
export type PaymobItemOutput = v.InferOutput<typeof paymobItemSchema>;

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

export const PaymentMethodsSchema = v.array(v.union([v.number(), v.string()]));

export type PaymentMethodsInput = v.InferInput<typeof PaymentMethodsSchema>;
export type PaymentMethodsOutput = v.InferOutput<typeof PaymentMethodsSchema>;

export const createIntentionRequestSchema = v.object({
  amount: v.number(),
  currency: v.optional(v.string(), "EGP"),
  payment_methods: v.optional(v.array(v.union([v.number(), v.string()])), undefined),
  items: v.array(paymobItemSchema),
  billing_data: billingDataSchema,
  extras: v.optional(v.record(v.string(), v.unknown())),
  special_reference: v.optional(v.string()),
  notification_url: v.optional(v.pipe(v.string(), v.url())),
  redirection_url: v.optional(v.pipe(v.string(), v.url())),
});

export type CreateIntentionRequestInput = v.InferInput<typeof createIntentionRequestSchema>;
export type CreateIntentionRequestOutput = v.InferOutput<typeof createIntentionRequestSchema>;

export const createIntentionRequestBodySchema = v.object({
  amount: v.number(),
  currency: v.optional(v.string(), "EGP"),
  payment_methods: PaymentMethodsSchema,
  items: v.array(paymobItemSchema),
  billing_data: billingDataSchema,
  extras: v.optional(v.record(v.string(), v.unknown())),
  special_reference: v.optional(v.string()),
  notification_url: v.optional(v.pipe(v.string(), v.url())),
  redirection_url: v.optional(v.pipe(v.string(), v.url())),
});

export type CreateIntentionRequestBodyInput = v.InferInput<typeof createIntentionRequestBodySchema>;
export type CreateIntentionRequestBodyOutput = v.InferOutput<typeof createIntentionRequestBodySchema>;

export const createIntentionResponseSchema = v.object({
  id: v.string(),
  client_secret: v.string(),
  amount_cents: v.number(),
  currency: v.string(),
  created_at: v.string(),
  status: v.string(),
  payment_methods: PaymentMethodsSchema,
});

export type CreateIntentionResponseInput = v.InferInput<typeof createIntentionResponseSchema>;
export type CreateIntentionResponseOutput = v.InferOutput<typeof createIntentionResponseSchema>;
