import { shopifyFetch, ShopifyError } from ".";
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_HANDLE_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
} from "./queries";
import type {
  Cart,
  CartLine,
  Collection,
  Connection,
  Image,
  MediaNode,
  Product,
  ProductVariant,
} from "./types";

const TAGS = {
  products: "products",
  collections: "collections",
  cart: "cart",
} as const;

interface UserError {
  field: string[] | null;
  message: string;
}

// --- Raw GraphQL shapes (connections) before flattening ---
type RawProduct = Omit<Product, "images" | "media" | "variants"> & {
  images: Connection<Image>;
  media: Connection<MediaNode>;
  variants: Connection<ProductVariant>;
};

type RawCart = Omit<Cart, "lines"> & {
  lines: Connection<CartLine>;
};

function flatten<T>(connection: Connection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}

function reshapeProduct(product: RawProduct): Product {
  return {
    ...product,
    images: flatten(product.images),
    media: flatten(product.media),
    variants: flatten(product.variants),
  };
}

function reshapeCart(cart: RawCart): Cart {
  return {
    ...cart,
    lines: flatten(cart.lines),
  };
}

function throwOnUserErrors(errors: UserError[] | undefined, context: string) {
  if (errors && errors.length > 0) {
    throw new ShopifyError(
      `${context}: ${errors.map((e) => e.message).join("; ")}`,
    );
  }
}

// --- Products ---

export async function getProducts(options: {
  first?: number;
  query?: string;
  sortKey?: string;
  reverse?: boolean;
} = {}): Promise<Product[]> {
  const data = await shopifyFetch<{ products: Connection<RawProduct> }>({
    query: GET_PRODUCTS_QUERY,
    variables: options,
    tags: [TAGS.products],
  });
  return flatten(data.products).map(reshapeProduct);
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [TAGS.products],
  });
  return data.product ? reshapeProduct(data.product) : null;
}

// --- Collections ---

export async function getCollections(
  first = 20,
): Promise<Collection[]> {
  const data = await shopifyFetch<{ collections: Connection<Collection> }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first },
    tags: [TAGS.collections],
  });
  return flatten(data.collections);
}

export async function getCollectionProducts(
  handle: string,
  first = 20,
): Promise<Product[]> {
  const data = await shopifyFetch<{
    collection: { products: Connection<RawProduct> } | null;
  }>({
    query: GET_COLLECTION_PRODUCTS_QUERY,
    variables: { handle, first },
    tags: [TAGS.collections, TAGS.products],
  });
  if (!data.collection) return [];
  return flatten(data.collection.products).map(reshapeProduct);
}

// --- Cart (mutations: never cached) ---

interface CartLineInput {
  merchandiseId: string;
  quantity: number;
  /** Custom line-item properties (e.g. chosen colour) — surfaced on the order. */
  attributes?: { key: string; value: string }[];
}

export async function createCart(
  lines: CartLineInput[] = [],
  discountCodes: string[] = [],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart; userErrors: UserError[] };
  }>({
    query: CREATE_CART_MUTATION,
    variables: { lines, discountCodes },
    cache: "no-store",
  });
  throwOnUserErrors(data.cartCreate.userErrors, "Failed to create cart");
  return reshapeCart(data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: CartLineInput[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart; userErrors: UserError[] };
  }>({
    query: ADD_TO_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  throwOnUserErrors(data.cartLinesAdd.userErrors, "Failed to add to cart");
  return reshapeCart(data.cartLinesAdd.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart; userErrors: UserError[] };
  }>({
    query: UPDATE_CART_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  throwOnUserErrors(data.cartLinesUpdate.userErrors, "Failed to update cart");
  return reshapeCart(data.cartLinesUpdate.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart; userErrors: UserError[] };
  }>({
    query: REMOVE_FROM_CART_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  throwOnUserErrors(data.cartLinesRemove.userErrors, "Failed to remove from cart");
  return reshapeCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? reshapeCart(data.cart) : null;
}
