import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import type {
  CreateIntentionRequest,
  CreateIntentionResponse,
} from "../../types/intention.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import * as v from "valibot";
import { CreateIntentionResponseSchema } from "../../types/intention.js";
import { getFormattedUnifiedCheckoutUrl } from "../../utils/format-checkout-url.js";

export class Payment {
  private client: PaymobHTTPClient;
  private paymobConfig: PaymobConfig;

  constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
    this.client = client;
    this.paymobConfig = paymobConfig;
  }

  public async createIntention(
    createIntentionRequest: CreateIntentionRequest
  ): Promise<CreateIntentionResponse> {
    return this.client
      .post<CreateIntentionResponse>(DEFAULT_PAYMOB_ENDPOINTS.INTENTION, {
        body: JSON.stringify(createIntentionRequest),
      })
      .json();
  }

  public async getPaymentUrl(
    createIntentionRequest: CreateIntentionRequest
  ): Promise<string> {
    const createIntentionResponse = await this.createIntention(
      createIntentionRequest
    );

    const validatedCreateIntentionResponse = v.parse(
      CreateIntentionResponseSchema,
      createIntentionResponse
    );

    return getFormattedUnifiedCheckoutUrl(
      validatedCreateIntentionResponse.client_secret
    );
  }
}
