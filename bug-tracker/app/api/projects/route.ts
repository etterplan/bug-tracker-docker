import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {  projectSchema } from "../../validationSchema";
import { Issue, Section, Status } from "@prisma/client";

export async function POST (request: NextRequest){
  
   const session = await getServerSession(authOptions);

   if(!session) 
   return NextResponse.json({},{status:401});
const body = await request.json();

const validation = projectSchema.safeParse(body);

if(!validation.success) 
    return NextResponse.json(validation.error.format(), {status: 400})

const {  name, description } = body;
 
// Create the board first
const newBoard = await prisma.board.create({
  data: {
      name: name,
  }
});

const createSections = await createDefaultSectionsForBoard(newBoard.id);

const newProject = await prisma.project.create({
  data: {
      name: name,
      description: description,
      board: {
          connect: { id: newBoard.id } // Connect the project to the created board
      }
  },
  include: {
      board: true // This includes the created board in the response
  }
});
const updatedBoard = await prisma.board.update({
  where: { id: newBoard.id },
  data: {
      projectId: newProject.id // Assign the projectId to the board
  }
});

return NextResponse.json(newProject, {status: 201});
}

// Group issues by status
const issuesByStatus: Record<Status, Issue[]> = {
  [Status.TODO]: [],
  [Status.OPEN]: [],
  [Status.IN_PROGRESS]: [],
  [Status.CLOSED]: [],
};

async function createDefaultSectionsForBoard(boardId: number){
  try {
    // Retrieve all issues associated with the board
    const issues = await prisma.issue.findMany({
      where: { boardId },
    });

    issues.forEach((issue) => {
      issuesByStatus[issue.status].push(issue);
    });
    // Create sections for each status group
    const createdSections = [];
    for (const status of Object.keys(issuesByStatus)) {
      const sectionName = status; // Use status as section name
      const existingSection = await prisma.section.findFirst({
        where: { boardId, name: sectionName },
      });

      if (!existingSection) {
        const createdSection = await createSection(boardId, sectionName, status as Status); // Pass section status
        createdSections.push(createdSection);
      }
    }
    return createdSections;
    console.log('Default sections created:', createdSections);
  } catch (error) {
    console.error('Error creating default sections:', error);
    throw error;
  }
}

async function createSection(boardId: number, sectionName: string, sectionStatus: Status): Promise<Section> {
  try {
    const createdSection = await prisma.section.create({
      data: {
        name: sectionName,
        board: { connect: { id: boardId } },
        status: sectionStatus
      },
    });
    return createdSection;
  } catch (error) {
    console.error('Error creating section:', error);
    throw error;
  }
}

