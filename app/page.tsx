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
          studymins={Array.isArray(time) ? 0 : Number(time?.studyminutes) || 0}
          studysecs={0}
          breakhrs={Array.isArray(time) ? 0 : Number(time?.breakhours) || 0}
          breakmins={Array.isArray(time) ? 0 : Number(time?.breakminutes) || 0}
          breaksecs={0}
          sess={Array.isArray(time) ? 0 : Number(time?.sessions) || 1}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
