import React, { useState, useRef, useEffect } from "react";
import '../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0); // time in centiseconds (10ms)
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);

  // Start Timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 10); // 10ms = 1 centisecond
    }
  };

  // Stop Timer
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Lap Timer
  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  // Clear interval on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Format Time Utility
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centis = centiseconds % 100;

    return `${pad(minutes)}:${pad(seconds)}.${pad(centis)}`;
  };

  const pad = (num) => num.toString().padStart(2, "0");

  return (
    <div className="app">
      <h1>Lap Timer</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="laps">
        {laps.map((lapTime, index) => (
          <div key={index}>Lap {index + 1}: {formatTime(lapTime)}</div>
        ))}
      </div>
    </div>
  );
};

export default App;
