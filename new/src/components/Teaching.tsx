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
  let course = <>{teaching.course}</>;
  if (teaching.link) {
    course = <a href={teaching.link}>{teaching.course}</a>;
  }
  return (
    <div className="mb-10">
      <p className="mb-1">
        <b className="text-lg font-medium">
          {teaching.position} &mdash; {teaching.institution}
        </b>
      </p>
      <p>{course}</p>
      <p>
        <em>{date}</em>
      </p>
    </div>
  );
}
