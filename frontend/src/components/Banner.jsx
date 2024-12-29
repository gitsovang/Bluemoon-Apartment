import React from 'react'
import MoonIcon from '../assets/assets/moon-logo.png'
import BlueMoonApart from '../assets/assets/bluemoon-apart.png'

const Banner = () => {
  return (
    <>
    <div className='max-w-screen-2xl gap-10 containter mx-auto md:px-20 px-4 flex flex-col md:flex-row pt-10 my-10' style={{minHeight: "100vh"}}>
        <div className="w-full order-2 md:order-1 md:w-1/2 flex items-center md:mt-32 mt-12" style={{marginBottom: "150px"}}>
           <div className='space-y-12'>
            <div className='flex items-center'>
            <img src={MoonIcon} alt="" style={{ width: '50px', height: 'auto', marginRight: '30px' }} />
            <h1 className='text-4xl font-bold'>
                Bluemoon <br/> <span style = {{marginLeft: '20px'}}>Apartment</span>
            </h1>
            </div>
           <p className='text-lg font-semibold'><span style = {{marginLeft: '35px'}}>Symbol of modern development and prosperity.</span><br/>With sophisticated design and luxurious amenities, BlueMoon provides a perfect living space worthy of class.</p>
           </div>
        </div>
        <div className="order-1 w-full md:w-1/2">
            <img src={BlueMoonApart} style = {{ marginTop: "20px", width: '450px', height: 'auto'}} alt="" />
        </div>
    </div>
    </>
  )
}

export default Banner
