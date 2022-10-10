import React from "react";
import { PropsWithChildren } from "react";

export default function HighlightComponent({
  title,
  subtitle,
  img,
  children,
}: PropsWithChildren<{
  title: string;
  subtitle: string;
  img: string;
}>) {
  return (
    <div className="border-2 p-3">
      <h2 className="text-l font-bold">{title}</h2>
      <h3 className="text-m italic">{subtitle}</h3>
      <img src={img} />
      {children}
    </div>
  );
}
