export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? 'El campo ' + fieldName + ' es requerido' : ''
  }
  const minLength = (fieldName, fieldValue, min) => {
    return fieldValue.length < min
      ? `El campo ${fieldName} debería tener ${min} carácteres como mínimo`
      : ''
  }
  const isEmail = (fieldName, fieldValue) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !re.test(fieldValue) ? 'Ingrese un ' + fieldName + ' válido' : ''
  }
  return { isEmpty, minLength, isEmail }
}
