let metadata;

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content-script.js"],
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('hola');
  if (message.type === "metadata") {
    console.log(message.payload);
    metadata = message.payload;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getMetadata") {
    sendResponse(metadata);
  }
});
