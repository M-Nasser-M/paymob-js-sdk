import type { PaymobHTTPClient } from "../../core/client.js";
import { DEFAULT_PAYMOB_ENDPOINTS } from "../../defaults/index.js";
import type { PaymobConfig } from "../../types/paymob-config.js";
import type { TransactionResponse } from "../../types/transaction.js";
import Auth from "../auth/index.js";

export class TransactionInquiry {
  private client: PaymobHTTPClient;
  private paymobConfig: PaymobConfig;
  private auth: Auth;

  constructor(client: PaymobHTTPClient, paymobConfig: PaymobConfig) {
    this.client = client;
    this.paymobConfig = paymobConfig;
    this.auth = new Auth(client, paymobConfig);
  }

  public async getTransactionUsingOrderID(
    orderID: string
  ): Promise<TransactionResponse> {
    const accessToken = await this.auth.getAccessToken();
    return this.client
      .post<TransactionResponse>(
        DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.ORDER_ID,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            order_id: orderID,
          }),
        }
      )
      .json();
  }

  public async getTransactionUsingTransactionID(
    transactionID: string
  ): Promise<TransactionResponse> {
    const accessToken = await this.auth.getAccessToken();
    return this.client
      .post<TransactionResponse>(
        DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.TRANSACTION_ID.replace(
          "TRANSACTION_ID_PLACEHOLDER",
          transactionID
        ),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .json();
  }

  public async getTransactionUsingMerchantOrderID(
    merchantOrderID: string
  ): Promise<TransactionResponse> {
    const accessToken = await this.auth.getAccessToken();
    return this.client
      .post<TransactionResponse>(
        DEFAULT_PAYMOB_ENDPOINTS.TRANSACTION_INQUIRY.MERCHANT_ORDER_ID,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            merchant_order_id: merchantOrderID,
          }),
        }
      )
      .json();
  }
}
