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
        <Container>
          <Heading
            title="History"
            subtitle="List of Pomodoro sessions you have had"
          />
          <div
            className="
      mt-10
      grid-cols-6
      gap-8"
          >
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Study Hours</th>
                  <th>Study Minutes</th>
                  <th>Break Hours</th>
                  <th>Break Minutes</th>
                  <th>Sessions</th>
                </tr>
              </thead>
              <tbody>
                {history.map((hist) => (
                  <tr key={hist.id}>
                    <td>{hist.createdAt.toString()}</td>
                    <td>{hist.studyhours}</td>
                    <td>{hist.studyminutes}</td>
                    <td>{hist.breakhours}</td>
                    <td>{hist.breakminutes}</td>
                    <td>{hist.sessions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </ClientOnly>
    </div>
  );
};

export default HistoryPage;
