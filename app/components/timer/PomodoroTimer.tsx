"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayPauseButton from "./PlayPauseButton";
import { useCallback, useEffect, useState } from "react";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";
import Container from "@/app/Container";

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
  const [isRunning, SetIsRunning] = useState(false);

  function formatTime(hrs: number, mins: number, secs: number): string {
    const formattedHours = hrs.toString().padStart(2, "0");
    const formattedMinutes = mins.toString().padStart(2, "0");
    const formattedSeconds = secs.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  let targetTime = formatTime(hrs, mins, secs);

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;
    const p = hours * 3600 + minutes * 60 + seconds;
    const t = hrs * 3600 + mins * 60 + secs;
    setProgress(100 - (p * 100) / t);
    if (isRunning) {
      countdown = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
          SetIsRunning(false);
        } else {
          setSeconds(seconds - 1);

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
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [hours, minutes, seconds, isRunning, progress]);

  const handleStartStop = () => {
    SetIsRunning(!isRunning);
  };

  const handleReset = () => {
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
    SetIsRunning(false);
  };

  const handleSettings = () => {};

  return (
    <div className="timer w-full items-center border px-auto">
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
          pathTransitionDuration: 1.05,
        })}
      />
      <div
        className="
        items-center 
        border
        relative 
        w-full
        p-10
        flex
        flex-row
        justify-around
        right-11
        "
      >
        <Container>
          <ResetButton onClick={handleReset} />
        </Container>
        <Container>
          <PlayPauseButton onClick={handleStartStop} clicked={isRunning} />
        </Container>
        <Container>
          <SettingsButton onClick={handleSettings} />
        </Container>
      </div>
    </div>
  );
};

export default PomodoroTimer;
