import React from 'react'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'

const ToDo = ({ text , description, updateMode, deleteToDo }) => {
  return (
    <div className='todo'>
      <div className='text'>
        <h6>{text}</h6>
        <p>{description}</p>

        <div className='icons'>
          <BiEdit className='icon' onClick={updateMode} />
          <AiFillDelete className='icon' onClick={deleteToDo} />
        </div>
      </div>
    </div>
  );
}

export default ToDo;
