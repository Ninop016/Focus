import { useState, useEffect } from 'react';

function DistractionBlocker() {
  const [websiteInput, setWebsiteInput] = useState('');
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Fetch the list of blocked websites from the server
    fetch('http://localhost:3000/api/blocked-websites')
      .then((response) => response.json())
      .then((data) => setWebsites(data.blockedWebsites));
  }, []);

  const addWebsite = () => {
    if (websiteInput.trim()) {
      fetch('http://localhost:3000/api/blocked-websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: websiteInput.trim() }),
      })
        .then((response) => response.json())
        .then((data) => setWebsites(data.blockedWebsites));
      setWebsiteInput('');
    }
  };

  const removeWebsite = (website) => {
    fetch('http://localhost:3000/api/blocked-websites', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ website }),
    })
      .then((response) => response.json())
      .then((data) => setWebsites(data.blockedWebsites));
  };

  return (
    <div className="distraction-blocker">
      <h2>Distraction Blocker</h2>
      <input
        type="text"
        placeholder="Enter website to block"
        value={websiteInput}
        onChange={(e) => setWebsiteInput(e.target.value)}
      />
      <button onClick={addWebsite}>Add Website</button>
      <ul>
        {websites.map((website, index) => (
          <li key={index}>
            {website}
            <button onClick={() => removeWebsite(website)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DistractionBlocker;
