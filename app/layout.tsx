import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import Background from "./components/background/Background";
import Navbar from "./components/navbar/Navbar";
import { Nunito } from "next/font/google";
import SettingsModal from "./components/modal/SettingsModal";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import Home from "./page";
import getCurrentUser from "./actions/getCurrentUser";
import ToastProvider from "./providers/ToastProvider";

export const metadata = {
  title: "Nori Pomodoro",
  description: "Study Tool",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <Navbar currentUser={currentUser} />
          <Background />
          <RegisterModal />
          <LoginModal />
          <SettingsModal />
          <Home />
        </ClientOnly>
      </body>
    </html>
  );
}
