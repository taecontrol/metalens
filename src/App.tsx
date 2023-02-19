import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log('aja');
    chrome.runtime.sendMessage({type: "getMetadata"}, undefined, (response) => {
      console.log(response);
    });
    () => chrome.runtime.onMessage.removeListener(() => true);
  }, []);
  return (
    <div className="w-96 h-96">
      <div className="flex flex-col justify-center space-y-3 py-2 px-4">
        <div>
          <h2 className="text-lg font-bold">Title</h2>
          <span>MoonGuard</span>
        </div>
        <div>
          <h2 className="text-lg font-bold">Description</h2>
          <span>Filadaputa</span>
        </div>
      </div>
    </div>
  );
}

export default App;
