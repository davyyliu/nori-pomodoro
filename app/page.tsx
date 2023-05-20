// Home Taskbar

export const dynamic = "force-dynamic";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import getTime, { TimeParams } from "@/app/actions/getTime";
import PomodoroTimer from "./components/timer/PomodoroTimer";

const Home = async () => {
  const currentUser = await getCurrentUser();
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
