import { issuseSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, {params}: {params: {id: string}}){
const body = await request.json();
const validation = issuseSchema.safeParse(body);
if(!validation.success)
 return NextResponse.json(validation.error.format(), {status: 400})

 const issue = prisma.issue.findUnique({where: {id: parseInt(params.id)}})

 if(!issue) 
 return NextResponse.json({error: "Invalid issue"},{status:404})

 const updateIssue = prisma.issue.update({where:{id: parseInt(params.id)},data:{ title: body.title, description: body.descriptions}})
 return NextResponse.json(updateIssue)

}


export async function DELETE(request: NextRequest, {params}:{params: {id:string}}) {
    
const issue = await prisma.issue.findUnique({where: {id: parseInt(params.id)}});

 if(!issue)  return NextResponse.json({error: "Invalid issue"},{status:404});

 await prisma.issue.delete({where:{id: issue.id}})
 return NextResponse.json({})

}