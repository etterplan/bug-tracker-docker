import { Flex, Grid, Box } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import IssueCard from "./IssueCard";

export default async function Board() {
  const issues = await prisma.issue.findMany({
    include: {
      assignedToUser: true,
    },
  })
  return (
    <Grid columns={{ initial: "1", sm: "3" }} gap="5">
      <Box>
        <IssueCard issues={issues} />
      </Box>
      <Box>
        <IssueCard issues={issues} />
      </Box>
      <Box>
        <IssueCard issues={issues} />
      </Box>
    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue Board",
  description: "View a summary of project issue",
};