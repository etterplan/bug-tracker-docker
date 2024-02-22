"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Board } from "@prisma/client";
import {
  Button,
  Callout,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ChooseBoard from "../components/ChooseProject";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import { projectSchema } from "../validationSchema";

interface Props {
  boards: Board[];
}
type ProjectFromData = z.infer<typeof projectSchema>;

const ProjectAction = ({ boards }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFromData>({
    resolver: zodResolver(projectSchema),
  });
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      const result = await axios.post("/api/projects/", {
        ...data,
      });
      setSubmitting(false);
      setOpen(false);
      reset();
      router.refresh();
    } catch (error) {
      setError("An unexpected error occured");
      setSubmitting(false);
    }
  });

  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <Button>New Project</Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Create a new project</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              How would you like to start?
            </Dialog.Description>
            <form onSubmit={onSubmit}>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Project name
                  </Text>
                  <TextField.Root>
                    <TextField.Input
                      placeholder="Enter your project name"
                      {...register("name")}
                    />
                  </TextField.Root>
                  <ErrorMessage> {errors.name?.message}</ErrorMessage>
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Project description
                  </Text>

                  <TextArea
                    placeholder="Enter project description"
                    {...register("description")}
                  />
                  <ErrorMessage>{errors.description?.message}</ErrorMessage>
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit" disabled={isSubmitting}>
                  Save {isSubmitting && <Spinner />}
                </Button>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </div>
  );
};

export default ProjectAction;
