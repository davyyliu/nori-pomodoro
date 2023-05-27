// Home Taskbar

export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import getTime from "@/app/actions/getTime";
import PomodoroTimer from "./components/timer/PomodoroTimer";

const Home = async () => {
  const time = await getTime();

  return (
    <ClientOnly>
      <div className="overflow-hidden">
        <PomodoroTimer
          studyhrs={Number(time?.studyhours) || 0}
          studymins={Number(time?.studyminutes) || 0}
          studysecs={0}
          breakhrs={Number(time?.breakhours) || 0}
          breakmins={Number(time?.breakminutes) || 0}
          breaksecs={0}
          sess={Number(time?.sessions) || 1}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
