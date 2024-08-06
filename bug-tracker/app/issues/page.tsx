//import { Metadata } from "next";
//import IssueTable, { IssuseQuery, columnNames } from "./IssueTable";

import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Priority } from "@prisma/client";
import { Issue } from "@prisma/client";
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
  orderBy: string;
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
    //orderBy: props.orderBy,
    skip: (props.page - 1) * props.pageSize,
    take: props.pageSize,
  });

  return issues;
};

const toFindManyIssuesProps = ({ searchParams }: { searchParams: IssuseQuery }): findManyIssuesProps  => {
  let status = undefined;
  let userId = "-1";
  let searchText = "";
  let orderBy = "desc";
  let page = 1;
  let pageSize = 10;

  if (Object.keys(searchParams).length > 0) {
    status = searchParams.status;
    userId = searchParams.userId;
    searchText = searchParams.search;
    //orderBy = { [searchParams.orderBy]: searchParams.sortOrder };
    page = parseInt(searchParams.page);
    pageSize = parseInt(searchParams.pageSize);
  }

  const props: findManyIssuesProps = {
    where: {
      status: status,
      assignedToUserId: userId
    },
    searchText: searchText,
    orderBy: orderBy,
    page: page,
    pageSize: pageSize
  };

  console.log(props);
  return props;
};

const getAllIssues = async ({ searchParams }: { searchParams: IssuseQuery }): Issue[] => {
  const props = toFindManyIssuesProps({ searchParams });
  const issues = await findManyIssues(props);

  return issues;
};

const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
  try {
    const issues = await getAllIssues({searchParams});
    console.log(issues);

    // const issue1 = {
    //   "id": 1323,
    //   "title": "Title_1",
    //   "status": "IN_PROGRESS",
    //   "priority": Priority.MEDIUM,
    //   "createAt": new Date().toISOString(),
    //   "projectId": 4321
    // };
    // const issue2 = {
    //   "id": 1325,
    //   "title": "An_issue",
    //   "status": "TODO",
    //   "priority": Priority.LOW,
    //   "createAt": new Date().toISOString(),
    //   "projectId": 4321
    // };

    //let issues = [issue1, issue2];
    let projects = {};
    let issueCount = 0;
    let pageSize = 10;
    let page = 1;

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
  } catch (error) {
    console.error("Error in IssuesPage: ", error);
  }
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View a project issues",
};