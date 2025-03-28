import {
  Container,
  EmptyState,
  Heading,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { DropOffPointsService } from "@/client"
import { ItemActionsMenu } from "@/components/Common/ItemActionsMenu"
import Map from "@/components/Common/Map"
import AddDropOffPoint from "@/components/drop-off-points/AddDropOffPoint"
import PendingItems from "@/components/Pending/PendingItems"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})


function getItemsQueryOptions() {
  return {
    queryFn: () =>
      DropOffPointsService.readDropOffPoints({ usePagination: false }),
    queryKey: ["drop-off-points"],
  }
}

export const Route = createFileRoute("/_layout/drop-off-points")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

function ItemsTable() {


  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getItemsQueryOptions(),
    placeholderData: (prevData) => prevData,
  })

  const items = data?.data ?? []

  if (isLoading) {
    return <PendingItems />
  }

  if (items.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any drop off points yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new drop off point to get started
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Table.Root size={{ base: "sm", md: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="sm">Owner</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">ID</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Title</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Description</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Address</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Done</Table.ColumnHeader>
            <Table.ColumnHeader w="sm">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items?.map((item) => (
            <Table.Row key={item.id} opacity={isPlaceholderData ? 0.5 : 1}>
              <Table.Cell truncate maxW="sm">
                {item.owner_full_name}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {item.id}
              </Table.Cell>
              <Table.Cell truncate maxW="sm">
                {item.title}
              </Table.Cell>
              <Table.Cell
                color={!item.description ? "gray" : "inherit"}
                truncate
                maxW="sm"
              >
                {item.description ? (
                  item.description.length > 30
                    ? `${item.description.substring(0, 30)}...`
                    : item.description
                ) : "N/A"}
              </Table.Cell>

              <Table.Cell
                color={!item.address ? "gray" : "inherit"}
                truncate
                maxW="sm"
              >
                {item.address ? (
                  item.address.length > 30
                    ? `${item.address.substring(0, 30)}...`
                    : item.address
                ) : "N/A"}
              </Table.Cell>

              <Table.Cell>
                {item.is_done ? "Yes" : "No"}
              </Table.Cell>

              <Table.Cell>
                 <ItemActionsMenu item={item} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

function Items() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Drop Off Points Management
      </Heading>
      <AddDropOffPoint />
      <Map height="500px" />
      <ItemsTable />
    </Container>
  )
}
