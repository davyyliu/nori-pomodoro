// Home Taskbar

export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import getTime from "@/app/actions/getTime";
import PomodoroTimer from "./components/timer/PomodoroTimer";
import getCurrentUser from "./actions/getCurrentUser";

const Home = async () => {
  let time = await getTime();
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <div className="overflow-hidden">
        <PomodoroTimer
          id={Array.isArray(time) ? null : String(time?.id) || null}
          exist={Array.isArray(time) ? "" : String(time?.id) || ""}
          currentUser={currentUser}
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
          elapsedsession={
            Array.isArray(time) ? 1 : Number(time?.elapsedsession) || 1
          }
          elapsedtype={
            Array.isArray(time) ? "Study" : String(time?.elapsedtype)
          }
          // // Dev Tests
          // studyhrs={0}
          // studymins={0}
          // studysecs={5}
          // breakhrs={0}
          // breakmins={0}
          // breaksecs={3}
          // sess={2}
        />
      </div>
    </ClientOnly>
  );
};

export default Home;
