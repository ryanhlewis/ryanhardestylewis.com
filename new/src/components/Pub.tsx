import React from "react";
import { Person, PEOPLE } from "../people";
import { Publication } from "../cv";
import ReactMarkdown from "react-markdown";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import Oprah from "../images/thumbnails/oprah.gif";

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

export default function PubComponent({ pub }: { pub: Publication }) {
  const data = useStaticQuery(graphql`
    query ImagesQuery {
      images: allImageSharp {
        edges {
          node {
            id
            original {
              src
            }
            gatsbyImageData
          }
        }
      }
    }
  `);
  const imgEdge = data.images.edges.find((img) =>
    img.node.original.src.startsWith(`/static/${pub.image}`)
  );
  const image = imgEdge ? getImage(imgEdge.node) : undefined;

  const pubTitle = pub.link ? (
    <a className="text-blue-600" href={pub.link}>
      {pub.name}
    </a>
  ) : (
    pub.name
  );
  return (
    <div className="grid grid-cols-4 gap-x-4 py-5">
      <div className="col-span-1">
        {image && <GatsbyImage alt="" image={image} />}
        {/* workaround for gatsby image not supporting gifs */}
        {pub.image === "oprah" && <img src={Oprah} alt="" />}
      </div>
      <div className="col-span-3">
        <b>{pubTitle}</b>
        <PeopleList
          people={pub.authors.map((id) => {
            const person = PEOPLE.get(id);
            if (!person) {
              throw new Error(`Unknown person ${id}`);
            }
            return person;
          })}
        />
        <p>{pub.publisher}</p>
        <div className="py-2">
          <ReactMarkdown>{pub.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
