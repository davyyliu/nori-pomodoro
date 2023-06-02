import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getHistory from "../actions/getHistory";
import Heading from "../components/Heading";

const HistoryPage = async () => {
  const history = await getHistory();

  function valuetext(value: any) {
    const hrS = Math.floor(value / 3600);
    const minS = Math.floor((value / 3600 - hrS) * 60);
    const secS = Math.round(((value / 3600 - hrS) * 60 - minS) * 60);
    return `
    ${hrS < 10 ? "0" : ""}${hrS}:${minS < 10 ? "0" : ""}${minS}:${
      secS < 10 ? "0" : ""
    }${secS}
    `;
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
                <th>Total Study Time</th>
                <th>Total Break Time</th>
              </tr>
            </thead>
            <tbody className="xs:text-xs">
              {history.map((hist) => (
                <tr key={hist.id}>
                  <td className="datetable">
                    {formatDate(hist.createdAt.toString())}
                  </td>
                  <td>
                    {valuetext(hist.studyhours * 3600 + hist.studyminutes * 60)}
                  </td>
                  <td>
                    {valuetext(hist.breakhours * 3600 + hist.breakminutes * 60)}
                  </td>
                  <td>
                    {hist.elapsedsession}/{hist.sessions}
                  </td>
                  <td>
                    {valuetext(
                      hist.elapsedtype === "Break"
                        ? hist.elapsedsession *
                            (hist.studyhours * 3600 + hist.studyminutes * 60)
                        : (hist.elapsedsession - 1) *
                            (hist.studyhours * 3600 + hist.studyminutes * 60) +
                            hist.elapsedstudy
                    )}
                  </td>
                  <td>
                    {valuetext(
                      hist.elapsedtype === "Break" &&
                        hist.elapsedsession === hist.sessions &&
                        hist.elapsedbreak >=
                          hist.breakhours * 3600 + hist.breakminutes * 60
                        ? hist.elapsedsession *
                            (hist.breakhours * 3600 + hist.breakminutes * 60)
                        : (hist.elapsedsession - 1) *
                            (hist.breakhours * 3600 + hist.breakminutes * 60) +
                            hist.elapsedbreak
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
