import React, { useEffect, useState } from "react";
import sleeper from "../../../../assets/s_sleeper.png";
import { RiSteering2Fill } from "react-icons/ri";
import men_sl from "../../../../assets/men_sl.png";
import men_se from "../../../../assets/men_se.png";
import men_sl_sel from "../../../../assets/men_sl_sel.png";
import men_se_sel from "../../../../assets/men_se_sel.png";
import men_sl_book from "../../../../assets/sl_men_book.png";
import women_sl from "../../../../assets/women_sl.png";
import women_se from "../../../../assets/women_se.png";
import women_sl_sel from "../../../../assets/women_sl_sel.png";
import women_se_sel from "../../../../assets/women_se_sel.png";
import women_sl_book from "../../../../assets/sl_women_book.png";
import { Popover, Tooltip } from "antd";
import unisex_sel from "../../../../assets/unisex_sel.png";
import unisex_se from "../../../../assets/unisex_se.png";
import unisex_se_sel from "../../../../assets/unisex_se_sel.png";
import unisex_book from "../../../../assets/unisex_se_book.png";
import { toast } from "react-toastify";
import platformTheme from "../../PlatformTheme";
import IMG from '../../../../assets/platforms/makemytrip.png'
import { Link } from "react-router-dom";

function SemiSleeperMobile({ busdetails, seatplatform, type, busprice, imageurl }) {
    const upperseatlist = [
        {
            rowlist: [
                {
                    id: "U1",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U2",
                    seattype: women_sl_book,
                    rate: 650,
                    gender: "women",
                    status: "booked",
                    berth: "upper",
                },
                {
                    id: "U3",
                    seattype: women_sl,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "upper",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "U4",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U5",
                    seattype: women_sl,
                    rate: 650,
                    gender: "women",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U6",
                    seattype: women_sl_book,
                    rate: 650,
                    gender: "unisex",
                    status: "booked",
                    berth: "upper",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "U7",
                    seattype: men_sl,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U8",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U9",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "U10",
                    seattype: men_sl,
                    rate: 650,
                    gender: "men",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U11",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U12",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "U13",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U14",
                    seattype: men_sl_book,
                    rate: 650,
                    gender: "men",
                    status: "booked",
                    berth: "upper",
                },
                {
                    id: "U15",
                    seattype: women_sl_book,
                    rate: 650,
                    gender: "women",
                    status: "booked",
                    berth: "upper",
                },
            ],
        },
        {
            rowlist: [
                {
                    id: "U16",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U17",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
                {
                    id: "U18",
                    seattype: sleeper,
                    rate: 650,
                    gender: "unisex",
                    status: "available",
                    berth: "upper",
                },
            ],
        },
    ];
    const lowerlist = [
        {
            id: "SL1",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "SL2",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "SL3",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "SL4",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "SL5",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "SL6",
            seattype: sleeper,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
    ];
    const seatlist = [
        {
            id: "L1",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L2",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L3",
            seattype: women_se,
            rate: 650,
            gender: "women",
            status: "available",
            berth: "lower",
        },
        {
            id: "L4",
            seattype: women_se,
            rate: 650,
            gender: "women",
            status: "available",
            berth: "lower",
        },
        ,
        {
            id: "L5",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L6",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L7",
            seattype: women_se,
            rate: 650,
            gender: "women",
            status: "available",
            berth: "lower",
        },
        {
            id: "L8",
            seattype: women_se,
            rate: 650,
            gender: "women",
            status: "available",
            berth: "lower",
        },

        {
            id: "L9",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L10",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L11",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L12",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },

        {
            id: "L13",
            seattype: men_se,
            rate: 650,
            gender: "men",
            status: "available",
            berth: "lower",
        },
        {
            id: "L14",
            seattype: men_se,
            rate: 650,
            gender: "men",
            status: "available",
            berth: "lower",
        },
        {
            id: "L15",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },
        {
            id: "L16",
            seattype: unisex_se,
            rate: 650,
            gender: "unisex",
            status: "available",
            berth: "lower",
        },

        {
            id: "L17",
            seattype: unisex_book,
            rate: 650,
            gender: "unisex",
            status: "booked",
            berth: "lower",
        },
        {
            id: "L18",
            seattype: unisex_book,
            rate: 650,
            gender: "unisex",
            status: "booked",
            berth: "lower",
        },
    ];

    const [selectedSeats, setSelectedSeats] = useState([]);
    const colorcode = platformTheme(seatplatform);



    const handleSeatClick = (seat) => {
        if (seat.status === "booked") return;

        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat.id)) {
                return prevSelectedSeats.filter(
                    (selectedSeat) => selectedSeat !== seat.id
                );
            } else {
                if (prevSelectedSeats.length < 1) {
                    return [...prevSelectedSeats, seat.id];
                } else {
                    // alert("You can only book a maximum of 2 seats.");
                    toast.warning("You can book only one seat.");
                    return prevSelectedSeats;
                }
            }
        });
    };


    return (

        <>
            <div className="grid grid-cols-2 h-full w-full px-[3vw] gap-[1.5vw] bg-gray-100 border-[0.1vw] border-slate-300 py-[3vw]">
                <div className="col-span-1 w-full py-[1vw]">
                    <div className="border-[0.1vw] border-gray-400  w-full h-full rounded-[0.5vw] bg-white relative">
                        <p className="text-[3vw] text-center">
                            {"Lower List".toUpperCase()}
                            {"(24)"}
                        </p>
                        <span className="absolute top-[1vw] right-[1vw]">
                            <RiSteering2Fill size={"5vw"} />
                        </span>
                        <div className="border-l-[0.2vw] border-[#EEEDED] h-[3vw]"></div>
                        <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw]"></div>
                        <div className="grid grid-cols-4 justify-evenly w-full pt-[6vw] py-[1vw]">
                            <div className="col-span-1  w-full">
                                <div className="grid grid-rows-6 w-full">
                                    {lowerlist.map((bus) => (
                                        <Tooltip
                                            title={
                                                <div className="flex">
                                                    <span className="text-[1vw]">{`${bus.id}`}</span>
                                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice?.discount}`}</span>
                                                </div>
                                            }
                                            color={
                                                bus.gender === "women" &&
                                                    bus.status === "available"
                                                    ? "#FF26E5"
                                                    : bus.gender === "men" &&
                                                        bus.status === "available"
                                                        ? "#0099F2"
                                                        : bus.gender === "unisex" &&
                                                            bus.status === "available"
                                                            ? "#4caf50"
                                                            : "gray"
                                            }
                                        >
                                            <div
                                                className={`row-span-1 flex flex-col justify-center items-center ${bus.status === "booked"
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                                    } `}
                                                onClick={() => handleSeatClick(bus)}
                                            >
                                                <img
                                                    src={
                                                        bus.status === "available"
                                                            ? selectedSeats.includes(bus.id)
                                                                ? bus.gender === "men"
                                                                    ? men_sl_sel
                                                                    : bus.gender === "women"
                                                                        ? women_sl_sel
                                                                        : unisex_sel
                                                                : bus.seattype
                                                            : bus.seattype
                                                    }
                                                    className="h-[22vw] w-[11vw]"
                                                    alt="seat type"
                                                />
                                                <p className="text-[2vw]">
                                                    {/* {`₹ ${busprice?.discount}`} */}
                                                    99999
                                                </p>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-1"></div>
                            <div className="col-span-2">
                                <div className="grid grid-cols-2 flex-row h-full w-full">
                                    {seatlist.map((bus) => (
                                        <Tooltip
                                            title={
                                                <div className="flex">
                                                    <span className="text-[1vw]">{`${bus.id}`}</span>
                                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice?.discount}`}</span>
                                                </div>
                                            }
                                            color={
                                                bus.gender === "women" &&
                                                    bus.status === "available"
                                                    ? "#FF26E5"
                                                    : bus.gender === "men" &&
                                                        bus.status === "available"
                                                        ? "#0099F2"
                                                        : bus.gender === "unisex" &&
                                                            bus.status === "available"
                                                            ? "#4caf50"
                                                            : "gray"
                                            }
                                        >
                                            <div
                                                className={` flex flex-col justify-center items-center ${bus.status === "booked"
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                                    } `}
                                                onClick={() => handleSeatClick(bus)}
                                            >
                                                <img
                                                    src={
                                                        bus.status === "available"
                                                            ? selectedSeats.includes(bus.id)
                                                                ? bus.gender === "men"
                                                                    ? men_se_sel
                                                                    : bus.gender === "women"
                                                                        ? women_se_sel
                                                                        : unisex_se_sel
                                                                : bus.seattype
                                                            : bus.seattype
                                                    }
                                                    className="h-[12vw] w-[8vw]"
                                                    alt="seat type"
                                                />
                                                <p className="text-[2.5vw]">
                                                    {/* {`₹ ${busprice?.discount}`} */}
                                                    99999
                                                </p>
                                            </div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* upper */}

                <div className="col-span-1 h-full w-full py-[1vw]">
                    <div className="border-[0.1vw] border-gray-400 h-full w-full rounded-[0.5vw] bg-white relative">
                        <p className="text-[3vw] text-center">
                            {"Upper List".toUpperCase()}
                            {"(21)"}
                        </p>
                        <div className="grid grid-rows-6 h-full w-full pt-[6vw] py-[1vw]">
                            {upperseatlist.map((item, rowIndex) => (
                                <div className="row-span-1 pt-[0.5vw]" key={rowIndex}>
                                    <div className="grid grid-cols-4">
                                        {item.rowlist.map((bus, index) => (
                                            <React.Fragment key={index}>
                                                {index === 1 && (
                                                    <div className="col-span-1"></div>
                                                )}
                                                <Tooltip
                                                    title={
                                                        <div className="flex">
                                                            <span className="text-[1vw]">{`${bus.id}`}</span>
                                                            <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice?.discount}`}</span>
                                                        </div>
                                                    }
                                                    color={
                                                        bus.gender === "women" &&
                                                            bus.status === "available"
                                                            ? "#FF26E5"
                                                            : bus.gender === "men" &&
                                                                bus.status === "available"
                                                                ? "#0099F2"
                                                                : bus.gender === "unisex" &&
                                                                    bus.status === "available"
                                                                    ? "#4caf50"
                                                                    : "gray"
                                                    }
                                                >
                                                    <div
                                                        className={`col-span-1 flex flex-col justify-center items-center ${bus.status === "booked"
                                                            ? "cursor-not-allowed"
                                                            : "cursor-pointer"
                                                            } `}
                                                        onClick={() => handleSeatClick(bus)}
                                                    >
                                                        <img
                                                            src={
                                                                bus.status === "available"
                                                                    ? selectedSeats.includes(bus.id)
                                                                        ? bus.gender === "men"
                                                                            ? men_sl_sel
                                                                            : bus.gender === "women"
                                                                                ? women_sl_sel
                                                                                : unisex_sel
                                                                        : bus.seattype
                                                                    : bus.seattype
                                                            }
                                                            className="h-[16w] w-[8vw]"
                                                            alt="seat type"
                                                        />
                                                        <p className="text-[2.5vw]">
                                                            {/* {`₹ ${busprice?.discount}`} */}
                                                            99999
                                                        </p>
                                                    </div>
                                                </Tooltip>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Link to="/dashboard/viewSeats/PickUppoint">
                {/* <button className='bg-blue-900 w-full h-[4vh] fixed bottom-0'>
            <p className='text-white'>CONTINUE</p>
          </button> */}
                <button className={`w-full h-[4vh] ${selectedSeats.length > 0
                    ? "bg-[#1F487C] cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                    } rounded-[0.5vw] text-white font-bold text-[1.3vw] fixed bottom-0`}
                    disabled={selectedSeats.length > 0 ? false : true}
                    // onClick={() => setShowModal(!modalshow)}
                    style={{
                        backgroundColor: selectedSeats.length > 0
                            ? colorcode.btn
                            : "#9CA3AF",
                    }}>
                    <p className='text-white text-[3vw]'>CONTINUE</p>
                </button>
            </Link>
        </>



    );
}

export default SemiSleeperMobile;
