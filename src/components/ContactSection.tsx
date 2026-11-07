export default function ContactSection({
  onSignup,
}: {
  onSignup: () => void;
}) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 lg:px-8">
      <div className="rounded-3xl bg-zinc-900 px-8 py-16 text-center text-white">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to give your institute an AI assistant?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Create an account and we&rsquo;ll help you set up a demo bot with your
          own documents.
        </p>
        <button
          onClick={onSignup}
          className="mt-8 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400"
        >
          Get started free
        </button>
      </div>
    </section>
  );
}
