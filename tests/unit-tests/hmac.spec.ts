import { describe, expect, it } from "bun:test";
import { compareHMACPaymentRedirect, compareHMACWebhook } from "../../src/utils/compare-hmac.js";
import { test_data } from "./hmac_test_data.js";



describe("compare correct hmac", () => {

    it("should compare HMAC webhook case type TRANSACTION and return true", () => {
        const {webhookResponseTransaction} = test_data;
        const result = compareHMACWebhook(webhookResponseTransaction,webhookResponseTransaction.calculatedHMAC,webhookResponseTransaction.hmacSecret);
        expect(result).toBe(true);
    })

    it("should compare HMAC payment redirect and return true", () => {
        const {paymentRedirectResponse} = test_data;
        const result = compareHMACPaymentRedirect(paymentRedirectResponse,paymentRedirectResponse.hmac,paymentRedirectResponse.hmacSecret);
        expect(result).toBe(true);
    })

    it("should compare HMAC webhook case type TOKEN and return true", () => {
        const {webhookResponseToken} = test_data;
        const result = compareHMACWebhook(webhookResponseToken,webhookResponseToken.hmac,webhookResponseToken.hmacSecret);
        expect(result).toBe(true);
    })

})