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

  const includesAttribute = (tag: HTMLMetaElement, attribute: string) => {
    return (
      tag.getAttribute("property")?.includes(attribute) ||
      tag.name.includes(attribute)
    );
  };

  const setMetadataAndTags = (standard: protocol) => {
    ALL_META_TAGS.filter(
      (tag) =>
        tag.getAttribute("property")?.includes(standard) ||
        tag.name.includes(standard)
    ).forEach((tag) => {
      if (includesAttribute(tag, "title"))
        siteMetadata[standard].metadata.title = tag.content;

      if (includesAttribute(tag, "description"))
        siteMetadata[standard].metadata.description = tag.content;

      if (includesAttribute(tag, "image"))
        siteMetadata[standard].metadata.image = tag.content;

      if (includesAttribute(tag, "url"))
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
