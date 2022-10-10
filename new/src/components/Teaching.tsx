import React from "react";
import { Teaching } from "../cv";

export default function TeachingComponent({
  teaching,
}: {
  teaching: Teaching;
}) {
  let date = teaching.startDate;
  if (teaching.endDate) {
    date += " - " + teaching.endDate;
  }
  return (
    <div className="prose mb-8">
      <b>
        {teaching.position} - {teaching.course}
      </b>
      <br />
      <em>{date}</em>
      <br />
      {teaching.summary.map((s, i) => {
        if (i !== s.length - 1) {
          return (
            <>
              {s}
              <br />
            </>
          );
        }
        return s;
      })}
    </div>
  );
}
