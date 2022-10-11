import React from "react";
import { PropsWithChildren } from "react";
import PubImage from "./PubImage";

export default function HighlightComponent({
  title,
  subtitle,
  imageName,
  imageAlt,
  children,
}: PropsWithChildren<{
  title: string;
  subtitle: string;
  imageName: string | undefined;
  imageAlt: string | undefined;
}>) {
  return (
    <div className="p-3" style={{ border: "1px solid #ccc" }}>
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <h3 className="italic mb-2">{subtitle}</h3>
      {imageName && (
        <div className="mb-2">
          <PubImage imageName={imageName} alt={imageAlt} />
        </div>
      )}
      {children}
    </div>
  );
}
