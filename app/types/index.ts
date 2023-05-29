import { PomodoroHistory, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type SafeHistory = Omit<PomodoroHistory, "createdAt"> & {
  createdAt: string;
};
