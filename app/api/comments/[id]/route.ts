import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });

  if (!comment) return NextResponse.json({ error: "Invalid comment" }, { status: 404 });

  await prisma.comment.delete({ where: { id: comment.id } })
  return NextResponse.json({})

}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const comment = await prisma.comment.findUnique({ where: { id: parseInt(params.id) } });

  if (!comment) return NextResponse.json({ error: "Invalid comment" }, { status: 404 });

  const { text } = await request.json();

  await prisma.comment.update({
    where: { id: comment.id },
    data: { text: text }
  });

  return NextResponse.json({});
}