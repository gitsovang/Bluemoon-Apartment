import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticChart = () => {
  const [userData, setUserData] = useState(0)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if(!isFetched)
        {
            fetchCount();
        }
      }, )
    
    const fetchCount = async () => {
        setIsLoading(true);
        try {
          const response = await axios.post('http://localhost:5000/admin_statistic');
          setUserData(response.data); 
          setIsFetched(true)
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000); 
        }
      };
  return (
    <div className="w-full flex items-center justify-center" style={{maxHeight: "510px"}}>
      <div className="w-full flex items-center justify-center" style={{height: "350px"}}>
        <Bar
          data = {{
            labels: ["New User", "Old User"], 
            datasets: [
              {
                label: "Active User",
                data: [userData.count, 10],
                backgroundColor: 'rgba(70, 2, 255, 0.75)', 
                borderColor: 'rgb(228, 228, 228)',
                borderWidth: 1
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default StatisticChart;