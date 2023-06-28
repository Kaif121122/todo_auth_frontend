import React from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"

const ToDo = (props) => {
    const { text, updateModeHandle, deleteToDo } = props
    return (
        <div className="todo">
            <h1 className="text">{text}</h1>
            <div className="icons">
                <BiEdit className='icon' onClick={updateModeHandle} />
                <AiFillDelete className='icon' onClick={deleteToDo} />
            </div>
        </div>
    )
}

export default ToDo