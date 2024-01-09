import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });
  const body = await request.json();

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

  const newComment = await prisma.comment.create({
    data: { text: body.text, issueId: parseInt(params.id), userId: session.user?.id, userEmail: session.user?.email }
  })
  return NextResponse.json(newComment, { status: 201 });
}