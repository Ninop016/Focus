// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FocusTimer from './components/FocusTimer';
import TaskManagement from './components/TaskManagement';
import DistractionBlocker from './components/DistractionBlocker';
import MeditationSession from './components/MeditationSession';
import TopRightButtons from './components/TopRightButtons';
import BlockedPage from './components/blocked'; // Add this component to show when a site is blocked
import './styles.css';

function App() {
  const [isMeditation, setIsMeditation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [blockedWebsites, setBlockedWebsites] = useState([]);

  const startMeditation = () => {
    setIsMeditation(true);
  };

  const endMeditation = () => {
    setIsMeditation(false);
  };
  const currentUrl = window.location.hostname;
  console.log('Current URL:', currentUrl);  // Add this line
  

  useEffect(() => {
    // Fetch the list of blocked websites from the server
    fetch('http://localhost:3000/api/blocked-websites')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched blocked websites:', data);  // Add this line
        setBlockedWebsites(data.blockedWebsites);
  
        const currentUrl = window.location.hostname;
        if (data.blockedWebsites.some((website) => currentUrl.includes(website))) {
          console.log('Website is blocked, redirecting...');
          window.location.replace('/blocked'); // Redirect to blocked page
        }
      })
      .catch((error) => {
        console.error('Error fetching blocked websites:', error);
      });
  }, []);
  

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <TopRightButtons
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
        <h1>Focus Timer</h1>
        <Routes>
          <Route path="/" element={
            isMeditation ? (
              <MeditationSession endMeditation={endMeditation} />
            ) : (
              <div className="container">
                <FocusTimer startMeditation={startMeditation} />
                <TaskManagement />
                <DistractionBlocker />
              </div>
            )
          } />
          
          {/* Blocked page route */}
          <Route path="/blocked" element={<BlockedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
