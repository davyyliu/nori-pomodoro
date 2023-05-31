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
import toast from "react-hot-toast";

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
  const [elapsedTime, setElapsedTime] = useState(0);
  const settingsModal = useSettingsModal();

  // Handle Countdown here

  // useEffect is used here to ensure only 1 worker is created.
  useEffect(() => {
    const workerScript = `
        let intervalId;
        let time = 0;
        let pausedTime = 0;
        let isPaused = false;

        function startTimer(t = 0) {
          time = t
          intervalId = setInterval(sendElapsedTime, 1000);
        }

        function stopTimer() {
          clearInterval(intervalId);
        }

        function pauseTimer() {
          if(!isPaused) {
            
          }
        }

        function sendElapsedTime() {
          time ++;
          const elapsedTime = time
          self.postMessage(elapsedTime);
        }

        self.addEventListener("message", function (event) {
          if (event.data === "start") {
            startTimer();
          } else if (event.data === "stop") {
            stopTimer();
          } else {
            startTimer(event.data)
          }
        });
      `;

    // Creating Worker via above worker script
    const blob = new Blob([workerScript], {
      type: "applications/javascript",
    });
    const workerURL = URL.createObjectURL(blob);
    const worker = new Worker(workerURL);

    if (isRunning) {
      // Allows play and pause capability with
      // "else {startTimer(event.data)}" above
      worker.postMessage(elapsedTime);

      worker.onmessage = (event) => {
        setElapsedTime(event.data);
      };
    } else {
      worker.postMessage("stop");
      worker.terminate();
      URL.revokeObjectURL(workerURL);
    }
    return () => {
      worker.postMessage("stop");
      worker.terminate();
      URL.revokeObjectURL(workerURL);
    };
  }, [isRunning]);

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

  // Handle switch between Rendering, "Study", "Break" and "Complete"
  useEffect(() => {
    let p: number;
    let total: number;
    p = elapsedTime;
    if (sbType === "Study") {
      total = studyhrs * 3600 + studymins * 60 + studysecs;
    } else if (sbType === "Break") {
      total = breakhrs * 3600 + breakmins * 60 + breaksecs;
    } else {
      total = progress;
    }
    setProgress((p * 100) / total);

    if (sbType === "Complete!") {
      setIsRunning(false);
    } else {
      let s;
      let m;
      let h;
      let diff;

      // Handles Rendering of time on widget
      if (isRunning && progress !== 100) {
        diff = total - elapsedTime;
        h = Math.floor(diff / 3600);
        m = Math.floor((diff / 3600 - h) * 60);
        s = ((diff / 3600 - h) * 60 - m) * 60;

        setHours(Math.round(h));
        setMinutes(Math.round(m));
        setSeconds(Math.round(s));
      } else if (progress === 100) {
        setElapsedTime(0);
        setIsRunning(false);
        playSound();

        // Handles switch between study, break, and complete
        if (sbType === "Study") {
          setSBType("Break");
          setHours(breakhrs);
          setMinutes(breakmins);
          setSeconds(breaksecs);
        } else if (sbType === "Break") {
          if (currSess !== totalSess) {
            setSBType("Study");
            setHours(studyhrs);
            setMinutes(studymins);
            setSeconds(studysecs);
            setCurrSess(currSess + 1);
          } else {
            setSBType("Complete!");
            toast.success("Complete!");
            playSound();
          }
        }
      }
    }
    return () => {};
  }, [elapsedTime, isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setProgress(0);
    setHours(studyhrs);
    setMinutes(studymins);
    setSeconds(studysecs);
    setSBType("Study");
    setIsRunning(false);
    setTotalSess(sess);
    setCurrSess(1);
    setElapsedTime(0);
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
      <div
        className="
        grid
        relative
        -top-6
        right-5
        xs:top-3
        xs:right-1
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
      <div>
        <div
          className="
        grid
        relative
        -top-6
        right-5
        xs:top-6
        xs:-right-14
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
        xs:right-10
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
