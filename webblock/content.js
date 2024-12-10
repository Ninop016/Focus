window.addEventListener("message", (event) => {
    if (event.source !== window || event.data.type !== "FROM_REACT_APP") return;
  
    const { action, payload } = event.data;
  
    // Forward the message to the background script to handle blocking logic
    chrome.runtime.sendMessage({ action, payload }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background script:", chrome.runtime.lastError);
        return;
      }
  
      // Forward the response back to the React app
      window.postMessage({ type: "FROM_EXTENSION", action, payload: response.payload }, "*");
    });
  });
  