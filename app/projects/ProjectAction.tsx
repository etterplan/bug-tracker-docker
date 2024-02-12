"use client";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

const ProjectAction = () => {
  return (
    <div className="flex flex-wrap justify-center sm:justify-between gap-3">
      <Flex wrap="wrap" gap="3" justify="center" align="center">
        <Dialog.Root>
          <Dialog.Trigger>
            <Button>New Project</Button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Create a new project</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              How would you like to start?
            </Dialog.Description>

            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Project name
                </Text>
                <TextField.Input placeholder="Enter your project name" />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Project description
                </Text>
                <TextArea placeholder="Enter project description" />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Select board
                </Text>
                <Select.Root value="default">
                  <Select.Trigger />
                  <Select.Content position="popper">
                    <Select.Item value="default">Select a board</Select.Item>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="orange">Orange</Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button>Save</Button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </div>
  );
};

export default ProjectAction;
