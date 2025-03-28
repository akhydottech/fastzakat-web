import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"

import type { UserPublic } from "@/client"

import { useTranslation } from "react-i18next"

interface SidebarItemsProps {
  onClose?: () => void
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const items = [
    { icon: FiHome, title: t("DASHBOARD"), path: "/" },
    { icon: FiBriefcase, title: t("DROP_OFF_POINTS"), path: "/drop-off-points" },
    { icon: FiSettings, title: t("USER_SETTINGS"), path: "/settings" },
    { icon: FiBriefcase, title: t("ORGANIZATIONS"), path: "/organizations" },
  ]
  console.log(currentUser)
  let finalItems: Item[] = items

  if (currentUser?.is_superuser) {
    finalItems = [...finalItems, { icon: FiUsers, title: t("ADMIN"), path: "/admin" }]
  }

  if (currentUser?.is_organization) {
    finalItems = [...finalItems, { icon: FiUsers, title: t("ORGANIZATION_MEMBERS"), path: "/organization-members" }]
  }

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={4}
        px={4}
        py={2}
        _hover={{
          background: "gray.subtle",
        }}
        alignItems="center"
        fontSize="sm"
      >
        <Icon as={icon} alignSelf="center" />
        <Text ml={2}>{title}</Text>
      </Flex>
    </RouterLink>
  ))

  return (
    <>
      <Text fontSize="xs" px={4} py={2} fontWeight="bold">
        Menu
      </Text>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
