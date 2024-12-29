import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Edit = ({ id, selectedMonth, userID, onEdit }) => {
  const [electricFee, setElectricFee] = useState(0);
  const [electricUsage, setElectricUsage] = useState(0);
  const [waterFee, setWaterFee] = useState(0);
  const [waterUsage, setWaterUsage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [internetFee, setInternetFee] = useState(0);
  const [parkingFee, setParkingFee] = useState(0);

  const [selectedMonthState] = useState(selectedMonth);
  const monthNumber = selectedMonthState.split('_')[1];
  const modalRef = useRef(null);
  

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let monthName = ''

  if (monthNumber >= 1 && monthNumber <= 12) {
    monthName = monthNames[monthNumber - 1]; 
  } else {
    console.log("Invalid"); 
  }

  const CalculateElectricFee = (electric_usage) => {
    // rate fee _ 0.16$/1kWh
    const rate = 0.16;
    const fee = electric_usage * rate;

    setElectricFee(fee.toFixed(2));
  }
    const handleElectricUsageChange = (event) => 
  {
     const usage = parseFloat(event.target.value) || 0;
     setElectricUsage(usage);
     CalculateElectricFee(usage);
  }

  const CalculateWaterFee = (water_usage) => {
    // rate fee _ 2,5$/1m3
    const rate = 2.5;
    const fee = water_usage * rate;

    setWaterFee(fee.toFixed(2));
  }
    const handleWaterUsageChange = (event) => 
  {
     const usage = parseFloat(event.target.value) || 0;
     setWaterUsage(usage);
     CalculateWaterFee(usage);
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const handleInternetFeeChange = (event) =>
  {
    const fee = parseFloat(event.target.value) || 0;
    setInternetFee(fee);
  }
  const handleParkingFeeChange = (event) =>
    {
      const fee = parseFloat(event.target.value) || 0;
      setParkingFee(fee);
    }

  const handleSave = async (e) => {
    e.preventDefault();

    if (!userID || !electricFee || !waterFee || !monthNumber || !internetFee || !parkingFee || !waterUsage || !electricUsage) {
      setError('Please fill all fields');
      return;
    }

    const electricFeeValue = parseFloat(electricFee);
    const waterFeeValue = parseFloat(waterFee);
    const internetFeeValue = parseFloat(internetFee);
    const parkingFeeValue = parseFloat(parkingFee);
    const waterUsageValue = parseFloat(waterUsage);
    const electricUsageValue = parseFloat(electricUsage);

    if (electricFeeValue < 0 || waterFeeValue < 0 || internetFeeValue < 0 || parkingFeeValue < 0) {
      setError('Fees cannot be negative');
      return;
    }
    try {
        const response = await axios.post('http://localhost:5000/update_fee', {
          userId: userID,
          electricFee: electricFeeValue,
          waterFee: waterFeeValue,
          month: parseInt(monthNumber),
          internetFee: internetFeeValue,
          parkingFee: parkingFeeValue,
          status: status,
          waterUsage: waterUsageValue,
          electricUsage: electricUsageValue
        });
        if (response.status === 200) {
          onEdit();
          document.getElementById("my_modal_3").close();
        } else {
          setError(response.data?.error || 'Server error');
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

  return (
    <dialog id = {id} ref={modalRef} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSave} method="dialog">
            <Link to="/userfee" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => modalRef.current.close()}>✕</Link>
            <h3 className="font-bold text-lg">Edit</h3>
            <div className='mt-2 space-y-2 text-center'>
              <span>Selected Month :</span>
              <br />
              <input style={{ textAlign: 'center' }} type="text" value={monthName} disabled />
            </div>
            <div className='mt-2 space-y-2 text-center'>
              <span>ID :</span>
              <br />
              <input style={{ textAlign: 'center' }}  type = "text" value = {userID} disabled
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Electric Usage (Kwh) :</span>
              <br />
              <input type="number"
                placeholder='Enter electric usage'
                className='w-80 px-3 border rounded-md outline-none'
                onChange = {handleElectricUsageChange}
                value = {electricUsage}
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Electric Fee ($) :</span>
              <br />
              <input type="number"
                value = {electricFee}
                placeholder='Enter electric fee'
                className='w-80 px-3 border rounded-md outline-none'
                disabled
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Water Usage (m3) :</span>
              <br />
              <input type="number"
                value = {waterUsage}
                onChange = {handleWaterUsageChange}
                placeholder='Enter water usage'
                className='w-80 px-3 border rounded-md outline-none'
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Water Fee ($) :</span>
              <br />
              <input type="number"
                value={waterFee}
                placeholder='Enter water fee'
                className='w-80 px-3 border rounded-md outline-none'
               disabled
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Internet Fee ($) :</span>
              <br />
              <input type="number"
                value = {internetFee}
                onChange = {handleInternetFeeChange}
                placeholder='Enter water fee'
                className='w-80 px-3 border rounded-md outline-none'
              />
            </div>
            <div className='mt-4 space-y-2'>
              <span>Motor/Car Parking Fee ($) :</span>
              <br />
              <input type="number"
                value = {parkingFee}
                onChange = {handleParkingFeeChange}
                placeholder='Enter Motor/Car Parking Fee ($)'
                className='w-80 px-3 border rounded-md outline-none'
              />
            </div>
            <div className='mt-4 gap-3 flex space-between'>
            <input 
              type = "radio"
              checked = {status === 'Paid'}
              value = "Paid"
              onChange = {handleChange}
            ></input>
              <label>Paid</label>
              <input 
              type = "radio"
              checked = {status === 'Unpaid'}
              value  = "Unpaid"
              onChange = {handleChange}
            ></input>
              <label>Unpaid</label>
            </div>
            {error && (
              <p style={{ color: 'red' }}>{error}</p>
            )}
            <div className='flex justify-around mt-4'>
              <button type = "submit" className='bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-700 duration-200'>Save</button>
            </div>
          </form>
        </div>
        </dialog>
  );
};

export default Edit;