"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayPauseButton from "./PlayPauseButton";
import { useCallback, useEffect, useState } from "react";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";

interface PomodoroTimerProps {
  onClick: () => void;
  hrs: number;
  mins: number;
  secs: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ hrs, mins, secs }) => {
  const [progress, setProgress] = useState<number>(0);
  const [hours, setHours] = useState(hrs);
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);
  const [isRunning, SetisRunning] = useState(false);

  function formatTime(hrs: number, mins: number, secs: number): string {
    const formattedHours = hrs.toString().padStart(2, "0");
    const formattedMinutes = mins.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  let targetTime = formatTime(hrs, mins, secs);

  useEffect(() => {
    // const target = new Date(`1970-01-01T${targetTime}`);
    // let countdown: NodeJS.Timeout | null = null;
    // console.log(target);
    // if (isRunning) {
    const countdown = setInterval(() => {
      // const endTime = new Date(`1970-01-01T00:00:00`);

      // console.log(seconds);

      if (hours === 0 && minutes === 0 && seconds === 0) {
        SetisRunning(false);
      } else {
        setSeconds(seconds - 1);
        const p = hours * 3600 + minutes * 60 + seconds;
        const t = hrs * 3600 + mins * 60 + secs;
        setProgress(100 - (p * 100) / t);

        // console.log(progress)
        console.log(p / t);

        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
        if (minutes === 0 && seconds === 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
        // }
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [hours, minutes, seconds]);

  const handleStartStop = () => {
    SetisRunning(!isRunning);
  };

  const handleReset = () => {
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
    SetisRunning(false);
  };

  const handleSettings = () => {};

  return (
    <div className="timer w-96 px-auto">
      <CircularProgressbar
        value={progress}
        // text={`0:53:21`}
        text={formatTime(hours, minutes, seconds)}
        strokeWidth={4}
        circleRatio={1}
        // text={`${hours}:${minutes}:${seconds}`}
        maxValue={100}
        // counterClockwise

        styles={buildStyles({
          textColor: "#fff",
          pathColor: "#4E7563",
          trailColor: "#F0E6D4",
          textSize: 20,
          pathTransitionDuration: 4,
        })}
      />
      <div
        className="
        relative
        items-center 
        w-96
        py-10
        px-auto
        flex
        flex-row
        justify-between
        "
      >
        <div>
          <ResetButton onClick={handleReset} />
        </div>
        <div>
          <PlayPauseButton onClick={handleStartStop} />
        </div>
        <div>
          <SettingsButton onClick={handleSettings} />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
