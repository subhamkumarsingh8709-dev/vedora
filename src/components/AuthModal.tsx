import { useState, type FormEvent } from "react";
import { supabase, supabaseConfigError } from "../lib/supabase";

export type Mode = "login" | "signup";

export default function AuthModal({
  initial,
  onClose,
}: {
  initial: Mode;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initial);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (supabaseConfigError) {
      setError(supabaseConfigError);
      return;
    }

    if (mode === "signup" && !/^[A-Za-z0-9_]{3,20}$/.test(username)) {
      setError("Username must be 3–20 letters, numbers or underscores.");
      return;
    }
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } },
        });
        if (signUpError) throw signUpError;
        if (!data.session) {
          setNotice("Account created! Check your email to verify your account.");
        } else {
          onClose();
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 transition focus:border-emerald-400/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-white/10";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={mode === "login" ? "Log in" : "Sign up"}
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 shadow-2xl"
      >
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-[60px]" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="relative">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="mt-1.5 text-sm text-zinc-400">
            {mode === "login"
              ? "Log in to continue to Vedora."
              : "Your knowledge workspace starts here."}
          </p>

          <div className="mt-8 space-y-4">
            {mode === "signup" && (
              <input
                className={field}
                placeholder="Username"
                value={username}
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            )}
            <input
              className={field}
              type="email"
              placeholder="Email address"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <input
              className={field}
              type="password"
              placeholder="Password"
              value={password}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              onChange={(event) => setPassword(event.target.value)}
              minLength={8}
              required
            />

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="text-sm text-emerald-400">
                {notice}
              </p>
            )}

            <button
              disabled={busy}
              className="mt-2 w-full rounded-xl bg-white py-3 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {busy
                ? "Please wait..."
                : mode === "login"
                  ? "Log in"
                  : "Create account"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            {mode === "login" ? "New to Vedora?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-medium text-white hover:underline hover:underline-offset-4"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
                setNotice("");
              }}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
