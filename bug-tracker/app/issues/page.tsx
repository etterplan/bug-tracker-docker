import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueTable, { IssuseQuery, columnNames } from "./IssueTable";
import IssueAction from "./IssueAction";

export const dynamic = "force-dynamic";

interface findManyIssuesProps {
  where: {
    status: any,
    assignedToUserId: string
  };
  searchText: string;
  orderBy: any;
  page: number;
  pageSize: number;
}

const findManyIssues = async (props: findManyIssuesProps) => {
  const issues = await prisma.issue.findMany({
    where: {
      ...props.where,
      title: {
        contains: props.searchText,
      },
    },
    orderBy: props.orderBy,
    skip: (props.page - 1) * props.pageSize,
    take: props.pageSize,
  });

  return issues;
};

interface IssueCountProps {
  where: Record<string, any>; // Assuming where is an object with string keys and any values
  searchText: string; // Assuming searchText is a string
}

const countIssue = async (props: IssueCountProps) => {
  const issueCount = await prisma.issue.count({
    where: {
      ...props.where,
      title: {
        contains: props.searchText,
      },
    },
  });

  return issueCount;
};

const findProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};

const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const userId = searchParams.userId;
  const searchText = searchParams.search || "";
  const where = { status, assignedToUserId: userId };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder || "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;
  const issues = await findManyIssues({where, searchText, orderBy, page, pageSize});
  // const issues = await prisma.issue.findMany({
  //   where: {
  //     ...where,
  //     title: {
  //       contains: searchText,
  //     },
  //   },
  //   orderBy: orderBy,
  //   skip: (page - 1) * pageSize,
  //   take: pageSize,
  // });
  const issueCount = countIssue({ where, searchText });
  // const issueCount = await prisma.issue.count({
  //   where: {
  //     ...where,
  //     title: {
  //       contains: searchText,
  //     },
  //   },
  // });
  const projects = findProjects();
  //const projects = await prisma.project.findMany();
  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable
        searchParams={searchParams}
        issues={issues}
        projects={projects}
      />
      <Pagination
        itemsCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View a project issues",
};