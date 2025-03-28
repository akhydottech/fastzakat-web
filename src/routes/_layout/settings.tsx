import { Container, Heading, Tabs } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import Appearance from "@/components/UserSettings/Appearance"
import ChangePassword from "@/components/UserSettings/ChangePassword"
import DeleteAccount from "@/components/UserSettings/DeleteAccount"
import UserInformation from "@/components/UserSettings/UserInformation"
import useAuth from "@/hooks/useAuth"
import { useTranslation } from "react-i18next"

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const { t } = useTranslation()
  const { user: currentUser } = useAuth()
  const tabsConfig = [
    { value: "my-profile", title: t("MY_PROFILE"), component: UserInformation },
    { value: "password", title: t("PASSWORD"), component: ChangePassword },
    { value: "appearance", title: t("APPEARANCE"), component: Appearance },
    { value: "danger-zone", title: t("DANGER_ZONE"), component: DeleteAccount },
  ]
  
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig

  if (!currentUser) {
    return null
  }

  return (
    <Container maxW="full">
      <Heading size="lg" textAlign={{ base: "center", md: "left" }} py={12}>
        {t("USER_SETTINGS")}
      </Heading>

      <Tabs.Root defaultValue="my-profile" variant="subtle">
        <Tabs.List>
          {finalTabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              {tab.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {finalTabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value}>
            <tab.component />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Container>
  )
}
