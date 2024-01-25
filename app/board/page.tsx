import { Flex, Grid } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Metadata } from "next";
import IssueCard from "./IssueCard";

export default async function Board() {
  const issues = await prisma.issue.findMany({})
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex>
        <IssueCard issues={issues} />
      </Flex>
    </Grid>
  )
}

export const metadata: Metadata = {
  title: "Issue Tracker - Board",
  description: "View a summary of project issue",
};