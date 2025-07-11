import React, { useState, useRef, useEffect } from "react";
import "../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0); // in centiseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup
  }, []);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // 10ms = 1 centisecond
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const pad = (n) => n.toString().padStart(2, '0');

  const formatTime = (cs) => {
    const minutes = Math.floor(cs / 6000);
    const seconds = Math.floor((cs % 6000) / 100);
    const centis = cs % 100;
    return `${pad(minutes)}:${pad(seconds)}:${pad(centis)}`;
  };

  return (
    <div className="app">
      <h1>Lap Timer</h1>
      <div className="timer" data-testid="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
        <button onClick={recordLap} disabled={!isRunning}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
