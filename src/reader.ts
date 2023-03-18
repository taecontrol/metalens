import { Metadata, MetadataProps } from "./interfaces/metadata";

type getPageMetadataProps = {
  url: string;
};

type protocol = "twitter" | "og" | "general";

export default function getPageMetadata({ url }: getPageMetadataProps) {
  const NOT_FOUND_IMAGE_PATH = "image-not-found.png";

  const NOT_FOUND = "Not found";

  const META_TAGS = Array.from(document.querySelectorAll("meta"));

  const TITLE = document.querySelector("title");

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
        title: TITLE?.text ?? NOT_FOUND,
        description: NOT_FOUND,
        image: NOT_FOUND_IMAGE_PATH,
        url: url.split("&")[0],
      },
      tags: META_TAGS,
    },
    url,
  };

  const doesTagIncludesProperty = (tag: HTMLMetaElement, property: string) =>
    tag.name === property || tag.getAttribute("property") === property;

  META_TAGS.forEach((tag) => {
    Array.from(["og", "twitter", "general"] as protocol[]).forEach(
      (protocol: protocol) => {
        let protocolFixed = "";

        if (protocol === "og" || protocol === "twitter") {
          protocolFixed = `${protocol}:`;
        }

        if (doesTagIncludesProperty(tag, protocolFixed + "title")) {
          siteMetadata[protocol].metadata.title = tag.content;
        }

        if (doesTagIncludesProperty(tag, protocolFixed + "description")) {
          siteMetadata[protocol].metadata.description = tag.content;
        }

        if (doesTagIncludesProperty(tag, protocolFixed + "image")) {
          siteMetadata[protocol].metadata.image = tag.content;
        }

        if (doesTagIncludesProperty(tag, protocolFixed + "url")) {
          let url = tag.content.replace(/.*?\./, "").replace(/\/.*/, "");
          siteMetadata[protocol].metadata.url = url;
        }
      }
    );
  });

  return siteMetadata;
}
