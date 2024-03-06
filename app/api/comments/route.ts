import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { commentSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const validation = commentSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const issue = await prisma.issue.findUnique({ where: { id: body.issueId } })

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

  const user = await prisma.user.findUnique({ where: { id: body.userId } })

  if (!user)
    return NextResponse.json({ error: "Invalid user" }, { status: 404 })

  const newComment = await prisma.comment.create({
    data: { text: body.text, issueId: body.issueId, userId: body.userId, userEmail: body.userEmail, userImage: body.userImage, userName: body.userName }
  })

  await prisma.issueHistory.create({
    data: {
      action: 'COMMENT_ADD',
      issueId: body.issueId,
      userId: session.user?.id,
      userName: session.user?.name,
    }
  });

  return NextResponse.json(newComment, { status: 201 });
}