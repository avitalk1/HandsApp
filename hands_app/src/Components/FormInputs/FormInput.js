import React from 'react'
const FormInput = ({
    name,
    accept,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    ...props
  }) => {
    
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          accept={accept}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={className}
          style={error && {border: 'solid 1px red'}}
        />
        { error && <p>{ error }</p>}
      </div>
    )
  }

  export default FormInput;
  
