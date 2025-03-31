/**
 * Paymob SDK Types
 * These types define the shapes for API requests and responses
 */

// Core config type
export interface PaymobConfig {
	secretKey: string;
	publicKey?: string;
	apiBaseUrl?: string;
	timeout?: number;
	retryAttempts?: number;
}

// Item type for intention creation
export interface PaymobItem {
	name: string;
	amount: number;
	description: string;
	quantity: number;
}

// Billing data type for intention creation
export interface BillingData {
	apartment?: string;
	first_name: string;
	last_name: string;
	street?: string;
	building?: string;
	phone_number: string;
	city?: string;
	country?: string;
	email: string;
	floor?: string;
	state?: string;
}

// Create intention request
export interface CreateIntentionRequest {
	amount: number;
	currency: string;
	payment_methods: number[];
	items: PaymobItem[];
	billing_data: BillingData;
	extras?: Record<string, unknown>;
	special_reference?: string;
	notification_url?: string;
	redirection_url?: string;
}

// Create intention response
export interface CreateIntentionResponse {
	id: string;
	client_secret: string;
	amount_cents: number;
	currency: string;
	created_at: string;
	status: string;
	payment_methods: number[];
}

// Refund request
export interface RefundRequest {
	transaction_id: string;
	amount_cents: number | string;
}

// Refund response
export interface RefundResponse {
	id: number;
	amount_cents: number;
	created_at: string;
	currency: string;
	order_id: string;
	transaction_id: string;
	status: string;
}

// Capture request
export interface CaptureRequest {
	transaction_id: string;
	amount_cents: number | string;
}

// Capture response
export interface CaptureResponse {
	id: number;
	amount_cents: number;
	created_at: string;
	currency: string;
	pending: boolean;
	success: boolean;
	transaction_id: string;
}

// Void request
export interface VoidRequest {
	transaction_id: string;
}

// Void response
export interface VoidResponse {
	id: number;
	amount_cents: number;
	created_at: string;
	currency: string;
	transaction_id: string;
	success: boolean;
}

// Moto request
export interface MotoRequest {
	source: {
		identifier: string;
		subtype: string;
	};
	payment_token: string;
}

// Moto response
export interface MotoResponse {
	id: number;
	amount_cents: number;
	created_at: string;
	currency: string;
	success: boolean;
	is_auth: boolean;
	is_capture: boolean;
	is_refunded: boolean;
	transaction_id: string;
}

// API Error type
export interface ApiError {
	statusCode: number;
	error: string;
	message: string;
	details?: unknown;
}
