// Home Taskbar

export const dynamic = "force-dynamic";
import getTime from "@/app/actions/getTime";
import ClientOnly from "../components/ClientOnly";
import PomodoroTimer from "../components/timer/PomodoroTimer";

const Home = async () => {
  const time = await getTime();

  return (
    <ClientOnly>
      <div className="overflow-hidden">
        <PomodoroTimer
          studyhrs={Number(time?.studyhours)}
          studymins={Number(time?.studyminutes)}
          studysecs={0}
          breakhrs={Number(time?.breakhours)}
          breakmins={Number(time?.breakminutes)}
          breaksecs={0}
          sess={Number(time?.sessions)}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
