import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { studyhours, studyminutes, sessions, breakhours, breakminutes } = body;

  const pomodorohistory = await prisma.pomodoroHistory.create({
    data: {
      studyhours,
      studyminutes,
      sessions,
      breakhours,
      breakminutes,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(pomodorohistory);
}
