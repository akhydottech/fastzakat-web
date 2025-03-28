import { Container, Heading, Stack } from "@chakra-ui/react"
import { useTheme } from "next-themes"

import { Radio, RadioGroup } from "@/components/ui/radio"
import { useTranslation } from "react-i18next"

const Appearance = () => {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          {t("APPEARANCE")}
        </Heading>

        <RadioGroup
          onValueChange={(e) => e.value && setTheme(e.value)}
          value={theme}
          colorPalette="teal"
        >
          <Stack>
            <Radio value="system">{t("SYSTEM")}</Radio>
            <Radio value="light">{t("LIGHT_MODE")}</Radio>
            <Radio value="dark">{t("DARK_MODE")}</Radio>
          </Stack>
        </RadioGroup>

        <Heading size="sm" py={4} mt={8}>
          {t("LANGUAGE")}
        </Heading>

        <RadioGroup
          onValueChange={(e) => e.value && i18n.changeLanguage(e.value)}
          value={i18n.language}
          colorPalette="teal"
        >
          <Stack>
            <Radio value="fr">Français</Radio>
            <Radio value="en">English</Radio>
          </Stack>
        </RadioGroup>
      </Container>
    </>
  )
}
export default Appearance
