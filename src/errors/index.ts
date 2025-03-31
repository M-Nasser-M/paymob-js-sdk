/**
 * Paymob SDK Custom Error Classes
 */

export class PaymobError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PaymobError';
    Object.setPrototypeOf(this, PaymobError.prototype);
  }
}

export class PaymobAPIError extends PaymobError {
  public statusCode: number;
  public details: unknown;

  constructor(message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'PaymobAPIError';
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, PaymobAPIError.prototype);
  }
}

export class ConfigurationError extends PaymobError {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

export class ValidationError extends PaymobError {
  public details: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
