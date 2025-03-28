import { Button, ButtonGroup, Text } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { type ApiError, UsersService } from "@/client"
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import { useTranslation } from "react-i18next"

const DeleteConfirmation = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm()
  const { logout } = useAuth()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      showSuccessToast(t("ACCOUNT_DELETED_SUCCESSFULLY"))
      setIsOpen(false)
      logout()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  const onSubmit = async () => {
    mutation.mutate()
  }

  return (
    <>
      <DialogRoot
        size={{ base: "xs", md: "md" }}
        role="alertdialog"
        placement="center"
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
      >
        <DialogTrigger asChild>
          <Button variant="solid" colorPalette="red" mt={4}>
            {t("DELETE")}
          </Button>
        </DialogTrigger>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogCloseTrigger />
            <DialogHeader>
              <DialogTitle>{t("DELETE_CONFIRMATION")}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text mb={4}>
                {t("DELETE_CONFIRMATION_DESCRIPTION")}
              </Text>
            </DialogBody>

            <DialogFooter gap={2}>
              <ButtonGroup>
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
                  colorPalette="red"
                  type="submit"
                  loading={isSubmitting}
                >
                  {t("DELETE")}
                </Button>
              </ButtonGroup>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default DeleteConfirmation
