import * as v from "valibot";
import {
  amountCents,
  integer,
  nonNegativeInteger,
  positiveInteger,
  timestampValidation,
  urlValidation,
  BaseResourceSchema,
  CustomerSchema,
  AddressSchema,
  MetadataSchema,
} from "./common.js";

export const SubscriptionFrequencySchema = v.picklist([
  7, 15, 30, 90, 180, 365,
]);
export type SubscriptionFrequency = v.InferInput<
  typeof SubscriptionFrequencySchema
>;

export const CreateSubscriptionPlanRequestSchema = v.object({
  frequency: SubscriptionFrequencySchema,
  name: v.string(),
  reminder_days: v.nullable(nonNegativeInteger()),
  retrial_days: v.nullable(nonNegativeInteger()),
  plan_type: v.string(),
  number_of_deductions: v.nullable(positiveInteger()),
  amount_cents: amountCents(),
  use_transaction_amount: v.boolean(),
  is_active: v.optional(v.boolean()),
  integration: integer(),
  webhook_url: v.optional(v.nullable(urlValidation())),
});
export type CreateSubscriptionPlanRequest = v.InferInput<
  typeof CreateSubscriptionPlanRequestSchema
>;

export const SubscriptionPlanSchema = v.object({
  ...BaseResourceSchema.entries,
  frequency: SubscriptionFrequencySchema,
  name: v.string(),
  reminder_days: v.nullable(nonNegativeInteger()),
  retrial_days: v.nullable(nonNegativeInteger()),
  plan_type: v.string(),
  number_of_deductions: v.nullable(positiveInteger()),
  amount_cents: amountCents(),
  use_transaction_amount: v.boolean(),
  is_active: v.boolean(),
  integration: integer(),
  fee: v.nullable(v.number()),
});
export type SubscriptionPlan = v.InferInput<typeof SubscriptionPlanSchema>;

export const ListSubscriptionPlansResponseSchema = v.array(
  SubscriptionPlanSchema
);
export type ListSubscriptionPlansResponse = v.InferInput<
  typeof ListSubscriptionPlansResponseSchema
>;

// --- Subscription Schemas ---
// NOTE: Postman collection didn't show full request/response for creating/getting subscriptions.
// These are inferred based on common patterns and plan details.

/**
 * Schema for creating a subscription.
 * (Partially inferred - needs verification against actual API)
 */
export const CreateSubscriptionRequestSchema = v.object({
  plan_id: integer(),
  payment_token: v.string(), // The token representing the saved card
  ...CustomerSchema.entries,
  ...AddressSchema.entries,
  return_url: v.optional(urlValidation()),
  charge_failure_count: v.optional(nonNegativeInteger()),
  description: v.optional(v.string()),
  metadata: v.optional(MetadataSchema),
});
export type CreateSubscriptionRequest = v.InferInput<
  typeof CreateSubscriptionRequestSchema
>;

/**
 * Schema for the subscription resource (response).
 * (Highly inferred - needs verification against actual API)
 */
export const SubscriptionSchema = v.object({
  ...BaseResourceSchema.entries,
  plan: SubscriptionPlanSchema, // Assuming the plan details are nested
  customer_details: v.object({
    // Assuming customer info is grouped
    ...CustomerSchema.entries,
    // ... other address fields ...
  }),
  status: v.string(), // e.g., 'active', 'paused', 'cancelled'
  created_at: timestampValidation(),
  updated_at: timestampValidation(),
  // ... other fields like next_billing_date, card_token, etc.
});
export type Subscription = v.InferInput<typeof SubscriptionSchema>;
