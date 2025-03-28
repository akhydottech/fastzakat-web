import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Input,
  Text,
  Textarea,
  VStack,
  Select,
  createListCollection,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, type DropOffPointPublic, DropOffPointsService, OrganizationsService, UserPublic } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"
import AddressInputAutocomplete from "@/components/Common/address-input-autocomplete"
import { useTranslation } from "react-i18next"
interface EditDropOffPointProps {
  item: DropOffPointPublic
}

interface DropOffPointUpdateForm {
  title: string
  description?: string
  address?: string
  responsible_id?: string | null
}

const EditDropOffPoint = ({ item }: EditDropOffPointProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DropOffPointUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...item,
      description: item.description ?? undefined,
      address: item.address ?? undefined,
      responsible_id: item.responsible_id ?? null,
    },
  })

  useEffect(() => {
    reset({
      ...item,
      description: item.description ?? undefined,
      address: item.address ?? undefined,
      responsible_id: item.responsible_id ?? null,
    })
  }, [item, reset])

  const address = watch("address")
  const responsibleId = watch("responsible_id")

  const mutation = useMutation({
    mutationFn: (data: DropOffPointUpdateForm) =>
      DropOffPointsService.updateDropOffPoint({ id: item.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Drop off point updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drop-off-points"] })
    },
  })

  const onSubmit: SubmitHandler<DropOffPointUpdateForm> = async (data) => {
    mutation.mutate(data)
  }

  let membersCollection;

  if (currentUser?.is_organization) {
    const { data: members } = useQuery({
      queryKey: ["members"],
      queryFn: () => OrganizationsService.getMembers(),
    });

    membersCollection = createListCollection({
      items:
        members?.data?.map((member) => ({
          label: member.full_name || member.email,
          value: member.id,
        })) || [],
    });
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          {t("EDIT_DROP_OFF_POINT")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("EDIT_DROP_OFF_POINT")}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>{t("EDIT_DROP_OFF_POINT_DESCRIPTION")}</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label={t("TITLE")}
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: t("TITLE_REQUIRED"),
                  })}
                  placeholder={t("TITLE")}
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label={t("DESCRIPTION")}
              >
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder={t("DESCRIPTION")}
                />
              </Field>

              <Field
                invalid={!!errors.address}
                errorText={errors.address?.message}
                label={t("ADDRESS")}
              >
                <AddressInputAutocomplete
                  id="address"
                  value={address || ""}
                  onChange={(value) => setValue("address", value)}
                  placeholder={t("ADDRESS")}
                />
              </Field>

              {currentUser?.is_organization && membersCollection && (
                <Field
                  invalid={!!errors.responsible_id}
                  errorText={errors.responsible_id?.message}
                  label={t("RESPONSIBLE")}
                >
                  <Select.Root
                    collection={membersCollection}
                    value={responsibleId ? [responsibleId] : []}
                    onValueChange={({ value }) =>
                      setValue("responsible_id", value[0] || null)
                    }
                  >
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder={t("SELECT_RESPONSIBLE")} />
                      </Select.Trigger>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        <Select.Item
                          key="none"
                          item={{ value: "", label: t("NONE") }}
                        >
                          {t("NONE")}
                        </Select.Item>
                        {membersCollection?.items.map((member) => (
                          <Select.Item key={member.value} item={member}>
                            {member.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </Field>
              )}
            </VStack>
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
              <Button variant="solid" type="submit" loading={isSubmitting}>
                {t("SAVE")}
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditDropOffPoint
