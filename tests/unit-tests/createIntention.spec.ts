import { describe, expect, it } from "bun:test";
import { PaymobSDK } from "../../src/index.js";



describe("should create intention", () => {

    it("should create a paymob instance and create intention", async () => {
        const paymob = new PaymobSDK({
            PAYMOB_API_KEY: process.env.PAYMOB_API_KEY as string,
            PAYMOB_PUBLIC_KEY: process.env.PAYMOB_PUBLIC_KEY as string,
            PAYMOB_SECRET_KEY: process.env.PAYMOB_SECRET_KEY as string,
            PAYMOB_NOTIFICATION_URL: process.env.PAYMOB_NOTIFICATION_URL as string,
            PAYMOB_REDIRECTION_URL: process.env.PAYMOB_REDIRECTION_URL as string,
            PAYMOB_PAYMENT_INTEGRATION_IDS: process.env.PAYMOB_INTEGERATIONS_ID?.split(",").map((id) => Number(id)) as number[],
            PAYMOB_HMAC_SECRET: process.env.PAYMOB_HMAC_SECRET as string,
        });
        const intention = await paymob.payment.createIntention({
            amount: 10000,
            currency: "EGP",
            payment_methods: process.env.PAYMOB_INTEGERATIONS_ID?.split(",").map((id) => Number(id)) as number[],
            billing_data: {
                first_name: "test",
                last_name: "test",
                phone_number: "test",
                apartment: "test",
                street: "test",
                city: "test",
                state: "test",
                country: "test",
            },
        });
        expect(intention).toBeDefined();
    })


})