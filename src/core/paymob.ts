import type { Options } from "ky";
import { Payment } from "../resources/payment/index.js";
import { Subscriptions } from "../resources/subscriptions/index.js";
import { TransactionInquiry } from "../resources/transaction/index.js";
import type { PaymobConfig } from "../types/paymob-config.js";
import { PaymobHTTPClient } from "./client.js";

export class PaymobSDK {
	private readonly client: PaymobHTTPClient;
	public readonly payment: Payment;
	public readonly transaction: TransactionInquiry;
	public readonly subscriptions: Subscriptions;

	constructor(paymobConfig: PaymobConfig, options: Options = {}) {
		this.client = PaymobHTTPClient(paymobConfig.PAYMOB_SECRET_KEY, options);
		this.payment = new Payment(this.client, paymobConfig);
		this.transaction = new TransactionInquiry(this.client, paymobConfig);
		this.subscriptions = new Subscriptions(this.client, paymobConfig);
	}
}
