import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ProjectForm from "../../_components/ProjectForm";

interface Props {
  params: { id: string };
}

const EditProjectPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!project) return notFound();
  return (
    <ProjectForm project={project} />
  )
}

export default EditProjectPage