# Paymob SDK

A TypeScript SDK for the Paymob Intention API v3, designed with strict typing and modern JavaScript practices.

## Features

- Complete TypeScript support with strict type checking
- Native fetch API for HTTP requests
- Automatic retry mechanism for 5xx errors
- Comprehensive error handling
- ESM module support
- 100% test coverage

## Requirements

- Bun v1.2.7+
- Node.js 20+
- TypeScript 5.0+

## Installation

```bash
bun add @paymob/sdk
```

Or with npm:

```bash
npm install @paymob/sdk
```

## Usage

### Initialize the SDK

```typescript
import { Paymob } from '@paymob/sdk';

const paymob = new Paymob({
  secretKey: 'YOUR_SECRET_KEY',
  publicKey: 'YOUR_PUBLIC_KEY',
  integrationIds: ['YOUR_INTEGRATION_ID'],
  notificationUrl: 'YOUR_NOTIFICATION_URL',
  redirectionUrl: 'YOUR_REDIRECTION_URL',
  // Optional configurations
  apiBaseUrl: 'https://accept.paymob.com', // Default
  timeout: 10000, // Default: 10 seconds
  retryAttempts: 3, // Default: 3 attempts for 5xx errors
});
```

### Create a Payment Intention

```typescript
const intentionResponse = await paymob.intentions.create({
  amount: 10000, // amount in cents
  currency: 'EGP',
  items: [
    {
      name: 'Product 1',
      amount: 5000,
      description: 'Product description',
      quantity: 1
    },
    {
      name: 'Product 2',
      amount: 5000,
      description: 'Another product',
      quantity: 1
    }
  ],
  billing_data: {
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '+201234567890',
    email: 'customer@example.com',
    // Optional address details
    apartment: '123',
    street: 'Example Street',
    building: '4',
    city: 'Cairo',
    country: 'Egypt',
    floor: '5',
    state: 'Cairo'
  },
  // Optional parameters
  extras: {
    custom_field: 'custom_value'
  },
  special_reference: 'order-123456', //also name merchat_order_id so you can set you own order id in Paymob
});

// Get client_secret from response
const { client_secret, id } = intentionResponse;

// Generate checkout URL
const checkoutUrl = paymob.getCheckoutUrl(client_secret);
```

### Process a Refund

```typescript
const refundResponse = await paymob.intentions.refund({
  transaction_id: 'TRANSACTION_ID',
  amount_cents: 10000 // Amount to refund
});
```

### Capture an Authorized Payment

```typescript
const captureResponse = await paymob.intentions.capture({
  transaction_id: 'TRANSACTION_ID',
  amount_cents: 10000 // Amount to capture
});
```

### Void a Transaction

```typescript
const voidResponse = await paymob.intentions.void({
  transaction_id: 'TRANSACTION_ID'
});
```

### MOTO Payment (Mail Order/Telephone Order)

```typescript
const motoResponse = await paymob.moto.pay({
  source: {
    identifier: 'CARD_TOKEN', // Obtained from save card callback
    subtype: 'TOKEN'
  },
  payment_token: 'PAYMENT_KEY' // Obtained from intention
});
```

## Error Handling

The SDK provides custom error classes for different scenarios:

```typescript
import { PaymobAPIError, ConfigurationError, ValidationError } from '@paymob/sdk';

try {
  const response = await paymob.intentions.create(/* ... */);
} catch (error) {
  if (error instanceof PaymobAPIError) {
    // Handle API errors (e.g., authentication, validation)
    console.error(`API Error ${error.statusCode}: ${error.message}`);
    console.error('Details:', error.details);
  } else if (error instanceof ConfigurationError) {
    // Handle configuration issues
    console.error(`Config Error: ${error.message}`);
  } else if (error instanceof ValidationError) {
    // Handle validation issues
    console.error(`Validation Error: ${error.message}`);
    console.error('Details:', error.details);
  } else {
    // Handle other errors
    console.error(`Unknown Error: ${error.message}`);
  }
}
```

## Development

This project uses Bun for package management and testing.

```bash
# Install dependencies
bun install

# Run tests
bun test

# Run tests with coverage
bun test --coverage

# Build the package
bun run build
```

## License

MIT
