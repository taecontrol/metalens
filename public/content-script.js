const metadata = Array.from(document.querySelectorAll("meta"));

let twitterMetadata = {
  title: "",
  description: "",
  image: "",
  url: "",
};

const twitterTags = metadata
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

const allMeta = {
  twitter: {
    twitterMetadata,
    twitterTags,
  }
}

chrome.runtime.sendMessage({
  type: "metadata",
  payload: { metadata: allMeta },
});
