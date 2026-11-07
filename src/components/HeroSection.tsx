export default function HeroSection({
  onPlayDemo,
}: {
  onPlayDemo: () => void;
}) {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-medium text-emerald-800">
            🎓 AI chatbot built for education
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Your institute&rsquo;s questions,{" "}
            <span className="text-emerald-600">answered instantly.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            vedora.ai gives schools, colleges and universities an AI assistant
            that answers student and parent questions around the clock, using
            your own documents.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={onPlayDemo}
              className="rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
            >
              Get your free demo
            </button>
            <a
              href="#how-it-works"
              className="rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm font-medium hover:bg-zinc-100"
            >
              See how it works
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[450] lg:mx-0">
          <img
            src="new.png"
            alt="Chatbot tools and conversational interface for financial services"
            loading="lazy"
            className="w-full rounded-2xl border border-white object-cover"
          />
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-sm text-zinc-500 lg:px-8">
          <span className="font-medium text-zinc-900">Made for</span>
          {[
            "Schools",
            "Colleges",
            "Universities",
            "Coaching centres",
            "Online academies",
          ].map((audience) => (
            <span key={audience}>{audience}</span>
          ))}
        </div>
      </section>
    </>
  );
}
