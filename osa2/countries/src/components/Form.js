import React from 'react'

const Form = ({name, value, handle}) => (
    <div>
      {name}: <input 
      value = {value}
      onChange = {handle}
      />
    </div>
  )

export default Form