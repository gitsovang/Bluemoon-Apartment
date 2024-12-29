import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Img1 from '../assets/assets/about-pic-1.jpg'
import Img2 from '../assets/assets/about-pic-2.jpg'

const Abouts = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-20">
          <h1 className="font-bold text-2xl text-center">About</h1>
          </div>
          <div className="flex flex-wrap justify-center gap-4 pt-10">
      <div className="card glass w-96 flex flex-col items-center">
      <figure>
      <img className='w-full h-full object-cover'
      src={Img2}
      alt="" />
      </figure>
    <div className="card-body">
    <h2 className="card-title">BlueMoon is the most modern apartment complex</h2>
    <p>Located right at Van Phu intersection, construction started in 2021 and is expected to be completed in 2023. The apartment building is built on an area of 450 square meters, comprising 30 floors, including 1 floor for kiosks, 4 floors for the base, 24 floors for housing, and 1 penthouse floor.</p>
    </div>
    </div>
    <div className="relative card glass w-96 flex flex-col items-center">
    <figure>
    <img className='w-full h-full object-cover'
      src={Img1}
      alt="" />
    </figure>
    <div className="card-body">
    <h2 className="card-title">BlueMoon is the most prestigious apartment complex</h2>
    <p>Coming to BlueMoon apartment complex, you'll be welcomed by the friendliness of our dedicated staff and enjoy the most advanced services in the area, creating an unforgettable experience.</p>
    </div>
    </div>
    </div>
        </div>
      <Footer />
    </>
  )
}

export default Abouts
