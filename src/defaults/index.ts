// Default configuration values
// Note: All UPPER_SNAKE_CASE placeholders (e.g. PUBLIC_KEY_PLACEHOLDER) should be replaced
// with actual values before making API requests
export const DEFAULT_TIMEOUT = 10000; // 10 seconds

export const DEFAULT_RETRY_ATTEMPTS = 3;

export const DEFAULT_API_BASE_URL = "https://accept.paymob.com";

export const DEFAULT_PAYMENT_METHODS = ["wallet", "card"];

export const DEFAULT_PAYMOB_UNIFIED_CHECKOUT_TEMPLATE = `${DEFAULT_API_BASE_URL}/unifiedcheckout/?publicKey=PUBLIC_KEY_PLACEHOLDER&clientSecret=CLIENT_SECRET_PLACEHOLDER`;

export const DEFAULT_PAYMOB_ENDPOINTS = {
	INTENTION: "/v1/intention",
	AUTH: "/api/auth/tokens",
	CREATE_PAYMENT_LINK: "/api/ecommerce/payment-links",
	PAYMENT_ACTIONS: {
		REFUND: "/api/acceptance/void_refund/refund",
		VOID: "/api/acceptance/void_refund/void",
		CAPTURE: "/api/acceptance/capture",
		MOTO: "/api/acceptance/payments/pay",
	},
	TRANSACTION_INQUIRY: {
		ORDER_ID: "/api/ecommerce/orders/transaction_inquiry",
		TRANSACTION_ID: "/api/acceptance/transactions/TRANSACTION_ID_PLACEHOLDER",
		MERCHANT_ORDER_ID: "/api/ecommerce/orders/transaction_inquiry",
	},
	SUBSCRIPTIONS: {
		CREATE_SUBSCRIPTIONS: "/v1/intention",
		SUSPEND: "/api/acceptance/subscription-plans/SUBSCRIPTION_ID_PLACEHOLDER/suspend",
		RESUME: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/resume",
		CANCEL: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/cancel",
		UPDATE: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER",
		LIST_CARDS: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/card-tokens",
		CHANGE_PRIMARY_CARD:
			"/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/change-primary-card",
		DELETE_SECONDARY_CARD:
			"/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/delete-card",
		LIST_SUBSCRIPTION_DETAILS: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER",
		LIST_SUBSCRIPTIONS_RELATEDTO_TRANSACTION:
			"/api/acceptance/subscriptions?transaction=TRANSACTION_ID_PLACEHOLDER",
		LIST_LAST_TRANSACTION:
			"/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/last-transaction",
		LIST_ALL_TRANSACTIONS:
			"/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/transactions",
		REGISTER_WEBHOOK: "/api/acceptance/subscriptions/SUBSCRIPTION_ID_PLACEHOLDER/webhooks",
		PLANS: {
			CREATE: "/api/acceptance/subscription-plans",
			SUSPEND: "/api/acceptance/subscription-plans/SUBSCRIPTION_PLAN_ID_PLACEHOLDER/suspend",
			RESUME: "/api/acceptance/subscription-plans/SUBSCRIPTION_PLAN_ID_PLACEHOLDER/resume",
			UPDATE: "/api/acceptance/subscription-plans/SUBSCRIPTION_PLAN_ID_PLACEHOLDER",
			LIST: "/api/acceptance/subscription-plans",
		},
	},
};
