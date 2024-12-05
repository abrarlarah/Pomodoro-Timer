import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkTime, setIsWorkTime] = useState(true);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if ((isWorkTime && workMinutes === 0) || (!isWorkTime && breakMinutes === 0)) {
            setIsWorkTime(!isWorkTime);
            setSeconds(0);
            isWorkTime ? setBreakMinutes(breakMinutes) : setWorkMinutes(workMinutes);
          } else {
            isWorkTime ? setWorkMinutes((prev) => prev - 1) : setBreakMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds, isWorkTime, workMinutes, breakMinutes]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setWorkMinutes(25);
    setBreakMinutes(5);
    setSeconds(0);
    setIsWorkTime(true);
  };

  const handleSetTime = () => {
    const workInput = parseInt(document.getElementById("workInput").value, 10);
    const breakInput = parseInt(document.getElementById("breakInput").value, 10);

    if (!isNaN(workInput) && workInput > 0) setWorkMinutes(workInput);
    if (!isNaN(breakInput) && breakInput > 0) setBreakMinutes(breakInput);
  };

  const formatTime = (minutes, seconds) => {
    const m = String(minutes).padStart(2, "0");
    const s = String(seconds).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="App">
      <h1>{isWorkTime ? "Work - Time" : "Break - Time"}</h1>
      <h2>{formatTime(isWorkTime ? workMinutes : breakMinutes, seconds)}</h2>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <input
          id="workInput"
          type="number"
          placeholder="Work (min)"
          defaultValue={25}
        />
        <input
          id="breakInput"
          type="number"
          placeholder="Break (min)"
          defaultValue={5}
        />
        <button onClick={handleSetTime}>Set</button>
      </div>
    </div>
  );
}

export default App;
