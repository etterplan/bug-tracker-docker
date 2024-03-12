import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import HistoryDropdown from "./HistoryDropdown";
interface Pros {
  params: { id: string };
}

const fetchIssueWithComments = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
    include: { Comment: true, IssueHistory: true }
  })
);
const IssueDetailsPage = async ({ params }: Pros) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssueWithComments(parseInt(params.id));
  if (!issue) notFound();
  let loggedIn;
  if(session){
    loggedIn = true;
  }else{
    loggedIn = false;
  }
  return (
    <Flex direction="column" gap="5" justify="center">
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>
        {session && (
          <Box>
            <Flex direction="column" gap="4">
              {issue.status !== "CLOSED" && (
                <>
                  <AssigneeSelect issue={issue} />
                  <EditIssueButton issueId={issue.id} />
                </>
              )}
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>)}
      </Grid>
      <HistoryDropdown comments={issue.Comment} history={issue.IssueHistory} issueId={issue.id} loggedIn={loggedIn}/>
    </Flex>
  );
};
export async function generateMetadata({ params }: Pros) {
  const issue = await await fetchIssueWithComments(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue" + issue?.id,
  };
}

export default IssueDetailsPage;
