import React from "react";
import { Work } from "../cv";

export default function WorkComponent({ work }: { work: Work }) {
  return (
    <div className="prose mb-8">
      <b>
        {work.position} - {work.name}
      </b>
      <br />
      <em>{work.description}</em>
      <br />
      {work.summary}
    </div>
  );
}
