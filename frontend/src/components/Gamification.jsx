import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Gamification = () => {
  const [points, setPoints] = useState(() => {
    // Load points from localStorage on initial render
    const savedPoints = localStorage.getItem("points");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  const [badges, setBadges] = useState(() => {
    const savedBadges = localStorage.getItem("badges");
    return savedBadges ? JSON.parse(savedBadges) : [];
  });

  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem("streak");
    return savedStreak ? parseInt(savedStreak, 10) : 0;
  });

  const [isVisible, setIsVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  // Save data to localStorage whenever points, badges, or streak change
  useEffect(() => {
    localStorage.setItem("points", points);
  }, [points]);

  useEffect(() => {
    localStorage.setItem("badges", JSON.stringify(badges));
  }, [badges]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  const completeFocusSession = () => {
    setPoints((prev) => {
      const newPoints = prev + 10;
      checkForBadges(newPoints, streak + 1);
      if (calculateLevel(prev) < calculateLevel(newPoints)) {
        triggerConfetti();
      }
      return newPoints;
    });
    setStreak((prev) => prev + 1);
  };

  const resetStreak = () => setStreak(0);

  const checkForBadges = (newPoints, newStreak) => {
    const potentialBadges = [];
    if (newPoints >= 50 && !badges.includes("First 50 Points"))
      potentialBadges.push("First 50 Points");
    if (newPoints >= 100 && !badges.includes("Focus Pro"))
      potentialBadges.push("Focus Pro");
    if (newPoints >= 250 && !badges.includes("Focus Master"))
      potentialBadges.push("Focus Master");
    if (newStreak >= 5 && !badges.includes("5 Day Streak"))
      potentialBadges.push("5 Day Streak");
    if (newStreak >= 10 && !badges.includes("Consistent Achiever"))
      potentialBadges.push("Consistent Achiever");

    if (potentialBadges.length > 0) triggerConfetti();

    const uniqueBadges = [...new Set([...badges, ...potentialBadges])];
    setBadges(uniqueBadges);
  };

  const calculateLevel = (points) => Math.floor(points / 100);
  const nextLevelPoints = (points) => 100 - (points % 100);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="gamification">
      {showConfetti && <Confetti width={width} height={height} />}
      <h2>Gamification</h2>
      <button onClick={toggleVisibility} className="button">
        {isVisible ? "Hide Stats" : "Show Stats"}
      </button>
      {isVisible && (
        <div>
          <p className="points">{points} Points</p>
          <p>Level: {calculateLevel(points)}</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(points % 100)}%` }}
            ></div>
          </div>
          <p>{nextLevelPoints(points)} points to next level</p>
          <p>Streak: {streak} days</p>
          <h3>Badges:</h3>
          <div className="badges">
            {badges.map((badge, index) => (
              <div key={index} className="badge">
                {badge}
              </div>
            ))}
          </div>
          <button onClick={completeFocusSession} className="button">
            Complete Focus Session
          </button>
          <button onClick={resetStreak} className="button">
            Reset Streak
          </button>
        </div>
      )}
    </div>
  );
};

export default Gamification;
