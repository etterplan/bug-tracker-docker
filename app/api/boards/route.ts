import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    const boards = await prisma.board.findMany()

    return NextResponse.json(boards);
}