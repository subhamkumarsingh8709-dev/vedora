import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function Header({
  session,
  username,
  email,
  onLogin,
  onBookDemo,
}: {
  session: Session | null;
  username: string | undefined;
  email: string | undefined;
  onLogin: () => void;
  onBookDemo: () => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen && !dashboardOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (dashboardOpen) return;
      if (
        event.target instanceof Node &&
        !profileRef.current?.contains(event.target)
      ) {
        setProfileOpen(false);
        setSignOutError("");
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setDashboardOpen(false);
        setSignOutError("");
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dashboardOpen, profileOpen]);

  async function handleSignOut() {
    setSignOutError("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setSignOutError(error.message);
      return;
    }
    setProfileOpen(false);
    setDashboardOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-stone-50/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="text-2xl font-semibold tracking-tight">
            vedora<span className=" text-emerald-400">.ai</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-zinc-600 md:flex">
          <a href="#features" className="hover:text-zinc-900">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-zinc-900">
            How it works
          </a>
          <a href="#contact" className="hover:text-zinc-900">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((open) => !open);
                  setDashboardOpen(false);
                  setSignOutError("");
                }}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label={
                  profileOpen ? "Close profile menu" : "Open profile menu"
                }
                className="flex items-center gap-2 rounded-full p-1 pr-2 transition hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:pr-3"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-800 text-sm font-semibold text-white">
                  {username?.charAt(0).toUpperCase() ?? "V"}
                </span>
                {username && (
                  <span className="hidden max-w-36 truncate text-sm font-medium text-zinc-700 sm:block">
                    {username}
                  </span>
                )}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`hidden h-4 w-4 text-zinc-500 transition sm:block ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  aria-label="Profile menu"
                  className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl"
                >
                  <div className="border-b border-zinc-100 px-3 py-2.5">
                    <p className="text-xs text-zinc-500">Signed in as</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-zinc-800">
                      {username || "Vedora user"}
                    </p>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      setDashboardOpen(true);
                    }}
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4 text-zinc-500"
                    >
                      <rect
                        x="2.75"
                        y="2.75"
                        width="5.5"
                        height="6.5"
                        rx="1.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="11.75"
                        y="2.75"
                        width="5.5"
                        height="4"
                        rx="1.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="11.75"
                        y="9.75"
                        width="5.5"
                        height="7.5"
                        rx="1.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="2.75"
                        y="12.25"
                        width="5.5"
                        height="5"
                        rx="1.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Dashboard
                  </button>
                  {signOutError && (
                    <p role="alert" className="px-3 py-2 text-xs text-red-600">
                      Could not log out: {signOutError}
                    </p>
                  )}
                  <div className="my-1 border-t border-zinc-100" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => void handleSignOut()}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M8 3.25H4.75A1.5 1.5 0 0 0 3.25 4.75v10.5a1.5 1.5 0 0 0 1.5 1.5H8m3-3.25 3.5-3.5L11 6.5m3.5 3.5H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 sm:block"
              >
                Log in
              </button>
              <button
                onClick={onBookDemo}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              >
                Book a demo
              </button>
            </>
          )}
        </div>
      </nav>

      {dashboardOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={() => setDashboardOpen(false)}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="dashboard-popup-title"
              className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="dashboard-popup-title"
                    className="text-xl font-semibold text-zinc-900"
                  >
                    Dashboard
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Your account details
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDashboardOpen(false)}
                  className="rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label="Close dashboard popup"
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
              <div className="mt-6 space-y-4 rounded-xl bg-zinc-50 p-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Name
                  </p>
                  <p className="mt-1 break-words text-sm font-medium text-zinc-900">
                    {username || "Vedora user"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-zinc-900">
                    {email || "No email address available"}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-500">
                Your full dashboard is coming soon.
              </p>
            </section>
          </div>,
          document.body,
        )}
    </header>
  );
}
