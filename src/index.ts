/**
 * Paymob SDK
 * A TypeScript SDK for interacting with Paymob Intention API v3
 */

// Export main SDK class
export { Paymob } from './core/paymob';

// Export types
export type {
  PaymobConfig,
  CreateIntentionRequest,
  CreateIntentionResponse,
  PaymobItem,
  BillingData,
  RefundRequest,
  RefundResponse,
  CaptureRequest, 
  CaptureResponse,
  VoidRequest,
  VoidResponse,
  MotoRequest,
  MotoResponse,
  ApiError
} from './types';

// Export error classes
export {
  PaymobError,
  PaymobAPIError,
  ConfigurationError,
  ValidationError
} from './errors';
