// Home Taskbar

export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import getTime from "@/app/actions/getTime";
import PomodoroTimer from "./components/timer/PomodoroTimer";

const Home = async () => {
  let time = await getTime();

  return (
    <ClientOnly>
      <div className="overflow-hidden">
        <PomodoroTimer
          studyhrs={Array.isArray(time) ? 0 : Number(time?.studyhours) || 0}
          studymins={Array.isArray(time) ? 5 : Number(time?.studyminutes) || 5}
          studysecs={0}
          breakhrs={Array.isArray(time) ? 0 : Number(time?.breakhours) || 0}
          breakmins={Array.isArray(time) ? 5 : Number(time?.breakminutes) || 5}
          breaksecs={0}
          sess={Array.isArray(time) ? 1 : Number(time?.sessions) || 1}
          elapsedstudy={
            Array.isArray(time) ? 0 : Number(time?.elapsedstudy) || 0
          }
          elapsedbreak={
            Array.isArray(time) ? 0 : Number(time?.elapsedbreak) || 0
          }
          // Dev Tests
          // studyhrs={0}
          // studymins={0}
          // breakhrs={0}
          // breakmins={0}
          // sess={2}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
