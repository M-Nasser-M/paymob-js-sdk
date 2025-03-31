/**
 * Paymob SDK
 * A TypeScript SDK for interacting with Paymob Intention API v3
 */

// Export main SDK class
export { Paymob } from './core/paymob';

// Export types
export type {
  PaymobConfigInput as PaymobConfig,
  CreateIntentionRequestInput as CreateIntentionRequest,
  CreateIntentionResponseOutput as CreateIntentionResponse,
  PaymobItemInput as PaymobItem,
  BillingDataInput as BillingData,
  RefundRequestInput as RefundRequest,
  RefundResponseOutput as RefundResponse,
  CaptureRequestInput as CaptureRequest, 
  CaptureResponseOutput as CaptureResponse,
  VoidRequestInput as VoidRequest,
  VoidResponseOutput as VoidResponse,
  MotoRequestInput as MotoRequest,
  MotoResponseOutput as MotoResponse,
  ApiErrorOutput as ApiError
} from './types';

// Export error classes
export {
  PaymobError,
  PaymobAPIError,
  ConfigurationError,
  ValidationError
} from './errors';
