import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {  projectSchema } from "../../validationSchema";

export async function POST (request: NextRequest){
   const session = await getServerSession(authOptions);

   if(!session) 
   return NextResponse.json({},{status:401});
const body = await request.json();

const validation = projectSchema.safeParse(body);

if(!validation.success) 
    return NextResponse.json(validation.error.format(), {status: 400})

const newProject = await prisma.project.create({
    data: {name: body.name, description: body.description}
})
return NextResponse.json(newProject, {status: 201});
}