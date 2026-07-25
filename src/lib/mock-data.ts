export interface MockProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  material: string;
  availableForSale: boolean;
  /** Path under /public to the base product image. */
  image: string;
  /** Path under /public to the image shown on hover. */
  hoverImage: string;
  /** Optional merchandising tag shown on the card, e.g. "חדש" / "רב מכר". */
  badge?: "new" | "bestseller";
  /** Optional extra gallery images for the PDP slider (overrides image+hoverImage). */
  gallery?: string[];
  /** Optional lifestyle photo shown in the PDP "Styled for You" section. */
  styledImage?: string;
  /** Shopify variant id (merchandiseId) used for cart/checkout when live. */
  variantId?: string;
  /** First Shopify video media source, if the product has one. */
  videoUrl?: string;
  /** Typed media list from Shopify (media_type + url) for the PDP gallery. */
  galleryMedia?: { media_type: "IMAGE" | "VIDEO"; url: string }[];
}

export interface MockCollection {
  handle: string;
  title: string;
  /** Bold uppercase English display header shown above the product grid. */
  enTitle: string;
  tagline: string;
  products: MockProduct[];
}

const MATERIAL =
  "גוף טריטן (Tritan) שקוף בדרגת פרימיום נטול BPA · בסיס מנוע חשמלי · אטימה מלאה נגד נזילות · מגנט N52 ומעמד טלפון מובנה";

export interface MockProductWithCollection extends MockProduct {
  collectionTitle: string;
  collectionHandle: string;
}

export function getMockProductByHandle(
  handle: string,
): MockProductWithCollection | null {
  for (const collection of COLLECTIONS) {
    const product = collection.products.find((p) => p.handle === handle);
    if (product) {
      return {
        ...product,
        collectionTitle: collection.title,
        collectionHandle: collection.handle,
      };
    }
  }
  return null;
}

export function getAllMockHandles(): string[] {
  return COLLECTIONS.flatMap((c) => c.products.map((p) => p.handle));
}

export const COLLECTIONS: MockCollection[] = [
  {
    handle: "shakers",
    title: "השייקרים",
    enTitle: "MAGNETIC SHAKERS",
    tagline: "השייקר המגנטי בעל הביצועים הגבוהים, עם מעמד טלפון מובנה.",
    products: [
      {
        id: "vault-magnetic-shaker",
        handle: "vault-magnetic-shaker",
        title: "שייקר VAULT מגנטי",
        description:
          "שייקר הפרימיום החשמלי עם מעמד טלפון מובנה. מנוע עוצמתי לשייק חלק בשנייה, ומגנט N52 שמעגן את הטלפון לצילום ולסטרימינג. אטימה מלאה נגד נזילות וגוף טריטן (Tritan) שקוף נטול BPA. כל מארז כולל שתי טבעות מגנטיות מתאמות.",
        price: 199,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/שייקר חדש2.jpeg",
        hoverImage: "/images/שייקר חדש.jpeg",
        gallery: ["/images/שייקר חדש2.jpeg", "/images/שייקר חדש1.jpeg", "/images/שייקר חדש3.jpeg"],
        badge: "bestseller",
      },
      {
        id: "vault-bundle-set",
        handle: "vault-bundle-set",
        title: "סט VAULT מלא",
        description:
          "השייקר המגנטי + כל האביזרים המשלימים במחיר משתלם: טבעות מגנטיות, מגבת אימון, מברשת ניקוי ונרתיק מגנטי לאוזניות. הסט המושלם לאורח חיים פעיל.",
        price: 400,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/accessory-bundle-set.png",
        hoverImage: "/images/accessory-bundle-set.png",
        badge: "new",
      },
    ],
  },
  {
    handle: "accessories",
    title: "אביזרים משלימים",
    enTitle: "GEAR & ACCESSORIES",
    tagline: "כל מה שצריך כדי להשלים את ציוד האימון.",
    products: [
      {
        id: "magnetic-rings",
        handle: "magnetic-rings",
        title: "טבעות מגנטיות (זוג נוסף)",
        description:
          "זוג טבעות מתכת דקות במיוחד עם דבק דו-צדדי חזק, להצמדה מגנטית של כל סמארטפון — אייפון או אנדרואיד. מתאימות בתוך הכיסוי, על גביו או ישירות על המכשיר.",
        price: 39,
        currency: "ILS",
        material: "מתכת מגנטית · דבק דו-צדדי חזק",
        availableForSale: true,
        image: "/images/accessory-magnetic-ring.png",
        hoverImage: "/images/accessory-magnetic-ring.png",
      },
      {
        id: "gym-towel",
        handle: "gym-towel",
        title: "מגבת אימון פרימיום",
        description:
          "מגבת אימון רכה וסופגת, בדיוק בגודל הנכון לחדר הכושר. ליווי מושלם לשייקר VAULT.",
        price: 45,
        currency: "ILS",
        material: "כותנה סופגת בדרגת פרימיום",
        availableForSale: true,
        image: "/images/accessory-gym-towel.png",
        hoverImage: "/images/accessory-gym-towel.png",
        badge: "new",
      },
      {
        id: "cleaning-brush",
        handle: "cleaning-brush",
        title: "מברשת ניקוי לשייקר",
        description:
          "מברשת ייעודית שמגיעה לכל פינה בשייקר ובפייה, לניקוי קל ושמירה על רעננות לאורך זמן.",
        price: 19,
        currency: "ILS",
        material: "ניילון עמיד · ידית ארגונומית",
        availableForSale: true,
        image: "/images/accessory-cleaning-brush.png",
        hoverImage: "/images/accessory-cleaning-brush.png",
      },
      {
        id: "earphone-case",
        handle: "earphone-case",
        title: "נרתיק מגנטי לאוזניות",
        description:
          "נרתיק קומפקטי לאוזניות עם חיבור מגנטי, כדי שהכול יישאר מסודר וזמין בכל אימון.",
        price: 35,
        currency: "ILS",
        material: "סיליקון עמיד · חיבור מגנטי",
        availableForSale: true,
        image: "/images/accessory-earphone-case.png",
        hoverImage: "/images/accessory-earphone-case.png",
      },
    ],
  },
];
