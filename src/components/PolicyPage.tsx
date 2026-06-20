import FadeIn from "@/components/FadeIn";

export interface PolicySection {
  heading: string;
  body: string;
}

export default function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
}) {
  return (
    <div className="flex min-h-full flex-col">
      <main id="main-content" className="mx-auto w-full max-w-3xl flex-1 px-6 py-24 lg:py-32">
        <FadeIn>
          <p className="text-center text-xs tracking-[0.3em] text-[#1f6fd0]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-center font-serif text-4xl font-light tracking-[0.04em] text-neutral-900 lg:text-5xl">
            {title}
          </h1>
        </FadeIn>

        <FadeIn delay={120}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-loose text-neutral-500">
            {intro}
          </p>
        </FadeIn>

        <div className="mt-16 space-y-12 border-t border-stone-200/70 pt-12">
          {sections.map((section, i) => (
            <FadeIn key={section.heading} delay={i * 100}>
              <section>
                <h2 className="font-serif text-2xl font-light text-neutral-900">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-loose text-neutral-500">
                  {section.body}
                </p>
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={120}>
          <p className="mt-16 border-t border-stone-200/70 pt-8 text-center text-sm leading-loose text-neutral-400">
            לשאלות נוספות ניתן לפנות אלינו במייל{" "}
            <a
              href="mailto:adiamato119@gmail.com"
              className="text-neutral-700 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
            >
              adiamato119@gmail.com
            </a>{" "}
            ונשמח לעזור.
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
