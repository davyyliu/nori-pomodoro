import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export interface TimeParams {
  userId: string;
}

export default async function getTime(params: TimeParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }
    const { userId } = params;

    const timeSpecs = await prisma.pomodoroHistory.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return timeSpecs;
  } catch (error: any) {
    throw new Error(error);
  }
}
