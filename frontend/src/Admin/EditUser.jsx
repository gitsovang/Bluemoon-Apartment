import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const EditUser = () => {

  const [userId, SetUserId] = useState(null)
  const [userName, SetUserName] = useState(null)
  const [userEmail, SetUserEmail] = useState(null)
  const [userRoomArea, SetUserRoomArea] = useState(null)
  const [userRoomNumber, SetUserRoomNumber] = useState(null)
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();

    const RoomNumberValue = parseInt(userRoomNumber);
    const RoomAreaValue = parseInt(userRoomArea);

    if (isNaN(RoomAreaValue) || isNaN(RoomNumberValue)) {
      alert('Invalid input for room area or room number value');
      return;
    }

    if (RoomAreaValue < 0 || RoomNumberValue < 0) {
      alert('Room area value or Room number value cannot be negative');
      return;
    }

    if (!userId || !userName || !userEmail || !userRoomArea || !userRoomNumber) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/edit_user_info', {
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        userRoomArea: RoomAreaValue,
        userRoomNumber: RoomNumberValue
      });

      if (response.status === 200) {
        alert('Edited Successfully');
        window.location.reload();
        document.getElementById("my_modal_3").close();
      }
    } catch (error) {
      console.error(error);
      let errorText = '';

      if (error.response) {
        const statusCode = error.response.status;
        switch (statusCode) {
          case 409:
            errorText = 'User ID not exists';
            break;
          default:
            errorText = 'Server error';
        }
      } else {
        errorText = `Unexpected error: ${error.message}`;
      }
      alert(errorText);
      setError(errorText);
    }
  };

  return (
        <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
        <form onSubmit={handleSave}>
        <Link to = "/userinfo" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => document.getElementById("my_modal-3").closest()}>✕</Link>
        <h3 className="font-bold text-lg">Edit User</h3>
        <div className='mt-4 space-y-2'>
            <span>ID</span>
            <br/>
            <input type="number"
            placeholder='Enter user id'
            className='w-80 px-3 border rounded-md outline-none'
            value = {userId}
            onChange={(e) => SetUserId(e.target.value)}
            required
        />
        </div>
        <div className='mt-4 space-y-2'>
            <span>Name</span>
            <br/>
            <input type="text"
            value = {userName}
            onChange={(e) => SetUserName(e.target.value)}
            placeholder='Enter user name'
            className='w-80 px-3 border rounded-md outline-none'
            required
        />
        </div>
        <div className='mt-4 space-y-2'>
            <span>Email</span>
            <br/>
            <input type="email"
            placeholder='Enter user email'
            className='w-80 px-3 border rounded-md outline-none'
            onChange={(e) => SetUserEmail(e.target.value)}
            value = {userEmail}
            required
        />
        </div>
        <div className='mt-4 space-y-2'>
            <span>Room Number</span>
            <br/>
            <input type="number"
            placeholder='Enter user room number'
            className='w-80 px-3 border rounded-md outline-none'
            onChange={(e) => SetUserRoomNumber(e.target.value)}
            value = {userRoomNumber}
            required
        />
        </div>
        <div className='mt-4 space-y-2'>
            <span>Room Area</span>
            <br/>
            <input type="number"
            placeholder='Enter user room area'
            className='w-80 px-3 border rounded-md outline-none'
            onChange={(e) => SetUserRoomArea(e.target.value)}
            value = {userRoomArea}
            required
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

export default EditUser
