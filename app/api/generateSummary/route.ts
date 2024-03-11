import authOptions from "@/app/auth/authOptions";
import openai from "@/openai";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
  
    if (!session)
      return NextResponse.json({}, { status: 401 });
    
    const {tasks} = await request.json();

  // communicate with chat GPT

    const prompt = `Hi there, provide a summary of the following tasks. Count how many tasks are in each category such as Todo, in progress, done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(tasks)}`;
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      n:1,
      stream:false,
      messages: [{"role": "system", "content": `When responding, welcome the user always as ${session.user?.name} and say welcome to the tracker App! Limit the response to 200 characters`},
      {"role": "user", "content": prompt}],
    });
    return NextResponse.json(chatCompletion.choices[0].message, { status: 201 });
  }