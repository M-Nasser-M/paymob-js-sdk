/**
 * Common schemas and validation patterns for the Paymob SDK
 * Contains reusable validation patterns and common schema structures
 */
import * as v from "valibot";

// --- Common Validation Patterns ---

/**
 * Integer validation pipe
 * @param min Optional minimum value
 */
export const integer = (min?: number) => {
  return min !== undefined
    ? v.pipe(v.number(), v.integer(), v.minValue(min))
    : v.pipe(v.number(), v.integer());
};

/**
 * Positive integer validation (value >= 1)
 */
export const positiveInteger = () => integer(1);

/**
 * Non-negative integer validation (value >= 0)
 */
export const nonNegativeInteger = () => integer(0);

/**
 * Amount in cents validation (non-negative integer)
 */
export const amountCents = () => {
  return v.pipe(
    nonNegativeInteger(),
    v.custom((value) => Number.isInteger(value), "Amount must be in cents (integer)")
  );
};

/**
 * URL validation pipe
 */
export const urlValidation = () => v.pipe(v.string(), v.url());

/**
 * Email validation pipe
 */
export const emailValidation = () => v.pipe(v.string(), v.email());

/**
 * Timestamp validation pipe
 */
export const timestampValidation = () => v.pipe(v.string(), v.isoTimestamp());

// --- Common Base Schemas ---

/**
 * Schema for billing data
 */
export const BillingDataSchema = v.object({
  apartment: v.string(),
  first_name: v.string(),
  last_name: v.string(),
  street: v.string(),
  building: v.string(),
  phone_number: v.string(),
  city: v.string(),
  country: v.string(),
  email: emailValidation(),
  floor: v.string(),
  state: v.string(),
});
export type BillingData = v.InferInput<typeof BillingDataSchema>;

/**
 * Schema for order items
 */
export const ItemSchema = v.object({
  name: v.string(),
  amount_cents: amountCents(),
  description: v.string(),
  quantity: positiveInteger(),
});
export type Item = v.InferInput<typeof ItemSchema>;

/**
 * Schema for payment methods
 */
export const PaymentMethodsSchema = v.pipe(
  v.array(v.union([v.number(), v.string()])),
  v.check(
    (arr) => arr.length > 0,
    "At least one payment method ID is required."
  )
);
export type PaymentMethods = v.InferInput<typeof PaymentMethodsSchema>;

/**
 * Base schema for API responses with ID and timestamps
 */
export const BaseResourceSchema = v.object({
  id: v.union([v.string(), integer()]),
  created_at: timestampValidation(),
  updated_at: v.optional(timestampValidation()),
});
export type BaseResource = v.InferInput<typeof BaseResourceSchema>;

/**
 * Schema for customer information
 */
export const CustomerSchema = v.object({
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  email: v.optional(emailValidation()),
  phone_number: v.optional(v.string()),
});
export type Customer = v.InferInput<typeof CustomerSchema>;

/**
 * Schema for address information
 */
export const AddressSchema = v.object({
  street: v.optional(v.string()),
  building: v.optional(v.string()),
  floor: v.optional(v.string()),
  apartment: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  country: v.optional(v.string()),
  postal_code: v.optional(v.string()),
});
export type Address = v.InferInput<typeof AddressSchema>;

/**
 * Schema for metadata
 */
export const MetadataSchema = v.record(v.string(), v.unknown());
export type Metadata = v.InferInput<typeof MetadataSchema>;
