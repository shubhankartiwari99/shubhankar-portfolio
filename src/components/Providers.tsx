"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Navigation from "./Navigation";

const RecruiterContext = createContext(false);
export const useRecruiterMode = () => useContext(RecruiterContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light") setDark(false);
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("light", !dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark, mounted]);

  return (
    <RecruiterContext.Provider value={recruiterMode}>
      <Navigation
        dark={dark}
        setDark={setDark}
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
        mounted={mounted}
      />
      {children}
    </RecruiterContext.Provider>
  );
}
