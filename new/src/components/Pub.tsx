import React from "react";
import { Person, PEOPLE } from "../people";
import { Publication } from "../cv";

function PeopleList({ people }: { people: Person[] }) {
  return (
    <p>
      {people.map((person, i) => {
        const comma = i === people.length - 1 ? "" : ", ";
        const name =
          person.name === "Amy Pavel" || !person.link ? (
            person.name
          ) : (
            <a href={person.link}>{person.name}</a>
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

export default function Pub({ pub }: { pub: Publication }) {
  return (
    <div className="grid grid-cols-4 gap-x-4 prose">
      <div className="col-span-1">Image</div>
      <div className="col-span-3">
        <b>{pub.name}</b>
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
    </div>
  );
}
