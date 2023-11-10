import React from 'react'
import { AiFillDelete } from 'react-icons/ai'

const ToDo = ({ text, deleteToDo }) => {
  return (
    <div className='todo'>
      <div className='text'>
        <img src={text} alt=''/>
        <div className='icons'>
          <AiFillDelete className='icon' onClick={deleteToDo} />
        </div>
      </div>
    </div>
  );
}

export default ToDo;
