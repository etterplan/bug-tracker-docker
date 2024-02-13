import authOptions from "@/app/auth/authOptions";
import { updateBoardSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    
    const validation = updateBoardSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    const {  name, projectId } = body;

    const board = await prisma.board.findUnique({ where: { id: parseInt(params.id) } })

    if (!board)
        return NextResponse.json({ error: "Invalid board" }, { status: 404 })

    const updateBoard = await prisma.board.update({ where: { id: parseInt(params.id) }, data: { name: name, projectId: projectId} })
    return NextResponse.json(updateBoard)
    
  }