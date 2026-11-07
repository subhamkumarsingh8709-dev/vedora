const steps = [
  {
    n: "1",
    title: "Upload your documents",
    text: "Add PDFs, FAQs and web pages. No technical work needed.",
  },
  {
    n: "2",
    title: "Customize your bot",
    text: "Pick its name, colors and tone so it feels like part of your institute.",
  },
  {
    n: "3",
    title: "Add it to your website",
    text: "Paste a single line of code. Your assistant goes live in minutes.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-y border-zinc-200 bg-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <p className="text-sm font-medium text-emerald-600">How it works</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Live on your website in three steps.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                {step.n}
              </div>
              <h3 className="mt-5 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
