import { Project } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ProjectStatusBadge from "../components/ProjectStatusBadge";

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
      <Table.Body>
        {projects.map((project) => (
          <Table.Row key={project.id}>
            <Table.Cell>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
              <div className="flex md:hidden gap-1">
                <ProjectStatusBadge status={project.status} id={project.id} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <ProjectStatusBadge status={project.status} id={project.id} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {project.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
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
