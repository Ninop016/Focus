import { useState, useEffect } from 'react';

function FocusTimer({ startMeditation }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState(25);
  const [isActive, setIsActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsActive(false);
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              startMeditation();
            }, 3000);
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

  const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    zIndex: '1000',
  };

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
      <p id="timer-display">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>
      <button onClick={startTimer}>Start</button>
      <button onClick={resetTimer}>Reset</button>

      {showPopup && (
        <div id="break-popup" style={popupStyle}>
          <h2>Time for a break!</h2>
        </div>
      )}
    </div>
  );
}

export default FocusTimer;