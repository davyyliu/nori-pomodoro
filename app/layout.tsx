import ClientOnly from "./components/ClientOnly";
import PomodoroTimer from "./components/timer/PomodoroTimer";
import Background from "./components/background/Background";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";

export const metadata = {
  title: "Nori Pomodoro",
  description: "Study Tool",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar />
          <Background />
          <PomodoroTimer hrs={0} mins={10} secs={10} />
        </ClientOnly>
        {/* <div className="pb-20 pt-28">{children} TEST</div> */}
      </body>
    </html>
  );
}
