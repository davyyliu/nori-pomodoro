"use client";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayPauseButton from "./PlayPauseButton";
import { useEffect, useState } from "react";
import ResetButton from "./ResetButton";
import SettingsButton from "./SettingsButton";
import useSettingsModal from "@/app/hooks/useSettingsModal";
import SoundButton from "./SoundButton";

interface PomodoroTimerProps {
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
  const [hasSound, setHasSound] = useState(true);
  const settingsModal = useSettingsModal();

  function toggleSettings() {
    settingsModal.onOpen();
  }

  const audio = new Audio(
    "/sounds/Tibetan Singing Bowl Sounds WAV TRIMMED.wav"
  );

  const playSound = () => {
    if (hasSound) {
      audio.volume = 0.25;
    } else {
      audio.volume = 0;
    }

    audio.play();
  };

  function formatTime(hrs: number, mins: number, secs: number): string {
    if (mins === 60) {
      hrs = 1;
      mins = 0;
    }
    const formattedHours = String(hrs).padStart(2, "0");
    const formattedMinutes = String(mins).padStart(2, "0");
    const formattedSeconds = String(secs).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

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
      playSound();
    } else {
      if (isRunning && sbType != "Complete!") {
        countdown = setInterval(() => {
          if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsRunning(false);
          }
          if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsRunning(false);
            setProgress(0);
            if (sbType === "Study") {
              setSBType("Break");
              setHours(breakhrs);
              setMinutes(breakmins);
              setSeconds(breaksecs);
              playSound();
            } else {
              if (currSess < totalSess) {
                setCurrSess(currSess + 1);
                setSBType("Study");
                setHours(studyhrs);
                setMinutes(studymins);
                setSeconds(studysecs);
                playSound();
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
        if (p == t) {
          setProgress(0);
          setHours(studyhrs);
          setMinutes(studymins);
          setSeconds(studysecs);
        }
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

  const handleSound = () => {
    setHasSound(!hasSound);
  };

  return (
    <div
      className="
      timer 
      drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
      xs:left-12
      xs:top-60
      "
    >
      <CircularProgressbarWithChildren
        value={progress}
        strokeWidth={4}
        circleRatio={1}
        maxValue={100}
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
        grid
        relative
        -top-6
        right-5
        xs:-top-10
        sm:-top-2
        sm:right-2
        md:-top-2
        md:right-2
        lg:-top-5
        lg:right-3
        xl:-top-6
        xl:right-3
        2xl:-top-10
        2xl:right-5
        "
        >
          <SoundButton onClick={handleSound} clicked={hasSound} />
        </div>
        <div
          className={`
          pomoSbtype
          ${sbType === "Study" ? "text-[#4E7563]" : ""}
          ${sbType === "Complete!" ? "text-[#B5E4F6]" : ""}
          ${sbType === "Break" ? "text-[#F0E6D4]" : ""}
        drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
        font-bold 
        py-auto
        xs:text-4xl
        sm:text-lg
        md:text-xl
        lg:text-2xl
        xl:text-3xl
        2xl:text-5xl
        `}
        >
          {sbType}
        </div>
        <div
          className="
          pomoTime
        text-[#F0E6D4]
        font-semibold 
        xs:text-5xl
        sm:text-xl
        md:text-2xl
        lg:text-3xl
        xl:text-4xl
        2xl:text-6xl
        drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
        p-auto
        "
        >
          {formatTime(hours, minutes, seconds)}
        </div>
        <div className="py-1"></div>
        <div
          className="
          pomoSess
          flex 
          drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
          font-semibold 
          text-4xl 
        py-auto
        xs:text-4xl
        sm:text-lg
        md:text-xl
        lg:text-2xl
        xl:text-3xl
        2xl:text-5xl
          items-center 
          text-[#F0E6D4]
          justify-center"
        >
          {currSess}/{totalSess}
        </div>
      </CircularProgressbarWithChildren>

      <div>
        <div
          className="
        grid
        relative
        -top-6
        right-5
        xs:top-2
        xs:right-4
        sm:top-2
        sm:right-0
        md:top-2
        md:right-1
        lg:top-2
        lg:right-2
        xl:top-1
        xl:right-4
        2xl:top-4
        2xl:right-6"
        >
          <PlayPauseButton onClick={handleStartStop} clicked={isRunning} />
        </div>
        <div
          className="
        grid
        relative
        -top-6
        right-5
        xs:top-6
        xs:-right-16
        sm:top-3
        sm:-right-5
        md:top-4
        md:-right-7
        lg:top-5
        lg:-right-10
        xl:top-5
        xl:-right-12
        2xl:top-9
        2xl:-right-20"
        >
          <SettingsButton onClick={toggleSettings} />
        </div>
        <div
          className="
        grid
        relative
        -top-6
        right-5
        xs:top-6
        xs:right-14
        sm:top-3
        sm:right-2
        md:top-4
        md:right-6
        lg:top-5
        lg:right-8
        xl:top-4
        xl:right-12
        2xl:top-8
        2xl:right-20"
        >
          <ResetButton onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
