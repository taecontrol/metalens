import { MetadataProps } from "./interfaces/metadata";

type getPageMetadataProps = {
  url: string;
};

export default function getPageMetadata({ url }: getPageMetadataProps) {
  const NOT_FOUND_IMAGE_PATH = 'image-not-found.png';

  const allMetaTags = Array.from(document.querySelectorAll("meta"));  

  let twitterMetadata: MetadataProps = {
    title: "Not found",
    description: "Not found",
    image: NOT_FOUND_IMAGE_PATH,
    url: "Not found",
  };

  let openGraphMetadata: MetadataProps = {
    title: "Not found",
    description: "Not found",
    image: NOT_FOUND_IMAGE_PATH,
    url: "Not found",
  };

  let generalMetadata: MetadataProps = {
    title: "Not found",
    description: "Not found",
    image: NOT_FOUND_IMAGE_PATH,
    url,
  };

  const generalTags = allMetaTags.map((tag) => {
    if (tag.name === "title") generalMetadata.title = tag.content;
    if (tag.name === "description") generalMetadata.description = tag.content;

    return {
      title: tag.title,
      content: tag.content,
      property: "",
      spec: "general",
    };
  });

  const twitterTags = allMetaTags
    .filter((tag) => tag.getAttribute("property")?.includes("twitter"))
    .map((tag) => {
      if (tag.getAttribute("property")?.includes("title"))
        twitterMetadata.title = tag.content;

      if (tag.getAttribute("property")?.includes("image"))
        twitterMetadata.image = tag.content;

      if (tag.getAttribute("property")?.includes("description"))
        twitterMetadata.description = tag.content;

      if (tag.getAttribute("property")?.includes("url"))
        twitterMetadata.url = tag.content;

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
      if (tag.getAttribute("property")?.includes("title"))
        openGraphMetadata.title = tag.content;

      if (tag.getAttribute("property")?.includes("image"))
        openGraphMetadata.image = tag.content;

      if (tag.getAttribute("property")?.includes("description"))
        openGraphMetadata.description = tag.content;

      if (tag.getAttribute("property")?.includes("url"))
        openGraphMetadata.url = tag.content;

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
    general: {
      metadata: generalMetadata,
      tags: generalTags,
    },
    url: window.location.href,
  };
}
