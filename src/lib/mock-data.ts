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
}

export interface MockCollection {
  handle: string;
  title: string;
  /** Bold uppercase English display header shown above the product grid. */
  enTitle: string;
  tagline: string;
  products: MockProduct[];
}

const MATERIAL = "כסף סטרלינג 925 איכותי בציפוי זהב 14 קראט";

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
    handle: "geo-collection",
    title: "קולקציית המשושים",
    enTitle: "SIGNATURE HEXAGON",
    tagline: "צורות זוויתיות ואיפוק אדריכלי.",
    products: [
      {
        id: "geo-signet-ring",
        handle: "geo-signet-ring",
        title: "טבעת חותם משושה",
        description:
          "טבעת חותם בצללית משושה נקייה, עשויה כסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. נוכחות מאופקת שמלווה אותך יום אחר יום.",
        price: 420,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/geo-signet-ring.png",
        hoverImage: "/images/products/geo-signet-ring-hover.png",
      },
      {
        id: "geo-gold-earrings",
        handle: "geo-gold-earrings",
        title: "עגילי זהב גאומטריים",
        description:
          "עגילים גאומטריים מינימליסטיים מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. קלים, מעודנים ומושלמים לכל שעות היום.",
        price: 295,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/geo-gold-earrings.png",
        hoverImage: "/images/products/geo-gold-earrings-hover.png",
        badge: "bestseller",
      },
      {
        id: "angular-gold-earrings",
        handle: "angular-gold-earrings",
        title: "עגילי זהב זוויתיים",
        description:
          "עגילים זוויתיים עם קווים חדים ונקיים, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. עיצוב מדויק לנוכחות עדינה ובטוחה.",
        price: 310,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/angular-gold-earrings.png",
        hoverImage: "/images/products/angular-gold-earrings-hover.png",
      },
      {
        id: "geo-pendant-necklace",
        handle: "geo-pendant-necklace",
        title: "שרשרת תליון פריזמה",
        description:
          "תליון פריזמה גאומטרי על שרשרת עדינה, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. נצנוץ שקט שמושך מבטים בעדינות.",
        price: 380,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/geo-necklace-detail.jpg",
        hoverImage: "/images/geo-necklace-model.jpg",
        gallery: ["/images/geo-necklace-detail.jpg", "/images/geo-necklace-model.jpg"],
        badge: "new",
      },
    ],
  },
  {
    handle: "the-cubans",
    title: "חוליות קובניות",
    enTitle: "CUBAN ESSENTIALS",
    tagline: "חוליות במשקל מלא, בגימור ידני ונועז.",
    products: [
      {
        id: "cuban-chain-necklace",
        handle: "cuban-chain-necklace",
        title: "שרשרת חוליות קובנית",
        description:
          "שרשרת חוליות קובנית בגימור מלא, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. נועזת, נקייה ולא מתפשרת על איכות.",
        price: 740,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/cuban-chain-necklace.png",
        hoverImage: "/images/products/cuban-chain-necklace-hover.png",
        badge: "bestseller",
      },
      {
        id: "cuban-chain-bracelet",
        handle: "cuban-chain-bracelet",
        title: "צמיד חוליות קובני",
        description:
          "צמיד חוליות קובני במשקל נעים ליד, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. גימור עשיר עם נגיעה אורבנית מעודנת.",
        price: 360,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/cuban-chain-bracelet.png",
        hoverImage: "/images/products/cuban-chain-bracelet-hover.png",
      },
    ],
  },
  {
    handle: "clean-essentials",
    title: "מינימליזם נקי",
    enTitle: "MINIMALIST PURE",
    tagline: "פריטים יומיומיים בזיקוק לחומר.",
    products: [
      {
        id: "clean-gold-bar-necklace",
        handle: "clean-gold-bar-necklace",
        title: "שרשרת בר זהב",
        description:
          "שרשרת עם בר זהב חלק ומינימליסטי, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. בסיס מושלם לשכבות או ללבוש לבד.",
        price: 245,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/clean-gold-bar-necklace.png",
        hoverImage: "/images/products/clean-gold-bar-necklace-hover.png",
      },
      {
        id: "clean-hoop-bracelet",
        handle: "clean-hoop-bracelet",
        title: "צמיד חישוקים",
        description:
          "צמיד חישוקים נקי ועדין, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. קו רך ומעודן לכל יום.",
        price: 210,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/clean-hoop-bracelet.png",
        hoverImage: "/images/products/clean-hoop-bracelet-hover.png",
      },
      {
        id: "clean-band-ring",
        handle: "clean-band-ring",
        title: "טבעת בנד קלאסית",
        description:
          "טבעת בנד קלאסית בקו נקי, מכסף סטרלינג 925 איכותי בציפוי זהב 14 קראט. עיצוב על-זמני שמשתלב בכל ערימה.",
        price: 165,
        currency: "ILS",
        material: MATERIAL,
        availableForSale: true,
        image: "/images/products/clean-band-ring.png",
        hoverImage: "/images/products/clean-band-ring-hover.png",
        badge: "new",
      },
      {
        id: "silver-hoop-earrings",
        handle: "silver-hoop-earrings",
        title: "עגילי חישוקים מכסף",
        description:
          "עגילי חישוקים קלאסיים מכסף סטרלינג 925 איכותי, בקו נקי ומעודן. קלים למשקל ומושלמים למעבר חלק מהיום-יום אל הערב.",
        price: 280,
        currency: "ILS",
        material: "כסף סטרלינג 925 איכותי",
        availableForSale: true,
        image: "/images/earrings-detail.jpg",
        hoverImage: "/images/earrings-lifestyle.jpg",
        gallery: ["/images/earrings-detail.jpg", "/images/earrings-lifestyle.jpg"],
        styledImage: "/images/earrings-lifestyle.jpg",
        badge: "new",
      },
    ],
  },
];
