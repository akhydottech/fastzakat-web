import { Button } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FaCheck, FaTimes } from "react-icons/fa"

import { type ApiError, type DropOffPointPublic, DropOffPointsService } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface ToggleStatusDropOffPointProps {
  item: DropOffPointPublic
}

const ToggleStatusDropOffPoint = ({ item }: ToggleStatusDropOffPointProps) => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (isDone: boolean) =>
      DropOffPointsService.setDropOffPointDone({
        id: item.id,
        isDone,
      }),
    onSuccess: () => {
      showSuccessToast(
        `Drop off point marked as ${item.is_done ? "not done" : "done"} successfully.`
      )
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drop-off-points"] })
    },
  })

  return (
    <Button
      variant="ghost"
      colorScheme={item.is_done ? "red" : "green"}
      onClick={() => mutation.mutate(!item.is_done)}
      loading={mutation.isPending}
    >
      {item.is_done ? (
        <>
          <FaTimes fontSize="16px" />
          Mark as Not Done
        </>
      ) : (
        <>
          <FaCheck fontSize="16px" />
          Mark as Done
        </>
      )}
    </Button>
  )
}

export default ToggleStatusDropOffPoint
