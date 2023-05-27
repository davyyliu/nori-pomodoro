import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getTime() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const timeSpecs = await prisma.pomodoroHistory.findFirst({
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
