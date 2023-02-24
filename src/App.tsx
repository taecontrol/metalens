import TwitterMeta from "./components/TwitterMeta";
import OpenGraphMeta from "./components/OpenGraphMeta";
import useMetadata from "./hooks/useMetadata";
import GoogleMeta from "./components/GoogleMeta";

function App() {
  const [metadata] = useMetadata();

  return (
    <div className="w-[450px] h-96">
      <div className="flex flex-col justify-center px-3 py-5 space-y-5 overscroll-y-auto">
        <div>
          <p className="text-xs font-semibold text-slate-700 text-left mb-5">
            Google
          </p>
          {metadata?.general && <GoogleMeta props={metadata.general} />}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 text-left mb-5">
            Twitter
          </p>
          {metadata?.twitter && <TwitterMeta props={metadata.twitter} />}
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 text-left mb-5">
            Open-Graph
          </p>
          {metadata?.openGraph && <OpenGraphMeta props={metadata.openGraph} />}
        </div>
      </div>
    </div>
  );
}

export default App;
