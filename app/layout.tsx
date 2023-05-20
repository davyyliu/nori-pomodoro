import ClientOnly from "./components/ClientOnly";
import PomodoroTimer from "./components/timer/PomodoroTimer";
import Background from "./components/background/Background";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import Modal from "./components/modal/Modal";
import SettingsModal from "./components/modal/SettingsModal";
import express from "express";
import axios from "axios";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import useSettingsModal from "./hooks/useSettingsModal";

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
          <RegisterModal />
          <LoginModal />
          <PomodoroTimer hrs={0} mins={0} secs={5} />
          <SettingsModal />
          {/* <Modal isOpen /> */}
        </ClientOnly>
        {/* <div className="pb-20 pt-28">{children} TEST</div> */}
      </body>
    </html>
  );
}
