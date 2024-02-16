"use client";
import { Project } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Props {
  projects: Project[];
  issueId: number;
  projectId: number | null;
}

const ChooseProject = ({ projects, issueId, projectId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (projectId !== null) {
      setSelectedProjectId(projectId.toString());
    } else {
      setSelectedProjectId("unassigned");
    }
  }, [projectId]);

  const assignIssueToProject = async (value: string) => {
    try {
      await axios.patch("/api/issues/" + issueId, {
        projectId: value !== undefined ? parseInt(value) : null,
      });
      router.refresh();
    } catch (error) {
      console.error("Error assigning issue to project:", error);
    }
  };

  return (
    <Select.Root
      value={selectedProjectId ? selectedProjectId.toString() : "unassigned"}
      onValueChange={assignIssueToProject}
      disabled={!session}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <Select.Item value={project.id.toString()} key={project.id}>
                {project.name}
              </Select.Item>
            ))
          ) : (
            <Select.Item value="no">
              <Link href={"/projects"}>Navigate to project page</Link>
            </Select.Item>
          )}
          <Select.Item value="unassigned">Unassigned</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default ChooseProject;
