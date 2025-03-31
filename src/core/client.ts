import { PaymobAPIError } from "../errors";
import type { PaymobConfigOutput } from "../types";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class HttpClient {
	private readonly _config: Required<PaymobConfigOutput>;

	constructor(config: PaymobConfigOutput) {
		this._config = config;
	}

	/**
	 * Get a copy of the current configuration
	 */
	public get config(): Required<PaymobConfigOutput> {
		return { ...this._config };
	}

	/**
	 * Creates request options for fetch API
	 */
	private createRequestOptions(
		method: HttpMethod,
		data?: unknown,
		headers: Record<string, string> = {},
		signal?: AbortSignal,
	): RequestInit {
		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Token ${this._config.secretKey}`,
				...headers,
			},
			signal,
		};

		// Add body for non-GET requests
		if (method !== "GET" && data) {
			options.body = JSON.stringify(data);
		}

		return options;
	}

	/**
	 * Processes API response and handles errors
	 */
	private async processResponse<TResponse>(response: Response): Promise<TResponse> {
		// Handle non-2xx responses
		if (!response.ok) {
			let errorData: unknown;
			try {
				errorData = await response.json();
			} catch {
				errorData = await response.text();
			}

			throw new PaymobAPIError(
				`API Error: ${response.status} ${response.statusText}`,
				response.status,
				errorData,
			);
		}

		// Parse and return successful response
		return (await response.json()) as TResponse;
	}

	/**
	 * Determines if an error should trigger a retry
	 */
	private shouldRetryError(error: Error): boolean {
		return (
			(error instanceof TypeError && error.message.includes("network")) ||
			(error instanceof PaymobAPIError && error.statusCode >= 500)
		);
	}

	/**
	 * Implements exponential backoff delay
	 */
	private async backoffDelay(attempt: number): Promise<void> {
		const delayMs = 2 ** attempt * 100;
		await new Promise((resolve) => setTimeout(resolve, delayMs));
	}

	/**
	 * Makes HTTP request to Paymob API with retry logic for 5xx errors
	 *
	 * @param method - HTTP method to use
	 * @param path - API endpoint path (without base URL)
	 * @param data - Optional request body data
	 * @param headers - Optional additional request headers
	 * @returns Promise resolving to the API response
	 * @throws {PaymobAPIError} When API returns an error response
	 */
	public async request<TResponse>(
		method: HttpMethod,
		path: string,
		data?: unknown,
		headers: Record<string, string> = {},
	): Promise<TResponse> {
		const url = `${this._config.apiBaseUrl}${path}`;
		const controller = new AbortController();

		// Set request timeout
		const timeoutId = setTimeout(() => {
			controller.abort();
		}, this._config.timeout);

		// Create request options
		const options = this.createRequestOptions(method, data, headers, controller.signal);

		let lastError: Error | null = null;
		let attempts = 0;

		// Implement retry logic with exponential backoff
		while (attempts < this._config.retryAttempts) {
			try {
				const response = await fetch(url, options);
				clearTimeout(timeoutId);

				return await this.processResponse<TResponse>(response);
			} catch (error) {
				lastError = error as Error;

				// Only retry on network errors or 5xx server errors
				if (!this.shouldRetryError(lastError)) {
					break;
				}

				attempts++;

				// Add exponential backoff delay if not the last attempt
				if (attempts < this._config.retryAttempts) {
					await this.backoffDelay(attempts);
				}
			}
		}

		// Throw the last error encountered
		throw lastError || new PaymobAPIError("Unknown API error", 500);
	}

	/**
	 * Performs a GET request to the API
	 *
	 * @param path - API endpoint path
	 * @param headers - Optional additional headers
	 */
	public async get<TResponse>(
		path: string,
		headers?: Record<string, string>,
	): Promise<TResponse> {
		return this.request<TResponse>("GET", path, undefined, headers);
	}

	/**
	 * Performs a POST request to the API
	 *
	 * @param path - API endpoint path
	 * @param data - Request body data
	 * @param headers - Optional additional headers
	 */
	public async post<TResponse>(
		path: string,
		data?: unknown,
		headers?: Record<string, string>,
	): Promise<TResponse> {
		return this.request<TResponse>("POST", path, data, headers);
	}

	/**
	 * Performs a PUT request to the API
	 *
	 * @param path - API endpoint path
	 * @param data - Request body data
	 * @param headers - Optional additional headers
	 */
	public async put<TResponse>(
		path: string,
		data?: unknown,
		headers?: Record<string, string>,
	): Promise<TResponse> {
		return this.request<TResponse>("PUT", path, data, headers);
	}

	/**
	 * Performs a DELETE request to the API
	 *
	 * @param path - API endpoint path
	 * @param headers - Optional additional headers
	 */
	public async delete<TResponse>(
		path: string,
		headers?: Record<string, string>,
	): Promise<TResponse> {
		return this.request<TResponse>("DELETE", path, undefined, headers);
	}
}
