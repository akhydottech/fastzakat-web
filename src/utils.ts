import { TFunction } from "i18next"
import type { ApiError } from "./client"
import useCustomToast from "./hooks/useCustomToast"

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
}

export const passwordRules = (isRequired = true, t: TFunction) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: t("PASSWORD_MIN_LENGTH"),
    },
  }

  if (isRequired) {
    rules.required = t("PASSWORD_REQUIRED")
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
  t: TFunction
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : t("PASSWORD_DO_NOT_MATCH")
    },
  }

  if (isRequired) {
    rules.required = t("CONFIRM_PASSWORD_REQUIRED")
  }

  return rules
}

export const handleError = (err: ApiError) => {
  const { showErrorToast } = useCustomToast()
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showErrorToast(errorMessage)
}
