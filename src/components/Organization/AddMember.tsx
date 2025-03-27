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


const AddMember = () => {
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
      showSuccessToast("Member added successfully.")
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
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Organization Member</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>
              Fill in the form below to add a new member to your organization.
            </Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
                label="Email"
              >
                <Input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: emailPattern,
                  })}
                  placeholder="Email"
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

export default AddMember
