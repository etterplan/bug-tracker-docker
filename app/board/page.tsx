import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import BoardList from "./BoardList";

type Issue = Prisma.IssueGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

export default async function Board() {
  const boards = await prisma.board.findMany();

  return (
    <Flex direction="column" gap="3">
      <BoardList boards={boards} />
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};
