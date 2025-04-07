import * as v from "valibot";
import { 
  amountCents, 
  integer, 
  nonNegativeInteger, 
  positiveInteger, 
  timestampValidation, 
  urlValidation,
  emailValidation,
  BillingDataSchema
} from "./common.js";

// --- Merchant Schema ---
export const MerchantSchema = v.object({
  id: integer(),
  created_at: timestampValidation(),
  phones: v.array(v.string()),
  company_emails: v.array(emailValidation()),
  company_name: v.string(),
  state: v.string(),
  country: v.string(),
  city: v.string(),
  postal_code: v.string(),
  street: v.string(),
});
export type Merchant = v.InferInput<typeof MerchantSchema>;

// --- Shipping Data Schema ---
export const ShippingDataSchema = v.object({
  id: integer(),
  first_name: v.string(),
  last_name: v.string(),
  street: v.string(),
  building: v.string(),
  floor: v.string(),
  apartment: v.string(),
  city: v.string(),
  state: v.string(),
  country: v.string(),
  email: emailValidation(),
  phone_number: v.string(),
  postal_code: v.string(),
  extra_description: v.string(),
  shipping_method: v.string(),
  order_id: integer(),
  order: integer(),
});
export type ShippingData = v.InferInput<typeof ShippingDataSchema>;

// --- Order Schema ---
export const OrderSchema = v.object({
  id: integer(),
  created_at: timestampValidation(),
  delivery_needed: v.boolean(),
  merchant: v.object({
    id: integer(),
    created_at: timestampValidation(),
    phones: v.array(v.string()),
    company_emails: v.array(emailValidation()),
    company_name: v.string(),
    state: v.string(),
    country: v.string(),
    city: v.string(),
    postal_code: v.string(),
    street: v.string(),
  }),
  collector: v.nullable(v.unknown()),
  amount_cents: amountCents(),
  shipping_data: v.nullable(ShippingDataSchema),
  shipping_details: v.nullable(v.unknown()),
  currency: v.string(),
  is_payment_locked: v.boolean(),
  is_return: v.boolean(),
  is_cancel: v.boolean(),
  is_returned: v.boolean(),
  is_canceled: v.boolean(),
  merchant_order_id: v.nullable(v.string()),
  wallet_notification: v.nullable(v.unknown()),
  paid_amount_cents: amountCents(),
  notify_user_with_email: v.boolean(),
  items: v.array(v.unknown()),
  order_url: v.string(),
  commission_fees: amountCents(),
  delivery_fees_cents: amountCents(),
  delivery_vat_cents: amountCents(),
  payment_method: v.string(),
  merchant_staff_tag: v.nullable(v.string()),
  api_source: v.string(),
  pickup_data: v.nullable(v.unknown()),
  delivery_status: v.array(v.unknown()),
});
export type Order = v.InferInput<typeof OrderSchema>;

// --- Source Data Schema ---
export const SourceDataSchema = v.object({
  type: v.string(),
  pan: v.string(),
  sub_type: v.string(),
});
export type SourceData = v.InferInput<typeof SourceDataSchema>;

// --- Chargeback Schema ---
export const ChargebackSchema = v.object({
  amount_cents: amountCents(),
  currency: v.string(),
  reason_code: v.string(),
});
export type Chargeback = v.InferInput<typeof ChargebackSchema>;

// --- Acquirer Schema ---
export const AcquirerSchema = v.object({
  acquirer: v.string(),
  merchant_id: v.string(),
  terminal_id: v.string(),
  merchant_name: v.string(),
  merchant_city: v.string(),
  merchant_country: v.string(),
  settlement_amount: v.string(),
  settlement_currency: v.string(),
  transaction_id: v.string(),
  auth_code: v.string(),
  reference_number: v.string(),
  receipt_no: v.string(),
  batch_no: v.string(),
  message: v.string(),
  response_code: v.string(),
  pos_entry_mode: v.string(),
  card_data: v.string(),
  acq_response_code: v.string(),
  avs_acq_response_code: v.string(),
  eci: v.string(),
  cavv: v.string(),
  xid: v.string(),
  network: v.string(),
  card_type: v.string(),
  authentication_3ds: v.string(),
  transaction_status: v.string(),
  transaction_status_reason: v.string(),
  transaction_status_info: v.string(),
  transaction_status_details: v.string(),
  transaction_status_details_reason: v.string(),
  transaction_status_details_info: v.string(),
});
export type Acquirer = v.InferInput<typeof AcquirerSchema>;

// --- Base MIGS Transaction Schema ---
export const BaseMigsTransactionSchema = v.object({
  id: v.string(),
  amount: amountCents(),
  currency: v.string(),
  merchant: v.string(),
  terminal: v.string(),
  type: v.string(),
});
export type BaseMigsTransaction = v.InferInput<
  typeof BaseMigsTransactionSchema
