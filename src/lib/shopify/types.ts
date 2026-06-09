export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface VideoSource {
  url: string;
  mimeType: string;
}

export interface MediaNode {
  mediaContentType: "IMAGE" | "VIDEO" | "EXTERNAL_VIDEO" | "MODEL_3D";
  /** Present on MediaImage. */
  image?: { url: string } | null;
  /** Present on Video media. */
  sources?: VideoSource[];
  /** Present on Video media. */
  previewImage?: { url: string } | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: { name: string; value: string }[];
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string[];
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  featuredImage: Image | null;
  images: Image[];
  media: MediaNode[];
  variants: ProductVariant[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: Image | null;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: {
    id: string;
    title: string;
    product: { handle: string; title: string; featuredImage: Image | null };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
  };
  lines: CartLine[];
}

// Raw GraphQL connection shape, flattened by the helpers.
export interface Connection<T> {
  edges: { node: T }[];
}
