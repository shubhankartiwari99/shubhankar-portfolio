"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import Navigation from "./Navigation";

const RecruiterContext = createContext(false);
export const useRecruiterMode = () => useContext(RecruiterContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);

  return (
    <RecruiterContext.Provider value={recruiterMode}>
      <Navigation
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
      />
      {children}
    </RecruiterContext.Provider>
  );
}
