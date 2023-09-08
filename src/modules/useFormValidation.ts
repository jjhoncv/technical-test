import { reactive } from 'vue'
import useValidators from '@/modules/validators'
import type { Errors } from '@/interfaces/errors'

const errors = reactive({}) as Errors

export default function useFormValidation() {
  const { isEmpty, minLength, isEmail } = useValidators()
  const validateNameField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 4)
  }
  const validateEmailField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : isEmail(fieldName, fieldValue)
  }

  const validatePasswordField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue
      ? isEmpty(fieldName, fieldValue)
      : minLength(fieldName, fieldValue, 8)
  }

  return { errors, validateNameField, validateEmailField, validatePasswordField }
}
