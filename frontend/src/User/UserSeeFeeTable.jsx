import React, {useState, useEffect} from 'react'
import { Card, Typography } from "@material-tailwind/react"
import axios from 'axios'
import { useParams } from 'react-router-dom';


const TABLE_HEAD = ["ID", "Name", "Room Fee ($)", "Electric Fee ($)", "Water Fee ($)", "Internet Fee ($)", "Motor Parking / Car Parking Fee ($)", "Total ($)", "Status"];

const UserSeeFeeTable = () => {

  const [selectedId, setSelectedId] = useState(null);
  const [monthData, setMonthData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Month_1');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const Password = localStorage.getItem('password');


  useEffect(() => {
    handleMonthChange({ target: { value: selectedMonth } });
  }, [selectedMonth]);


  const monthNumber = selectedMonth.split('_')[1];

   const handleMonthChange = async (e) => {
    setSelectedMonth(e.target.value);
    await fetchMonthData();
  };
  
  const fetchMonthData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/get_user_month_data?month=${monthNumber}&userId=${Password}`);
      setMonthData(response.data);
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
            {monthData.map((row, index) => {
            const isLast = index === monthData.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
          return (
          <tr key={index}>
            <td className={classes}>
              <Typography variant="small" color="blue-gray" className="font-md" style={{textAlign: "center"}}>
                {Password}
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
          </tr>
              );
              })}
            </tbody>
            </table> )}
        </Card>
        </div>
    );
}

export default UserSeeFeeTable
