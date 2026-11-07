import { useEffect } from "react";
import demoVideo from "../assets/demo.mov";

export default function DemoVideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      role="presentation"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-video-title"
        className="w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
          <div>
            <h2
              id="demo-video-title"
              className="text-lg font-semibold text-white"
            >
              Vedora product demo
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              See how Vedora helps students find answers.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close demo video"
            autoFocus
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
        <video
          className="block max-h-[75vh] w-full bg-black"
          src={demoVideo}
          controls
          autoPlay
          playsInline
          preload="metadata"
        >
          Your browser does not support embedded video.
        </video>
      </section>
    </div>
  );
}
