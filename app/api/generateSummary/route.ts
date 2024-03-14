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
  const userName = session && session.user && session.user.name ? session.user.name : "User";
  const prompt = `Hi there! Please provide a summary of the following tasks. Count how many tasks are in each category such as Todo, open, in progress, and closed. Then, tell the user to have a productive day! Here's the data: ${JSON.stringify(tasks)}`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    n: 1,
    stream: false,
    messages: [
      {
        "role": "system",
        "content": `When responding, always welcome the user as ${userName} and say, "Welcome to the bug tracker app!" Limit the response to 200 characters.`
      },
      {
        "role": "user",
        "content": prompt
      }
    ]
  });
    return NextResponse.json(chatCompletion.choices[0].message, { status: 201 });
  }