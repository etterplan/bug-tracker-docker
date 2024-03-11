import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { commentSchema } from "../../../validationSchema"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });

  if (!comment) return NextResponse.json({ error: "Invalid comment" }, { status: 404 });

  await prisma.comment.delete({ where: { id: comment.id } })

  if (comment.issueId !== null) {
    await prisma.issueHistory.create({
      data: {
        action: 'COMMENT_DELETE',
        oldValue: comment.text,
        issueId: comment.issueId,
        userId: session.user?.id,
        userName: session.user?.name,
        userImage: session.user?.image,
      }
    });
  }

  return NextResponse.json({})

}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })

  const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });

  if (!comment) return NextResponse.json({ error: "Invalid comment" }, { status: 404 });

  const { text } = body;

  await prisma.comment.update({
    where: { id: comment.id },
    data: { text: text }
  });

  if (comment.issueId !== null) {
    await prisma.issueHistory.create({
      data: {
        action: 'COMMENT_EDIT',
        oldValue: comment.text,
        newValue: text,
        issueId: comment.issueId,
        userId: session.user?.id,
        userName: session.user?.name,
        userImage: session.user?.image,
      }
    });
  }

  return NextResponse.json({});
}