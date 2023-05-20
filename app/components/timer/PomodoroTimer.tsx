"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayPauseButton from "./PlayPauseButton";
import { useCallback, useEffect, useState } from "react";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";
import useSettingsModal from "@/app/hooks/useSettingsModal";
import toast from "react-hot-toast";
import getCurrentUser from "@/app/actions/getCurrentUser";

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
  const settingsModal = useSettingsModal();

  function toggleSettings() {
    console.log("abc1");
    settingsModal.onOpen();
  }

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
          console.log("Complete");
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
    <div className="timer w-full items-center px-auto">
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
          textColor: "#F0E6D4",
          pathColor: "#4E7563",
          trailColor: "#F0E6D4",
          textSize: 21,
          pathTransitionDuration: 1.05,
        })}
      />
      <div
        className="
        items-center 
        relative 
        w-full
        p-10
        flex
        flex-row
        justify-center
        right-10
        
        "
      >
        <div className="flex justify-center">
          <div className="flex space-x-24">
            <ResetButton onClick={handleReset} />

            <PlayPauseButton onClick={handleStartStop} clicked={isRunning} />

            <SettingsButton onClick={toggleSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
