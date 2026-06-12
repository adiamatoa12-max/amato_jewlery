const SHOPIFY_API_VERSION = "2025-01";

/**
 * Raised when required Shopify environment variables are missing.
 */
export class ShopifyConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ShopifyConfigError";
  }
}

/**
 * Raised for any failure while talking to the Storefront API: transport
 * errors, non-2xx responses, or GraphQL-level errors in the response body.
 */
export class ShopifyError extends Error {
  readonly status?: number;
  readonly query?: string;
  readonly graphqlErrors?: GraphQLError[];
  readonly cause?: unknown;

  constructor(
    message: string,
    options: {
      status?: number;
      query?: string;
      graphqlErrors?: GraphQLError[];
      cause?: unknown;
    } = {},
  ) {
    super(message);
    this.name = "ShopifyError";
    this.status = options.status;
    this.query = options.query;
    this.graphqlErrors = options.graphqlErrors;
    this.cause = options.cause;
  }
}

interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface ShopifyFetchOptions<TVariables> {
  query: string;
  variables?: TVariables;
  /** Next.js cache tags for on-demand revalidation via revalidateTag(). */
  tags?: string[];
  /** Next.js fetch cache mode. Defaults to "force-cache". */
  cache?: RequestCache;
  /** Seconds before the cached response is considered stale. */
  revalidate?: number;
  /** Additional request headers. */
  headers?: HeadersInit;
}

function getConfig(): { endpoint: string; token: string } {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain) {
    throw new ShopifyConfigError(
      "Missing SHOPIFY_STORE_DOMAIN environment variable.",
    );
  }
  if (!token) {
    throw new ShopifyConfigError(
      "Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable.",
    );
  }

  return {
    endpoint: `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`,
    token,
  };
}

/**
 * Execute a GraphQL operation against the Shopify Storefront API.
 *
 * Caching: defaults to Next.js full-route cache ("force-cache"). Pass `tags`
 * to enable on-demand invalidation with `revalidateTag()`, and/or `revalidate`
 * for time-based revalidation.
 *
 * @throws {ShopifyConfigError} when env vars are missing
 * @throws {ShopifyError} on transport, HTTP, or GraphQL errors
 */
export async function shopifyFetch<TData, TVariables = Record<string, unknown>>(
  options: ShopifyFetchOptions<TVariables>,
): Promise<TData> {
  // Default to time-based ISR (60s) with a shared cache tag so new Shopify
  // products/collections sync automatically — without requiring a redeploy —
  // and can also be purged on demand via revalidateTag("shopify").
  const {
    query,
    variables,
    tags = ["shopify"],
    cache,
    revalidate = 60,
    headers,
  } = options;
  const { endpoint, token } = getConfig();

  // `cache` and `next.revalidate` are mutually exclusive — only send `cache`
  // when the caller explicitly opts out of revalidation.
  const cacheInit: RequestInit =
    cache !== undefined ? { cache } : { next: { revalidate, tags } };

  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": token,
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
      ...cacheInit,
    });
  } catch (error) {
    throw new ShopifyError("Network error while contacting Shopify.", {
      query,
      cause: error,
    });
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new ShopifyError(
      `Shopify request failed with HTTP ${response.status}.${text ? ` ${text}` : ""}`,
      { status: response.status, query },
    );
  }

  let body: GraphQLResponse<TData>;
  try {
    body = (await response.json()) as GraphQLResponse<TData>;
  } catch (error) {
    throw new ShopifyError("Failed to parse Shopify JSON response.", {
      status: response.status,
      query,
      cause: error,
    });
  }

  if (body.errors && body.errors.length > 0) {
    throw new ShopifyError(
      `Shopify GraphQL error: ${body.errors.map((e) => e.message).join("; ")}`,
      { status: response.status, query, graphqlErrors: body.errors },
    );
  }

  if (body.data === undefined) {
    throw new ShopifyError("Shopify response contained no data.", {
      status: response.status,
      query,
    });
  }

  return body.data;
}
