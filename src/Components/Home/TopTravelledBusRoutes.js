import React, { useEffect } from "react";
import { GetTopBusRoutes } from "../../Api/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightLong } from "react-icons/fa6";

export default function TopTravelledBusRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    GetTopBusRoutes(dispatch);
  }, []);
  const getroutes = useSelector((state) => state.top_route_list);
  console.log(getroutes, "getroutesgetroutes");
  const sanitizePath = (path) => {
    const sanitizedPath = path.replace(/\\\\/g, 'file://').replace(/\\/g, '//');
    console.log(encodeURI(sanitizedPath),"techimage");
    return encodeURI(sanitizedPath);
  };
  
  return (
    <>
      <div className="mt-[16vw] md:block hidden px-[5vw]">
        <p className=" text-[1.5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="grid grid-cols-5 w-full h-full gap-[1vw] mt-[1.5vw] px-[2vw]">
          {getroutes.map((item) => (
            <div className="col-span-1 w-full h-[18vw] bg-gradient-to-t from-[#126DAF] border-t-[0.2vw] rounded-lg border-[#0D99FF]">
              <div
                className=""
                style={{
                  height: "75%",
                  width: "100%",
                }}
              >
                <img
                  src={sanitizePath(item.image)}
                  className="h-full w-full p-[0.7vw] rounded-lg"
                  style={{
                    borderRadius: "1.5vw",
                  }}
                  alt={item.from}
                />
              </div>
              <div
                className=""
                style={{
                  height: "25%",
                  width: "100%",
                }}
              >
                <div className="gap-[1vw] flex items-center text-white pl-[1vw] font-bold w-full ">
                  <span className="text-[0.9vw]">
                    {item.from.toUpperCase()}
                  </span>
                  <span>
                    <FaArrowRightLong size={"1vw"} />
                  </span>
                  <span className="text-[0.9vw]">{item.to.toUpperCase()}</span>
                </div>
                <p className="text-white pl-[1vw] font-bold text-[1vw] pt-[0.3vw]">{`${item.bus_count} Buses`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[175vw] px-[5vw] md:hidden block">
        <p className=" text-[5vw] pl-[2vw] text-[#1F487C] font-bold">
          Top Travelled Bus Routes{" "}
        </p>
        <div className="relative overflow-x-auto scrollbar-hide mt-[2vw]">
          <div className="flex">
            {getroutes.map((item) => (
              <div className="w-[55vw] mr-[2vw] flex-shrink-0  h-[54vw] bg-gradient-to-t from-[#126DAF] border-t-[0.5vw] rounded-lg border-[#0D99FF]">
                <div
                  className=""
                  style={{
                    height: "40vw",
                    width: "55vw",
                  }}
                >
                  <img
                    src={sanitizePath(item.image)}
                    className="h-full w-full px-[2vw] pt-[2vw] rounded-lg"
                    style={{
                      borderRadius: "1.5vw",
                    }}
                  />
                </div>
                <div
                  className="pt-[1vw]"
                  style={{
                    height: "10vw",
                    width: "100%",
                  }}
                >
                  <div className="gap-[1vw] flex items-center text-white pl-[2.5vw] font-bold w-full ">
                    <span className="text-[3.5vw]">
                      {item.from.toUpperCase()}
                    </span>
                    <span>
                      <FaArrowRightLong size={"1vw"} />
                    </span>
                    <span className="text-[3.5vw]">
                      {item.to.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white pl-[2.5vw] font-bold text-[3.5vw]">{`${item.bus_count} Buses`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
