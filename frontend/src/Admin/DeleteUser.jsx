import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const DeleteUser = () => {

    const [userId, SetUserId] = useState(null)
    const [userName, SetUserName] = useState(null)
    const [error, setError] = useState(null);
  
    const handleSave = async (e) => {
      e.preventDefault();
  
      if (!userId || !userName) {
        alert('Please fill all fields');
        return;
      }

      try {
        const response = await axios.post('http://localhost:5000/delete_user', {
          userId: userId,
          userName: userName
        });
        if (response.status === 200) {
          alert('Deleted Successfully')
          window.location.reload()
          document.getElementById("my_modal_3").close();
        }
      }
      catch (error) {
      let errorText = ''
      if(error.response)
    {
        if (error.response.status == 409)
        {
            errorText = 'Check again user name or user id not exists';
        }
    } else {
    errorText = `Unexpected error: ${error.message}`;
    }
    alert(errorText);
    setError(errorText);
      }
    };
  
  
    return (
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
        <form onSubmit={handleSave} method="dialog">
        <Link to = "/userinfo" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById("my_modal-3").closest()}>✕</Link>
        <h3 className="font-bold text-lg">Delete User</h3>
          <div className='mt-4 space-y-2'>
              <span>ID</span>
              <br/>
              <input type="number"
              placeholder='Enter user id'
              className='w-80 px-3 border rounded-md outline-none'
              value = {userId}
              onChange={(e) => SetUserId(e.target.value)}
          />
          </div>
          <div className='mt-4 space-y-2'>
              <span>Name</span>
              <br/>
              <input type="text"
              placeholder='Enter user name'
              className='w-80 px-3 border rounded-md outline-none'
              value = {userName}
              onChange={(e) => SetUserName(e.target.value)}
          />
          </div>
          {/* Button Save */}
          <div className='flex justify-around mt-4'>
              <button className='bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-700 duration-200'>Done</button>
          </div>
          </form>
      </div>
      </dialog>
    )
}  

export default DeleteUser
