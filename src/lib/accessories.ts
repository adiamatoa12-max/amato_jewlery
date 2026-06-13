import type { AddToCartInput } from "@/lib/cart/CartContext";

/**
 * Complementary accessories surfaced as upsells (in the product buy-box and the
 * cart drawer). These are display/cart items; give each a Shopify `variantId`
 * once the product exists in the store so it's included at checkout.
 */
export const ACCESSORIES: AddToCartInput[] = [
  {
    handle: "magnetic-rings",
    title: "טבעות מגנטיות (זוג נוסף)",
    price: 39,
    currency: "ILS",
    image: "/images/accessory-magnetic-ring.png",
    material: "מתכת מגנטית · דבק דו-צדדי חזק",
  },
  {
    handle: "gym-towel",
    title: "מגבת אימון פרימיום",
    price: 45,
    currency: "ILS",
    image: "/images/accessory-gym-towel.png",
    material: "כותנה סופגת בדרגת פרימיום",
  },
  {
    handle: "cleaning-brush",
    title: "מברשת ניקוי לשייקר",
    price: 19,
    currency: "ILS",
    image: "/images/accessory-cleaning-brush.png",
    material: "ניילון עמיד · ידית ארגונומית",
  },
  {
    handle: "earphone-case",
    title: "נרתיק מגנטי לאוזניות",
    price: 35,
    currency: "ILS",
    image: "/images/accessory-earphone-case.png",
    material: "סיליקון עמיד · חיבור מגנטי",
  },
];
