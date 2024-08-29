import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import HomeHearder from "../MainComponenet/HomeHearder";
import homesky from "../../assets/homesky.png";
import Rewards from "../../assets/Rewards.png"
import Rewards1 from "../../assets/Rewards1.png"
import Rewards2 from "../../assets/Rewards2.png"
import Rewards3 from "../../assets/Rewards3.png"
import { useDispatch, useSelector } from "react-redux";
// import { GetOffersOccupation } from "../../Api/Rewards/Rewards";
import { Pagination } from 'antd';
import './Pagination.css'
import { GetOffersOccupation } from "../../Api/Home/Rewards";
export default function Rewardsandoffers() {
  const [currenttab, setCurrenttab] = useState(1);
  const Reward = [{
    img1: <img src={Rewards} />,
    img2: <img src={Rewards1} />,
    img3: <img src={Rewards2} />,
    img4: <img src={Rewards3} />
  }]
  const OccupationDeals = useSelector((state) => state.offers_occupation)

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  // Calculate paginated data
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = OccupationDeals.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    GetOffersOccupation(dispatch)
  }, [dispatch])

  return (
    <>
      <div className="md:block hidden">
        <div className="">
          <HomeHearder />
        </div>
        <div
          className="relative h-[45vw] bg-[#E5FFF1]"
          style={{
            zIndex: 1,
          }}
        >
          {/* <img src={homesky} className="w-full h-[10vw] bg-[#2B8EE4]" /> */}
          <div
            className=" h-[10vw] overflow-x-hidden"
            style={{
              backgroundImage: `url(${homesky})`,
              overflow: "hidden",
              // backgroundSize: "cover",
              position: "relative",
              overflowX: "hidden",
              width: "100%",
            }}
          >
            <label className=" absolute left-[4vw] top-[2vw] text-[1.4vw] text-white font-bold">{`Home > Rewards/Offers`}</label>
            <div className="cloudhome"></div>
            <div className="absolute top-[5.5vw] px-[2vw] grid grid-cols-8 gap-[1vw] w-full">
              <button
                className={`${currenttab == 1
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(1)}
              >
                All
              </button>
              <button
                className={`${currenttab == 2
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(2)}
              >
                General Public
              </button>
              <button
                className={`${currenttab == 3
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(3)}
              >Physically Challenged
              </button>
              <button
                className={`${currenttab == 4
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(4)}
              >
                Pilgrim Travellers
              </button>
              <button
                className={`${currenttab == 5
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(5)}
              >
                Senior Citizens
              </button>
              <button
                className={`${currenttab == 6
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(6)}
              >
                Students
              </button>
              <button
                className={`${currenttab == 7
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(7)}
              >
                Tourists
              </button>
              <button
                className={`${currenttab == 8
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[3vw] text-[1vw] px-[0.5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(8)}
              >
                Corporate Travellers
              </button>
            </div>
          </div>
          <div className="absolute top-[10vw] px-[3vw] flex flex-col gap-[0.2vw]">
            <div className="bg-white px-[1vw] w-full h-[30vw] relative">
              <div className="flex flex-col gap-[0.2vw]">
                <p className="text-center text-[1.4vw] text-[#1F487C] font-bold">Bus Booking Offers</p>
                <p className="text-center text-[1.2vw] text-[#1F487C] font-semibold">Exciting offers on Bus Booking Online</p>
                <p className="text-center text-[1vw] text-[#1F487C]">Get exciting bus booking offers across India on Tbs Travellers can book bus tickets quickly, easily and fast on Tbs. If you’re looking for ways to save money on online bus booking offers today, simply use bus booking coupons on Tbs and avail great savings!</p>
              </div>
              <div className="">
                <div className="grid grid-cols-4 gap-x-[2vw] gap-y-[0.5vw] p-[1vw] px-[5vw]">
                  {paginatedData.slice(0, 8).map((items, index) => (
                    <div key={index} className="w-full h-auto flex justify-center">
                      <img
                        src={`http://192.168.90.47:4000${items.theme}`}
                        className="w-[17vw] h-[8.5vw] "
                      />
                    </div>
                  ))}
                </div>
              </div>
              <Pagination
                className="absolute bottom-[-1.5vw] right-[1vw]"
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={OccupationDeals.length}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </div>
          </div>

        </div>
        <div>
          <Footer />
        </div>
      </div>

      {/* ---Mobile--- */}

      <div className="bg-[#E5FFF1] border-b-2 min-h-screen max-h-auto w-full md:hidden block">
        <div className="">
          <HomeHearder />
        </div>
        <div>
          <label className="px-[2vw] text-[5vw] text-[#1F487C] font-bold">{`Home > Rewards/Offers`}</label>
          <div className=" px-[2vw] ">
            <div className="flex gap-[1vw] w-full overflow-x-auto whitespace-nowrap scrollbar-hide md:my-0 my-[2vw]">
              <button
                className={`${currenttab == 1
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(1)}
              >
                All
              </button>
              <button
                className={`${currenttab == 2
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw]  px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(2)}
              >
                General Public
              </button>
              <button
                className={`${currenttab == 3
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(3)}
              >Physically Challenged
              </button>
              <button
                className={`${currenttab == 4
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(4)}
              >
                Pilgrim Travellers
              </button>
              <button
                className={`${currenttab == 5
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(5)}
              >
                Senior Citizens
              </button>
              <button
                className={`${currenttab == 6
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(6)}
              >
                Students
              </button>
              <button
                className={`${currenttab == 7
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(7)}
              >
                Tourists
              </button>
              <button
                className={`${currenttab == 8
                  ? "bg-[#1F487C] text-white font-semibold"
                  : "bg-white text-[#1F487C]"
                  } w-full h-[8vw] text-[4vw] px-[5vw] rounded-[0.5vw]`}
                onClick={() => setCurrenttab(8)}
              >
                Corporate Travellers
              </button>
            </div>
          </div>

          <div className=" px-[2vw] flex flex-col gap-[0.5vw]">
            <div className="bg-white px-[1vw] w-full h-[150vw]">
              <div className="">
                <div className="flex flex-col gap-[0.25vw] ">
                  <p className="text-center text-[4.5vw] text-[#1F487C] font-bold">Bus Booking Offers</p>
                  <p className="text-center text-[3.5vw] text-[#1F487C] font-semibold">Exciting offers on Bus Booking Online</p>
                  <p className="text-justify text-[3.25vw] text-[#1F487C]">Get exciting bus booking offers across India on Tbs Travellers can book bus tickets quickly, easily and fast on Tbs. If you’re looking for ways to save money on online bus booking offers today, simply use bus booking coupons on Tbs and avail great savings! </p>
                </div>
                <div className=" py-[4vw]">
                  <div className="overflow-y-scroll w-full h-[100vw] flex flex-col gap-[3vw] px-[15vw] ">
                    {OccupationDeals.map((items) => (
                      <img
                        src={`http://192.168.90.47:4000${items.theme}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

    </>
  );
}
