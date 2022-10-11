import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { graphql } from "gatsby";
import PubComponent from "../components/Pub";
import { cv } from "../cv";
import WorkComponent from "../components/Work";
import TeachingComponent from "../components/Teaching";
import HighlightComponent from "../components/Highlight";
import parse from "date-fns/parse";
import ReactMarkdown from "react-markdown";

function sortByDate<T>(items: T[], key: keyof T): T[] {
  return [...items].sort((a, b) => {
    const dateA = parse(a[key] as string, "MM-dd-yyyy", new Date());
    const dateB = parse(b[key] as string, "MM-dd-yyyy", new Date());
    return dateA.getTime() - dateB.getTime();
  });
}

export default function IndexPage({ data }) {
  const aboutHtml = data.about.children[0].html;
  const researchHtml = data.research.children[0].html;
  const pubs = sortByDate(cv.publications, "releaseDate").reverse();
  return (
    <div className="sm:container sm:mx-auto px-10 md:px-30 lg:px-30 xl:px-40 py-10 text">
      <h1 className="text-4xl py-8">Amy Pavel</h1>
      <div className="md:grid md:grid-cols-4 md:gap-x-4">
        <div className="col-span-1">
          <StaticImage
            src="../images/amypavel-small.png"
            alt="Amy Pavel headshot"
            className="w-48 md:w-auto"
          />
          <div className="py-6">
            <p>
              Email{" "}
              <a href="mailto:apavel@cs.utexas.edu">apavel@cs.utexas.edu</a>
            </p>
            <p>
              Office{" "}
              <a href="https://utdirect.utexas.edu/apps/campus/buildings/nlogon/maps/utm/gdc/">
                GDC 3.704
              </a>
            </p>
            <p>
              Twitter <a href="https://twitter.com/amypavel">@amypavel</a>
            </p>
            <p>
              Publications{" "}
              <a href="https://scholar.google.com/citations?user=bM4pEGoAAAAJ&hl=en">
                Google Scholar
              </a>
            </p>
            <p>
              <a href="docs/pavel-cv.pdf">CV</a>
            </p>
          </div>
          <div className="pb-7">
            <p>
              <a href="https://www.utexas.edu">University of Texas at Austin</a>
              <br />
              <a href="https://www.cs.utexas.edu/">
                Department of Computer Science
              </a>
              <br />
              <em>Assistant Professor</em>
            </p>
          </div>
          <div>
            <p>
              Archived job materials
              <br />
              <a href="docs/pavel-research.pdf">Research</a> ·{" "}
              <a href="docs/pavel-teaching.pdf">Teaching</a>
            </p>
          </div>
        </div>
        <div className="col-span-3">
          <div
            className="writing"
            dangerouslySetInnerHTML={{ __html: aboutHtml }}
          />
          <hr />
          <h2 className="text-2xl font-medium pb-7 pt-8">
            Research Highlights
          </h2>
          <div className="container">
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {pubs
                .filter((pub) => pub.tags.includes("highlight"))
                .map((pub) => (
                  <div className="col-span-1 pb-4 sm:pb-0">
                    <HighlightComponent
                      title={pub.shortName ?? pub.name}
                      subtitle={pub.publisher}
                      imageName={pub.image}
                      imageAlt={pub.imageAlt}
                    >
                      <ReactMarkdown>{pub.content ?? ""}</ReactMarkdown>
                    </HighlightComponent>
                  </div>
                ))}
            </div>
          </div>
          <h2 className="text-2xl font-medium pb-7 pt-8">Research Summary</h2>
          <div
            className="writing"
            dangerouslySetInnerHTML={{ __html: researchHtml }}
          />
          <h2 className="text-2xl font-medium pb-7 pt-8">Conference Papers</h2>
          <div className="md:container md:mx-auto">
            {pubs
              .filter((p) => p.tags.includes("paper"))
              .map((pub) => (
                <PubComponent key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl font-medium pb-7 pt-8">
            Thesis and Technical Reports
          </h2>
          <div className="md:container md:mx-auto">
            {pubs
              .filter((p) => p.tags.includes("tech-report"))
              .map((pub) => (
                <PubComponent key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl font-medium pb-7 pt-8">
            Posters and Workshops
          </h2>
          <div className="md:container md:mx-auto">
            {pubs
              .filter(
                (p) => p.tags.includes("poster") || p.tags.includes("workshop")
              )
              .map((pub) => (
                <PubComponent key={pub.name} pub={pub} />
              ))}
          </div>
          <h2 className="text-2xl font-medium pb-7 pt-8">Work</h2>
          {cv.work.map((job) => (
            <WorkComponent key={job.name} work={job} />
          ))}
          <h2 className="text-2xl font-medium pb-7 pt-8">Teaching</h2>
          {cv.teaching.map((teaching, i) => (
            <TeachingComponent key={i} teaching={teaching} />
          ))}
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
