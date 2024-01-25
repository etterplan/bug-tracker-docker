'use client'
import { Flex, Card, Avatar, Text, Grid } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import { PriorityIcon } from "@/app/components";
import { PersonIcon } from "@radix-ui/react-icons";
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
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop" 
              radius="full"
              fallback={<PersonIcon width="32" height="32" />}
              />
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}

export default IssueCard