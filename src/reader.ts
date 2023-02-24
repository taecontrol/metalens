import { MetadataProps } from "./interfaces/metadata";

export default function getPageMetadata() {
  const allMetaTags = Array.from(document.querySelectorAll("meta"));

  let twitterMetadata: MetadataProps = {
    title: "",
    description: "",
    image: "",
    url: "",
  };

  let openGraphMetadata: MetadataProps = {
    title: "",
    description: "",
    image: "",
    url: "",
  };

  const twitterTags = allMetaTags
    .filter((tag) => tag.getAttribute("property")?.includes("twitter"))
    .map((tag) => {
      if (tag.getAttribute("property")?.includes("title")) {
        twitterMetadata.title = tag.content;
      }

      if (tag.getAttribute("property")?.includes("image")) {
        twitterMetadata.image = tag.content;
      }

      if (tag.getAttribute("property")?.includes("description")) {
        twitterMetadata.description = tag.content;
      }

      if (tag.getAttribute("property")?.includes("url")) {
        twitterMetadata.url = tag.content;
      }

      return {
        title: tag.title,
        content: tag.content,
        property: tag.getAttribute("property"),
        spec: "twitter",
      };
    });

  const openGraphTags = allMetaTags
    .filter((tag) => tag.getAttribute("property")?.includes("og"))
    .map((tag) => {
      if (tag.getAttribute("property")?.includes("title")) {
        openGraphMetadata.title = tag.content;
      }

      if (tag.getAttribute("property")?.includes("image")) {
        openGraphMetadata.image = tag.content;
      }

      if (tag.getAttribute("property")?.includes("description")) {
        openGraphMetadata.description = tag.content;
      }

      if (tag.getAttribute("property")?.includes("url")) {
        openGraphMetadata.url = tag.content;
      }

      return {
        title: tag.title,
        content: tag.content,
        property: tag.getAttribute("property"),
        spec: "open-graph",
      };
    });

  return {
    twitter: {
      metadata: twitterMetadata,
      tags: twitterTags,
    },
    openGraph: {
      metadata: openGraphMetadata,
      tags: openGraphTags,
    },
    url: window.location.href,
  };
}
