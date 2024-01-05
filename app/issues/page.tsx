import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueTable, { IssuseQuery, columnNames } from "./IssueTable";
import IssuseAction from "./IssuseAction";

const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder || "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;
  const issues = await prisma.issue.findMany({
    where: where,
    orderBy: orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where: where });
  return (
    <Flex direction="column" gap="3">
      <IssuseAction />
      <IssueTable searchParams={searchParams} issues={issues} />
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
