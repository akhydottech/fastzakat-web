import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import useAuth from "@/hooks/useAuth"
import { useTranslation } from "react-i18next"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})


function Dashboard() {
  const { user: currentUser } = useAuth()
  const { t } = useTranslation()

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl" truncate maxW="sm">
            {t("WELCOME_BACK", { name: currentUser?.full_name || currentUser?.email })}
          </Text>
        </Box>
      </Container>
    </>
  )
}
