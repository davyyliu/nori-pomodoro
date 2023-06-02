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
import axios from "axios";
import { SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

interface PomodoroTimerProps {
  id: String | null;
  exist: string;
  currentUser?: SafeUser | null;
  studyhrs: number;
  studymins: number;
  studysecs: number;
  breakhrs: number;
  breakmins: number;
  breaksecs: number;
  sess: number;
  elapsedstudy: number;
  elapsedbreak: number;
  elapsedsession: number;
  elapsedtype: string;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  id,
  exist,
  currentUser,
  studyhrs,
  studymins,
  studysecs,
  breakhrs,
  breakmins,
  breaksecs,
  sess,
  elapsedstudy,
  elapsedbreak,
  elapsedsession,
  elapsedtype,
}) => {
  let difference: number = 0;
  let tTime: number = 0;
  let eSH: number = 0;
  let eSM: number = 0;
  let eSS: number = 0;
  let eBH: number = 0;
  let eBM: number = 0;
  let eBS: number = 0;
  let eP: number = 0;
  let eT: number = 0;

  const [sbType, setSBType] = useState<String>(elapsedtype);
  if (sbType === "Study") {
    tTime = studyhrs * 3600 + studymins * 60 + studysecs;
    difference = tTime - elapsedstudy;
    eSH = Math.floor(difference / 3600);
    eSM = Math.floor((difference / 3600 - eSH) * 60);
    eSS = Math.round(((difference / 3600 - eSH) * 60 - eSM) * 60);
    eP = (elapsedstudy * 100) / tTime;
    eT = elapsedstudy;
  } else if (sbType === "Break") {
    tTime = breakhrs * 3600 + breakmins * 60 + breaksecs;
    difference = tTime - elapsedbreak;
    eBH = Math.floor(difference / 3600);
    eBM = Math.floor((difference / 3600 - eBH) * 60);
    eBS = Math.round(((difference / 3600 - eBH) * 60 - eBM) * 60);
    eP = (elapsedbreak * 100) / tTime;
    eT = elapsedbreak;
  }

  const [hours, setHours] = useState(sbType === "Study" ? eSH : eBH);
  const [minutes, setMinutes] = useState(sbType === "Study" ? eSM : eBM);
  const [seconds, setSeconds] = useState(sbType === "Study" ? eSS : eBS);
  const [progress, setProgress] = useState<number>(eP);

  const [currSess, setCurrSess] = useState(elapsedsession);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSess, setTotalSess] = useState(sess);
  const [hasSound, setHasSound] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const settingsModal = useSettingsModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [dbElapsedStudy, setDbElapsedStudy] = useState<number>(0);
  const [dbElapsedBreak, setDbElapsedBreak] = useState<number>(0);
  const [dbElapsedSession, setDbElapsedSession] =
    useState<number>(elapsedsession);
  const [dbElapsedType, setDbElapsedType] = useState<String>("Study");

  let udata = {
    id: id,
    studyhours: studyhrs,
    studyminutes: studymins,
    sessions: sess,
    breakhours: breakhrs,
    breakminutes: breakmins,
    elapsedstudy: dbElapsedStudy,
    elapsedbreak: dbElapsedBreak,
    elapsedsession: dbElapsedSession,
    elapsedtype: dbElapsedType,
  };

  let defaultValues = {
    studyhours: studyhrs,
    studyminutes: studymins,
    sessions: sess,
    breakhours: breakhrs,
    breakminutes: breakmins,
    elapsedstudy: 0,
    elapsedbreak: 0,
    elapsedsession: 1,
    elapsedtype: "Study",
  };

  console.log("first instance: ", udata);

  const uploadData = () => {
    if (currentUser) {
      axios
        .post("/api/elapsedTime", udata)
        .then(() => {})
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Please login first!");
      loginModal.onOpen();
    }
  };
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
    setProgress((p * 100) / total + eP);

    if (sbType === "Complete!") {
      uploadData();
      console.log(udata);
      setIsRunning(false);
    } else {
      let s;
      let m;
      let h;
      let diff;
      let dbElapsedTime = 0;
      // Handles Rendering of time on widget
      if (isRunning && progress !== 100) {
        if (sbType == "Study") {
          dbElapsedTime = elapsedstudy;
          setDbElapsedStudy(elapsedTime + dbElapsedTime);
        } else if (sbType == "Break") {
          dbElapsedTime = elapsedbreak;
          setDbElapsedBreak(elapsedTime + dbElapsedTime);
        }
        setDbElapsedSession(currSess);
        setDbElapsedType(sbType);
        diff = total - (elapsedTime + dbElapsedTime);
        h = Math.floor(diff / 3600);
        m = Math.floor((diff / 3600 - h) * 60);
        s = ((diff / 3600 - h) * 60 - m) * 60;

        setHours(Math.round(h));
        setMinutes(Math.round(m));
        setSeconds(Math.round(s));
        uploadData();
        console.log(udata);
      } else if (progress === 100) {
        setProgress(0);
        setElapsedTime(0);
        setIsRunning(false);
        playSound();

        // Handles switch between study, break, and complete
        if (sbType === "Study") {
          setSBType("Break");
          setDbElapsedStudy(0);
          setHours(breakhrs);
          setMinutes(breakmins);
          setSeconds(breaksecs);
          setDbElapsedType(sbType);
          uploadData();
        } else if (sbType === "Break") {
          if (currSess !== totalSess) {
            setSBType("Study");
            setDbElapsedBreak(0);
            setHours(studyhrs);
            setMinutes(studymins);
            setSeconds(studysecs);
            setCurrSess(currSess + 1);
            setDbElapsedType(sbType);
            setDbElapsedSession(currSess);
            uploadData();
          } else {
            console.log("abc");
            setSBType("Complete!");
            setDbElapsedType(sbType);
            setDbElapsedSession(1);
            setDbElapsedStudy(0);
            setDbElapsedBreak(0);
            toast.success("Complete!");
            playSound();
            uploadData();
          }
        }
      }
    }
    return () => {};
  }, [elapsedTime, isRunning]);

  const handleStartStop = () => {
    if (!currentUser) {
      toast.error("Please log in first!");
      loginModal.onOpen();
    } else {
      if (exist === "undefined") {
        toast.error("Please set up a timer first!");
        settingsModal.onOpen();
      } else {
        setIsRunning(!isRunning);
      }
    }
  };

  const handleReset = () => {
    if (currentUser) {
      axios
        .post("/api/totalTime", defaultValues)
        .then(() => {
          toast.success("Pomodoro Ready!");
          setProgress(0);
          setCurrSess(1);
          setElapsedTime(0);
          setIsRunning(false);
          setSBType("Study");
          setHours(studyhrs);
          setMinutes(studymins);
          setSeconds(studysecs);
          setTotalSess(sess);
          setDbElapsedStudy(0);
          setDbElapsedBreak(0);
          setDbElapsedSession(1);
          setDbElapsedType("Study");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error);
        });
    } else {
      toast.error("Please log in first!");
      loginModal.onOpen();
    }
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
