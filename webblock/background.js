let blockedWebsitesPatterns = [];

// Fetch blocked websites from the React app (or server)
async function updateBlockedWebsites() {
  try {
    const response = await fetch('http://localhost:3000/api/blocked-websites');
    const data = await response.json();
    blockedWebsitesPatterns = data.blockedWebsites.map(site => {
      let pattern = site;
      if (!pattern.startsWith('http')) {
        pattern = '*://*.' + pattern + '/*'; // Match subdomains and paths
      }
      return pattern;
    });
    console.log('Blocked websites patterns:', blockedWebsitesPatterns);
    refreshWebRequestListener();
  } catch (error) {
    console.error('Error fetching blocked websites:', error);
  }
}

// Apply the rules to block websites
function refreshWebRequestListener() {
  // Remove all current rules first
  chrome.declarativeNetRequest.getDynamicRules((rules) => {
    const removeRuleIds = rules.map(rule => rule.id);

    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: removeRuleIds,
      addRules: [] // Clear current rules
    }, () => {
      console.log('Existing rules removed:', removeRuleIds);
      // Now add updated rules
      const newRules = blockedWebsitesPatterns.map((pattern, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: pattern, resourceTypes: ["main_frame"] } // Block entire webpage
      }));

      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [],
        addRules: newRules
      }, () => {
        console.log('Blocking rules updated:', newRules);
      });
    });
  });
}

self.addEventListener('install', () => {
  console.log('Service worker installed');
  updateBlockedWebsites();
  setInterval(updateBlockedWebsites, 300000); // Update every 5 minutes
});

// Listen for React app to add/remove websites from block list
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchWebsites') {
    chrome.storage.local.get(['blockedSites'], (result) => {
      sendResponse({ action: 'fetchWebsites', payload: result.blockedSites || [] });
    });
    return true; // Indicate async response
  }

  if (message.action === 'addWebsite') {
    chrome.storage.local.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      blockedSites.push(message.payload.website);
      chrome.storage.local.set({ blockedSites }, () => {
        updateBlockedWebsites();
        sendResponse({ message: 'Website added', blockedSites, action: 'fetchWebsites', payload: blockedSites });
      });
    });
    return true;
  }

  if (message.action === 'removeWebsite') {
    chrome.storage.local.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites.filter(item => item !== message.payload.website);
      chrome.storage.local.set({ blockedSites }, () => {
        updateBlockedWebsites();
        sendResponse({ message: 'Website removed', blockedSites, action: 'fetchWebsites', payload: blockedSites });
      });
    });
    return true;
  }
});
