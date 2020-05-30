import React from 'react'
import { useField } from 'formik'

export const TextInput = ({ label, textColor, inputClass, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='field'>
      {label && (
        <label htmlFor={props.id || props.name} style={{ color: textColor }}>{label}</label>
      )}
      <div className='fluid ui input'>
        <input className={inputClass} {...field} {...props} />
      </div>
      {meta.touched && meta.error ? (
        <div style={{ color: 'red' }}>{meta.error}</div>
      ) : ''}
    </div>
  )
}