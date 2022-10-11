import * as t from "io-ts";
import { fold } from "fp-ts/Either";
import peopleJson from "./data/people.json";
import { pipe } from "fp-ts/function";
import { formatValidationErrors } from "io-ts-reporters";

const Person = t.intersection([
  t.type({
    id: t.string,
    name: t.string,
  }),
  t.partial({
    link: t.string,
  }),
]);

export type Person = t.TypeOf<typeof Person>;

export const PEOPLE = new Map<string, Person>();

for (const personJson of peopleJson) {
  pipe(
    Person.decode(personJson),
    fold(
      (err) => {
        console.error(formatValidationErrors(err));
        throw err[0];
      },
      (person) => {
        PEOPLE.set(person.id, person);
      }
    )
  );
}
