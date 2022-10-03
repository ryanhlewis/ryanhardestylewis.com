import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import Pub from "../components/Pub";
import { cv } from "../cv";

export default function IndexPage({ data }) {
  const aboutHtml = data.about.children[0].html;
  const researchHtml = data.research.children[0].html;
  return (
    <div className="sm:container sm:mx-auto px-10 md:px-30 lg:px-40 py-10">
      <h1 className="text-4xl py-8">Amy Pavel</h1>
      <div className="md:grid md:grid-cols-4 md:gap-x-4">
        <div className="col-span-1">
          <StaticImage
            src="../images/amypavel-small.png"
            alt="Amy Pavel headshot"
            className="w-48 md:w-auto"
          />
          <div className="prose-sm prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:no-underline">
            <p>
              Email{" "}
              <a href="mailto:apavel@cs.utexas.edu">apavel@cs.utexas.edu</a>
            </p>
            <p>
              Twitter <a href="https://twitter.com/amypavel">@amypavel</a>
            </p>
            <p>
              Publications
              <br />
              <a href="https://scholar.google.com/citations?user=bM4pEGoAAAAJ&hl=en">
                Google Scholar
              </a>{" "}
              · <a href="docs/pavel-cv.pdf">CV</a>
            </p>
            <p>
              <a href="https://www.utexas.edu">University of Texas at Austin</a>
              <br />
              <a href="https://www.cs.utexas.edu/">
                Department of Computer Science
              </a>
              <br />
              Assistant Professor
            </p>
            <p>
              Archived job materials
              <br />
              <a href="docs/pavel-research.pdf">Research</a> ·{" "}
              <a href="docs/pavel-teaching.pdf">Teaching</a>
            </p>
          </div>
        </div>
        <div className="col-span-3">
          <div className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:no-underline">
            <div dangerouslySetInnerHTML={{ __html: aboutHtml }} />
          </div>
          <h2 className="text-2xl py-8">Research Highlights</h2>
          <h2 className="text-2xl py-8">Research Summary</h2>
          <div className="prose prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:no-underline">
            <div dangerouslySetInnerHTML={{ __html: researchHtml }} />
          </div>
          <h2 className="text-2xl py-8">Conference Papers</h2>
          <div className="md:container md:mx-auto">
            {cv.publications
              .filter((p) => p.tags.includes("paper"))
              .map((pub) => (
                <Pub key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl py-8">Thesis and Technical Reports</h2>
          <div className="md:container md:mx-auto">
            {cv.publications
              .filter((p) => p.tags.includes("tech-report"))
              .map((pub) => (
                <Pub key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl py-8">Posters and Workshops</h2>
          <div className="md:container md:mx-auto">
            {cv.publications
              .filter(
                (p) => p.tags.includes("poster") || p.tags.includes("workshop")
              )
              .map((pub) => (
                <Pub key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl py-8">Work</h2>
          <h2 className="text-2xl py-8">Teaching</h2>
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query MyQuery {
    about: file(name: { eq: "about" }, sourceInstanceName: { eq: "content" }) {
      id
      children {
        id
        ... on MarkdownRemark {
          id
          html
        }
      }
    }
    research: file(
      name: { eq: "research" }
      sourceInstanceName: { eq: "content" }
    ) {
      id
      children {
        id
        ... on MarkdownRemark {
          id
          html
        }
      }
    }
  }
`;
