import axios from 'axios'; // Make sure to have axios installed
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
import Pagination from "../components/Pagination";
import IssueTable, { IssuseQuery, columnNames } from "./IssueTable";
import IssueAction from "./IssueAction";

export const dynamic = "force-dynamic";

const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
  const { status, userId, searchText, orderBy, page, pageSize } = prepareData(searchParams);

  //==============================================================
  // TODO: This code need more work.
  //==============================================================
  try {
    console.log('======================================');
    console.log(`${status}, ${userId}, ${searchText}, ${orderBy}, ${page}, ${pageSize}`);
    const { issues, issueCount } = await fetchDataFromServer(status, userId, searchText, orderBy, page, pageSize);
    console.log(`issues: ${issues},  issueCount: ${issueCount}`);
    const projects = await fetchProjects();
    console.log(projects);

    return renderComponents(searchParams, issues, projects, issueCount, pageSize, page);
    //return (<div><h1>WAIT</h1></div>);
  } catch (error) {
    console.error('Error in fetching data from server:', error);
    // Handle error accordingly
  }
};

const renderComponents = (searchParams, issues, projects, issueCount, pageSize, page) => {
  return (
    <Flex direction="column" gap="3">
      <IssueAction />
      <IssueTable searchParams={searchParams} issues={issues} projects={projects} />
      <Pagination itemsCount={issueCount} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
  //<IssueTable searchParams={searchParams} issues={issues} projects={projects} />
  //<Pagination itemsCount={issueCount} pageSize={pageSize} currentPage={page} />

};

const prepareData = (searchParams: IssuseQuery) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
  const userId = searchParams.userId;
  const searchText = searchParams.search || "";
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.sortOrder || "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = parseInt(searchParams.pageSize) || 10;

  return { status, userId, searchText, orderBy, page, pageSize };
};

const fetchDataFromServer = async (status, userId, searchText, orderBy, page, pageSize) => {
  console.log(`${status}, ${userId}, ${searchText}, ${orderBy}, ${page}, ${pageSize}`);
  try {
    const response = await axios.post('http://172.18.0.3:5000/api/issues/find_all_issues', {
      searchParams: {
        status: status,
        userId: userId,
        searchText: 'bug',
        orderBy: orderBy,
        page: page,
        pageSize: pageSize
      }
    });

    const dataArray = response.data; // Get the array from response.data
    const arrayLength = dataArray.length; // Get the length of the array

    return {
      issues: dataArray, // Return the array
      issuesCount: arrayLength // Return the length of the array
    };
  } catch (error) {
    console.error(error);
    return { issues: [], issuesCount: 0 }; // Return an empty array and length 0 in case of an error
  }
};

const fetchProjects = async () => {
  const projects = await prisma.project.findMany();
  return projects;
};



// const IssuesPage = async ({ searchParams }: { searchParams: IssuseQuery }) => {
//   const statuses = Object.values(Status);
//   const status = statuses.includes(searchParams.status)
//     ? searchParams.status
//     : undefined;
//   const userId = searchParams.userId;
//   const searchText = searchParams.search || "";
//   const where = { status, assignedToUserId: userId };
//   const orderBy = columnNames.includes(searchParams.orderBy)
//     ? { [searchParams.orderBy]: searchParams.sortOrder || "asc" }
//     : undefined;
//   const page = parseInt(searchParams.page) || 1;
//   const pageSize = parseInt(searchParams.pageSize) || 10;

//   // Make call to db-server app.post('/api/issues/find_all_issues',...)
//   try {
//     const { data } = await axios.post('/api/issues/find_all_issues', {
//       where: {
//         ...where,
//         title: {
//           contains: searchText,
//         },
//       },
//       orderBy: orderBy,
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });

//     const issues = data.issues;
//     console.log(issues); // DEBUG
//     const issueCount = data.issueCount;
//     console.log(issueCount); // DEBUG

//   const projects = await prisma.project.findMany();
//   return (
//     <Flex direction="column" gap="3">
//       <IssueAction />
//       <IssueTable
//         searchParams={searchParams}
//         issues={issues}
//         projects={projects}
//       />
//       <Pagination
//         itemsCount={issueCount}
//         pageSize={pageSize}
//         currentPage={page}
//       />
//     </Flex>
//   );
//   // Catch error from '/api/issues/find_all_issues'
// } catch (error) {
//   console.error('Error in fetching data from server:', error);
//   // Handle error accordingly
// }

// };

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View a project issues",
};
