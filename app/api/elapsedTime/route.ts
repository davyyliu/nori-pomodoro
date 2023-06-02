import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, elapsedstudy, elapsedbreak, elapsedsession, elapsedtype } = body;
  const timeSpecs = await prisma.pomodoroHistory.findFirst({
    where: {
      userId: {
        in: currentUser.id,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const pomodorohistory = await prisma.pomodoroHistory.update({
    where: {
      id: id,
    },
    data: {
      elapsedstudy,
      elapsedbreak,
      elapsedsession,
      elapsedtype,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(pomodorohistory);
}
