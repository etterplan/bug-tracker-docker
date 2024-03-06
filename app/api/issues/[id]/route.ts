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
      position?: number;
    } = {};
  
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (assignedToUserId !== undefined) updateData.assignedToUserId = assignedToUserId;
    if (projectId !== undefined) updateData.projectId = projectId;
    if (position !== undefined) updateData.position = position;
  
  const updateIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: updateData
  })
  // creating issueHistory records
  if (status !== undefined && issue.status !== status) {
    await prisma.issueHistory.create({
      data: {
        action: 'STATUS_CHANGE',
        oldValue: issue.status,
        newValue: status,
        issueId: issue.id,
        userId: session.user?.id,
        userName: session.user?.name,
      }
    });
  }
  if (priority !== undefined && issue.priority !== priority) {
    await prisma.issueHistory.create({
      data: {
        action: 'PRIORITY_CHANGE',
        oldValue: issue.priority,
        newValue: priority,
        issueId: issue.id,
        userId: session.user?.id,
        userName: session.user?.name,
      }
    });
  }
  if (assignedToUserId !== undefined && issue.assignedToUserId !== assignedToUserId) {
    await prisma.issueHistory.create({
      data: {
        action: 'ASSIGNEE_CHANGE',
        newValue: assignedToUserId,
        issueId: issue.id,
        userId: session.user?.id,
        userName: session.user?.name,
      }
    });
  }
  if (title !== undefined && issue.title !== title) {
    await prisma.issueHistory.create({
      data: {
        action: 'TITLE_CHANGE',
        oldValue: issue.title,
        newValue: title,
        issueId: issue.id,
        userId: session.user?.id,
        userName: session.user?.name,
      }
    });
  }
  if (description !== undefined && issue.description !== description) {
    await prisma.issueHistory.create({
      data: {
        action: 'DESCRIPTION_CHANGE',
        oldValue: issue.description,
        newValue: description,
        issueId: issue.id,
        userId: session.user?.id,
        userName: session.user?.name,
      }
    });
  }
  return NextResponse.json(updateIssue, { status: 200 })
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
    prisma.issueHistory.deleteMany({
      where: {
        issueId: issue.id
      }
    }),
    prisma.issue.delete({ where: { id: issue.id } })
  ]);
  return NextResponse.json({})

}