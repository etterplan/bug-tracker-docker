import authOptions from "@/app/auth/authOptions";
import { patchIssuseSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { Priority, Status } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = patchIssuseSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 })
  const { assignedToUserId, title, description, status, priority, projectId, position} = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 })
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })

  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 })

    let updateData: {
      title?: string;
      description?: string;
      status?: Status;
      priority?: Priority;
      assignedToUserId?: string | null;
      projectId?: number | null;
      boardId?: number | null;
      position?: number | null;
    } = {
      title: title,
      description: description,
      status: status,
      priority: priority,
      assignedToUserId: assignedToUserId,
      projectId: projectId,
      boardId:projectId,
      position: position
    };
  

  const updateIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: updateData
  })
  return NextResponse.json(updateIssue)

}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });

  if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.$transaction([
    prisma.comment.deleteMany({
      where: {
        issueId: issue.id
      }
    }),
    prisma.issue.delete({ where: { id: issue.id } })
  ]);
  return NextResponse.json({})

}