import { Box, Button, Container, Heading, VStack } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock } from "react-icons/fi"

import { type ApiError, type UpdatePassword, UsersService } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { confirmPasswordRules, handleError, passwordRules } from "@/utils"
import { PasswordInput } from "../ui/password-input"
import { useTranslation } from "react-i18next"

interface UpdatePasswordForm extends UpdatePassword {
  confirm_password: string
}

const ChangePassword = () => {
  const { t } = useTranslation()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid, isSubmitting },
  } = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  })

  const mutation = useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast(t("PASSWORD_UPDATED_SUCCESSFULLY"))
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <>
      <Container maxW="full">
        <Heading size="sm" py={4}>
          {t("CHANGE_PASSWORD")}
        </Heading>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4} w={{ base: "100%", md: "sm" }}>
            <PasswordInput
              type="current_password"
              startElement={<FiLock />}
              {...register("current_password", passwordRules(true, t))}
              placeholder={t("CURRENT_PASSWORD")}
              errors={errors}
            />
            <PasswordInput
              type="new_password"
              startElement={<FiLock />}
              {...register("new_password", passwordRules(true, t))}
              placeholder={t("NEW_PASSWORD")}
              errors={errors}
            />
            <PasswordInput
              type="confirm_password"
              startElement={<FiLock />}
              {...register("confirm_password", confirmPasswordRules(getValues, true, t))}
              placeholder={t("CONFIRM_PASSWORD")}
              errors={errors}
            />
          </VStack>
          <Button
            variant="solid"
            mt={4}
            type="submit"
            loading={isSubmitting}
            disabled={!isValid}
          >
            {t("SAVE")}
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default ChangePassword
