'use client'
import { Flex, Card, Avatar, Text, Grid } from "@radix-ui/themes";
import { Issue as PrismaIssue, User } from "@prisma/client";
import { PriorityIcon } from "@/app/components";
import { PersonIcon } from "@radix-ui/react-icons";

type Issue = PrismaIssue & {
  assignedToUser: User | null;
};

const IssueCard = ({ issues }: { issues: Issue[] }) => {
  return (
    <Grid gap="1">
      {issues.map((issue) => (
        <Card key={issue.id}>
          <Flex gap="3" justify="between" align="center">
            <Flex direction="column" align="start" gap="2">
              <Text as="div" size="2" weight="medium">
                {issue.title}
              </Text>
              <PriorityIcon priority={issue.priority} />
            </Flex>
            <Avatar
              size="3"
              src={issue.assignedToUser?.image ?? undefined}
              radius="full"
              fallback={<PersonIcon width="28" height="28" />}
              />
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}

export default IssueCard