import prisma from "@/app/libs/prismadb";

export default async function getTime() {
  try {
    const timeSpecs = await prisma.pomodoroHistory.findFirst({
      where: {},
      orderBy: { createdAt: "desc" },
    });

    return timeSpecs;
  } catch (error: any) {
    throw new Error(error);
  }
}
