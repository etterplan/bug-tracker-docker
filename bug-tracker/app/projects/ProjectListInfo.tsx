'use client'
import { Table } from "@radix-ui/themes";
import ProjectStatusBadge from "../components/ProjectStatusBadge";
import { Project } from "@prisma/client";

interface Props {
  projects: Project[];
}

const ProjectListInfo = ({ projects }: Props) => {
  return (
    <Table.Body>
        {projects.map((project) => (
          <Table.Row key={project.id} onClick={() => {
            window.location.href = `/projects/${project.id}`;
          }}
            style={{ cursor: 'pointer' }}>
            <Table.Cell>
              {project.name}
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
  )
}

export default ProjectListInfo