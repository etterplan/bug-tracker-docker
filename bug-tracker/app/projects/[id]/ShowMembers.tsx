import { User } from "@prisma/client";
import { Flex, Text, Strong, Avatar, Card, Box } from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import RemoveMemberBtn from "./RemoveMemberBtn";

interface Props {
  members?: User[];
}

const ShowMembers = ({ members = [] }: Props) => {

  return (
    <Flex direction='column' mt='3'>
      <Text weight='medium'>Project Members</Text>
      <Flex my='2' gap='3'>
        {members.map((member) => (
          <Card key={member.id}>
            <Flex gap='3'>
              <Flex align='center' gap='3'>
                <Avatar
                  size='3'
                  src={member.image || undefined}
                  fallback={<PersonIcon width='36' height='36' />}
                  radius='full'
                />
                <Flex direction='column'>
                  <Text size='2' align='center'>
                    <Strong>{member.name}</Strong>
                  </Text>
                  <Text size='1' align='center'>
                    {member.email}
                  </Text>
                </Flex>
              </Flex>
              <RemoveMemberBtn member={member} />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  )
}

export default ShowMembers