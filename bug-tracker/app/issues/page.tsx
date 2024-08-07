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

const toFindManyIssuesProps = ({ searchParams }: { searchParams: IssuseQuery }): findManyIssuesProps => {
  // Create all variables with default values.
  let status = undefined;
  let userId = "-1";
  let searchText = "";
  let orderBy = "desc";
  let page = 2;
  let pageSize = 10;

  // Update variables with values from searchParams
  if (Object.keys(searchParams).length > 0) {
    status = searchParams.status;
    userId = searchParams.userId;
    searchText = searchParams.search;
    //orderBy = { [searchParams.orderBy]: searchParams.sortOrder };
    page = parseInt(searchParams.page);
    pageSize = parseInt(searchParams.pageSize);
  }

  // Create the object to return
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

const findManyIssues = async (props: findManyIssuesProps) => {
  let issues = [];
  try {
    issues = await prisma.issue.findMany({
      where: {
        title: {
          contains: props.searchText,
        },
      },
     skip: (props.page - 1) * props.pageSize,
     take: props.pageSize,      
    });
  } catch (error) {
    console.error(error);
  }
  return issues;
}

const countIssues = async (where: any, searchText: String) => {
  return await prisma.issue.count({
    where: {
//      ...where,
      title: {
        contains: searchText
      },
    }
  });
}

const findManyProjects = async () => {
  return await prisma.project.findMany();
}

const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
  try {
    const searchProps = toFindManyIssuesProps({ searchParams });
    const issues = await findManyIssues(searchProps);
    console.log(issues);

    const issueCount = await countIssues(searchProps.where, searchProps.searchText);
    const projects = await findManyProjects();

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
          pageSize={searchProps.pageSize}
          currentPage={searchProps.page}
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