import { describe, expect, it } from "bun:test";
import { paymentRedirectResponseSchema } from "../../src/types/webhook-response.js";
import { compareHMACPaymentRedirect, compareHMACWebhook } from "../../src/utils/compare-hmac.js";

const test_data = {
    webhookResponse:{
        "type": "TRANSACTION" as const,
        "obj": {
          "id": 192036465,
          "pending": false,
          "amount_cents": 100000,
          "success": true,
          "is_auth": false,
          "is_capture": false,
          "is_standalone_payment": true,
          "is_voided": false,
          "is_refunded": false,
          "is_3d_secure": true,
          "integration_id": 4097558,
          "profile_id": 164295,
          "has_parent_transaction": false,
          "order": {
            "id": 217503754,
            "created_at": "2024-06-13T11:32:09.628623",
            "delivery_needed": false,
            "merchant": {
              "id": 164295,
              "created_at": "2022-03-24T21:13:47.852384",
              "phones": [
                "+201024710769"
              ],
              "company_emails": [
                "mohamedabdelsttar97@gmail.com"
              ],
              "company_name": "Parmagly",
              "state": "",
              "country": "EGY",
              "city": "Cairo",
              "postal_code": "",
              "street": ""
          },
            "collector": null,
            "amount_cents": 100000,
            "shipping_data": {
              "id": 108010028,
              "first_name": "dumy",
              "last_name": "dumy",
              "street": "dumy",
              "building": "dumy",
              "floor": "dumy",
              "apartment": "sympl",
              "city": "dumy",
              "state": "dumy",
              "country": "EG",
              "email": "dumy@dumy.com",
              "phone_number": "+201125773493",
              "postal_code": "NA",
              "extra_description": "",
              "shipping_method": "UNK",
              "order_id": 217503754,
              "order": 217503754
            },
            "currency": "EGP",
            "is_payment_locked": false,
            "is_return": false,
            "is_cancel": false,
            "is_returned": false,
            "is_canceled": false,
            "merchant_order_id": null,
            "wallet_notification": null,
            "paid_amount_cents": 100000,
            "notify_user_with_email": false,
            "items": [],
            "order_url": "NA",
            "commission_fees": null,
            "delivery_fees_cents": null,
            "delivery_vat_cents": null,
            "payment_method": "tbc",
            "merchant_staff_tag": null,
            "api_source": "OTHER",
            "data": {}
          },
          "created_at": "2024-06-13T11:33:44.592345",
          "transaction_processed_callback_responses": [],
          "currency": "EGP",
          "source_data": {
            "pan": "2346",
            "type": "card",
            "tenure": null,
            "sub_type": "MasterCard"
          },
          "api_source": "IFRAME",
          "terminal_id": null,
          "merchant_commission": null,
          "installment": null,
          "discount_details": [],
          "is_void": false,
          "is_refund": false,
          "data": {
            "gateway_integration_pk": 4097558,
            "klass": "MigsPayment",
            "created_at": "2024-06-13T08:34:07.076347",
            "amount": 100000,
            "currency": "EGP",
            "migs_order": {
              "acceptPartialAmount": false,
              "amount": 1000,
              "authenticationStatus": "AUTHENTICATION_SUCCESSFUL",
              "chargeback": {
                "amount": null,
                "currency": "EGP"
              },
              "creationTime": "2024-06-13T08:34:00.850Z",
              "currency": "EGP",
              "description": "PAYMOB Parmagly",
              "id": "217503754",
              "lastUpdatedTime": "2024-06-13T08:34:06.883Z",
              "merchantAmount": 1000,
              "merchantCategoryCode": "7299",
              "merchantCurrency": "EGP",
              "status": "CAPTURED",
              "totalAuthorizedAmount": 1000,
              "totalCapturedAmount": 1000,
              "totalRefundedAmount": null
            },
            "merchant": "TESTMERCH_C_25P",
            "migs_result": "SUCCESS",
            "migs_transaction": {
              "acquirer": {
                "batch": 20240613,
                "date": "0613",
                "id": "BMNF_S2I",
                "merchantId": "MERCH_C_25P",
                "settlementDate": "2024-06-13",
                "timeZone": "+0200",
                "transactionId": "123456789"
              },
              "amount": 1000,
              "authenticationStatus": "AUTHENTICATION_SUCCESSFUL",
              "authorizationCode": "326441",
              "currency": "EGP",
              "id": "192036465",
              "receipt": "416508326441",
              "source": "INTERNET",
              "stan": "326441",
              "terminal": "BMNF0506",
              "type": "PAYMENT"
            },
            "txn_response_code": "APPROVED",
            "acq_response_code": "00",
            "message": "Approved",
            "merchant_txn_ref": "192036465",
            "order_info": "217503754",
            "receipt_no": "416508326441",
            "transaction_no": "123456789",
            "batch_no": 20240613,
            "authorize_id": "326441",
            "card_type": "MASTERCARD",
            "card_num": "512345xxxxxx2346",
            "secure_hash": "",
            "avs_result_code": "",
            "avs_acq_response_code": "00",
            "captured_amount": 1000,
            "authorised_amount": 1000,
            "refunded_amount": null,
            "acs_eci": "02"
          },
          "is_hidden": false,
          "payment_key_claims": {
            "extra": {},
            "user_id": 302852,
            "currency": "EGP",
            "order_id": 217503754,
            "amount_cents": 100000,
            "billing_data": {
              "city": "dumy",
              "email": "dumy@dumy.com",
              "floor": "dumy",
              "state": "dumy",
              "street": "dumy",
              "country": "EG",
              "building": "dumy",
              "apartment": "sympl",
              "last_name": "dumy",
              "first_name": "dumy",
              "postal_code": "NA",
              "phone_number": "+201125773493",
              "extra_description": "NA"
            },
            "redirect_url": "https://accept.paymob.com/unifiedcheckout/payment-status?payment_token=ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3pNREk0TlRJc0ltRnRiM1Z1ZEY5alpXNTBjeUk2TVRBd01EQXdMQ0pqZFhKeVpXNWplU0k2SWtWSFVDSXNJbWx1ZEdWbmNtRjBhVzl1WDJsa0lqbzBNRGszTlRVNExDSnZjbVJsY2w5cFpDSTZNakUzTlRBek56VTBMQ0ppYVd4c2FXNW5YMlJoZEdFaU9uc2labWx5YzNSZmJtRnRaU0k2SW1SMWJYa2lMQ0pzWVhOMFgyNWhiV1VpT2lKa2RXMTVJaXdpYzNSeVpXVjBJam9pWkhWdGVTSXNJbUoxYVd4a2FXNW5Jam9pWkhWdGVTSXNJbVpzYjI5eUlqb2laSFZ0ZVNJc0ltRndZWEowYldWdWRDSTZJbk41YlhCc0lpd2lZMmwwZVNJNkltUjFiWGtpTENKemRHRjBaU0k2SW1SMWJYa2lMQ0pqYjNWdWRISjVJam9pUlVjaUxDSmxiV0ZwYkNJNkltUjFiWGxBWkhWdGVTNWpiMjBpTENKd2FHOXVaVjl1ZFcxaVpYSWlPaUlyTWpBeE1USTFOemN6TkRreklpd2ljRzl6ZEdGc1gyTnZaR1VpT2lKT1FTSXNJbVY0ZEhKaFgyUmxjMk55YVhCMGFXOXVJam9pVGtFaWZTd2liRzlqYTE5dmNtUmxjbDkzYUdWdVgzQmhhV1FpT21aaGJITmxMQ0psZUhSeVlTSTZlMzBzSW5OcGJtZHNaVjl3WVhsdFpXNTBYMkYwZEdWdGNIUWlPbVpoYkhObExDSnVaWGgwWDNCaGVXMWxiblJmYVc1MFpXNTBhVzl1SWpvaWNHbGZkR1Z6ZEY5a01EUmtNV0U0TkRrMk1tSTBOemt5T1dJeVpHTXhOalJoTURReU5qaGlZeUo5LkFPc3l2S1A4a3Fob0E5aVFOSEZfQWFaZl9HQi1NcU5kcXhrQmhlZm1feVpIZHJ3ci1xbkUxWklKT2FxekRFMkp5cXhCWXVEdnZ1VVZweGV3bFVGTTlB&trx_id=192036465",
            "integration_id": 4097558,
            "lock_order_when_paid": false,
            "next_payment_intention": "pi_test_d04d1a84962b47929b2dc164a04268bc",
            "single_payment_attempt": false
          },
          "error_occured": false,
          "is_live": false,
          "other_endpoint_reference": null,
          "refunded_amount_cents": null,
          "source_id": -1,
          "is_captured": false,
          "captured_amount": null,
          "merchant_staff_tag": null,
          "updated_at": "2024-06-13T11:34:07.272638",
          "is_settled": false,
          "bill_balanced": false,
          "is_bill": false,
          "owner": 302852,
          "parent_transaction": null
        },
        "issuer_bank": null,
        "transaction_processed_callback_responses": ""
      },
    calculatedHMAC:"fa8ac0b7f3852e60c50e7fdd4ea5ef0bda96030c19dea1d55df8c76d6c08ab1877774662cbb04981dc84839ad4da560bcc8cb53b8973548657f7e8f8d2e79930",
    hmacSecret:"04DC1A9490B8CC2094C011FC055ADCDB",
    paymentRedirectHmacSecret:"C36094BC5DCxxxxxxxxC8FDB9F83E49",
    paymentRedirectResponse:{
        "https://accept.paymobsolutions.com/api/acceptance/post_pay?id": 201972898,
        "pending": false,
        "amount_cents": 200000,
        "success": true,
        "is_auth": false,
        "is_capture": false,
        "is_standalone_payment": true,
        "is_voided": false,
        "is_refunded": false,
        "is_3d_secure": false,
        "integration_id": 1996388,
        "profile_id": 168651,
        "has_parent_transaction": false,
        "order": 228276342,
        "created_at": "2024-07-21T11:25:08.633747",
        "currency": "EGP",
        "merchant_commission": null,
        "discount_details": [],
        "is_void": false,
        "is_refund": false,
        "error_occured": false,
        "refunded_amount_cents": null,
        "captured_amount": null,
        "updated_at": "2024-07-21T11:25:24.188998",
        "is_settled": false,
        "bill_balanced": false,
        "is_bill": false,
        "owner": 310964,
        "data.message": "Transaction has been completed successfully.",
        "source_data.type": "wallet",
        "source_data.pan": "01010101010",
        "source_data.sub_type": "wallet",
        "txn_response_code": 200,
        "hmac": "a5a49f5009d3997bcd4b9ab60451b714c08cc4f197e0dffbaa885dd09bc77f10a36669cf8e324c8a0919f1cace1d348225ea7cdf11263a65b2951553668fa337"
      }
   }


describe("compare correct hmac", () => {

    it("should compare HMAC webhook and return true", () => {
        const {webhookResponse,calculatedHMAC,hmacSecret} = test_data;
        const result = compareHMACWebhook(webhookResponse,calculatedHMAC,hmacSecret);
        expect(result).toBe(true);
    })

    it("should compare HMAC payment redirect and return true", () => {
        const {paymentRedirectResponse,paymentRedirectHmacSecret} = test_data;
        const result = compareHMACPaymentRedirect(paymentRedirectResponse,paymentRedirectResponse.hmac,paymentRedirectHmacSecret);
        expect(result).toBe(true);
    })

})