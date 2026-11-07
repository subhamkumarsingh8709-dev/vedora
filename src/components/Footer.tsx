export default function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-8 sm:flex-row lg:px-8">
        <div className="text-center sm:text-left">
          <span className="text-sm font-medium">
            vedora<span className="text-zinc-400">.ai</span>
          </span>
          <p className="mt-1 text-xs text-zinc-500">
            © {new Date().getFullYear()} vedora.ai. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm sm:items-end">
          <a
            href="mailto:subhamkumarsingh8709@gmail.com"
            className="text-zinc-600 transition hover:text-emerald-700"
          >
            subhamsinghdone@gmail.com
          </a>
          <a
            href="https://portfolio-chatbot-frontend-ten.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 transition hover:text-emerald-800"
          >
            Chat with my AI assistant
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
