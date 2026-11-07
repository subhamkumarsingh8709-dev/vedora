import { useEffect, useState } from "react";

const demo = [
  {
    q: "What is the last date to apply for B.Tech?",
    a: "Applications for B.Tech close on 30 June. You can apply online from the Admissions page, and the application fee is waived for early applicants.",
    src: "Admissions_Brochure_2026.pdf · Page 4",
  },
  {
    q: "Which scholarships am I eligible for?",
    a: "Students with 85%+ in Class 12 qualify for the Merit Scholarship (50% tuition waiver). Need-based aid is also available with an income certificate.",
    src: "Scholarship_Policy.pdf · Page 2",
  },
  {
    q: "When does the hostel registration open?",
    a: "Hostel registration opens one week after your admission is confirmed. Rooms are allotted on a first-come, first-served basis.",
    src: "Student_Handbook.pdf · Page 18",
  },
];

export default function FloatingChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const currentDemo = demo[index];

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          id="floating-chat-demo"
          role="dialog"
          aria-label="Campus Assistant chat demo"
          className="absolute bottom-[4.5rem] right-0 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 bg-emerald-700 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                V
              </div>
              <div>
                <p className="text-sm font-semibold">Campus Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-emerald-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  Online now
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-white/90 transition hover:bg-white/15 hover:text-white"
              aria-label="Close chat demo"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
              >
                <path
                  d="m6 6 12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-stone-50 p-4">
            <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-zinc-700 shadow-sm">
              Hi! 👋 Ask me anything about admissions, fees or campus life.
            </div>
            <div key={index} className="space-y-4">
              <div className="ml-auto w-fit max-w-[90%] rounded-2xl rounded-tr-sm bg-zinc-900 px-4 py-3 text-sm text-white">
                {currentDemo.q}
              </div>
              <div className="max-w-[95%] space-y-2">
                <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm leading-relaxed text-zinc-700 shadow-sm">
                  {currentDemo.a}
                </div>
                <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">
                  📄 {currentDemo.src}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 bg-white p-3">
            <p className="mb-2 px-1 text-xs font-medium text-zinc-500">
              Try a question
            </p>
            <div className="flex flex-col gap-2">
              {demo.map((item, itemIndex) => (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-pressed={itemIndex === index}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-xs leading-relaxed transition ${
                    itemIndex === index
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-zinc-200 text-zinc-600 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="floating-chat-demo"
        aria-label={isOpen ? "Close chat demo" : "Open chat demo"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
      >
        {isOpen ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
          >
            <path
              d="m6 6 12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
          >
            <path
              d="M5 18.5 3.8 21l4-.9a9 9 0 1 0-2.8-1.6Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
            <path
              d="M8 10h8M8 14h5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
