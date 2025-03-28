import { Button } from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FaCheck, FaTimes } from "react-icons/fa"
import { useTranslation } from "react-i18next"

import { type ApiError, type DropOffPointPublic, DropOffPointsService } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface ToggleStatusDropOffPointProps {
  item: DropOffPointPublic
}

const ToggleStatusDropOffPoint = ({ item }: ToggleStatusDropOffPointProps) => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const { t } = useTranslation()
  const mutation = useMutation({
    mutationFn: (isDone: boolean) =>
      DropOffPointsService.setDropOffPointDone({
        id: item.id,
        isDone,
      }),
    onSuccess: () => {
      showSuccessToast(
        t(item.is_done ? "DROP_OFF_POINT_MARKED_AS_NOT_DONE" : "DROP_OFF_POINT_MARKED_AS_DONE")
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
          {t("MARK_AS_NOT_DONE")}
        </>
      ) : (
        <>
          <FaCheck fontSize="16px" />
          {t("MARK_AS_DONE")}
        </>
      )}
    </Button>
  )
}

export default ToggleStatusDropOffPoint
