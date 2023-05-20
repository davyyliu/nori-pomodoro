"use client";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayPauseButton from "./PlayPauseButton";
import { useCallback, useEffect, useState } from "react";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";
import useSettingsModal from "@/app/hooks/useSettingsModal";
import toast from "react-hot-toast";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/Container";

interface PomodoroTimerProps {
  onClick: () => void;
  studyhrs: number;
  studymins: number;
  studysecs: number;
  breakhrs: number;
  breakmins: number;
  breaksecs: number;
  sess: number;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  studyhrs,
  studymins,
  studysecs,
  breakhrs,
  breakmins,
  breaksecs,
  sess,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [hours, setHours] = useState(studyhrs);
  const [minutes, setMinutes] = useState(studymins);
  const [seconds, setSeconds] = useState(studysecs);
  const [isRunning, setIsRunning] = useState(false);
  const [currSess, setCurrSess] = useState(1);
  const [totalSess, setTotalSess] = useState(sess);
  const [sbType, setSBType] = useState<String>("Study");
  const settingsModal = useSettingsModal();

  function toggleSettings() {
    console.log("abc1");
    settingsModal.onOpen();
  }

  function formatTime(hrs: number, mins: number, secs: number): string {
    const formattedHours = String(hrs).padStart(2, "0");
    const formattedMinutes = String(mins).padStart(2, "0");
    const formattedSeconds = String(secs).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  let targetTime = formatTime(studyhrs, studymins, studysecs);

  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;
    const p = hours * 3600 + minutes * 60 + seconds;
    const t = studyhrs * 3600 + studymins * 60 + studysecs;
    setProgress(100 - (p * 100) / t);
    if (
      sbType === "Break" &&
      currSess === totalSess &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0
    ) {
      setIsRunning(false);
      setSBType("Complete!");
      console.log("Completed Pomodoro");
    } else {
      if (isRunning && sbType != "Complete!") {
        countdown = setInterval(() => {
          if (hours === 0 && minutes === 0 && seconds === 0) {
            console.log(currSess);
            console.log(totalSess);
            setIsRunning(false);
            // handleReset();
            console.log("Complete");
          }
          if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsRunning(false);
            setProgress(0);
            if (sbType === "Study") {
              setSBType("Break");
              setHours(breakhrs);
              setMinutes(breakmins);
              setSeconds(breaksecs);
            } else {
              if (currSess < totalSess) {
                setCurrSess(currSess + 1);
                setSBType("Study");
                setHours(studyhrs);
                setMinutes(studymins);
                setSeconds(studysecs);
              }
            }
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
      } else {
        setProgress(0);
        setHours(studyhrs);
        setMinutes(studymins);
        setSeconds(studysecs);
      }
    }

    return () => {
      if (countdown) {
        clearInterval(countdown);
      }
    };
  }, [seconds, isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setHours(studyhrs);
    setMinutes(studymins);
    setSeconds(studysecs);
    setSBType("Study");
    setIsRunning(false);
    setTotalSess(sess);
    setCurrSess(1);
  };

  const handleSettings = () => {};

  return (
    <div className="timer w-full items-center px-auto">
      <CircularProgressbarWithChildren
        value={progress}
        // text={`0:53:21`}
        // text={formatTime(hours, minutes, seconds)}
        strokeWidth={4}
        circleRatio={1}
        // text={`${hours}:${minutes}:${seconds}`}
        maxValue={100}
        // counterClockwise styles=
        styles={buildStyles({
          textColor: "#F0E6D4",
          pathColor: "#4E7563",
          trailColor: "#F0E6D4",
          textSize: 21,
          pathTransitionDuration: 1.05,
        })}
      >
        <div
          className="
        text-[#F0E6D4]
        font-semibold 
        text-4xl
        py-5"
        >
          {sbType}
        </div>
        <div
          className="
        text-[#F0E6D4]
        font-semibold 
        text-6xl
        p-auto
        "
        >
          {formatTime(hours, minutes, seconds)}
        </div>
        <div className="py-1"></div>
        <div
          className="flex 
      font-semibold 
      text-4xl 
      py-5
      items-center 
      text-[#F0E6D4]
      justify-center"
        >
          {currSess}/{totalSess}
        </div>
      </CircularProgressbarWithChildren>

      <div
        className="
        items-center 
        relative 
        w-full
        
        flex
        flex-row
        justify-center
        right-10
        
        "
      >
        <div className="flex grid-cols-3 p-5 justify-center">
          {/* <div className="flex space-x-24"> */}
          <PlayPauseButton onClick={handleStartStop} clicked={isRunning} />
          {/* </div> */}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center">
        <div
          className="
          max-w-[2520px]
          mx-auto
          xl:px-20
          md:px-10
          sm:px-2
          px-4"
        ></div>
        <SettingsButton onClick={toggleSettings} />
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
};

export default PomodoroTimer;
