// src/App.jsx
import React, { useState } from "react";
import FocusTimer from "./components/FocusTimer";
import TaskManagement from "./components/TaskManagement";
import DistractionBlocker from "./components/DistractionBlocker";
import MeditationSession from "./components/MeditationSession";
import SubmitFeedback from "./components/SubmitFeedback";
import "./styles.css";

function App() {
  const [isMeditation, setIsMeditation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const startMeditation = () => {
    setIsMeditation(true);
  };

  const endMeditation = () => {
    setIsMeditation(false);
  };

  const handleToggleFeedback = () => {
    setShowFeedback((prevState) => !prevState);
  };

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <div className="top-right-buttons">
        <button onClick={() => setDarkMode(!darkMode)} className="button">
          {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
        </button>
        <button onClick={handleToggleFeedback} className="button">
          {showFeedback ? "Back to App" : "Submit Feedback"}
        </button>
      </div>
      <h1>Focus Timer App</h1>
      {showFeedback ? (
        <SubmitFeedback onSurveyComplete={handleToggleFeedback} />
      ) : isMeditation ? (
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
