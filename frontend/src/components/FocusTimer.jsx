import React, { useState, useEffect } from "react";

function FocusTimer({ startMeditation }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(25);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
            alert("Time for a break!");
            startMeditation();
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, minutes, seconds, startMeditation]);

  const startTimer = () => {
    setMinutes(duration);
    setSeconds(0);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(duration);
    setSeconds(0);
  };

  const totalSeconds = duration * 60;
  const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
  const progress = (elapsedSeconds / totalSeconds) * 100;

  return (
    <div className="focus-timer">
      <h2>Focus Timer</h2>
      <input
        type="number"
        min="1"
        value={duration}
        onChange={(e) => setDuration(parseInt(e.target.value))}
        placeholder="Focus Duration (minutes)"
      />
      <div className="stopwatch-container">
        <div className="stopwatch">
          <svg
            className="circular-chart"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="circle-bg"
              d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
        </div>
        <div className="timer-text">
          {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
        </div>
      </div>
      <button onClick={startTimer}>Start</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default FocusTimer;
