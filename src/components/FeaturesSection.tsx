const features = [
  {
    icon: "💬",
    title: "Answers 24/7",
    text: "Parents and students get instant replies about admissions, fees, timetables and exams, even at midnight.",
  },
  {
    icon: "📚",
    title: "Trained on your documents",
    text: "Upload brochures, circulars and handbooks. The bot answers only from your own material.",
  },
  {
    icon: "🔗",
    title: "Cited answers",
    text: "Every reply points to the exact document and page, so staff and families can trust it.",
  },
  {
    icon: "🌐",
    title: "Many languages",
    text: "Reply in English, Hindi, Telugu and more, so every family feels understood.",
  },
  {
    icon: "🙋",
    title: "Human hand-off",
    text: "Tricky or sensitive questions are passed to your office team with the full conversation.",
  },
  {
    icon: "📈",
    title: "See what people ask",
    text: "A simple dashboard shows the most common questions so you can fix gaps on your website.",
  },
];

const card =
  "rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:shadow-md";

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <p className="text-sm font-medium text-emerald-600">Features</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Less time on repeat questions, more time on students.
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className={card}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-lg font-medium">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
