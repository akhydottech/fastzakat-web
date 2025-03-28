import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";

import {
  Button,
  DialogActionTrigger,
  DialogTitle,
  Input,
  Text,
  Textarea,
  VStack,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import {
  type DropOffPointCreate,
  DropOffPointsService,
  OrganizationsService,
  UserPublic,
} from "@/client";
import type { ApiError } from "@/client/core/ApiError";
import useCustomToast from "@/hooks/useCustomToast";
import { handleError } from "@/utils";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog";
import { Field } from "../ui/field";
import AddressInputAutocomplete from "@/components/Common/address-input-autocomplete";

const AddDropOffPoint = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);

  const [isOpen, setIsOpen] = useState(false);
  const { showSuccessToast } = useCustomToast();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<DropOffPointCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
      address: "",
      responsible_id: null,
    },
  });

  const address = watch("address");
  const responsibleId = watch("responsible_id");

  const mutation = useMutation({
    mutationFn: (data: DropOffPointCreate) =>
      DropOffPointsService.createDropOffPoint({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Drop off point created successfully.");
      reset();
      setIsOpen(false);
    },
    onError: (err: ApiError) => {
      handleError(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drop-off-points"] });
    },
  });

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

  const onSubmit: SubmitHandler<DropOffPointCreate> = (data) => {
    mutation.mutate(data);
  };

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button value="add-drop-off-point" my={4}>
          <FaPlus fontSize="16px" />
          Add Drop Off Point
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Drop Off Point</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Fill in the details to add a new drop off point.</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Title"
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required.",
                  })}
                  placeholder="Title"
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Description"
              >
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                />
              </Field>

              <Field
                invalid={!!errors.address}
                errorText={errors.address?.message}
                label="Address"
              >
                <AddressInputAutocomplete
                  id="address"
                  value={address || ""}
                  onChange={(value) => setValue("address", value)}
                  placeholder="Address"
                />
              </Field>
              {currentUser?.is_organization && membersCollection && (
                <Field
                  invalid={!!errors.responsible_id}
                  errorText={errors.responsible_id?.message}
                  label="Responsible"
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
                        <Select.ValueText placeholder="Select responsible" />
                      </Select.Trigger>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        <Select.Item
                          key="none"
                          item={{ value: "", label: "None" }}
                        >
                          None
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
  );
};

export default AddDropOffPoint;
