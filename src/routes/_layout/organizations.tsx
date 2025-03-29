import { Container, Heading, Table } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import { MembersService } from "@/client"
import ActivateMembership from "@/components/Member/ActivateMembership"
import DeleteOrganization from "@/components/Member/RemoveMembership"
import PendingUsers from "@/components/Pending/PendingUsers"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    ...getUsersQueryOptions(),
  })


  const organizations = data?.data ?? []

  if (isLoading) {
    return <PendingUsers />
  }

  return (
    <div style={{overflow: "scroll"}}>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">{t("ORGANIZATION_NAME")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("EMAIL")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("IS_PENDING")}</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">{t("ACTIONS")}</Table.ColumnHeader>
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
              <Table.Cell>{organization.is_pending ? t("PENDING") : t("ACTIVE")}</Table.Cell>
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
    </div>
  )
}

function Organizations() {
  const { t } = useTranslation()
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        {t("ORGANIZATIONS")}
      </Heading>
      <OrganizationsTable />
    </Container>
  )
}
