import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssuseButon from "./EditIssuseButon";
import IssueDetails from "./IssueDetails";
interface Pros {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Pros) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssuseButon issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
