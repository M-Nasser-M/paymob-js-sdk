/**
 * Error exports
 *
 * This file exports custom error classes for the Paymob SDK:
 * - PaymobAPIError: For API response errors
 * - ConfigurationError: For SDK configuration errors
 * - ValidationError: For request validation errors
 */

// Error classes will be defined in separate files later
// Currently the directory is empty and will be implemented as needed

export class PaymobAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "PaymobAPIError";
	}
}

export class ConfigurationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ConfigurationError";
	}
}

export class ValidationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ValidationError";
	}
}
