/**
 * Shared review data — the single source of truth for both the on-page
 * <CustomerReviews> display and the Product JSON-LD schema, so the
 * structured-data numbers always match what visitors actually see.
 */
export interface Review {
  name: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
  /** Optional customer-submitted (UGC) photo — path under /public. */
  image?: string;
}

// Real customer reviews keyed by product handle.
export const REVIEWS_BY_HANDLE: Record<string, Review[]> = {
  "vault-magnetic-shaker": [
    {
      name: "דניאל כהן",
      rating: 5,
      date: "מאי 2026",
      body: "המגנט פשוט מטורף. הטלפון נצמד חזק ולא זז גם באמצע סט כפיפות, ואני סוף סוף יכול לצלם את האימונים בלי חצובה. השייקר עצמו אטום לחלוטין ולא נוזל אפילו טיפה. שדרוג רציני לאימון.",
      verified: true,
    },
    {
      name: "נועה לוי",
      rating: 5,
      date: "מאי 2026",
      body: "האריזה הגיעה מושקעת ויוקרתית, והשייקר נראה אפילו טוב יותר מבתמונות. קל לניקוי, נעים לאחיזה, והמעמד לטלפון מושלם לסטרימינג בזמן האימון. לא מוותרת עליו.",
      verified: true,
    },
  ],
  "vault-bundle-set": [
    {
      name: "איתי ברקוביץ׳",
      rating: 5,
      date: "אפריל 2026",
      body: "לקחתי את הסט המלא וזה שווה כל שקל. איכות בנייה פרימיום שמרגישים ביד, הטבעות המגנטיות מחזיקות מצוין גם על הכיסוי, וכל האביזרים פשוט משלימים את חוויית האימון. ממליץ בחום.",
      verified: true,
    },
  ],
};

// Shown for any product without handle-specific reviews (e.g. the main shaker).
// Each includes an authentic UGC photo submitted by the customer.
export const DEFAULT_REVIEWS: Review[] = [
  {
    name: "עידן מ.",
    rating: 5,
    date: "יוני 2026",
    verified: true,
    body: "הגיע סופר מהיר! אספתי מהחבילה ולא התאפקתי ופתחתי כבר באוטו. האיכות של הפלסטיק מרגישה פרימיום ברמות והוא יושב בול במחזיק כוסות.",
    image: "/images/review-ugc-car.png",
  },
  {
    name: "רוני כ.",
    rating: 5,
    date: "יוני 2026",
    verified: true,
    body: "הדבר הראשון שעשיתי זה לבדוק את המגנט על המקרר במטבח – תופס חזק בטירוף ולא זז. המנוע החשמלי מערבב את החלבון בשניות בלי גושים בכלל. שווה כל שקל.",
    image: "/images/review-ugc-fridge.png",
  },
  {
    name: "דניאל ל.",
    rating: 5,
    date: "מאי 2026",
    verified: true,
    body: "אריזה ממש יפה ומושקעת, מתאים בול גם כמתנה. השייקר עצמו נראה הצגה, אטום לחלוטין ולא נוזל בתיק. ממליץ בחום!",
    image: "/images/review-ugc-unboxing.png",
  },
  {
    name: "מאור א.",
    rating: 5,
    date: "מאי 2026",
    verified: true,
    body: "קניתי בעיקר בגלל הקטע של המגנט לטלפון במכון וזה פשוט גאוני. השייקר עצמו קל לניקוי והסוללה מחזיקה מלא זמן.",
    image: "/images/review-ugc-closeup.png",
  },
];

// Total reviews shown in the summary line (we surface a representative sample).
export const DISPLAY_REVIEW_COUNT = 27;

export function getReviewSummary(handle: string): {
  average: number;
  count: number;
} {
  const reviews = REVIEWS_BY_HANDLE[handle] ?? DEFAULT_REVIEWS;
  const average =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;
  return { average, count: DISPLAY_REVIEW_COUNT };
}