>;

export const BaseMigsOrderSchema = v.object({
  amount: amountCents(),
  chargeback: ChargebackSchema,
  creationTime: v.string(),
  currency: v.string(),
  id: v.string(),
  merchantId: v.string(),
  merchantOrderId: v.string(),
  merchantTransactionId: v.string(),
  status: v.string(),
  terminalId: v.string(),
  totalAuthorizedAmount: v.string(),
  totalCapturedAmount: v.string(),
  totalRefundedAmount: v.string(),
  transaction: BaseMigsTransactionSchema,
});
export type BaseMigsOrder = v.InferInput<typeof BaseMigsOrderSchema>;

// --- Base Transaction Data Schema ---
export const BaseTransactionDataSchema = v.object({
  order: OrderSchema,
  created_at: timestampValidation(),
  transaction_processed_callback_responses: v.array(v.unknown()),
  currency: v.string(),
  source_data: SourceDataSchema,
  api_source: v.string(),
  is_void: v.boolean(),
  is_refund: v.boolean(),
  is_capture: v.boolean(),
  is_standalone_payment: v.boolean(),
  payment_key_claims: v.nullable(v.unknown()),
  error_occured: v.boolean(),
  is_live: v.boolean(),
  other_endpoint_reference: v.nullable(v.unknown()),
  refunded_amount_cents: amountCents(),
  source_id: integer(),
  is_captured: v.boolean(),
  captured_amount: amountCents(),
  merchant_staff_tag: v.nullable(v.string()),
  updated_at: timestampValidation(),
  is_settled: v.boolean(),
  bill_balanced: v.boolean(),
  is_bill: v.boolean(),
  owner: integer(),
  parent_transaction: v.nullable(v.unknown()),
  redirect_url: v.nullable(v.string()),
  merchant: MerchantSchema,
  merchant_external_link: v.nullable(v.string()),
  acquirer: AcquirerSchema,
  terminal_id: v.nullable(v.unknown()),
  installment: v.nullable(v.unknown()),
  order_id: integer(),
  hmac: v.string(),
  use_redirection: v.boolean(),
  rrn: v.string(),
  migs_order: BaseMigsOrderSchema,
  integration_id: integer(),
  klass: v.string(),
  created_by: v.string(),
  gateway_source_data: v.nullable(v.unknown()),
  secure_hash: v.string(),
  avs_result_code: v.string(),
  avs_acq_response_code: v.string(),
  acs_eci: v.string(),
});
export type BaseTransactionData = v.InferInput<
  typeof BaseTransactionDataSchema
>;

export const BaseTransactionResponseSchema = v.object({
  id: integer(),
  pending: v.boolean(),
  amount_cents: amountCents(),
  success: v.boolean(),
  is_auth: v.boolean(),
  is_capture: v.boolean(),
  is_standalone_payment: v.boolean(),
  is_void: v.boolean(),
  is_refund: v.boolean(),
  is_voided: v.boolean(),
  is_refunded: v.boolean(),
  is_3d_secure: v.boolean(),
  integration_id: integer(),
  profile_id: integer(),
  has_parent_transaction: v.boolean(),
  order: OrderSchema,
  created_at: timestampValidation(),
  transaction_processed_callback_responses: v.array(v.unknown()),
  currency: v.string(),
  source_data: SourceDataSchema,
  api_source: v.string(),
  terminal_id: v.nullable(v.unknown()),
  merchant_commission: integer(),
  installment: v.nullable(v.unknown()),
  error_occured: v.boolean(),
  refunded_amount_cents: amountCents(),
  captured_amount: amountCents(),
  updated_at: timestampValidation(),
  is_settled: v.boolean(),
  bill_balanced: v.boolean(),
  is_bill: v.boolean(),
  owner: integer(),
  parent_transaction: integer(),
});
export type BaseTransactionResponse = v.InferInput<
  typeof BaseTransactionResponseSchema
>;

// Transaction operation request schemas
export const RefundRequestSchema = v.object({
  transaction_id: integer(), 
  amount_cents: positiveInteger(), // Must refund at least 1 cent
});
export type RefundRequest = v.InferInput<typeof RefundRequestSchema>;

export const CaptureRequestSchema = v.object({
  transaction_id: integer(), 
  amount_cents: positiveInteger(), // Must capture at least 1 cent
});
export type CaptureRequest = v.InferInput<typeof CaptureRequestSchema>;

export const VoidRequestSchema = v.object({
  transaction_id: integer(), 
});
export type VoidRequest = v.InferInput<typeof VoidRequestSchema>;

export const TransactionInquiryRequestSchema = v.object({
  transaction_id: integer(), 
});
export type TransactionInquiryRequest = v.InferInput<typeof TransactionInquiryRequestSchema>;

