import React, { useEffect } from 'react';
import { BsPlug } from "react-icons/bs";
import { BiSolidBlanket, BiCctv } from "react-icons/bi";
import { PiWifiMedium } from "react-icons/pi";
import { FaBottleWater, FaFirstAid } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { MdOutlineLight } from "react-icons/md";
import { GiWaterBottle } from "react-icons/gi";
import { MdMyLocation } from "react-icons/md";
import { useSelector } from 'react-redux';

const amenityIcons = {
    Blankets: <BiSolidBlanket color='#1F487C' size="2vw" />,
    "Charging Point": <BsPlug color='#1F487C' size="2vw" />,
    "Emergency exit": (
        <svg xmlns="http://www.w3.org/2000/svg" color='#1F487C' width="2vw" height="2vw" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69s-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z" />
        </svg>
    ),
    "Live Bus Tracking": <MdMyLocation color='#1F487C' size="2vw" />,
    Pillow: <BiSolidBlanket color='#1F487C' size="2vw" />,
    "Reading Light": <MdOutlineLight color='#1F487C' size="2vw" />,
    "Water Bottle": <GiWaterBottle color='#1F487C' size="2vw" />,
    "CC Camera": <BiCctv color='#1F487C' size="2vw" />,
    "First Aid Box": <FaFirstAid color='#1F487C' size="2vw" />,
    "M Ticket": <IoTicketOutline color='#1F487C' size="2vw" />,
    BedSheet: (
        <svg xmlns="http://www.w3.org/2000/svg" color='#1F487C' width="2vw" height="2vw" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 4h16v12H4V4zm0 14v-2h16v2H4zm0 2h16c1.1 0 2-.9 2-2v-2H2v2c0 1.1.9 2 2 2z" />
        </svg>
    ),
    "Mobile Charging Point": <BsPlug color='#1F487C' size="2vw" />,
    Wifi: <PiWifiMedium color='#1F487C' size="2vw" />,
};

const amenityIconsMobile = {
    Blankets: <BiSolidBlanket color='#1F487C' size="4vw" />,
    "Charging Point": <BsPlug color='#1F487C' size="4vw" />,
    "Emergency exit": (
        <svg xmlns="http://www.w3.org/2000/svg" color='#1F487C' width="4vw" height="4vw" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.34 8.17c-.93 0-1.69-.77-1.69-1.7a1.69 1.69 0 0 1 1.69-1.69c.94 0 1.7.76 1.7 1.69s-.76 1.7-1.7 1.7M10.3 19.93l-5.93-1.18l.34-1.7l4.15.85l1.35-6.86l-1.52.6v2.86H7v-3.96l4.4-1.87l.67-.08c.6 0 1.1.34 1.43.85l.86 1.35c.68 1.21 2.03 2.03 3.64 2.03v1.68c-1.86 0-3.56-.83-4.66-2.1l-.5 2.54l1.77 1.69V23h-1.69v-5.1l-1.78-1.69zM21 23h-2V3H6v13.11l-2-.42V1h17zM6 23H4v-3.22l2 .42z" />
        </svg>
    ),
    "Live Bus Tracking": <MdMyLocation color='#1F487C' size="4vw" />,
    Pillow: <BiSolidBlanket color='#1F487C' size="4vw" />,
    "Reading Light": <MdOutlineLight color='#1F487C' size="4vw" />,
    "Water Bottle": <GiWaterBottle color='#1F487C' size="4vw" />,
    "CC Camera": <BiCctv color='#1F487C' size="4vw" />,
    "First Aid Box": <FaFirstAid color='#1F487C' size="4vw" />,
    "M Ticket": <IoTicketOutline color='#1F487C' size="4vw" />,
    BedSheet: (
        <svg xmlns="http://www.w3.org/2000/svg" color='#1F487C' width="4vw" height="4vw" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 4h16v12H4V4zm0 14v-2h16v2H4zm0 2h16c1.1 0 2-.9 2-2v-2H2v2c0 1.1.9 2 2 2z" />
        </svg>
    ),
    "Mobile Charging Point": <BsPlug color='#1F487C' size="4vw" />,
    Wifi: <PiWifiMedium color='#1F487C' size="4vw" />,
};

const capitalizeFirstLetter = (string) => {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const LiveTracking = ({ trackingCount, setTrackingCount, amenities }) => {

    const hasLiveBusTracking = amenities.includes('Live Bus Tracking');
    const filteredAmenities = amenities.filter(amenity => amenity !== 'Live Bus Tracking');
    const sortedAmenities = hasLiveBusTracking ? ['Live Bus Tracking', ...filteredAmenities] : filteredAmenities;

    // useEffect(() => {
    //     const numberOfTrackingItems = sortedAmenities.length;
    //     setTrackingCount(numberOfTrackingItems);
    // }, [sortedAmenities, setTrackingCount]);

    return (
      <>
        <div className='bg-[#F6F6F6] w-full px-[5vw] md:block hidden'>
            <div className="w-full grid grid-flow-col grid-rows-5 gap-[2vw] py-[1vw] overflow-x-auto overflow-y-hidden">
                {sortedAmenities.map((amenity, idx) => (
                    <div key={idx} className='flex items-center gap-[2vw]'>
                        {amenityIcons[amenity] || <span>Icon not found</span>}
                        <p className='text-[#1F487C] text-[1.2vw]'>
                            {capitalizeFirstLetter(amenity)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
        <div className='bg-[#F6F6F6] w-full px-[5vw] md:hidden block'>
            <div className="w-full grid grid-flow-col grid-rows-5 gap-[2vw] py-[1vw] overflow-x-auto overflow-y-hidden">
                {sortedAmenities.map((amenity, idx) => (
                    <div key={idx} className='flex items-center gap-[2vw]'>
                        {amenityIconsMobile[amenity] || <span>Icon not found</span>}
                        <p className='text-[#1F487C] text-[2vw]'>
                            {capitalizeFirstLetter(amenity)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
};

export default LiveTracking;
// {`₹ ${item?.low_price[2]}`}