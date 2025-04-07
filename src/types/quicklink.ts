import * as v from "valibot";
import { 
  PaymentMethodsSchema, 
  amountCents, 
  emailValidation, 
  timestampValidation, 
  urlValidation 
} from "./common.js";

export const CreateQuickLinkRequestSchema = v.object({
  amount_cents: amountCents(),
  payment_methods: PaymentMethodsSchema,
  email: emailValidation(),
  full_name: v.string(),
  phone_number: v.string(),
  description: v.string(),
  is_live: v.optional(v.boolean()),
  expires_at: v.optional(timestampValidation()),
  reference_id: v.optional(v.string()),
  notification_url: v.optional(urlValidation()),
  redirection_url: v.optional(urlValidation()),
});
export type CreateQuickLinkRequest = v.InferInput<
  typeof CreateQuickLinkRequestSchema
>;

export const CreateQuickLinkResponseSchema = v.object({
  client_url: urlValidation(),
});
export type CreateQuickLinkResponse = v.InferInput<
  typeof CreateQuickLinkResponseSchema
>;
