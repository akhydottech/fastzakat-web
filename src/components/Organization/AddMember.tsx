import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { OrganizationsInviteUserToOrganizationData, OrganizationsService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"
import {
  Button,
  DialogActionTrigger,
  DialogTitle,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"
import { useTranslation } from "react-i18next"

const AddMember = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<OrganizationsInviteUserToOrganizationData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: OrganizationsInviteUserToOrganizationData) =>
      OrganizationsService.inviteUserToOrganization({ email: data.email }),
    onSuccess: () => {
      showSuccessToast(t("MEMBER_ADDED_SUCCESSFULLY"))
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-members"] })
    },
  })

  const onSubmit: SubmitHandler<OrganizationsInviteUserToOrganizationData> = (data) => {
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
        <Button value="add-member" my={4}>
          <FaPlus fontSize="16px" />
          {t("ADD_MEMBER")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("ADD_ORGANIZATION_MEMBER")}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>{t("ADD_ORGANIZATION_MEMBER_DESCRIPTION")}</Text>
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
            </VStack>
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
            <Button
              variant="solid"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              {t("SAVE")}
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddMember
