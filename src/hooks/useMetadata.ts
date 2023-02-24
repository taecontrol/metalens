import { useEffect, useState } from "react";
import { Metadata } from "../interfaces/metadata";
import getPageMetadata from "../reader";

function useMetadata() {
  const [metadata, setMetadata] = useState<Metadata | undefined>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      let url = tabs[0].url;

      if (tab.id && url) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: getPageMetadata,
            args: [{ url }],
          })
          .then((results) => {
            if (results.length > 0) {
              setMetadata(results[0].result as Metadata);
            }
          });
      }
    });
  }, []);

  return [metadata];
}

export default useMetadata;
