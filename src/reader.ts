import { Metadata, MetadataProps } from "./interfaces/metadata";

type getPageMetadataProps = {
  url: string;
};

type protocol = "twitter" | "og" | "general";

export default function getPageMetadata({ url }: getPageMetadataProps) {
  const NOT_FOUND_IMAGE_PATH = "image-not-found.png";

  const NOT_FOUND = "Not found";

  const ALL_META_TAGS = Array.from(document.querySelectorAll("meta"));

  let siteMetadata: Metadata = {
    twitter: {
      metadata: {
        title: NOT_FOUND,
        description: NOT_FOUND,
        image: NOT_FOUND_IMAGE_PATH,
        url: NOT_FOUND,
      },
      tags: [],
    },
    og: {
      metadata: {
        title: NOT_FOUND,
        description: NOT_FOUND,
        image: NOT_FOUND_IMAGE_PATH,
        url: NOT_FOUND,
      },
      tags: [],
    },
    general: {
      metadata: {
        title: NOT_FOUND,
        description: NOT_FOUND,
        image: NOT_FOUND_IMAGE_PATH,
        url: url,
      },
      tags: ALL_META_TAGS,
    },
    url,
  };

  const includesTitle = (tag: HTMLMetaElement) => {
    return (
      tag.getAttribute("property")?.includes("title") ||
      tag.name.includes("title")
    );
  };

  const includesDescription = (tag: HTMLMetaElement) => {
    return (
      tag.getAttribute("property")?.includes("description") ||
      tag.name.includes("description")
    );
  };
  const includesImage = (tag: HTMLMetaElement) => {
    return (
      tag.getAttribute("property")?.includes("image") ||
      tag.name.includes("image")
    );
  };
  const includesUrl = (tag: HTMLMetaElement) => {
    return (
      tag.getAttribute("property")?.includes("url") || tag.name.includes("url")
    );
  };

  const setMetadataAndTags = (standard: protocol) => {
    ALL_META_TAGS.filter(
      (tag) =>
        tag.getAttribute("property")?.includes(standard) ||
        tag.name.includes(standard)
    ).forEach((tag) => {
      if (includesTitle(tag))
        siteMetadata[standard].metadata.title = tag.content;

      if (includesImage(tag))
        siteMetadata[standard].metadata.image = tag.content;

      if (includesDescription(tag))
        siteMetadata[standard].metadata.description = tag.content;

      if (includesUrl(tag))
        siteMetadata[standard].metadata.url = new URL(tag.content).hostname;
    });
  };

  setMetadataAndTags("twitter");
  setMetadataAndTags("og");

  ALL_META_TAGS.forEach((tag) => {
    if (tag.name === "title") siteMetadata.general.metadata.title = tag.content;
    if (tag.name === "description")
      siteMetadata.general.metadata.description = tag.content;
  });

  return siteMetadata;
}
