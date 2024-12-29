import React, { useState, useEffect } from 'react'
import { BiUser, BiCheckCircle, BiDoorOpen } from 'react-icons/bi'
import CardStyle from './style/Card.module.css'
import axios from 'axios'

const Card = () => {
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
          const response = await axios.post('http://localhost:5000/admin_dashboard');
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
    
      const card = [
        {
          title: 'Total User',
          icon: <BiUser />,
          total: userData.count
        },
        {
          title: 'Active User',
          icon: <BiCheckCircle />,
          total: userData.count
        },
        {
          title: 'Total Room/Active Room',
          icon: <BiDoorOpen />,
          total: `50/${userData.count}`
        }
    ]
    
  return (
    <div className={CardStyle.cardContainer}>
        {card.map((item) => (
            <div className={CardStyle.cardContent}>
                <div className={CardStyle.cardCover}>{item.icon}</div>
                <div className={CardStyle.cardTitle}>
                    <h2>{item.title}</h2>
                </div>
                <div className={CardStyle.cardTotal}>
            {isLoading ? (
            <div>Loading...</div>
            ) : (
                <h3>{item.total}</h3>
            )}
            </div>
            </div>
        ))}
    </div>
  )
}

export default Card
