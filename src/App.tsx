import TwitterMeta from "./components/TwitterMeta";
import OpenGraphMeta from "./components/OpenGraphMeta";
import useMetadata from "./hooks/useMetadata";
import GoogleMeta from "./components/GoogleMeta";

function App() {
  const [metadata] = useMetadata();

  return (
    <div className="w-[450px] h-96">
      <div className="flex flex-col justify-center px-3 py-5 space-y-10 overscroll-y-auto">
        <div>
          <p className="text-[17px] font-semibold text-slate-700 text-left mb-2">
            Google
          </p>
          <GoogleMeta props={metadata?.general} />
        </div>
        <div>
          <p className="text-[17px] font-semibold text-slate-700 text-left mb-2">
            Twitter
          </p>
          <TwitterMeta props={metadata?.twitter} />
        </div>
        <div>
          <p className="text-[17px] font-semibold text-slate-700 text-left mb-2">
            Open Graph
          </p>
          <OpenGraphMeta props={metadata?.og} />
        </div>
      </div>
    </div>
  );
}

export default App;
