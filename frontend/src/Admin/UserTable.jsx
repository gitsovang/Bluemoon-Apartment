import { Card, Typography } from "@material-tailwind/react"
import {React, useEffect, useState} from "react"
import { BiPencil } from 'react-icons/bi'
import Edit from "./Edit";
import axios from "axios"
import EditStatusPayment from "./EditStatusPayment";
import Reset from "./Reset";
 
const TABLE_HEAD = ["ID", "Name", "Room Fee ($)", "Electric Fee ($)", "Water Fee ($)", "Internet Fee ($)", "Motor Parking / Car Parking Fee ($)", "Total ($)", "Status", "Action"];

export function UserTable() {

  const [selectedId, setSelectedId] = useState(null);
  const [monthdata, setMonthdata] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Month_1');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    handleMonthChange({ target: { value: selectedMonth } });
    console.log(monthdata)
  }, [selectedMonth]);


  const monthNumber = selectedMonth.split('_')[1];
  const handleUpdate = async () => {
    await fetchMonthData();
  };

  const editUpdate = async () => {
    await fetchMonthData();
  }

  const editstatusUpdate = async () => {
    await fetchMonthData();
  }

  const resetUpdate = async () => {
    await fetchMonthData();
  }

  const handlestatusUpdate = async () => {
    await fetchMonthData();
  }
  const handleresetUpdate = async () => {
    await fetchMonthData();
  }
   const handleMonthChange = async (e) => {
    setSelectedMonth(e.target.value);
    await fetchMonthData();
  };
  
  const fetchMonthData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/get_month?month=${monthNumber}`);
      setMonthdata(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className = "h-full w-full" style = {{ maxHeight: '501px'}}>
      <div className="flex justify-between">
      <div className = "flex items-center gap-10">
        <label htmlFor="month">Select Month :</label>
        <select value = {selectedMonth} onChange={handleMonthChange} id="month">
        <option value="Month_1">January</option>
        <option value="Month_2">February</option>
        <option value="Month_3">March</option>
        <option value="Month_4">April</option>
        <option value="Month_5">May</option>
        <option value="Month_6">June</option>
        <option value="Month_7">July</option>
        <option value="Month_8">August</option>
        <option value="Month_9">September</option>
        <option value="Month_10">October</option>
        <option value="Month_11">November</option>
        <option value="Month_12">December</option>
        </select>
      </div>
      <div>
      <div className="flex items-center justify-center gap-10">
      <div>
      <a className='text-red-600 hover:text-gray-800 hover:underline cursor-pointer'
      onClick={()=>document.getElementById("my_modal_2").showModal()}
      >Reset</a>
      <Reset selectedMonth={selectedMonth} onUpdate={handleresetUpdate} 
      onEdit = {resetUpdate}/>
      </div>
      <div>
      <a className='text-blue-600 hover:text-gray-800 hover:underline cursor-pointer'
      onClick={()=>document.getElementById("my_modal_3").showModal()}
      >Edit Payment Status</a>
      <EditStatusPayment selectedMonth={selectedMonth} onUpdate={handlestatusUpdate} 
      onEdit = {editstatusUpdate}/>
      </div>
      </div>
      </div>
      </div>
      <Card className = "overflow-y-auto h-full">
      {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
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
        {monthdata.map((row, index) => {
        console.log('Mapping row:', row); 
        const isLast = index === monthdata.length - 1;
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
            {row.roomfee}
          </Typography>
        </td>
        <td className={classes}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.electricfee}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.waterfee}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.internetfee}
            </Typography>
          </div>
        </td>
          <td className={classes}>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
              {row.carmotorparkingfee}
            </Typography>
          </div>
        </td>
        <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
            {row.total}
          </Typography>
        </td>
        <td className={classes}>
        <Typography 
            variant="small" 
            className="font-md ml-5 font-bold" 
            style={{ color: row.status === "Paid" ? 'blue' : 'red' }}
        >
            {row.status}
        </Typography>
        </td>
        <td className={classes}>
          <div>
          <a
          style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
          setSelectedId(row._id);
          const modal = document.getElementById(`my_modal_${row._id}`);
          if (modal) {
              modal.showModal();
        } else {
          console.error(`Modal with id my_modal_${row._id} not found`);
          }
        }}
      >
        <BiPencil />
        </a>
            <Edit selectedMonth={selectedMonth} onUpdate={handleUpdate} 
            onEdit = {editUpdate}
            userID = {row._id} 
            id={`my_modal_${row._id}`}
            /> 
          </div>
        </td>
      </tr>
          );
          })}
        </tbody>
        </table> )}
    </Card>
    </div>
  );
}
export default UserTable