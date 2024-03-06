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
import AddCommentPopover from "./AddCommentPopover";
import Comments from "./Comments";
import History from "./History";
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
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          {session && (
            <Flex width="100%" justify="end" className="mb-4">
              <AddCommentPopover issueId={issue.id} />
            </Flex>
          )}
          <Flex direction="column" gap="5" justify="center">
            <Comments comments={issue.Comment} />
          </Flex>
        </Box>
      </Grid>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <Flex direction="column" gap="5" justify="center">
            <History history={issue.IssueHistory} />
          </Flex>
        </Box>
      </Grid>
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