// Transaction operation response schemas
// Refund Transaction Data Schema
export const RefundTransactionDataSchema = v.object({
  ...BaseTransactionDataSchema.entries,
  transaction_id: integer(),
});
export type RefundTransactionData = v.InferInput<typeof RefundTransactionDataSchema>;

// Capture Transaction Data Schema
export const CaptureTransactionDataSchema = v.object({
  ...BaseTransactionDataSchema.entries,
  transaction_id: integer(),
});
export type CaptureTransactionData = v.InferInput<typeof CaptureTransactionDataSchema>;

// Void Transaction Data Schema
export const VoidTransactionDataSchema = v.object({
  ...BaseTransactionDataSchema.entries,
  transaction_id: integer(),
});
export type VoidTransactionData = v.InferInput<typeof VoidTransactionDataSchema>;

// Payment Transaction Data Schema
const PaymentMigsOrderSchema = v.object({
  ...BaseMigsOrderSchema.entries,
  acceptPartialAmount: v.boolean(),
  authenticationStatus: v.string(),
  status: v.string(),
  totalAuthorizedAmount: v.nullable(
    v.union([integer(), v.null()])
  ),
  totalCapturedAmount: v.nullable(
    v.union([integer(), v.null()])
  ),
});

const PaymentMigsTransactionSchema = v.object({
  ...BaseMigsTransactionSchema.entries,
  authenticationStatus: v.string(),
  authorizationResponse: v.object({
    stan: v.string(),
    authorizationCode: v.string(),
    responseCode: v.string(),
    responseMessage: v.string(),
  }),
  receipt: v.string(),
  type: v.literal("PAYMENT"),
  status: v.string(),
});

export const PaymentTransactionDataSchema = v.object({
  ...BaseTransactionDataSchema.entries,
  transaction_id: integer(),
  migs_order: PaymentMigsOrderSchema,
  migs_transaction: PaymentMigsTransactionSchema,
});
export type PaymentTransactionData = v.InferInput<typeof PaymentTransactionDataSchema>;

// Payment Key Claims Schema
export const BillingDataClaimsSchema = v.object({
  apartment: v.string(),
  email: emailValidation(),
  floor: v.string(),
  first_name: v.string(),
  street: v.string(),
  building: v.string(),
  phone_number: v.string(),
  shipping_method: v.string(),
  postal_code: v.string(),
  city: v.string(),
  country: v.string(),
  last_name: v.string(),
  state: v.string(),
});

export const PaymentKeyClaimsSchema = v.object({
  user_id: integer(),
  amount_cents: amountCents(),
  currency: v.string(),
  integration_id: integer(),
  order_id: integer(),
  billing_data: BillingDataClaimsSchema,
  lock_order_when_paid: v.boolean(),
  extra: v.looseObject({}),
  notification_url: v.string(),
  redirection_url: v.string(),
  single_payment_attempt: v.boolean(),
  exp: integer(),
  pmk_ip: v.string(),
});
export type PaymentKeyClaims = v.InferInput<typeof PaymentKeyClaimsSchema>;

/**
 * Detailed schema for Refund Transaction Response based on Paymob API.
 */
export const RefundResponseSchema = v.object({
  ...BaseTransactionResponseSchema.entries,
  is_refund: v.literal(true),
  data: RefundTransactionDataSchema,
});
export type RefundResponse = v.InferInput<typeof RefundResponseSchema>;

/**
 * Detailed schema for Capture Transaction Response based on Paymob API.
 */
export const CaptureResponseSchema = v.object({
  ...BaseTransactionResponseSchema.entries,
  is_capture: v.literal(true),
  is_void: v.literal(false),
  is_refund: v.literal(false),
  data: CaptureTransactionDataSchema,
});
export type CaptureResponse = v.InferInput<typeof CaptureResponseSchema>;

/**
 * Detailed schema for Void Transaction Response based on Paymob API.
 */
export const VoidResponseSchema = v.object({
  ...BaseTransactionResponseSchema.entries,
  is_void: v.literal(true),
  is_refund: v.literal(false),
  data: VoidTransactionDataSchema,
});
export type VoidResponse = v.InferInput<typeof VoidResponseSchema>;

/**
 * Schema for retrieving a transaction response from Paymob API.
 */
export const TransactionResponseSchema = v.object({
  ...BaseTransactionResponseSchema.entries,
  is_standalone_payment: v.boolean(),
  has_parent_transaction: v.boolean(),
  data: PaymentTransactionDataSchema,
  payment_key_claims: v.optional(PaymentKeyClaimsSchema),
  parent_transaction: v.optional(integer()),
  unique_ref: v.string(),
});
export type TransactionResponse = v.InferInput<
  typeof TransactionResponseSchema
>;
