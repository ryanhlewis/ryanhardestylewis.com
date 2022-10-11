import React from "react";
import { Work } from "../cv";
import parse from "date-fns/parse";
import format from "date-fns/format";

export default function WorkComponent({ work }: { work: Work }) {
  let start = work.startDate
    ? parse(work.startDate, "yyyy-MM-dd", new Date())
    : undefined;
  let end = work.endDate
    ? parse(work.endDate, "yyyy-MM-dd", new Date())
    : undefined;
  if (start && Number.isNaN(start.getTime())) {
    start = undefined;
  }
  if (end && Number.isNaN(end.getTime())) {
    end = undefined;
  }
  let startStr = work.startDate;
  let hasDash = false;
  if (start) {
    startStr = format(start, "MMMM yyyy");
    hasDash = true;
  }
  let endStr = work.endDate;
  if (end) {
    endStr = format(end, "MMMM yyyy");
  }
  if (endStr) {
    hasDash = true;
  }

  return (
    <div className="mb-10">
      <p className="mb-1">
        <b className="text-lg font-medium">
          {work.position} &mdash; {work.name}
        </b>
      </p>
      <p>
        <em>{work.description}</em>
      </p>
      <p>{work.summary}</p>
      <p>
        <em>
          {startStr}
          {hasDash ? " — " : ""}
          {endStr}
        </em>
      </p>
    </div>
  );
}
