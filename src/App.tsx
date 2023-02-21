import { useEffect, useState } from "react";
import { metadata } from "./interfaces/metadata";
import TwitterMeta from "./components/TwitterMeta";

function App() {
  const [metadata, setMetadata] = useState<metadata | undefined>();

  useEffect(() => {
    chrome.runtime.sendMessage(
      { type: "getMetadata" },
      undefined,
      (response) => {
        setMetadata(response);
      }
    );
    () => chrome.runtime.onMessage.removeListener(() => true);
  }, []);
  return (
    <div className="w-96 h-96">
      <div className="flex flex-col justify-center space-y-3 py-2 px-4">
        { metadata && <TwitterMeta metadata={metadata}/>}
      </div>
    </div>
  );
}

export default App;
