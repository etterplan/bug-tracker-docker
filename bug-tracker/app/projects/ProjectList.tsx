import { Project } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import React from "react";
import ProjectListInfo from "./ProjectListInfo";

interface Props {
  projects: Project[];
}

const ProjectList = ({ projects }: Props) => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              {column.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <ProjectListInfo projects={projects}/>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Project;
  className?: string;
}[] = [
  { label: "Name", value: "name" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = columns.map((column) => column.value);

export default ProjectList;
