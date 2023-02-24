import { useEffect, useState } from "react";
import TwitterMeta from "./components/TwitterMeta";
import OpenGraphMeta from "./components/OpenGraphMeta";
import { Metadata } from "./interfaces/metadata";
import getPageMetadata from "./reader";
import useMetadata from "./hooks/useMetadata";

function App() {
  const [metadata] = useMetadata();

  return (
    <div className="w-96 h-96">
      <div className="flex flex-col justify-center px-3 py-5 space-y-5 overscroll-y-auto">
        <div>
          <p className="text-xs font-semibold text-slate-700 text-center mb-5">
            Twitter
          </p>
          {metadata?.twitter && (
            <TwitterMeta props={metadata.twitter.metadata} />
          )}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 text-center mb-5">
            Open-Graph
          </p>
          {metadata?.openGraph && (
            <OpenGraphMeta props={metadata.openGraph.metadata} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
