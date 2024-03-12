import { IssueHistory, Action } from '@prisma/client';
import { Flex, Badge, Text, Avatar, Strong } from '@radix-ui/themes';
import { PersonIcon } from "@radix-ui/react-icons";

interface HistoryProps {
  history: IssueHistory[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <Flex direction='column' gap='6' justify='center'>
      {[...history].reverse().map((history) => {
        let actionText = '';
        switch (history.action) {
          case Action.CREATED:
            actionText = `Created issue with title: "${history.newValue}".`;
            break;
          case Action.STATUS_CHANGE:
            actionText = `Changed status of issue to: "${history.newValue}".`;
            break;
          case Action.PRIORITY_CHANGE:
            actionText = `Changed priority of issue from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.ASSIGNEE_CHANGE:
            if (history.newValue === null) {
              actionText = `Unassigned the current assignee from this issue.`;
            } else {
              actionText = `Assigned "${history.newValue}" to this issue.`;
            }
            break;
          case Action.COMMENT_ADD:
            actionText = `Added a comment.`;
            break;
          case Action.COMMENT_DELETE:
            actionText = `Deleted a comment.`;
            break;
          case Action.COMMENT_EDIT:
            actionText = `Edited his comment from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.DESCRIPTION_CHANGE:
            actionText = `Changed issue description from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          case Action.TITLE_CHANGE:
            actionText = `Changed issue title from: "${history.oldValue}" to: "${history.newValue}".`;
            break;
          default:
            actionText = `Performed an action.`;
        }

        return (
          <Flex
            key={history.id}
            className="border-b-2 border-gray-200"
            direction="column"
            width="100%"
          >
            <Flex align="center" gap="3">
              <Avatar
                size="2"
                src={history.userImage || undefined}
                fallback={<PersonIcon width="32" height="32" />}
                radius="full"
              />
              <Text size="1">
                <Strong>{history.userName}</Strong>
              </Text>
              <Badge color="orange">{history.createdAt.toDateString()}</Badge>
            </Flex>
            <Flex className="prose max-w-full pb-6" mt="4">
              <Text size="1" className="overflow-ellipsis overflow-clip">
                {actionText}
              </Text>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default History;