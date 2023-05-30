import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getHistory from "../actions/getHistory";
import Heading from "../components/Heading";

const HistoryPage = async () => {
  const history = await getHistory();

  function valuetext(value: any) {
    const hrS = Math.floor(value / 60);
    const minS = Math.round((value / 60 - hrS) * 60);
    return `${hrS} ${hrS === 1 ? "hr" : "hrs"} ${minS} ${
      minS === 1 ? "min" : "mins"
    }`;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  if (history.length === 0) {
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
          <EmptyState
            title="No history found"
            subtitle="Start using the Pomodoro timer to have history"
            showReset
          />
        </ClientOnly>
      </div>
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
        <div className="flex justify-center ">
          <Heading title="History" />
        </div>
        <div className="flex justify-center">
          <table className="table-auto">
            <thead>
              <tr className="font-extrabold xs:text-sm">
                <th className="datetable">Date</th>
                <th>Study per Session</th>
                <th>Break per Session</th>
                <th>Sessions</th>
                <th>Total Time</th>
              </tr>
            </thead>
            <tbody className="xs:text-xs">
              {history.map((hist) => (
                <tr key={hist.id}>
                  <td className="datetable">
                    {formatDate(hist.createdAt.toString())}
                  </td>
                  <td>{valuetext(hist.studyhours * 60 + hist.studyminutes)}</td>
                  <td>{valuetext(hist.breakhours * 60 + hist.breakminutes)}</td>
                  <td>{hist.sessions}</td>
                  <td>
                    {valuetext(
                      (hist.studyhours * 60 +
                        hist.studyminutes +
                        hist.breakhours * 60 +
                        hist.breakminutes) *
                        hist.sessions
                    )}
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
