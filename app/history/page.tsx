import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getHistory from "../actions/getHistory";
import HistoryClient from "./HistoryClient";
import Container from "../Container";
import Heading from "../components/Heading";

const HistoryPage = async () => {
  const history = await getHistory();
  const currentUser = await getCurrentUser();

  function valuetext(value: number) {
    const hrS = Math.floor(value / 60);
    const minS = Math.round((value / 60 - hrS) * 60);
    return `${hrS} Hours ${minS} Minutes`;
  }

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
      className="
      history 
      w-full 
      items-center 
      px-auto
      drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    >
      <ClientOnly>
        <div className="flex justify-center">
          <Heading title="History" />
        </div>
        <div className="flex justify-center">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="datetable">Date</th>
                <th>Study Hours</th>
                <th>Study Minutes</th>
                <th>Break Hours</th>
                <th>Break Minutes</th>
                <th>Sessions</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((hist) => (
                <tr key={hist.id}>
                  <td className="datetable">{hist.createdAt.toString()}</td>
                  <td>{hist.studyhours}</td>
                  <td>{hist.studyminutes}</td>
                  <td>{hist.breakhours}</td>
                  <td>{hist.breakminutes}</td>
                  <td>{hist.sessions}</td>
                  <td>
                    {(hist.studyhours * 60 +
                      hist.studyminutes +
                      hist.breakhours * 60 +
                      hist.breakminutes) *
                      hist.sessions}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ClientOnly>
    </div>
  );
};

export default HistoryPage;
