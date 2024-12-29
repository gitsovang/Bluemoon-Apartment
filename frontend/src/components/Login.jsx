import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });
      if(response.status == 200)
      {
        localStorage.setItem('role', 'admin');
        navigate('/admin')
      }
      else if(response.status == 201)
      {
        localStorage.setItem('role', 'user');
        localStorage.setItem('password', password);
        let url = '/user';
        navigate(url);
      }
    } catch (error) {
      let errorText = ''
      if(error.response)
      {
        if(error.response.status == 400)
        {
          errorText = "Email or Password is incorrect, please try again!"
        }
        else {
          errorText = `Unexpected error: ${error.message}`;
          }
          alert(errorText);
          setError(errorText);
        }
      }
    };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
      <form onSubmit={handleSubmit} method="dialog">
      <Link to = "/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      onClick={() => document.getElementById("my_modal-3").closest()}>✕</Link>
      <h3 className="font-bold text-lg">Login</h3>
        <div className='mt-4 space-y-2'>
            <span>Email</span>
            <br/>
            <input type="email"
            placeholder='Enter your email'
            className='w-80 px-3 border rounded-md outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='mt-4 space-y-2'>
            <span>Password</span>
            <br/>
            <input type="password"
            placeholder='Enter your password'
            className='w-80 px-3 border rounded-md outline-none'
            value = {password}   
            onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        {/* Button Login */}
        <div className='flex justify-around mt-4'>
            <button className='bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-700 duration-200'>Login</button>
        </div>
        </form>
    </div>
    </dialog>
    </div>
  )
}

export default Login
