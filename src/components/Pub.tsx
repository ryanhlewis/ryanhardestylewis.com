import React from "react";
import { Person, PEOPLE } from "../people";
import { Publication } from "../cv";
import ReactMarkdown from "react-markdown";
import PubImage from "./PubImage";
import { BookmarkIcon, TrophyIcon } from "@heroicons/react/20/solid";

function PeopleList({ people }: { people: Person[] }) {
  return (
    <p>
      {people.map((person, i) => {
        const comma = i === people.length - 1 ? "" : ", ";
        const name =
          person.name === "Amy Pavel" || !person.link ? (
            person.name
          ) : (
            <a className="text-blue-600" href={person.link}>
              {person.name}
            </a>
          );
        return (
          <>
            {name}
            {comma}
          </>
        );
      })}
    </p>
  );
}

function Honor({ tags }: { tags: Publication["tags"] }) {
  const bestPaper = tags.includes("bestpaper");
  const hm = tags.includes("honorablemention");
  if (bestPaper || hm) {
    const Icon = bestPaper ? TrophyIcon : BookmarkIcon;
    const text = bestPaper ? "Best Paper Award" : "Honorable Mention Award";
    return (
      <p className="pb-1">
        <b>
          <Icon className="h-4 w-4 inline-block align-middle" />
          <div className="ml-1 inline-block align-middle">{text}</div>
        </b>
      </p>
    );
  }
  return null;
}

export default function PubComponent({ pub }: { pub: Publication }) {
  const pubTitle = pub.link ? (
    <a className="text-blue-600" href={pub.link}>
      {pub.name}
    </a>
  ) : (
    pub.name
  );

  return (
    <div className="grid grid-cols-4 gap-x-4 pb-10 text-sm">
      <div className="col-span-1">
        {pub.image && <PubImage imageName={pub.image} alt={pub.imageAlt} />}
      </div>
      <div className="col-span-3">
        <div className="pb-1">
          <b>{pubTitle}</b>
        </div>
        <div className="pb-1">
          <PeopleList
            people={pub.authors.map((id) => {
              const person = PEOPLE.get(id);
              if (!person) {
                throw new Error(`Unknown person ${id}`);
              }
              return person;
            })}
          />
        </div>
        <p className="pb-1">{pub.publisher}</p>
        <Honor tags={pub.tags} />
        <div>
          <ReactMarkdown>{pub.content ?? ""}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
