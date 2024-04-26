import { Issue, Project, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueTableInfo from "./IssueTableInfo";

export interface IssuseQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder?: "asc" | "desc";
  page: string;
  pageSize: string;
  userId: string;
  search: string;
}
interface Props {
  searchParams: IssuseQuery;
  issues: Issue[];
  projects: Project[];
}

const IssueTable = ({ searchParams, issues, projects }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <Link
                href={{
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    sortOrder:
                      searchParams.orderBy === column.value &&
                        searchParams.sortOrder === "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </Link>
              {column.value === searchParams.orderBy &&
                searchParams.sortOrder === "asc" && (
                  <ArrowUpIcon className="inline" />
                )}
              {column.value === searchParams.orderBy &&
                searchParams.sortOrder === "desc" && (
                  <ArrowDownIcon className="inline" />
                )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <IssueTableInfo projects={projects} issues={issues} />
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
    { label: "Priority", value: "priority", className: "hidden md:table-cell" },
    {
      label: "AssignToProject",
      value: "projectId",
      className: "hidden md:table-cell",
    },
  ];

export const columnNames = columns.map((column) => column.value);

export default IssueTable;
