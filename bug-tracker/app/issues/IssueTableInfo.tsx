'use client'
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, PriorityIcon } from "../components";
import ChooseProject from "../components/ChooseProject";
import { Issue, Project } from "@prisma/client";

interface Props {
  issues: Issue[];
  projects: Project[];
}

const IssueTableInfo = ({ issues, projects }: Props) => {
  return (
    <Table.Body>
      {issues.map((issue) => (
        <Table.Row key={issue.id} onClick={() => {
          window.location.href = `/issues/${issue.id}`;
        }}
          style={{ cursor: 'pointer' }}>
          <Table.Cell>
            {issue.title}
            <div className="flex md:hidden gap-1">
              <IssueStatusBadge status={issue.status} id={issue.id} />
              <PriorityIcon priority={issue.priority} id={issue.id} />
            </div>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <IssueStatusBadge status={issue.status} id={issue.id} />
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            {issue.createdAt.toDateString()}
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <PriorityIcon priority={issue.priority} id={issue.id} />
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <ChooseProject
              projects={projects}
              issueId={issue.id}
              projectId={issue.projectId}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  )
}

export default IssueTableInfo