import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getHistory() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const timeSpecs = await prisma.pomodoroHistory.findMany({
      where: {
        userId: {
          in: currentUser.id,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return timeSpecs;
  } catch (error: any) {
    throw new Error(error);
  }
}
