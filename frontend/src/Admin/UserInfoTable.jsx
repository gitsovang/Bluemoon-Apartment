import React, {useState, useEffect} from 'react'
import { Card, Typography } from "@material-tailwind/react"
import axios from "axios"
import Add_User from './Add_User';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';

const TABLE_HEAD = ["ID", "Name", "Email", "Room", "Room Area (m2)", "Registeration Date / Time"];

const UserInfoTable = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData]  = useState([])
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        fetchUserData();
    }, [])


    const fetchUserData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get('http://localhost:5000/get_user_data');
          setUserData(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      }
    
      const filteredUsers = userData.filter(user => {
        return user.name.includes(searchTerm) ||
               user.email.includes(searchTerm) ||
               user._id.toString().includes(searchTerm) ||
               user.roomnumber.toString().includes(searchTerm) ||
               user.roomarea.toString().includes(searchTerm)
      });
    

  return (
    <div className = "w-full h-full" style = {{maxHeight: '501px'}}>
      <div style = {
        {display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        }
        }>
      <input type="text"
       className='w-80 border-2 border-gray-300 rounded text-center'
       placeholder="Search Users..." value={searchTerm} onChange={handleSearchChange} />
      <div className='flex gap-5 mr-20 cursor-pointer'>
      <div id = "add">
      <a className='text-green-600 hover:text-gray-800 hover:underline'
      onClick={()=>document.getElementById("my_modal_3").showModal()}
      >Add</a>
      <Add_User/>
      </div>
      <a className='text-blue-600 hover:text-gray-800 hover:underline'
      onClick={()=>document.getElementById("my_modal_2").showModal()}>Edit</a>
      <EditUser/>
      <a className='text-red-600 hover:text-gray-800 hover:underline'
      onClick={()=>document.getElementById("my_modal_1").showModal()}>Delete</a>
      <DeleteUser/>
      </div>
      </div>
      <Card className = "overflow-y-auto h-full">
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
        <>
        <table style={{ width: '100%' }}>
        <thead className = "sticky top-0 z-50 bg-white shadow-sm p-4">
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-5">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
          <tbody>
          {filteredUsers.map((row, index) => {
          const isLast = index === filteredUsers.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        return (
        <tr key={index}>
          <td className={classes}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row._id}
            </Typography>
          </td>
          <td className={classes}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.name}
            </Typography>
          </td>
          <td className={`${classes} bg-blue-gray-50/50`}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.email}
            </Typography>
          </td>
          <td className={classes}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
                {row.roomnumber}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
                {row.roomarea}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
                {row.registerdate}
              </Typography>
            </div>
          </td>
        </tr>
            );
          })}
          </tbody>
        </table> 
        </>
        )}
    </Card>
    </div>
  )
}

export default UserInfoTable
