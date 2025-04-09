# Paymob SDK

A TypeScript SDK for the Paymob API , designed with strict typing and modern JavaScript practices.

## Features

- Complete TypeScript support with strict type checking
- Native fetch API for HTTP requests
- Automatic retry mechanism for 5xx errors
- Comprehensive error handling
- ESM module support
- 100% test coverage
- subscription api is not supported yet
- package is still in development

## Requirements

- Bun v1.2.7+
- Node.js 20+
- TypeScript 5.0+

## Installation

```bash
bun add @m-nasser-m/paymob-sdk-eg
```

Or with npm:

```bash
npm install @m-nasser-m/paymob-sdk-eg
```

## Usage

### Initialize the SDK

```typescript
import { Paymob } from '@m-nasser-m/paymob-sdk-eg';
import type { PaymobConfig } from '@m-nasser-m/paymob-sdk-eg'; // Import type if needed

// Ensure environment variables are loaded or provide values directly
const paymobConfig: PaymobConfig = {
  PAYMOB_API_KEY: process.env.PAYMOB_API_KEY!,
  PAYMOB_PUBLIC_KEY: process.env.PAYMOB_PUBLIC_KEY!,
  PAYMOB_SECRET_KEY: process.env.PAYMOB_SECRET_KEY!,
  PAYMOB_NOTIFICATION_URL: process.env.PAYMOB_NOTIFICATION_URL!,
  PAYMOB_REDIRECTION_URL: process.env.PAYMOB_REDIRECTION_URL!
};

const paymob = new Paymob(paymobConfig);

// Optional: Configure ky options if needed
// const paymob = new Paymob(paymobConfig, { timeout: 15000 });
```

### Create a Payment Intention & Get Checkout URL

```typescript
import type { CreateIntentionRequest } from '@m-nasser-m/paymob-sdk-eg';

const paymentDetails: CreateIntentionRequest = {
  amount: 10000, // amount in cents
  currency: 'EGP',
  payment_methods: [paymobConfig.PAYMOB_INTEGRATION_ID_CARD], // Specify allowed integration IDs
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
    apartment: '123',
    street: 'Example Street',
    building: '4',
    city: 'Cairo',
    country: 'EGY', // Use 3-letter ISO code
    floor: '5',
    state: 'Cairo'
  },
  extras: {
    custom_field: 'custom_value'
  },
  special_reference: `order-${Date.now()}` // Your internal order ID (merchant_order_id)
};

try {
  // Use the combined method to create intention and get the URL directly
  const checkoutUrl = await paymob.payment.createIntentionAndGetUrl(paymentDetails);

  console.log('Checkout URL:', checkoutUrl);
  // Redirect the user to checkoutUrl

  // OR, if you need the client_secret separately:
  // const intentionResponse = await paymob.payment.createIntention(paymentDetails);
  // const clientSecret = intentionResponse.client_secret;
  // const checkoutUrl = await paymob.payment.getPaymentUrl(clientSecret);
  // console.log('Client Secret:', clientSecret);
  // console.log('Checkout URL:', checkoutUrl);

} catch (error) {
  console.error('Error creating payment intention:', error);
  // Handle error appropriately
}
```

### Process a Refund

```typescript
// Import response type if needed
// import type { RefundResponse } from '@m-nasser-m/paymob-sdk-eg';

const transactionToRefund = 'TARGET_TRANSACTION_ID';
const amountToRefund = 5000; // Amount in cents

try {
  const refundResponse = await paymob.payment.refundTransaction(transactionToRefund, amountToRefund);
  console.log('Refund successful:', refundResponse);
} catch (error) {
  console.error('Error processing refund:', error);
}
```

### Capture an Authorized Payment

```typescript
// Import response type if needed
// import type { CaptureResponse } from '@m-nasser-m/paymob-sdk-eg'; // Assuming CaptureResponse exists

const transactionToCapture = 'AUTHORIZED_TRANSACTION_ID';
const amountToCapture = 10000; // Amount in cents

try {
  const captureResponse = await paymob.payment.captureTransaction(transactionToCapture, amountToCapture);
  console.log('Capture successful:', captureResponse);
} catch (error) {
  console.error('Error capturing transaction:', error);
}
```

### Void a Transaction

```typescript
// Import response type if needed
// import type { VoidResponse } from '@m-nasser-m/paymob-sdk-eg';

const transactionToVoid = 'TRANSACTION_TO_VOID_ID';

try {
  const voidResponse = await paymob.payment.voidTransaction(transactionToVoid);
  console.log('Void successful:', voidResponse);
} catch (error) {
  console.error('Error voiding transaction:', error);
}
```

### MOTO Payment (Mail Order/Telephone Order)

*This functionality is not currently implemented in the SDK.*

```typescript
// MOTO Payment example would go here once implemented.
```

## Error Handling

The SDK provides custom error classes (currently basic implementations):

```typescript
import { PaymobAPIError, ConfigurationError, ValidationError } from '@m-nasser-m/paymob-sdk-eg';

try {
  // Example: Trigger an intentional error or make a call
  const checkoutUrl = await paymob.payment.createIntentionAndGetUrl(/* ... invalid data ... */);
} catch (error) {
  if (error instanceof PaymobAPIError) {
    // Handle API response errors
    console.error(`API Error: ${error.message}`);
    // TODO: Add details parsing when error structure is finalized
  } else if (error instanceof ConfigurationError) {
    // Handle SDK configuration issues
    console.error(`Config Error: ${error.message}`);
  } else if (error instanceof ValidationError) {
    // Handle request validation issues before sending (e.g., from Valibot)
    console.error(`Validation Error: ${error.message}`);
    // You might access error.issues if using Valibot errors directly
  } else {
    // Handle other generic errors (e.g., network issues)
    console.error(`Unknown Error: ${error instanceof Error ? error.message : String(error)}`);
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
