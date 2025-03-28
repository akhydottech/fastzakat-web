import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { MembersAcceptInvitationData, MembersService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  Button,
  DialogActionTrigger,
  DialogTitle,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import {
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"


const ActivateMembership = ({ invitationId }: { invitationId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<MembersAcceptInvitationData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      invitationId: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: MembersAcceptInvitationData) =>
      MembersService.acceptInvitation({ invitationId: data.invitationId }),
    onSuccess: () => {
      showSuccessToast("Membership activated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit: SubmitHandler<MembersAcceptInvitationData> = (data) => {
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
          Activate Membership
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(() => onSubmit({ invitationId }))} >
          <DialogHeader>
            <DialogTitle>Activate Membership</DialogTitle>
          </DialogHeader>

          <DialogFooter gap={2}>
            <DialogActionTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              variant="solid"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default ActivateMembership
