import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Reset = ({selectedMonth, onEdit}) => {
  
    const [error, setError] = useState(null);
    const [userId, SetUserId] = useState(null);
    const modalRef = useRef(null);

    const [selectedMonthState] = useState(selectedMonth);
    const monthNumber = selectedMonthState.split('_')[1];
      
    console.log(monthNumber)
    const handleSave = async (e) => {   
        e.preventDefault();
        if (!userId) {
            alert('Please fill ID field');
            return;
          }
    
          try {
            const response = await axios.post('http://localhost:5000/reset_user', {
              userId: userId,
              month: parseInt(monthNumber)
            });
            if (response.status === 200) {
                alert("Reset Successfully!")
                onEdit();
                modalRef.current.close()
            } else {
                setError(response.data?.error || 'Server error');
            }
          }
          catch (error) {
          let errorText = ''
          if(error.response)
        {
            if (error.response.status == 409)
            {
                errorText = 'Check again user id not exists';
            }
        } else {
        errorText = `Unexpected error: ${error.message}`;
        }
        alert(errorText);
        setError(errorText);
        }
    }

    return (
        <dialog id="my_modal_2" ref={modalRef} className="modal">
        <div className="modal-box">
        <form onSubmit={handleSave} method="dialog">
        <Link to = "/userfee" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        onClick={() => modalRef.current.close()}>✕</Link>
        <h3 className="font-bold text-lg">Reset</h3>
          <div className='mt-4 space-y-2'>
              <span>ID</span>
              <br/>
              <input type="number"
              placeholder='Enter user id'
              className='w-80 px-3 border rounded-md outline-none'
              onChange={(e) => SetUserId(e.target.value)}
              value = {userId}
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

export default Reset
