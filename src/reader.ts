import { Metadata, MetadataProps } from "./interfaces/metadata";

type getPageMetadataProps = {
  url: string;
};

type protocol = "twitter" | "og" | "general";

export default function getPageMetadata({ url }: getPageMetadataProps) {
  const NOT_FOUND_IMAGE_PATH = "image-not-found.png";

  const NOT_FOUND = "Not found";

  const META_TAGS = Array.from(document.querySelectorAll("meta"));

  const siteMetadata: Metadata = {
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
      tags: META_TAGS,
    },
    url,
  };

  const tagIncludesAttribute = (tag: HTMLMetaElement, attribute: string) =>
    tag.getAttribute("property")?.includes(attribute) ||
    tag.name.includes(attribute);

  const tagHasAttribute = (tag: HTMLMetaElement, attribute: string) =>
    tag.getAttribute("property") === attribute || tag.name === attribute;

  const setMetadataAndTags = (standard: protocol) => {
    META_TAGS.filter((tag) => tagIncludesAttribute(tag, standard)).forEach(
      (tag) => {
        if (tagHasAttribute(tag, `${standard}:title`))
          siteMetadata[standard].metadata.title = tag.content;

        if (tagHasAttribute(tag, `${standard}:description`))
          siteMetadata[standard].metadata.description = tag.content;

        if (tagHasAttribute(tag, `${standard}:image`))
          siteMetadata[standard].metadata.image = tag.content;

        if (tagHasAttribute(tag, `${standard}:url`))
          siteMetadata[standard].metadata.url = new URL(tag.content).hostname;

        siteMetadata[standard].tags.push(Object.assign({}, tag));
      }
    );
  };

  setMetadataAndTags("twitter");
  setMetadataAndTags("og");

  META_TAGS.forEach((tag) => {
    if (tag.name === "title") siteMetadata.general.metadata.title = tag.content;
    if (tag.name === "description")
      siteMetadata.general.metadata.description = tag.content;
  });

  return siteMetadata;
}
