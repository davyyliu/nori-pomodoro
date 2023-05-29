import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getHistory from "../actions/getHistory";
import HistoryClient from "./HistoryClient";

const HistoryPage = async () => {
  const history = await getHistory();
  const currentUser = await getCurrentUser();

  if (history.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No history found"
          subtitle="Start using the Pomodoro timer to have history"
        />
      </ClientOnly>
    );
  }
  return (
    <div
      className="overflow-hidden
          timer 
      w-full 
      items-center 
      px-auto "
    >
      <ClientOnly>
        {/* studyhrs={Array.isArray(time) ? 0 : Number(history?.studyhours) || 0}
      studymins={Array.isArray(time) ? 0 : Number(time?.studyminutes) || 0}
      studysecs={0}
      breakhrs={Array.isArray(time) ? 0 : Number(time?.breakhours) || 0}
      breakmins={Array.isArray(time) ? 0 : Number(time?.breakminutes) || 0}
      breaksecs={0}
      sess={Array.isArray(time) ? 1 : Number(time?.sessions) || 1} */}
        {/* {listRows()} */}
        <HistoryClient history={history} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default HistoryPage;
