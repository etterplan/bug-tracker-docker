import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { issuseSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = issuseSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description }
  })

  const createHistory = await prisma.issueHistory.create({
    data:{
      action: 'CREATED',
      newValue: `Issue '${body.title}' was created.`,
      issueId: newIssue.id,
      userId: session.user?.id,
      userName: session.user?.name,
    }
  })
  const updateIssue = await prisma.issue.update({
    where: { id: newIssue.id }, data: { position: newIssue.id }
  })
  return NextResponse.json(updateIssue, { status: 201 });
}