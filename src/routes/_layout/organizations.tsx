import { Container, Heading, Table } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { MembersService } from "@/client"
import ActivateMembership from "@/components/Member/ActivateMembership"
import DeleteOrganization from "@/components/Member/RemoveMembership"
import PendingUsers from "@/components/Pending/PendingUsers"

function getUsersQueryOptions() {
  return {
    queryFn: () =>
      MembersService.getOrganizations(),
    queryKey: ["organizations"],
  }
}

export const Route = createFileRoute("/_layout/organizations")({
  component: Organizations,
})

function OrganizationsTable() {
  const { data, isLoading } = useQuery({
    ...getUsersQueryOptions(),
  })


  const organizations = data?.data ?? []

  if (isLoading) {
    return <PendingUsers />
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">Organization Name</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Email</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Is Pending</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {organizations?.map((organization) => (
            <Table.Row key={organization.id}>
              <Table.Cell color={!organization.organization_name ? "gray" : "inherit"}>
                {organization.organization_name || "N/A"}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {organization.email}
              </Table.Cell>
              <Table.Cell>{organization.is_pending ? "Pending" : "Active"}</Table.Cell>
              <Table.Cell>
                {organization.is_pending && (
                  <ActivateMembership invitationId={organization.id} />
                )}
                <DeleteOrganization id={organization.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

function Organizations() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Organizations
      </Heading>
      <OrganizationsTable />
    </Container>
  )
}
