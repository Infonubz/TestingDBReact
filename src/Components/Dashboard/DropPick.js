import dayjs from 'dayjs'
import React from 'react'

const DropPick = ({ boarding, dropping }) => {

    return (
        <>
            <div className='md:block hidden w-full'>
                <div className='bg-[#F6F6F6] h-auto w-full px-[5vw]'>
                    <div className='grid grid-cols-2 '>
                        <div className='flex flex-col items-center'>
                            <p className='text-[2vw] text-[#1F487C] font-bold py-[1.5vw]'>BOARDING</p>
                            {/* <div className='w-[30vw] h-[20vw] overflow-x-auto'>
                                <div className=" h-[12.5vw] w-[20vw] flex flex-col flex-wrap gap-x-[1.5vw] gap-y-[1.5vw]">
                                    {boarding.map((item) => (
                                        <div className='flex gap-[1vw]'>
                                            <div className='text-[1.1vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')}`}</div>
                                            <div className='text-[1.1vw] text-[#1F487C]'>{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}

                            <div className='flex flex-col gap-[1vw]'>
                                {boarding.map((item) => (
                                    <div className='flex gap-[1vw]'>
                                        <div className='text-[1.3vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')}`} </div>
                                        <div className='text-[1.3vw] text-[#1F487C]'>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col items-center'>
                            <p className='text-[2vw] text-[#1F487C] font-bold py-[1.5vw]'>DROPPING</p>
                            {/* <div className='w-[30vw] h-[20vw] overflow-x-auto'>
                                <div className=" h-[12.5vw] w-[24vw] flex flex-col flex-wrap gap-x-[1.5vw] gap-y-[1.5vw]">
                                    {dropping.map((item) => (
                                        <div className='flex gap-[1vw]'>
                                            <div className='text-[1.1vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')} (${dayjs(item.time).format('DD')} ${dayjs(item.time).format('MMM')})`}</div>
                                            <div className='text-[1.1vw] text-[#1F487C]'>{item.name}</div>
                                        </div>
                                    ))}
                                </div>
                            </div> */}
                            <div className='flex flex-col gap-[1vw]'>
                                {dropping.map((item) => (
                                    <div className='flex gap-[1vw]'>
                                        <div className='text-[1.3vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')} (${dayjs(item.time).format('DD')} ${dayjs(item.time).format('MMM')})`} </div>
                                        <div className='text-[1.3vw] text-[#1F487C]'>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='md:hidden block w-full'>
                <div className='bg-[#F6F6F6] h-auto w-full px-[5vw] py-[1vw]'>
                    <div className='grid grid-cols-2'>
                        <div className='flex flex-col gap-y-[2vw]'>
                            <p className='text-[2.5vw] text-[#1F487C] font-bold py-[1.5vw]'>BOARDING</p>
                            {boarding.map((item) => (
                                <div className='flex gap-[1vw]'>
                                    <div className='text-[2.4vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')}`}</div>
                                    <div className='text-[2.4vw] text-[#1F487C]'>{item.name}</div>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col gap-y-[2vw]'>
                            <p className='text-[2.5vw] text-[#1F487C] font-bold py-[1.5vw]'>DROPPING</p>
                            {dropping.map((item) => (
                                <div className='flex gap-[1vw]'>
                                    <div className='text-[2.4vw] text-[#1F487C] font-bold'>{`${dayjs(item.time).format('HH:mm')} (${dayjs(item.time).format('DD')} ${dayjs(item.time).format('MMM')})`}</div>
                                    <div className='text-[2.4vw] text-[#1F487C]'>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropPick



