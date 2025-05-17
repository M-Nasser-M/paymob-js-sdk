import { parse } from "valibot";
import  { type PaymentRedirectResponseInput, type WebhookResponse ,WebhookResponseSchema,paymentRedirectResponseSchema} from "../types/webhook-response.js";
import { CryptoHasher } from "bun";

const concatenatedStringKeys = [
    "obj.amount_cents",
    "obj.created_at",
    "obj.currency",
    "obj.error_occured",
    "obj.has_parent_transaction",
    "obj.id",
    "obj.integration_id",
    "obj.is_3d_secure",
    "obj.is_auth",
    "obj.is_capture",
    "obj.is_refunded",
    "obj.is_standalone_payment",
    "obj.is_voided",
    "obj.order.id",
    "obj.owner",
    "obj.pending",
    "obj.source_data.pan",
    "obj.source_data.sub_type",
    "obj.source_data.type",
    "obj.success"
]

export const compareHMACWebhook = (data:WebhookResponse,hmac: string,hmacSecret: string):boolean => {
    const parsedData = parse(WebhookResponseSchema,data);
    
    const hasher = new CryptoHasher("sha512", hmacSecret);

    const concatenatedString = 
  `${parsedData.obj.amount_cents}` +
  `${parsedData.obj.created_at}` +
  `${parsedData.obj.currency}` +
  `${parsedData.obj.error_occured}` +
  `${parsedData.obj.has_parent_transaction}` +
  `${parsedData.obj.id}` +
  `${parsedData.obj.integration_id}` +
  `${parsedData.obj.is_3d_secure}` +
  `${parsedData.obj.is_auth}` +
  `${parsedData.obj.is_capture}` +
  `${parsedData.obj.is_refunded}` +
  `${parsedData.obj.is_standalone_payment}` +
  `${parsedData.obj.is_voided}` +
  `${parsedData.obj.order.id}` +
  `${parsedData.obj.owner}` +
  `${parsedData.obj.pending}` +
  `${parsedData.obj.source_data.pan}` +
  `${parsedData.obj.source_data.sub_type}` +
  `${parsedData.obj.source_data.type}` +
  `${parsedData.obj.success}`;

    const hash = hasher.update(concatenatedString).digest("hex");

    return hash === hmac;
}
    
export const compareHMACPaymentRedirect = (data:PaymentRedirectResponseInput,hmac: string,hmacSecret: string):boolean => {
    const parsedData = parse(paymentRedirectResponseSchema,data);
    
    const hasher = new CryptoHasher("sha512", hmacSecret);

    const concatenatedString = 
    `${parsedData.amount_cents}` +
    `${parsedData.created_at}` +
    `${parsedData.currency}` +
    `${parsedData.error_occured}` +
    `${parsedData.has_parent_transaction}` +
    `${parsedData.id}` +
    `${parsedData.integration_id}` +
    `${parsedData.is_3d_secure}` +
    `${parsedData.is_auth}` +
    `${parsedData.is_capture}` +
    `${parsedData.is_refunded}` +
    `${parsedData.is_standalone_payment}` +
    `${parsedData.is_voided}` +
    `${parsedData.order}` +
    `${parsedData.owner}` +
    `${parsedData.pending}` +
    `${parsedData["source_data.pan"]}` +
    `${parsedData["source_data.sub_type"]}` +
    `${parsedData["source_data.type"]}` +
    `${parsedData.success}`;

    const hash = hasher.update(concatenatedString).digest("hex");

    return hash === hmac;
}