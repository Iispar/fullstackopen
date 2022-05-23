import React from 'react'
import Person from './Person'

const List = ({persons, all, filter}) => (
        <ul>
            {persons.filter(person => person.name.includes(filter)).map(({name, id, nro}) =>
            <Person key = {id} name = {name} nro = {nro} /> )} 
        </ul>
    )

export default List