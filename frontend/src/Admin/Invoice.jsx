import React from 'react'
import { useState, useEffect } from 'react'
import html2canvas from 'html2canvas-pro/dist/html2canvas-pro';
import { jsPDF } from 'jspdf';
import axios from 'axios'
import { useRef } from 'react';

const Invoice = () => {

    const [loader, setLoader] = useState(false);
    const [loadingMonth, setLoadingMonth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setuserData] = useState([])
    const [error, setError] = useState(null);
    const [loadingTime, setLoadingTime] = useState(null)
    const isMounted = useRef(true);

    const [selectedMonth, setSelectedMonth] = useState('January');
    const [displayMonth, setDisplayedMonth] = useState(selectedMonth)

    useEffect(() => {
      setDisplayedMonth(selectedMonth);
    }, );

    useEffect(() => {
        handleMonthChange({ target: { value: selectedMonth } });
      }, [selectedMonth]);


    const handleMonthChange = async (e) => {
    setSelectedMonth(e.target.value);
    setLoadingMonth(true);
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedMonth(selectedMonth);
      setLoadingMonth(false);
      setIsLoading(false)
    }, 1000);
    await fetchUserData();
    };

    const fetchUserData = async () => {
      if (!isMounted.current) return;
      setIsLoading(true);
      try {
          const response = await axios.post('http://localhost:5000/user_data_report', { month: selectedMonth });
          console.log('Fetched user data:', response.data);
          setuserData(response.data);
          setLoader(false);
      } catch (error) {
          setError(error.message);
          console.error('Error fetching user data:', error);
          setIsLoading(true);
      }
  };
    const oklchToRgb = (oklch) => {
        const rgb = oklch.split(',').map(Number);
        const R = 0.4122214708 * L + 0.5363325363 * a + 0.0514459929 * b;
        const G = 0.2119034982 * L + 0.6806995451 * a + 0.1073969566 * b;
        const B = 0.0883024619 * L + 0.2817188376 * a + 0.6299787005 * b;
        return ;
      };
      
      const downloadPDF = () => {
        const cap = document.querySelector('.invoice-pdf');
        setLoader(true);
        html2canvas(cap, {
          logging: true,
          ignoreErrors: true,
          onparse: (element, node) => {
            if (node.style.backgroundColor && node.style.backgroundColor.includes('oklch')) {
              const oklch = node.style.backgroundColor.match(/oklch\((.*)\)/);
              if (oklch) {
                const rgb = oklchToRgb(oklch);
                node.style.backgroundColor = `rgb(${rgb.join(', ')})`;
              }
            }
          },
          useCORS: true,
        })
      .then(canvas => {
          const imgData = canvas.toDataURL('img/png');
          const widthInMm = 297;
          const heightInMm = 210;
      
          const doc = new jsPDF('l', 'mm', );
          const imgAspect = canvas.width / canvas.height;
          const imgWidth = Math.min(widthInMm * 0.9, heightInMm * 0.6 * imgAspect);
          const imgHeight = imgWidth / imgAspect;
      
          const x = (widthInMm - imgWidth) / 2; 
          const y = (heightInMm - imgHeight) / 2; 
      
          doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
          setLoader(false);
          doc.save('Bluemoon-Report.pdf');
        })
      .catch(error => {
          console.error('Error generating PDF:', error);
          setLoader(false);
        }) .finally (() => {
          setLoader(false);
        })
      };
    return (
    <div className='w-full h-full'>
    <div className="flex justify-between items-center mb-4">
    <div>
    <button 
    onClick={downloadPDF}
    disabled={!(loader === false)}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
    {loader ? (
        <span>Downloading...</span>
    ) : (
        <span>Download</span>
    )}
    </button>
    </div>
    <div className = "flex items-center gap-10">
        <label htmlFor="month">Select Month :</label>
        <select value = {selectedMonth} onChange = {handleMonthChange} id="month">
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
        </select>
      </div>
    </div>
      <>
      <div 
      className="invoice-pdf w-full h-auto rounded-lg bg-white shawdow-lg">
      <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <div className="text-gray-700 font-semibold text-lg">Bluemoon Apartment</div>
      </div>
      <div className="text-gray-700">
        <div className="font-bold text-xl mb-2">Report</div>
        <div className="text-md flex gap-2">
        <h2>For month :</h2>
        {loadingMonth ? (
            <span>Loding...</span>
        ) : (
            <span>{displayMonth}</span>
        )}
        </div>
      </div>
    </div>
    <div className="border-b-2 border-gray-300 pb-3">
      <h2 className="text-2xl font-bold mb-4">Send To :</h2>
      <div className="text-gray-700 mb-2">Director : Bluemoon Apartment</div>
      <div className="text-gray-700 mb-1">Address : 23 Ta Quang Buu, Ha Noi</div>
    </div>
    <table className="w-full text-left">
    <thead>
    <tr>
    <th className="text-gray-700 font-bold uppercase py-2 text-center">Total Users</th>
    <th className="text-gray-700 font-bold uppercase py-2 text-center">Total Rooms</th>
    <th className="text-gray-700 font-bold uppercase py-2 text-center">Total Revenue ($)</th>
    </tr>
    </thead>
    <tbody>
    {userData && userData.map((row, index) => (
    <tr key={index}>
    {isLoading ? (
      <>
        <td className="text-center">Is loading...</td>
        <td className="text-center">Is loading...</td>
        <td className="text-center">Is loading...</td>
      </>
    ) : (
      <>
        <td className="text-gray-700 text-center">{row.UserCount}</td>
        <td className="text-gray-700 text-center">50</td>
        <td className="text-gray-700 text-center">{row.totalRoomFee}</td>
      </>
    )}
    </tr>
    ))}
    </tbody>
    </table>
    {userData && userData.map((row, index) => (
    <div key={index} className="grid grid-col-2 justify-end mt-10">
    <div className="flex items-center">
      <div className="text-gray-700 mr-2">Tax :</div>
      {isLoading ? (
        <span>Is loading...</span>
      ) : (
        <div className="text-gray-700">10%</div>
      )}
    </div>
    <div className="flex items-center">
      <div className="text-gray-700 mr-2">Total Income ($) :</div>
      {isLoading ? (
        <span>Is loading...</span>
      ) : (
        <div className="text-gray-700">{row.totalExpense}</div>
      )}
    </div>
    </div>
    ))}
      </div>
      </>
    </div>
  )
}

export default Invoice
