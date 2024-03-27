'use client';
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { projectSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectForm = ({ project }: { project?: Project }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (project) await axios.patch("/api/projects/" + project.id, data);
      else await axios.post("/api/projects", data);
      router.push("/projects");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured");
      setSubmitting(false);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={project?.name}
            placeholder="Name"
            {...register("name")}
          />
        </TextField.Root>
        <ErrorMessage> {errors.name?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={project?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field}></SimpleMDE>
          )}
        ></Controller>

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {project ? "Update Project" : "Submit New Project"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default ProjectForm