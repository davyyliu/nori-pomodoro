// Home Taskbar

export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import getTime from "@/app/actions/getTime";
import PomodoroTimer from "./components/timer/PomodoroTimer";
import { useEffect, useState } from "react";
import { PomodoroHistory } from "@prisma/client";

const Home = () => {
  const [time, setTime] = useState<PomodoroHistory | undefined>(undefined);

  useEffect(() => {
    const fetchTime = async () => {
      const result = await getTime();
      setTime(result || undefined);
    };
    fetchTime();
  }, []);
  // const time = await getTime();

  return (
    <ClientOnly>
      <div className="overflow-hidden">
        <PomodoroTimer
          studyhrs={Number(time?.studyhours)}
          studymins={Number(time?.studyminutes)}
          studysecs={2}
          breakhrs={Number(time?.breakhours)}
          breakmins={Number(time?.breakminutes)}
          breaksecs={2}
          sess={Number(time?.sessions)}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
