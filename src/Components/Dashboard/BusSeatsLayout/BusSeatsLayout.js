import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSeatLayout } from "../../../Api/Dashboard/Dashboard";
import { FaBed } from "react-icons/fa6";
import { RiSteering2Fill } from "react-icons/ri";
// import unisex_sel from "../../../assets/unisex_sel.png";
// import unisex_se from "../../../assets/unisex_se.png";
import unisex_sel from "../../../assets/s_sleeper.png";
import unisex_se from "../../../assets/unisex_se.png";
import { Popover, Tooltip } from "antd";
import { HiCheckCircle } from "react-icons/hi";
import dayjs from "dayjs";
import { toast } from "react-toastify";
// import "./SeatLayout.css";
export default function BusSeatsLayout({ busid, busdroping, busboarding }) {
  const getseats = useSelector((state) => state.seat_layout);
  console.log(getseats.seats_id_layout, "getseatsgetseats");
  console.log(busdroping, "busidbusid");

  const dispatch = useDispatch();
  useEffect(() => {
    GetSeatLayout(busid, dispatch);
  }, []);
  const lowerdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Lower seater";
    return item.z == 0;
  });
  const upperdeck = getseats?.seats_id_layout?.filter((item) => {
    // return item.desc == "Upper sleeper";
    return item.z == 1;
  });
  // const findlowerdeckrow = lowerdeck.length - 1;
  // const lowerdeckrow = lowerdeck[findlowerdeckrow].x;
  // const findupperdeckrow = upperdeck.length - 1;
  // const upperdeckrow = upperdeck[findupperdeckrow].x;
  console.log(lowerdeck, "lowerdecklowerdeck");
  const lowerdeckrow = Math.max(lowerdeck?.map((item) => item.x));
  const lowerdeckcol = Math.max(lowerdeck?.map((item) => item.y));
  const upperdeckrow = Math.max(upperdeck?.map((item) => item.x));
  const upperdeckcol = Math.max(upperdeck?.map((item) => item.y));
  console.log(upperdeck, "lowerdeckrowlowerdeckrow");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [modalshow, setShowModal] = useState(false);
  const [selectedRoutes, setSelectedRoutes] = useState({
    dep_route: busboarding?.[0].name,
    arri_route: busdroping?.[0].name,
    dep_time: busboarding?.[0].time,
    arr_time: busdroping?.[0].time,
  });
  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return;

    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seat.id)) {
        return prevSelectedSeats.filter(
          (selectedSeat) => selectedSeat !== seat.id
        );
      } else {
        if (prevSelectedSeats?.length < 6) {
          return [...prevSelectedSeats, seat.id];
        } else {
          // alert("You can only book a maximum of 2 seats.");
          toast.warning("You can book only one seat.");
          return prevSelectedSeats;
        }
      }
    });
  };
  console.log(selectedSeats, "selectedSeatsselectedSeats");

  return (
    // <div className="grid grid-cols-2">
    //   <div>
    //     <div className="grid grid-cols-4 gap-4 p-4">
    //       {lowerdeck?.map((seat) => (
    //         <div
    //           key={seat.id}
    //           className={`flex flex-col items-center justify-center h-24 w-24 border rounded-lg ${
    //             seat.desc.toLowerCase().includes("sleeper")
    //               ? "bg-red-200"
    //               : "bg-gray-100"
    //           }`}
    //           style={{
    //             gridColumnStart: seat.y + 1,
    //             gridRowStart: seat.x + 1,
    //           }}
    //         >
    //           <span className="font-bold">{seat.id}</span>
    //           <span className="text-sm text-gray-500">{seat.desc}</span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-4 gap-4 p-4">
    //     {upperdeck?.map((seat) => (
    //       <div
    //         key={seat.id}
    //         className={`flex flex-col items-center justify-center h-24 w-24 border rounded-lg ${
    //           seat.desc.toLowerCase().includes("upper sleeper")
    //             ? "bg-blue-200"
    //             : "bg-gray-100"
    //         }`}
    //         style={{
    //           gridColumnStart: seat.y + 1,
    //           gridRowStart: seat.x + 1,
    //           // zIndex: seat.z, // Stack based on z-index
    //         }}
    //       >
    //         <FaBed className="text-3xl text-gray-700" />
    //         <span className="font-bold">{seat.id}</span>
    //         <span className="text-sm text-gray-500">{seat.desc}</span>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="px-[0.5vw]">
      <div
        className="pt-[2vw] bg-[#EEEDED] border-x-[0.1vw] border-b-[0.1vw] rounded-b-[0.5vw]"
        style={
          {
            // boxShadow: "0 0 10px 5px #3498db",
            // borderColor: colorcode.theme,
          }
        }
      >
        <div className="grid grid-cols-2 h-[55vw]  w-full bg-[#EEEDED] rounded-b-[0.5vw]">
          <div className="col-span-1 h-full w-full">
            <div className="grid grid-cols-2 h-full w-full px-[5vw] gap-[1.5vw]">
              <div className="col-span-1 h-full w-full py-[1vw]">
                <div className="border-[0.1vw] border-gray-400 h-[53vw] w-full rounded-[0.5vw] relative bg-white">
                  <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                    {"Lower List".toUpperCase()}
                    {`(${lowerdeck?.length})`}
                  </p>
                  <span className="absolute top-[1vw] right-[1vw]">
                    <RiSteering2Fill size={"2vw"} />
                  </span>
                  <div className="border-l-[0.2vw] border-[#EEEDED] absolute left-[-0.15vw] top-[3vw] h-[3vw]"></div>
                  <div className="border-r-[0.1vw] border-t-[0.1vw] border-b-[0.1vw] bg-[#EEEDED] border-gray-400 h-[3vw] left-[-0.05vw] w-[3vw] top-[3vw] absolute"></div>
                  <div className="grid grid-rows-6 h-full w-full gap-[1vw] pt-[6vw] py-[1vw]">
                    {/* {lowerseatlist.map((item, rowIndex) => (
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
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
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
                                  className={`col-span-1 flex flex-col justify-center items-center ${
                                    bus.status === "booked"
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
                                            ? unisex_sel_sel
                                            : bus.gender === "women"
                                            ? wounisex_sel_sel
                                            : unisex_sel
                                          : bus.seattype
                                        : bus.seattype
                                    }
                                    className="h-[4vw] w-[2vw]"
                                    alt="seat type"
                                  />
                                  <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                                </div>
                              </Tooltip>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))} */}{" "}
                    <div>
                      <div>
                        <div
                          className={`grid grid-cols-${lowerdeckcol} gap-y-[1.5vw] p-[1vw]`}
                        >
                          {lowerdeck?.map((seat) => (
                            <div
                              key={seat.id}
                              className={``}
                              style={{
                                gridColumnStart: seat.y + 1,
                                gridRowStart: seat.x + 1,
                                gridRowEnd: seat.desc
                                  .toLowerCase()
                                  .includes("sleeper")
                                  ? `span 2` // Span across 2 rows for sleeper seats
                                  : `auto`,
                              }}
                            >
                              {/* Sleeper or Non-Sleeper Rendering */}
                              {seat.desc.toLowerCase().includes("sleeper") ? (
                                <Tooltip
                                  title={
                                    <div className="flex flex-col items-center">
                                      <div className="flex items-center">
                                        <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                        <span className="text-[1vw] pl-[0.5vw]">{`(${
                                          seat.status === "AFA"
                                            ? "Available For All"
                                            : seat.status === "AFF"
                                            ? "Available For Female"
                                            : seat.status === "AFM"
                                            ? "Available For Male"
                                            : seat.status === "BFA"
                                            ? "Booked"
                                            : seat.status === "BFF"
                                            ? "Booked For Female"
                                            : "Booked For Male"
                                        })`}</span>
                                      </div>
                                      <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${seat?.fare?.total}`}</span>
                                    </div>
                                  }
                                  color={
                                    seat.status === "BFF" ||
                                    seat.status === "AFF"
                                      ? "#FF26E5"
                                      : seat.status === "AFM" ||
                                        seat.status === "BFM"
                                      ? "#0099F2"
                                      : seat.status === "BFA" ||
                                        seat.status === "AFA"
                                      ? "#4caf50"
                                      : "gray"
                                  }
                                >
                                  <div
                                    className={`border-[0.1vw] ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    } h-[6vw] w-[2.5vw] rounded-[0.3vw] relative flex items-center justify-center cursor-pointer`}
                                    onClick={() => handleSeatClick(seat)}

                                  >
                                    <div
                                      className={`border-[0.1vw]  ${
                                        seat.status == "AFA" ||
                                        seat.status == "BFA"
                                          ? "border-green-500"
                                          : seat.status == "AFF" ||
                                            seat.status == "BFF"
                                          ? "border-pink-500"
                                          : seat.status == "AFB" ||
                                            seat.status == "BFB"
                                          ? "border-blue-500"
                                          : " border-black"
                                      } w-[1.5vw] h-[0.5vw] absolute bottom-[0.5vw] rounded-[0.3vw]`}
                                    ></div>
                                  </div>
                                </Tooltip>
                              ) : (
                                <Tooltip
                                  title={
                                    <div className="flex flex-col items-center">
                                      <div className="flex items-center">
                                        <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                        <span className="text-[1vw] pl-[0.5vw]">{`(${
                                          seat.status === "AFA"
                                            ? "Available For All"
                                            : seat.status === "AFF"
                                            ? "Available For Female"
                                            : seat.status === "AFM"
                                            ? "Available For Male"
                                            : seat.status === "BFA"
                                            ? "Booked"
                                            : seat.status === "BFF"
                                            ? "Booked For Female"
                                            : "Booked For Male"
                                        })`}</span>
                                      </div>
                                      <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${seat?.fare?.total}`}</span>
                                    </div>
                                  }
                                  color={
                                    seat.status === "BFF" ||
                                    seat.status === "AFF"
                                      ? "#FF26E5"
                                      : seat.status === "AFM" ||
                                        seat.status === "BFM"
                                      ? "#0099F2"
                                      : seat.status === "BFA" ||
                                        seat.status === "AFA"
                                      ? "#4caf50"
                                      : "gray"
                                  }
                                >
                                  <div
                                    className={`border-t-[0.1vw]  border-l-[0.1vw] border-r-[0.1vw]   ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    }  h-[2vw] w-[2vw] rounded-t-[0.2vw] relative flex items-center justify-center cursor-pointer`}
                                    onClick={() => handleSeatClick(seat)}
                                  >
                                    <div
                                      className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] bg-white  ${
                                        seat.status == "AFA" ||
                                        seat.status == "BFA"
                                          ? "border-green-500"
                                          : seat.status == "AFF" ||
                                            seat.status == "BFF"
                                          ? "border-pink-500"
                                          : seat.status == "AFB" ||
                                            seat.status == "BFB"
                                          ? "border-blue-500"
                                          : " border-black"
                                      } h-[2vw] rounded-b-[0.2vw] w-[2.4vw] absolute top-[0.7vw] flex items-center`}
                                    ></div>
                                    <div
                                      className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw]  ${
                                        seat.status == "AFA" ||
                                        seat.status == "BFA"
                                          ? "border-green-500"
                                          : seat.status == "AFF" ||
                                            seat.status == "BFF"
                                          ? "border-pink-500"
                                          : seat.status == "AFB" ||
                                            seat.status == "BFB"
                                          ? "border-blue-500"
                                          : " border-black"
                                      } h-[1.6vw] w-[1.6vw] rounded-b-[0.1vw] absolute top-[0.7vw] flex items-center`}
                                    ></div>
                                    <div
                                      className={`border-t-[0.1vw] absolute top-[0.7vw] w-[0.4vw] left-[-0.2vw]   ${
                                        seat.status == "AFA" ||
                                        seat.status == "BFA"
                                          ? "border-green-500"
                                          : seat.status == "AFF" ||
                                            seat.status == "BFF"
                                          ? "border-pink-500"
                                          : seat.status == "AFB" ||
                                            seat.status == "BFB"
                                          ? "border-blue-500"
                                          : " border-black"
                                      }`}
                                    ></div>
                                    <div
                                      className={`border-t-[0.1vw]  absolute top-[0.7vw] w-[0.4vw]  right-[-0.2vw]   ${
                                        seat.status == "AFA" ||
                                        seat.status == "BFA"
                                          ? "border-green-500"
                                          : seat.status == "AFF" ||
                                            seat.status == "BFF"
                                          ? "border-pink-500"
                                          : seat.status == "AFB" ||
                                            seat.status == "BFB"
                                          ? "border-blue-500"
                                          : " border-black"
                                      } rounded-tr-[0.2vw]`}
                                    ></div>
                                  </div>
                                </Tooltip>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* upper */}
              <div className="col-span-1 h-full w-full py-[1vw] ">
                {upperdeck?.length > 0 ? (
                  <div className="border-[0.1vw] border-gray-400 h-[53vw] w-full rounded-[0.5vw] relative bg-white">
                    <p className="text-[1vw] absolute top-[-1.5vw] left-[3vw] text-center">
                      {"Upper List".toUpperCase()}
                      {`(${upperdeck?.length})`}
                    </p>
                    <div className="grid grid-rows-6 h-full w-full pt-[6vw] py-[1vw]">
                      {/* {upperseatlist.map((item, rowIndex) => (
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
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${busprice.discount}`}</span>
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
                                  className={`col-span-1 flex flex-col justify-center items-center ${
                                    bus.status === "booked"
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
                                            ? unisex_sel_sel
                                            : bus.gender === "women"
                                            ? wounisex_sel_sel
                                            : unisex_sel
                                          : bus.seattype
                                        : bus.seattype
                                    }
                                    className="h-[4vw] w-[2vw]"
                                    alt="seat type"
                                  />
                                  <p className="text-[0.8vw]">{`₹ ${busprice.discount}`}</p>
                                </div>
                              </Tooltip>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))} */}{" "}
                      <div
                        className={`grid grid-cols-${upperdeckcol} gap-y-[1.5vw] p-[1vw]`}
                      >
                        {upperdeck?.map((seat) => (
                          <div
                            key={seat.id}
                            style={{
                              gridColumnStart: seat.y + 1,
                              gridRowStart: seat.x + 1,
                              gridRowEnd: seat.desc
                                .toLowerCase()
                                .includes("sleeper")
                                ? `span 2` // Span across 2 rows for sleeper seats
                                : `auto`,
                            }}
                          >
                            {/* <FaBed className="text-3xl text-gray-700" /> */}
                            {/* <span className="font-bold">{seat.id}</span>
                          <span className="text-sm text-gray-500">
                            {seat.desc}
                          </span> */}
                            {seat?.desc?.toLowerCase().includes("sleeper") ? (
                              <Tooltip
                                title={
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                      <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                      <span className="text-[1vw] pl-[0.5vw]">{`(${
                                        seat.status === "AFA"
                                          ? "Available For All"
                                          : seat.status === "AFF"
                                          ? "Available For Female"
                                          : seat.status === "AFM"
                                          ? "Available For Male"
                                          : seat.status === "BFA"
                                          ? "Booked"
                                          : seat.status === "BFF"
                                          ? "Booked For Female"
                                          : "Booked For Male"
                                      })`}</span>
                                    </div>
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${seat?.fare?.total}`}</span>
                                  </div>
                                }
                                color={
                                  seat.status === "BFF" || seat.status === "AFF"
                                    ? "#FF26E5"
                                    : seat.status === "AFM" ||
                                      seat.status === "BFM"
                                    ? "#0099F2"
                                    : seat.status === "BFA" ||
                                      seat.status === "AFA"
                                    ? "gray"
                                    : "#4caf50"
                                }
                              >
                                <div
                                  className={`border-[0.1vw]  ${
                                    seat.status == "AFA" || seat.status == "BFA"
                                      ? "border-green-500"
                                      : seat.status == "AFF" ||
                                        seat.status == "BFF"
                                      ? "border-pink-500"
                                      : seat.status == "AFB" ||
                                        seat.status == "BFB"
                                      ? "border-blue-500"
                                      : " border-black"
                                  }  h-[6vw] w-[2.5vw] rounded-[0.3vw] relative flex items-center justify-center cursor-pointer`}
                                  onClick={() => handleSeatClick(seat)}

                                >
                                  <div
                                    className={`border-[0.1vw]   ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    } w-[1.5vw] h-[0.5vw] absolute bottom-[0.5vw] rounded-[0.3vw]`}
                                  ></div>
                                </div>
                              </Tooltip>
                            ) : (
                              <Tooltip
                                title={
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                      <span className="text-[1.2vw] font-semibold">{`${seat.name}`}</span>
                                      <span className="text-[1vw] pl-[0.5vw]">{`(${
                                        seat.status === "AFA"
                                          ? "Available For All"
                                          : seat.status === "AFF"
                                          ? "Available For Female"
                                          : seat.status === "AFM"
                                          ? "Available For Male"
                                          : seat.status === "BFA"
                                          ? "Booked"
                                          : seat.status === "BFF"
                                          ? "Booked For Female"
                                          : "Booked For Male"
                                      })`}</span>
                                    </div>
                                    <span className="pl-[0.3vw] font-bold text-[1.1vw]">{`₹${seat?.fare?.total}`}</span>
                                  </div>
                                }
                                color={
                                  seat.status === "BFF" || seat.status === "AFF"
                                    ? "#FF26E5"
                                    : seat.status === "AFM" ||
                                      seat.status === "BFM"
                                    ? "#0099F2"
                                    : seat.status === "BFA" ||
                                      seat.status === "AFA"
                                    ? "gray"
                                    : "#4caf50"
                                }
                              >
                                <div
                                  className={`border-t-[0.1vw]  border-l-[0.1vw] border-r-[0.1vw]   ${
                                    seat.status == "AFA" || seat.status == "BFA"
                                      ? "border-green-500"
                                      : seat.status == "AFF" ||
                                        seat.status == "BFF"
                                      ? "border-pink-500"
                                      : seat.status == "AFB" ||
                                        seat.status == "BFB"
                                      ? "border-blue-500"
                                      : " border-black"
                                  }  h-[2vw] w-[2vw] rounded-t-[0.2vw] relative flex items-center justify-center cursor-pointer`}
                                  onClick={() => handleSeatClick(seat)}
                                >
                                  <div
                                    className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] bg-white  ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    } h-[2vw] rounded-b-[0.2vw] w-[2.4vw] absolute top-[0.7vw] flex items-center`}
                                  ></div>
                                  <div
                                    className={`border-b-[0.1vw] border-l-[0.1vw] border-r-[0.1vw] ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    } h-[1.6vw] w-[1.6vw] rounded-b-[0.1vw] absolute top-[0.7vw] flex items-center`}
                                  ></div>
                                  <div
                                    className={`border-t-[0.1vw] absolute top-[0.7vw] w-[0.4vw] left-[-0.2vw]   ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    }`}
                                  ></div>
                                  <div
                                    className={`border-t-[0.1vw]  absolute top-[0.7vw] w-[0.4vw]  right-[-0.2vw]   ${
                                      seat.status == "AFA" ||
                                      seat.status == "BFA"
                                        ? "border-green-500"
                                        : seat.status == "AFF" ||
                                          seat.status == "BFF"
                                        ? "border-pink-500"
                                        : seat.status == "AFB" ||
                                          seat.status == "BFB"
                                        ? "border-blue-500"
                                        : " border-black"
                                    } rounded-tr-[0.2vw]`}
                                  ></div>
                                </div>
                              </Tooltip>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 h-[55vw] w-full ">
            <div className="grid grid-cols-2 w-full h-[43vw] px-[2vw] py-[1vw] gap-[1.5vw]">
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[43vw] rounded-[0.5vw] bg-white">
                <p
                  className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                  style={{
                    backgroundColor: "#1F487C",
                  }}
                >
                  PICKUP POINT
                </p>
                <div className="max-h-[39vw] overflow-y-auto new-scrollbar">
                  {" "}
                  {busboarding.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes?.dep_route == item.anme
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          dep_route: item.name,
                          dep_time: item?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.dep_route == item.name
                            ? "#E7E9EB"
                            : "white",
                      }}
                    >
                      {selectedRoutes?.dep_route == item.name ? (
                        <span className="absolute right-[1vw] top-[0.8vw]">
                          <HiCheckCircle size={"1.2vw"} color={"#1F487C"} />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className=" flex items-center">
                        <span className="text-[1vw] pr-[1vw]">
                          {dayjs(item?.time).format("HH:mm")}
                        </span>
                        <span className="text-[0.8vw] ">
                          {`(${dayjs(item.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[1.1vw] font-bold">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-1 border-[0.1vw] border-gray-400 w-full h-[43vw] rounded-[0.5vw] bg-white">
                <p
                  className="text-center py-[0.5vw]  text-white rounded-tl-[0.45vw] rounded-tr-[0.45vw] text-[1.2vw]"
                  style={{
                    backgroundColor: "#1F487C",
                  }}
                >
                  DROP POINT
                </p>
                <div className="max-h-[39vw] overflow-y-auto new-scrollbar">
                  {" "}
                  {busdroping?.map((item, index) => (
                    <div
                      key={index}
                      className={`${
                        selectedRoutes.arri_route == item.name
                          ? "bg-[#E5FFF1]"
                          : "bg-white hover:bg-gray-200"
                      } flex flex-col py-[0.5vw] px-[1vw]  cursor-pointer relative`}
                      onClick={() =>
                        setSelectedRoutes({
                          ...selectedRoutes,
                          arri_route: item.name,
                          arr_time: item?.time,
                        })
                      }
                      style={{
                        backgroundColor:
                          selectedRoutes?.arri_route == item.name
                            ? "#E7E9EB"
                            : "white",
                      }}
                    >
                      {selectedRoutes.arri_route == item.name ? (
                        <span className="absolute right-[1vw] top-[0.8vw]">
                          <HiCheckCircle size={"1.2vw"} color={"#1F487C"} />
                        </span>
                      ) : (
                        ""
                      )}

                      <p className=" flex items-center">
                        <span className="text-[1vw] pr-[1vw]">
                          {dayjs(item?.time).format("HH:mm")}
                        </span>
                        <span className="text-[0.8vw] ">
                          {`(${dayjs(item.time).format("DD MMM")})`}
                        </span>
                      </p>
                      <p className="text-[1.1vw] font-bold">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-[11vw] w-full  px-[2vw] py-[1vw] ">
              <div className="border-[0.1vw] border-gray-400 w-full h-full mt-[1vw] rounded-[0.5vw] bg-white">
                <div className="grid grid-rows-2 h-full w-full">
                  <div className="row-span-1 px-[1vw] pt-[1vw]">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <p className="text-[1.1vw] font-bold">Selected Seats</p>
                        {/* <p className="text-[1vw]">11</p> */}
                        <div className="flex flex-row flex-wrap">
                          {selectedSeats?.length > 0 ? (
                            selectedSeats?.map((seat, index) => (
                              <p key={index} className="text-[1vw] mr-[0.4vw]">
                                {seat}
                                {index < selectedSeats?.length - 1 && ","}
                              </p>
                            ))
                          ) : (
                            <p className="text-[1vw] mr-[0.4vw]">
                              No Seat Selected
                            </p>
                          )}
                        </div>
                      </div>
                      {/* {selectedSeats.length > 0 ? (
                        <div className="flex flex-col">
                          <p className="float-end text-[1.3vw] font-bold">{`₹${totalFare}`}</p>

                          <Popover placement="top" content={content}>
                            <p className="text-[0.8vw] text-blue-500 font-semibold">
                              Fare Details
                            </p>
                          </Popover>
                        </div>
                      ) : (
                        ""
                      )} */}
                    </div>
                  </div>
                  <div className="row-span-1 px-[1vw] py-[0.5vw]">
                    <button
                      className={`w-full h-full ${
                        selectedSeats?.length > 0
                          ? "bg-[#1F487C] cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      } rounded-[0.5vw] text-white font-bold text-[1.3vw] `}
                      disabled={selectedSeats?.length > 0 ? false : true}
                      onClick={() => setShowModal(!modalshow)}
                      style={{
                        backgroundColor:
                          selectedSeats?.length > 0 ? "#1F487C" : "#9CA3AF",
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  {/* <DrawerDetails
                    modalshow={modalshow}
                    setShowModal={setShowModal}
                    selectedSeats={selectedSeats}
                    selectedRoutes={selectedRoutes}
                    busdetails={busdetails}
                    seatplatform={seatplatform}
                    type={type}
                    busprice={busprice}
                    imageurl={imageurl}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
