"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  handle: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  material: string;
  quantity: number;
  /** Shopify variant id (merchandiseId), required for live checkout. */
  variantId?: string;
}

export type AddToCartInput = Omit<CartItem, "quantity">;

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalQuantity: number;
  totalPrice: number;
  currency: string;
  addItem: (product: AddToCartInput) => void;
  removeItem: (handle: string) => void;
  updateQuantity: (handle: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
}

const STORAGE_KEY = "vault-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / private-mode errors
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: AddToCartInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.handle === product.handle);
      if (existing) {
        return prev.map((i) =>
          i.handle === product.handle
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((handle: string) => {
    setItems((prev) => prev.filter((i) => i.handle !== handle));
  }, []);

  const updateQuantity = useCallback((handle: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.handle !== handle)
        : prev.map((i) => (i.handle === handle ? { ...i, quantity } : i)),
    );
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalQuantity = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items],
  );
  const currency = items[0]?.currency ?? "ILS";

  const value: CartContextValue = {
    items,
    isOpen,
    totalQuantity,
    totalPrice,
    currency,
    addItem,
    removeItem,
    updateQuantity,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}
