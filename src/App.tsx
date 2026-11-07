import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import AuthModal, { type Mode } from "./components/AuthModal";
import ContactSection from "./components/ContactSection";
import DemoVideoModal from "./components/DemoVideoModal";

import FeaturesSection from "./components/FeaturesSection";
import FloatingChatDemo from "./components/FloatingChatDemo";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import { supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [modal, setModal] = useState<Mode | null>(null);
  const [isDemoVideoOpen, setIsDemoVideoOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, currentSession) =>
      setSession(currentSession),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const metadataUsername = session?.user.user_metadata?.username;
  const username =
    typeof metadataUsername === "string" && metadataUsername.trim()
      ? metadataUsername
      : undefined;
  const openSignup = () => {
    if (session) {
      setIsDemoVideoOpen(true);
    } else {
      setModal("signup");
    }
  };
  const openDemoVideo = () => {
    if (session) {
      setIsDemoVideoOpen(true);
    } else {
      setModal("login");
    }
  };

  return (
    <div className="min-h-screen scroll-smooth bg-stone-50 font-sans text-zinc-900 selection:bg-emerald-200">
      <Header
        session={session}
        username={username}
        email={session?.user.email}
        onLogin={() => setModal("login")}
        onBookDemo={openDemoVideo}
      />
      <main>
        <HeroSection onPlayDemo={openDemoVideo} />
        <FeaturesSection />
        <HowItWorksSection />
        <ContactSection onSignup={openSignup} />
      </main>
      <Footer />
      {modal && <AuthModal initial={modal} onClose={() => setModal(null)} />}
      {isDemoVideoOpen && (
        <DemoVideoModal onClose={() => setIsDemoVideoOpen(false)} />
      )}
      <FloatingChatDemo />
    </div>
  );
}
