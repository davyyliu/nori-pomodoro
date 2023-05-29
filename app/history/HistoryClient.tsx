"use client";

import Container from "../Container";
import Heading from "../components/Heading";
import { SafeHistory, SafeUser } from "../types";

interface HistoryClientProps {
  history: SafeHistory[];
  currentUser: SafeUser | null;
}

const HistoryClient: React.FC<HistoryClientProps> = ({
  history,
  currentUser,
}) => {
  console.log(history);
  //   {
  //     history.map((hist) => console.log(hist.createdAt));
  //   }
  return (
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
  );
};

export default HistoryClient;
