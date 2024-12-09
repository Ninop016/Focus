// src/App.jsx
import { useState } from 'react';
import FocusTimer from './components/FocusTimer';
import TaskManagement from './components/TaskManagement';
import DistractionBlocker from './components/DistractionBlocker';
import MeditationSession from './components/MeditationSession';
import TopRightButtons from './components/TopRightButtons';
import './styles.css';

function App() {
  const [isMeditation, setIsMeditation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const startMeditation = () => {
    setIsMeditation(true);
  };

  const endMeditation = () => {
    setIsMeditation(false);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <TopRightButtons
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <h1>Focus Timer App</h1>
      {isMeditation ? (
        <MeditationSession endMeditation={endMeditation} />
      ) : (
        <div className="container">
          <FocusTimer startMeditation={startMeditation} />
          <TaskManagement />
          <DistractionBlocker />
        </div>
      )}
    </div>
  );
}

export default App;