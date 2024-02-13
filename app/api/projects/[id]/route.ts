import authOptions from "@/app/auth/authOptions";
import { updateProjectSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 401 });
    const body = await request.json();
    
    const validation = updateProjectSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })
    const {  name, description, status } = body;

    const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } })

    if (!project)
        return NextResponse.json({ error: "Invalid project" }, { status: 404 })

    const updateProject = await prisma.project.update({ where: { id: parseInt(params.id) }, data: { name: name, description: description, status: status } })
    return NextResponse.json(updateProject)
  
  }