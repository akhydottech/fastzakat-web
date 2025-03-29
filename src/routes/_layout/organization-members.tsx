import { Badge, Container, Heading, Table } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { OrganizationsService, UserPublic } from "@/client"
import AddMember from "@/components/Organization/AddMember"
import DeleteMember from "@/components/Organization/DeleteMember"
import PendingUsers from "@/components/Pending/PendingUsers"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
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
    <div style={{overflow: "scroll"}}>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">{t("FULL_NAME")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("EMAIL")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("IS_PENDING")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("ACTIONS")}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members?.map((member) => (
            <Table.Row key={member.id}>
              <Table.Cell color={!member.full_name ? "gray" : "inherit"}>
                {member.full_name || "N/A"}
                {currentUser?.id === member.id && (
                  <Badge ml="1" colorScheme="teal">
                    {t("YOU")}
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {member.email}
              </Table.Cell>
              <Table.Cell>{member.is_pending ? t("IS_PENDING") : t("ACTIVE")}</Table.Cell>
              <Table.Cell>
                <DeleteMember id={member.id} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

function OrganizationMembers() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        {t("MEMBERS_MANAGEMENT")}
      </Heading>
      <AddMember />
      <OrganizationMembersTable />
    </Container>
  )
}
