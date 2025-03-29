"use client"

import { toaster } from "@/components/ui/toaster"

const useCustomToast = () => {
  const showSuccessToast = (description: string) => {
    toaster.create({
      title: "Success!",
      description,
      type: "success",
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      }
    })
  }

  const showErrorToast = (description: string) => {
    toaster.create({
      title: "Something went wrong!",
      description,
      type: "error",
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      }
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
