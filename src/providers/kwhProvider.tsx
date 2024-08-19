"use client";
import React from "react";

interface iKwhContextProps {
  day?: number;
  setDay: (day: number) => void;
}

// Create the context with an undefined default value
const KwhContext = React.createContext<iKwhContextProps | undefined>(undefined);

const KwhProvider = ({ children }: { children: React.ReactNode }) => {
  const [day, setDay] = React.useState<number>(0);

  return (
    // Use KwhContext.Provider and pass the value prop
    <KwhContext.Provider value={{ day, setDay }}>
      {children}
    </KwhContext.Provider>
  );
};

export default KwhProvider;

export const useKwh = () => {
  const context = React.useContext(KwhContext);
  if (context === undefined) {
    throw new Error("useKwh must be used within a KwhProvider");
  }
  return context;
};
