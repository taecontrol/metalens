import { useEffect, useState } from "react";
import { metadata, metadataProps } from "./interfaces/metadata";
import TwitterMeta from "./components/TwitterMeta";
import OpenGraphMeta from "./components/OpenGraphMeta";

function App() {
  const [siteMetadata, setSiteMetadata] = useState<metadata | undefined>();

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: "getMetadata" },
      undefined,
      (response) => {
        setSiteMetadata(response);
      }
    );
    () => chrome.runtime.onMessage.removeListener(() => true);
  }, []);

  return (
    <div className="w-96 h-96">
      <div className="flex flex-col justify-center px-3 py-5 space-y-5 overscroll-y-auto">
        <div>
          <p className="text-xs font-semibold text-slate-700 text-center mb-5">
            Twitter
          </p>
          {siteMetadata?.twitter && (
            <TwitterMeta
              props={siteMetadata.twitter.metadata as metadataProps}
            />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 text-center mb-5">
            Open-Graph
          </p>
          {siteMetadata?.openGraph && (
            <OpenGraphMeta
              props={siteMetadata.openGraph.metadata as metadataProps}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
