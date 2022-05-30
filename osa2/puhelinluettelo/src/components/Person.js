import React from 'react'

const Person = ({name, nro, onDelete, id}) => (
    <li>
      {name}, {nro}
      <button onClick = {() => onDelete(id, name)} >delete</button>
    </li>
  )


export default Person
