const metadata = Array.from(document.querySelectorAll("meta"));

const twitterMetadata = metadata
  .filter((tag) => tag.getAttribute("property")?.includes("twitter"))
  .map((tag) => ({
    name: "title",
    content: tag.content,
    property: tag.getAttribute("property"),
    spec: "twitter",
  }));

chrome.runtime.sendMessage({
  type: "metadata",
  payload: {
    metadata: {
      twitter: twitterMetadata,
    },
  },
});
