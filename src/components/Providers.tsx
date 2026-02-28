"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Navigation from "./Navigation";

const RecruiterContext = createContext(false);
export const useRecruiterMode = () => useContext(RecruiterContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem("theme") !== "light";
    } catch {
      return true;
    }
  });
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  return (
    <RecruiterContext.Provider value={recruiterMode}>
      <Navigation
        dark={dark}
        setDark={setDark}
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
      />
      {children}
    </RecruiterContext.Provider>
  );
}
