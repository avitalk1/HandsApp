import React from 'react'
const TextareaInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    cols,
    rows,
    error,
    children,
    label,
    ...props
  }) => {
    
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          cols={cols}
          rows={rows}
          className={className}
          style={error && {border: 'solid 1px red'}}
        />
        { error && <p>{ error }</p>}
      </div>
    )
  }

  export default TextareaInput;
  
