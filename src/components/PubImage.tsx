import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Oprah from "../images/thumbnails/oprah.gif";

export default function PubImage({
  imageName,
  alt = "",
}: {
  imageName: string;
  alt: string | undefined;
}) {
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
    img.node.original.src.startsWith(`/static/${imageName}`)
  );
  const image = imgEdge ? getImage(imgEdge.node) : undefined;
  return image ? (
    <GatsbyImage alt={alt} image={image} />
  ) : imageName === "oprah" ? (
    <img src={Oprah} alt={alt} />
  ) : null;
}
