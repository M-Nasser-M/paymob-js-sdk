/**
 * Paymob SDK for Typescript
 * This is the main entry point for the SDK
 */

// Direct export of the main Paymob class for simpler imports
export { Paymob } from "./core/paymob.js";

// Export types, resources, and utilities as needed
export * from "./types/index.js";
export * from "./resources/payment/index.js";
export * from "./resources/transaction/index.js";
export * from "./resources/subscriptions/index.js";
export * from "./resources/auth/index.js";
