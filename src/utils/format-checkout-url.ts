import { DEFAULT_PAYMOB_UNIFIED_CHECKOUT_TEMPLATE } from "../defaults/index.js";
import { ENV } from "../env.js";

export const getFormattedUnifiedCheckoutUrl = (clientSecret: string) => {
	return DEFAULT_PAYMOB_UNIFIED_CHECKOUT_TEMPLATE.replace(
		"CLIENT_SECRET_PLACEHOLDER",
		clientSecret,
	).replace("PUBLIC_KEY_PLACEHOLDER", ENV.PAYMOB_PUBLIC_KEY);
};
