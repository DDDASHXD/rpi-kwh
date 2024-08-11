import React from "react";

interface iInfoBoxProps {
  children: any;
  value: any;
}

const InfoBox = ({ children, value }: iInfoBoxProps) => {
  return (
    <div className="flex flex-col bg-muted p-5 rounded-xl w-full">
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-muted-foreground text-xl">{children}</p>
    </div>
  );
};

export default InfoBox;
