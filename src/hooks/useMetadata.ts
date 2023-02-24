import { useEffect, useState } from "react";
import { Metadata } from "../interfaces/metadata";
import getPageMetadata from "../reader";

function useMetadata() {
  const [metadata, setMetadata] = useState<Metadata | undefined>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];

      if (tab.id) {
        chrome.scripting
          .executeScript({
            target: { tabId: tab.id, allFrames: true },
            func: getPageMetadata,
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
