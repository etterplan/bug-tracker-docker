"use client";
import { Issue as PrismaIssue, User } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import IssueCard from "./IssueCard";
import DroppableBox from "./DroppableBox";

type Issue = PrismaIssue & {
  assignedToUser: User | null;
};

type BoardLayoutProps = {
  openIssues: Issue[];
  inProgressIssues: Issue[];
  closedIssues: Issue[];
};

const BoardLayout: React.FC<BoardLayoutProps> = ({ openIssues, inProgressIssues, closedIssues }) => {
  const onDropIssue = (issueId: string, status: string) => {
    // TODO
    console.log(`change issue ${issueId}'s status to: ${status}`)
  };
  return (
    <>
      <DroppableBox onDropIssue={onDropIssue} status="OPEN">
        <Text>OPEN</Text>
        {openIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
      <DroppableBox onDropIssue={onDropIssue} status="IN_PROGRESS">
        <Text>IN PROGRESS</Text>
        {inProgressIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
      <DroppableBox onDropIssue={onDropIssue} status="CLOSED">
        <Text>CLOSED</Text>
        {closedIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </DroppableBox>
    </>
  )
}

export default BoardLayout