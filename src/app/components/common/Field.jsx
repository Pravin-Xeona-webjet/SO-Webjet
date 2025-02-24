import React, { useCallback } from 'react'
import { useField, useFormikContext } from 'formik'

const Field = WrappedComponent => ({ ...props }) => {
  // field hook: [field, meta, helper]
  const [field, meta] = useField(props.name)
  const { setFieldValue } = useFormikContext()

  const errorMessage = meta.error
  const isInvalid = meta.touched && errorMessage
  const state = isInvalid ? 'error' : 'initial'

  // useCallback to prevent creating new obj for same function
  const handleChange = useCallback((value, next) => {
    setFieldValue(next || props.name, value)
  }, [])

  return (
    <div data-testid={props.name} className='field'>
      {props.label && <label>{props.label}</label>}
      <WrappedComponent {...props} state={state} errorMessage={meta.error} value={field.value} onChange={handleChange} />
    </div>
  )
}

export default Field
