import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"

import {
  Button,
  DialogActionTrigger,
  DialogRoot,
  DialogTrigger,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaExchangeAlt } from "react-icons/fa"

import { type UserPublic, type UserUpdate, UsersService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"
import { Checkbox } from "../ui/checkbox"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { useTranslation } from "react-i18next"
interface EditUserProps {
  user: UserPublic
}

interface UserUpdateForm extends UserUpdate {
  confirm_password?: string
}

const EditUser = ({ user }: EditUserProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    control,
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<UserUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: user,
  })

  const mutation = useMutation({
    mutationFn: (data: UserUpdateForm) =>
      UsersService.updateUser({ userId: user.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast(t("USER_UPDATED_SUCCESSFULLY"))
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const onSubmit: SubmitHandler<UserUpdateForm> = async (data) => {
    if (data.password === "") {
      data.password = undefined
    }
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <FaExchangeAlt fontSize="16px" />
          {t("EDIT_USER")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("EDIT_USER")}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>{t("EDIT_USER_DESCRIPTION")}</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
                label={t("EMAIL")}
              >
                <Input
                  id="email"
                  {...register("email", {
                    required: t("EMAIL_REQUIRED"),
                    pattern: emailPattern,
                  })}
                  placeholder={t("EMAIL")}
                  type="email"
                />
              </Field>

              <Field
                invalid={!!errors.full_name}
                errorText={errors.full_name?.message}
                label={t("FULL_NAME")}
              >
                <Input
                  id="name"
                  {...register("full_name")}
                  placeholder={t("FULL_NAME")}
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.password}
                errorText={errors.password?.message}
                label={t("SET_PASSWORD")}
              >
                <Input
                  id="password"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: t("PASSWORD_MIN_LENGTH"),
                    },
                  })}
                  placeholder={t("PASSWORD")}
                  type="password"
                />
              </Field>

              <Field
                invalid={!!errors.confirm_password}
                errorText={errors.confirm_password?.message}
                label={t("CONFIRM_PASSWORD")}
              >
                <Input
                  id="confirm_password"
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === getValues().password ||
                      t("PASSWORD_DO_NOT_MATCH"),
                  })}
                  placeholder={t("PASSWORD")}
                  type="password"
                />
              </Field>
            </VStack>

            <Flex mt={4} direction="column" gap={4}>
              <Controller
                control={control}
                name="is_superuser"
                render={({ field }) => (
                  <Field disabled={field.disabled} colorPalette="teal">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      {t("IS_SUPERUSER")}
                    </Checkbox>
                  </Field>
                )}
              />
              <Controller
                control={control}
                name="is_active"
                render={({ field }) => (
                  <Field disabled={field.disabled} colorPalette="teal">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      {t("IS_ACTIVE")}
                    </Checkbox>
                  </Field>
                )}
              />
            </Flex>
          </DialogBody>

          <DialogFooter gap={2}>
            <DialogActionTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                {t("CANCEL")}
              </Button>
            </DialogActionTrigger>
            <Button variant="solid" type="submit" loading={isSubmitting}>
              {t("SAVE")}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </form>
      </DialogContent>
    </DialogRoot>
  )
}

export default EditUser
