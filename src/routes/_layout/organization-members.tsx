import { Badge, Container, Heading, Table } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { OrganizationsService, UserPublic } from "@/client"
import AddMember from "@/components/Organization/AddMember"
import DeleteMember from "@/components/Organization/DeleteMember"
import PendingUsers from "@/components/Pending/PendingUsers"

function getUsersQueryOptions() {
  return {
    queryFn: () =>
      OrganizationsService.getMembers(),
    queryKey: ["organization-members"],
  }
}

export const Route = createFileRoute("/_layout/organization-members")({
  component: OrganizationMembers,
})

function OrganizationMembersTable() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const { data, isLoading } = useQuery({
    ...getUsersQueryOptions(),
  })


  const members = data?.data ?? []

  if (isLoading) {
    return <PendingUsers />
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">Full name</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Email</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Is Pending</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members?.map((member) => (
            <Table.Row key={member.id}>
              <Table.Cell color={!member.full_name ? "gray" : "inherit"}>
                {member.full_name || "N/A"}
                {currentUser?.id === member.id && (
                  <Badge ml="1" colorScheme="teal">
                    You
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {member.email}
              </Table.Cell>
              <Table.Cell>{member.is_pending ? "Pending" : "Active"}</Table.Cell>
              <Table.Cell>
                <DeleteMember id={member.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

function OrganizationMembers() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Users Management
      </Heading>

      <AddMember />
      <OrganizationMembersTable />
    </Container>
  )
}
