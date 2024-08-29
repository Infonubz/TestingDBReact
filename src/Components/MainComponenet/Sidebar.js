import React, { useEffect, useState } from "react";
import {
  MdAirlineSeatIndividualSuite,
  MdAirlineSeatReclineExtra,
} from "react-icons/md";
import { TbAirConditioning, TbAirConditioningDisabled } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LuSunrise, LuSunset } from "react-icons/lu";
import { IoSunnyOutline } from "react-icons/io5";
import { PiMoonLight } from "react-icons/pi";
import { Input } from "antd";
import { CiSearch } from "react-icons/ci";
import Modal from "react-modal";
import s_ac from "../../assets/s_ac.png";
import s_c_ac from "../../assets/s_c_ac.png";
import s_non_ac from "../../assets/s_non_ac.png";
import s_c_non_ac from "../../assets/s_c_non_ac.png";
import seats from "../../assets/seats.png";
import sleeper from "../../assets/seat_sleep.png";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  FILTER,
  GET_DATA,
  GET_FILTER_DATA,
  CARD_DETAIL,
} from "../../Store/type";
import { BiMapPin } from "react-icons/bi";
import { useNavigate } from "react-router";
import Map from "../Dashboard/Map";
import axios from "axios";
import { Filters, Drop_Point_List } from "../../Api/Dashboard/Dashboard";
import { FaRegStar, FaStar } from "react-icons/fa";

const Sidebar = ({ sidebarToggle, share }) => {
  const arrange_data = useSelector((state) => state.rearrange);
  const [amenitiesvalue, setAmenitiesValue] = useState({});
  // const [vehiclevalue, setVehicleValue] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalname, setModalname] = useState("");
  const [finalpickupdata, setFinalPickupData] = useState([]);
  const [finaldropdata, setFinalDropData] = useState([]);
  const [finaloperatordata, setFinalOperatorData] = useState([]);
  const [modalsearch, setModalSearch] = useState("");
  const [modalshowdata, setModalShowData] = useState([]);
  const [pickupchecked, setPickupChecked] = useState({});
  const [dropchecked, setDropChecked] = useState({});
  const [operatorchecked, setOperatorChecked] = useState({});
  const [showingdata, setShowingData] = useState([]);
  const [modalpickupsearch, setModalpickupsearch] = useState("");
  const [busData, setBusData] = useState();

  const buslist = useSelector((state) => state?.card_detail);
  const [pickUp_list, setPickUpList] = useState({});
  const drop_Point_List = useSelector((state) => state?.drop_point_list);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState("");
  const [selectedDroppingPoint, setSelectedDroppingPoint] = useState("");

  const [searchvalue, setSearchValue] = useState({
    pickup: "",
    drop: "",
    operator: "",
  });
  const [filtervalue, setFitervalue] = useState({
    ac: false,
    non_ac: false,
    sleeper: false,
    seater: false,
    amenities: [],
    radius: false,
  });
  const [timefiltervalue, setTimeFitervalue] = useState({
    // time_6:00 AM to 11:00 AM: false,
    // time_11:00 AM to 6:00 PM: false,
    // time_6:00 PM to 11:00 PM: false,
    // time_11:00 PM to 6:00 AM: false,
  });
  const [pickuptimefiltervalue, setPickupTimeFitervalue] = useState({
    // time_6:00 AM to 11:00 AM: false,
    // time_11:00 AM to 6:00 PM: false,
    // time_6:00 PM to 11:00 PM: false,
    // time_11:00 PM to 6:00 AM: false,
  });
  const [boolean, setBoolean] = useState({
    pickup: true,
    drop: true,
    pickup_time: true,
    drop_time: true,
    amenities: true,
    operators: true,
    vehicle: true,
  });

  const handleClear = () => {
    setFitervalue({
      ...filtervalue,
      ac: false,
      non_ac: false,
      sleeper: false,
      seater: false,
      radius: false,
    });
    setDropChecked({});
    setOperatorChecked({});
    setPickupChecked({});
    setAmenitiesValue({});
    setFitervalue({
      ac: false,
      non_ac: false,
      sleeper: false,
      seater: false,
      amenities: [],
      radius: false,
    });
    setTimeFitervalue({
      ...timefiltervalue,
      // time_6:00 AM to 11:00 AM: false,
      // time_11:00 AM to 6:00 PM: false,
      // time_6:00 PM to 11:00 PM: false,
      // time_11:00 PM to 6:00 AM: false,
    });
    setDropTime("");
    setPickUpTime("");
    setAcFilter("");
    setSeatTypeFilter("");
  };
  const dispatch = useDispatch();
  const operators = [
    { place: "InterCity SmartBus", count: "85" },
    { place: "Sharma Travels", count: "113" },
    { place: "SPS Travels", count: "67" },
    { place: "KPN Travels", count: "20" },
    { place: "National Travels", count: "67" },
    { place: "Orange Travels", count: "77" },
    { place: "Bharath Travels", count: "77" },
  ];
  const travel_operator = operators.slice(0, 5);
  const place = [
    { place: "Avinashi", count: "113" },
    { place: "Palladam", count: "85" },
    { place: "Pushpa", count: "67" },
    { place: "New Bus Stand", count: "20" },
    { place: "Sri nagar", count: "67" },
    { place: "Old Bus Stand", count: "15" },
    { place: "Gandhi nagar", count: "18" },
    { place: "Town hall", count: "50" },
    { place: "Old Bus Stand", count: "15" },
    { place: "Gandhi nagar", count: "18" },
    { place: "Town hall", count: "50" },
  ];
  const drop_place = [
    { place: "KMCH", count: "113" },
    { place: "Airport", count: "85" },
    { place: "RS Puram", count: "67" },
    { place: "Gandhipuram", count: "20" },
    { place: "Saravanampatti", count: "67" },
  ];
  const amenities = [
    { amenities: "WIFI", count: 12, id: 1 },
    { amenities: "Water bottle", count: 15, id: 2 },
    { amenities: "Toilet", count: 6, id: 3 },
    { amenities: "Track My Bus", count: 52, id: 4 },
    { amenities: "Blankets", count: 74, id: 5 },
    { amenities: "Charging Point", count: 30, id: 6 },
  ];

  // const handleAmenities = (item) => {
  //   const isAmenitySelected = amenitiesvalue.includes(item);
  //   console.log(isAmenitySelected, "isAmenitySelected");
  //   const tag = amenities.includes(item);
  //   if (isAmenitySelected) {
  //     // If amenity is already selected, remove it
  //     setAmenitiesValue(amenitiesvalue.filter((amenity) => amenity !== item));
  //   } else {
  //     // If amenity is not selected, add it
  //     setAmenitiesValue([...amenitiesvalue, item]);
  //   }
  // };
  const amenitiesClear = () => {
    setAmenitiesValue({});
  };
  console.log(amenitiesvalue, "amenitiesvalue");
  const vehicleclear = () => {
    // setVehicleClear([]);
    // setFitervalue({
    //   ac: false,
    //   non_ac: false,
    //   sleeper: false,
    //   seater: false,
    //   amenities: [],
    //   radius: false,
    // });
    setAcFilter("");
    setSeatTypeFilter("");
  };
  const openModal = (name) => {
    setModalname(name);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalSearch("");
  };

  // const groupByFirstLetter = (places) => {
  //   const groupedPlaces = {};
  //   places.forEach((item) => {
  //     const firstLetter = item.place.charAt(0).toUpperCase();
  //     if (!groupedPlaces[firstLetter]) {
  //       groupedPlaces[firstLetter] = [];
  //     }
  //     groupedPlaces[firstLetter].push(item);
  //   });
  //   return groupedPlaces;
  // };

  const handleoperatorCheckbox = (event, itemName) => {
    const { checked } = event.target;
    setOperatorChecked((prevState) => {
      if (checked) {
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };
  const pickupClear = () => {
    setPickupChecked({});
  };
  const dropClear = () => {
    setDropChecked({});
  };
  const operatorClear = () => {
    setOperatorChecked({});
  };

  const timeClear = () => {
    // setTimeFitervalue({
    //   ...timefiltervalue,
    //   time_6:00 AM to 11:00 AM: false,
    //   time_11:00 AM to 6:00 PM: false,
    //   time_6:00 PM to 11:00 PM: false,
    //   time_11:00 PM to 6:00 AM: false,
    // });
    setDropTime("");
  };
  const pickuptimeClear = () => {
    setPickUpTime("");
  };
  useEffect(() => {
    if (modalname == "pickup") {
      setShowingData(pickupfullist);
    } else if (modalname == "drop") {
      setShowingData(dropfulllist);
    } else if (modalname == "amenities") {
      console.log("hii");
      setShowingData(amenitieslist);
    } else {
      setShowingData(opertorfulllist);
    }
  }, [modalname]);
  useEffect(() => {
    if (modalname == "pickup") {
      const filteredData = showingdata.filter((item) =>
        item.name.toLowerCase().includes(modalsearch.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else if (modalname == "drop") {
      const filteredData = showingdata.filter((item) =>
        item.name.toLowerCase().includes(modalsearch.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else if (modalname == "amenities") {
      const filteredData = showingdata.filter((item) =>
        item.amenity.toLowerCase().includes(modalsearch.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    } else {
      const filteredData = showingdata.filter((item) =>
        item.operator.toLowerCase().includes(modalsearch.toLowerCase())
      );
      // const groupedPlaces = groupByFirstLetter(filteredData);
      // setModalShowData(groupedPlaces);
      setModalShowData(filteredData);
    }
  }, [modalname, modalsearch, showingdata]);
  console.log(modalsearch, "modalsearch");
  useEffect(() => {
    const pickupslice = place.slice(0, 5);
    const dropslice = drop_place.slice(0, 5);
    const travelslice = travel_operator.slice(0, 5);
    if (searchvalue.pickup) {
      const filteredData = place.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
      );
      setFinalPickupData(filteredData);
    } else {
      setFinalPickupData(pickupslice);
    }
    if (searchvalue.drop) {
      const filteredData = drop_place.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
      );
      setFinalDropData(filteredData);
    } else {
      setFinalDropData(dropslice);
    }
    if (searchvalue.operator) {
      const filteredData = travel_operator.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
      );
      setFinalOperatorData(filteredData);
    } else {
      setFinalOperatorData(travelslice);
    }
  }, [searchvalue]);

  useEffect(() => {
    const filterfun = () => {
      if (filtervalue) {
        dispatch({
          type: FILTER,
          payload: filtervalue,
        });
      }
    };
    filterfun();
  }, [filtervalue, dispatch]);
  // const groupedPlaces = groupByFirstLetter(showingdata);
  const handleonapply = () => {
    setModalIsOpen(false);
  };
  const navigation = useNavigate();
  const [isMapPage, setIsMapPage] = useState(false);
  const handleradius = () => {
    setFitervalue({ ...filtervalue, radius: !filtervalue.radius });
    // navigation("/map");
    if (isMapPage) {
      navigation("/dashboard");
      localStorage.setItem("depature", "Chennai");
    } else {
      navigation("/map");
    }
    setIsMapPage(!isMapPage);
  };
  // useEffect(() => {
  //   if (filtervalue.radius) {
  //     navigation("/map");
  //   } else {
  //     navigation("/dashboard");
  //   }
  // }, []);
  const busdata = useSelector((state) => state.bus_data);
  const [acfilter, setAcFilter] = useState("");
  const [seattypefilter, setSeatTypeFilter] = useState("");
  const [pickuptime, setPickUpTime] = useState("");
  const [droptime, setDropTime] = useState("");
  console.log(acfilter, "filtervalue.radius");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [seatsSorting, setseatsSorting] = useState("false");
  const [priceSorting, setpriceSorting] = useState("false");
  const [ratingSorting, setratingSorting] = useState("false");
  const [arrivalSorting, setarrivalSorting] = useState("false");
  const [departureSorting, setdepartureSorting] = useState("false");

  useEffect(() => {
    if (localStorage.getItem("ac") == "true") {
      setAcFilter("ac");
      console.log(localStorage.getItem("ac"), "joooooooo");
    }
    if (localStorage.getItem("seatType")) {
      setSeatTypeFilter(localStorage.getItem("seatType"));
    }
    if (localStorage.getItem("departure")) {
      setDeparture(localStorage.getItem("departure"));
    }
    if (localStorage.getItem("arrival")) {
      setArrival(localStorage.getItem("arrival"));
    }
    if (localStorage.getItem("sort") == "seats") {
      setseatsSorting(localStorage.getItem("sort"));
    }
    if (localStorage.getItem("sort") == "price") {
      setpriceSorting(localStorage.getItem("sort"));
    }
    if (localStorage.getItem("sort") == "ratings") {
      setratingSorting(localStorage.getItem("sort"));
    }
    if (localStorage.getItem("sort") == "arrivalSort") {
      setarrivalSorting(localStorage.getItem("sort"));
    }
    if (localStorage.getItem("sort") == "departureSort") {
      setdepartureSorting(localStorage.getItem("sort"));
    }
  }, [localStorage.getItem("ac"), localStorage.getItem("seatType")]);

  const handleAllFilters = async () => {
    try {
      const pickupcheck = Object.keys(pickupchecked).filter(
        (key) => pickupchecked[key]
      );
      const operatorcheck = Object.keys(operatorchecked).filter(
        (key) => operatorchecked[key]
      );
      const dropcheck = Object.keys(dropchecked).filter(
        (key) => dropchecked[key]
      );
      const amenitycheck = Object.keys(amenitiesvalue).filter(
        (key) => amenitiesvalue[key]
      );
      let dateTimeString = localStorage.getItem("departure_date");

      if (dateTimeString) {
        // Parse the string into a Date object
        let dateObj = new Date(dateTimeString);

        // Format the date to "YYYY-MM-DD"
        const formattedDate =
          dateObj.getFullYear() +
          "-" +
          ("0" + (dateObj.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + dateObj.getDate()).slice(-2);

        // Store the formatted date back in localStorage
        localStorage.setItem("departure_date", formattedDate);
      }

      const allFilters = await Filters(
        localStorage.getItem("departure"),
        localStorage.getItem("arrival"),
        localStorage.getItem("departure_date"),
        acfilter,
        seattypefilter,
        pickuptime,
        droptime,
        pickupcheck,
        dropcheck,
        amenitycheck,
        operatorcheck,
        localStorage.getItem("sort"),
        dispatch
      );
      setBusData(allFilters);
      console.log(allFilters, "allFilters");
      console.log(pickuptime, "pickuptime");
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    handleAllFilters();
  }, [
    localStorage.getItem("departure"),
    localStorage.getItem("arrival"),
    localStorage.getItem("departure_date"),
    acfilter,
    seattypefilter,
    pickuptime,
    droptime,
    pickupchecked,
    dropchecked,
    amenitiesvalue,
    operatorchecked,
    localStorage.getItem("sort"),
    dispatch,
  ]);

  const handleDropPoint = async () => {
    try {
      const dropPiontFilter = await Drop_Point_List(
        localStorage.getItem("departure"),
        localStorage.getItem("arrival"),
        localStorage.getItem("selectdate"),
        dispatch
      );
      console.log(dropPiontFilter, "dropPiontFilter");
      setPickUpList(dropPiontFilter || {});
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    handleDropPoint();
    console.log(drop_Point_List, "drop_Point_List");
  }, [
    localStorage.getItem("departure"),
    localStorage.getItem("arrival"),
    localStorage.getItem("selectdate"),
    dispatch,
  ]);

  const handlePickupCheckbox = (event, itemName) => {
    const { checked } = event.target;
    // const { name, checked } = event.target;
    // setCheckboxes({ ...checkboxes, [name]: checked });
    console.log(event, "event", itemName, "itemName");

    setPickupChecked((prevState) => {
      if (checked) {
        console.log(prevState, "drop checked");
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };

  const handledropCheckbox = (event, itemName) => {
    const { checked } = event.target;

    setDropChecked((prevState) => {
      if (checked) {
        console.log(prevState, "drop checked");
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };

  const handleAmenityCheckbox = (event, itemName) => {
    const { checked } = event.target;

    setAmenitiesValue((prevState) => {
      if (checked) {
        console.log(prevState, "drop checked");
        return { ...prevState, [itemName]: true };
      } else {
        const updatedItems = { ...prevState };
        delete updatedItems[itemName];
        return updatedItems;
      }
    });
  };

  const handlePickup_checkbox = (e, name) => {
    if (e.target.checked) {
      setSelectedPickupPoint(name);
      console.log(name, "drop checked");
    } else {
      setSelectedPickupPoint(""); // Clear the selection if unchecked
    }
  };

  const handledrop_Checkbox = (e, name) => {
    if (e.target.checked) {
      setSelectedDroppingPoint(name);
      console.log(name, "drop checked");
    } else {
      setSelectedDroppingPoint(""); // Clear the selection if unchecked
    }
  };

  const handlefilter = async () => {
    // console.log(amenitiesvalue, "searchvaluesearchvalue");
    console.log(pickupchecked, "pickupchecked");
    try {
      const operatorcheck = Object.keys(operatorchecked).filter(
        (key) => operatorchecked[key]
      );

      const transformedData = amenitiesvalue.reduce((acc, item) => {
        // Check if item exists and set its value to true
        acc[item] = true;
        return acc;
      }, {});
      const amenitiescheck = Object.keys(transformedData).filter(
        (key) => transformedData[key]
      );
      console.log(amenitiescheck.join(","), "transformedData");
      // const dropcheck = Object.keys(dropchecked)
      //   .filter((key) => dropchecked[key])
      //   .map((key, index) => "test" + (index + 1))
      //   .join(",");
      const payload = {
        // source: localStorage.getItem("depature"),
        De_source: "Chennai",
        Ar_source: "Coimbatore",
        AC: acfilter === "ac" ? "TRUE" : "FALSE",
        NON_AC: acfilter === "non_ac" ? "TRUE" : "FALSE",
        Seater: seattypefilter === "seater" ? "TRUE" : "FALSE",
        Sleeper: seattypefilter === "sleeper" ? "TRUE" : "FALSE",
        Semi_sleeper: seattypefilter === "semi_sleeper" ? "TRUE" : "FALSE",
        //pickupPoints: pickupcheck.join(","),
        //dropPoints: dropcheck.join(","),
        selectedOperators: operatorcheck.join(","),
        //amenities: amenitiescheck.join(","),
        timeDepature: pickuptime,
        timeArrival: droptime,
        price: arrange_data.price ? arrange_data.price : "FALSE",
        depature: arrange_data.depature ? arrange_data.depature : "FALSE",
        arrival: arrange_data.arrival ? arrange_data.arrival : "FALSE",
        seats: arrange_data.seats ? arrange_data.seats : "FASLE",
        rating: arrange_data.rating ? arrange_data.rating : "FALSE",
        // timeDepature:"6:00 AM to 11:00 AM"
      };

      console.log(operatorchecked, "dropcheck");
      const place = localStorage.getItem("depature");
      // const response = await axios.get(
      //   place === "Chennai"
      //     ? "http://192.168.90.47:3000/chennai_src"
      //     : place === "Bangalore"
      //     ? "http://192.168.90.47:3000/bangalore_src"
      //     : "http://192.168.90.47:3000/pondicherry_src",
      const response = await axios.get(
        "http://192.168.90.43:8090/bus_Api_Filter",
        // place === "Chennai"
        //   ? "http://192.168.90.43:8090/chennai_src"
        //   : place === "Bangalore"
        //   ? "http://192.168.90.43:8090/bangalore_src"
        //   : "http://192.168.90.43:8090/pondicherry_src",
        {
          params: payload,
        }
      );
      dispatch({
        type: GET_FILTER_DATA,
        payload: response.data,
      });
      //console.log("Response", response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    handlefilter();
  }, [
    acfilter,
    seattypefilter,
    searchvalue,
    pickupchecked,
    dropchecked,
    operatorchecked,
    amenitiesvalue,
    pickuptime,
    droptime,
    arrange_data,
    localStorage.getItem("depature"),
    localStorage.getItem("arrival"),
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const place = localStorage.getItem("depature");
        const response = await axios.get(
          place === "Chennai"
            ? "http://192.168.90.43:8090/chennaisrc"
            : place === "Bangalore"
            ? "http://192.168.90.43:8090/bangaloresrc"
            : "http://192.168.90.43:8090/chennaisrc"
        );
        dispatch({
          type: GET_DATA,
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [localStorage.getItem("depature")]);

  const fulllist = useSelector((state) => state.get_data);
  console.log(fulllist, "searchvaluesearchvalue555");

  const filter = fulllist.map((item) => {
    return item?.Pickup_points.split(",");
  });
  const find = filter.filter((item, index) => {
    return item[0] == "Siruseri";
  });

  const splitData = (data) => {
    const splitArrays = [];
    for (let i = 0; i < data.length; i += 8) {
      splitArrays.push(data.slice(i, i + 8));
    }
    return splitArrays;
  };

  const groupedData = fulllist.reduce((acc, obj) => {
    const key = `operator${obj.bus_operator_id}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  const [amenitieslist, setAmenitiesList] = useState([]);
  const [dropponitlist, setDropPointList] = useState([]);
  const [dropfulllist, setDropFullList] = useState([]);
  const [pickuppointlist, setPickupPointlist] = useState([]);
  const [pickupfullist, setPickupFullList] = useState([]);
  const [opertorlist, setOperatorList] = useState([]);
  const [opertorfulllist, setOperatorFullList] = useState([]);

  useEffect(() => {
    // amenities
    const Amenities = fulllist.map((item) => {
      return item.Amenities.split(",");
    });

    const AmenitiesArray = [].concat(...Amenities);
    const AmenitiesCount = AmenitiesArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    const AmenitiesData = Object.entries(AmenitiesCount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));

    setAmenitiesList(pickUp_list?.amenities);

    // droppoints
    const Droppoints = fulllist.map((item) => {
      return item.Drop_points.split(",");
    });
    const DroppointsArray = [].concat(...Droppoints);
    const DroppointsCount = DroppointsArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    const DroppointsData = Object.entries(DroppointsCount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));

    setDropFullList(pickUp_list?.dropping_points);
    const travelslice = DroppointsData.slice(0, 5);
    if (searchvalue.drop) {
      const filteredData = DroppointsData.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.drop.toLowerCase())
      );
      setDropPointList(filteredData);
    } else {
      setDropPointList(travelslice);
    }

    // pickuppoint
    const Pickuppoints = fulllist.map((item) => {
      return item.Pickup_points.split(",");
    });

    const PickuppointsArray = [].concat(...Pickuppoints);
    const PickuppointsCount = PickuppointsArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

    console.log(PickuppointsCount, "PickuppointsArray");
    const PickuppointsData = Object.entries(PickuppointsCount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));

    setPickupFullList(pickUp_list?.boarding_points);
    const pickupslice = PickuppointsData.slice(0, 5);
    if (searchvalue.pickup) {
      const filteredData = PickuppointsData.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
      );
      setPickupPointlist(filteredData);
    } else {
      setPickupPointlist(pickupslice);
    }

    // travel operator
    const Bus_operator_name = fulllist.map((item) => {
      return item.Bus_operator_name;
    });
    const uniqueArray = [...new Set(Bus_operator_name)];
    console.log(uniqueArray, "Bus_operator_name");

    const travelcount = uniqueArray.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    console.log(uniqueArray, "travelcount");
    const traveldata = Object.entries(travelcount)
      .filter(([place, count]) => place.trim() !== "")
      .map(([place, count]) => ({
        place,
        count,
      }));
    const travelopertorslice = traveldata.slice(0, 5);

    setOperatorFullList(pickUp_list?.operators);
    if (searchvalue.operator) {
      const filteredData = traveldata.filter((item) =>
        item.place.toLowerCase().includes(searchvalue.operator.toLowerCase())
      );
      setOperatorList(filteredData);
    } else {
      setOperatorList(travelopertorslice);
    }
    console.log(traveldata, "Bus_operator_name");
    // const traveloperatorarray = [].concat(...traveloperator);
    // const traveloperatorcount = traveloperatorarray.reduce((acc, val) => {
    //   acc[val] = (acc[val] || 0) + 1;
    //   return acc;
    // }, {});
    // const traveloperatorData = Object.entries(traveloperatorcount)
    //   .filter(([place, count]) => place.trim() !== "")
    //   .map(([place, count]) => ({
    //     place,
    //     count,
    //   }));
    // setPickupFullList(traveloperatorData);
    // const traveloperatorslice = traveloperatorData.slice(0, 5);
    // if (searchvalue.pickup) {
    //   const filteredData = traveloperatorData.filter((item) =>
    //     item.place.toLowerCase().includes(searchvalue.pickup.toLowerCase())
    //   );
    //   setPickupPointlist(filteredData);
    // } else {
    //   setPickupPointlist(traveloperatorslice);
    // }
  }, [searchvalue, fulllist]);
  const sortedList = modalshowdata
    .slice()
    .sort((a, b) =>
      modalname === "amenities"
        ? a?.amenity?.localeCompare(b?.amenity)
        : modalname === "operators"
        ? a?.operator?.localeCompare(b?.operator)
        : a?.name?.localeCompare(b?.name)
    );

  console.log(sortedList, "dropponitlist");
  console.log(share, "shareshareshare");
  const sharing = useSelector((state) => state.share);
  console.log(sharing, "sharing");
  const logoimage = "file://akritnas/nubiznez/Operator_logos/ss.png";
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // window.location.reload();
  //     const fetchData = async () => {
  //       try {
  //         const place = localStorage.getItem("depature");
  //         const response = await axios.get(
  //           place === "Chennai"
  //             ? "http://192.168.90.43:8090/chennaisrc"
  //             : place === "Bangalore"
  //             ? "http://192.168.90.43:8090/bangaloresrc"
  //             : "http://192.168.90.43:8090/chennaisrc"
  //         );
  //         dispatch({
  //           type: GET_DATA,
  //           payload: response.data,
  //         });
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };
  //     fetchData();
  //   }, 5000);
  //   // 5 * 60 * 1000
  //   return () => clearInterval(interval);
  // }, [localStorage.getItem("depature")]);

  const isTimeRangeEqual = (range1, range2) => {
    return range1.start === range2.start && range1.end === range2.end;
  };

  return (
    <>
      <div
        className={`${
          sidebarToggle ? "hidden" : "block"
        } w-[18vw] bg-[#E5FFF1] h-full fixed  pt-[1vw]  z-1 md:block hidden`}
        style={{
          zIndex: modalIsOpen || sharing == true ? 1 : 0,
          // fontFamily:"Lato"
        }}
      >
        <div className="border-[0.1vw] border-[#c9c9c9] h-full  pb-[8vw] overflow-y-scroll scrollbar-hide  rounded-[0.5vw]">
          <div>
            <div className="py-[0.5vw] pb-[0.2vw]">
              <div className="grid grid-cols-2 justify-between items-center">
                <div className="">
                  <h1
                    className="text-[1.2vw] text-black font-extrabold px-[0.6vw] font-[Lato]"
                    style={{
                      fontFamily: "Lato",
                    }}
                  >
                    Filter
                  </h1>
                </div>
                <div>
                  <h3
                    className="text-[0.8vw] float-end px-[0.6vw] cursor-pointer underline underline-offset-[0.15vw]"
                    onClick={handleClear}
                  >
                    CLEAR ALL
                  </h3>
                  {/* <img src={"file://akritnas/nubiznez/Operator_logos/ss.png"} /> */}
                </div>
              </div>
            </div>
            {/* <p className="mx-[0.6vw] font-semibold text-gray-500 text-[1.1vw] flex my-[0.6vw]">
              Alternative Source Point
            </p> */}
            {/* <div className="mx-[0.6vw] my-[0.5vw]">
              <button
                className={`${filtervalue.radius ? "bg-[#1F487C]" : "bg-white"
                  }  ${filtervalue.radius
                    ? "text-white border-[#1F487C]"
                    : "border-gray-300"
                  } w-full border-[0.1vw] rounded-md cursor-pointer flex items-center justify-center gap-[0.5vw] py-[0.5vw] `}
                onClick={() => handleradius()}
              // onClick={() =>
              //   setFitervalue({ ...filtervalue, radius: !filtervalue.radius })
              // }
              >
                <BiMapPin size={"1.3vw"} />
                <span className="text-[1vw]">Radius up-to 15 Kms</span>
              </button>
            </div> */}
            {/* <p className="mx-[0.6vw] font-semibold text-gray-500 text-[1.1vw] my-[0.6vw]">
              Vehicle Type
            </p> */}
            <div className="grid grid-cols-4 justify-between items-center my-[0.5vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.5vw]">
                  {" "}
                  Vehicle Type
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={vehicleclear}
                >
                  CLEAR
                </h3>
                {boolean.vehicle == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        vehicle: !boolean.vehicle,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        vehicle: !boolean.vehicle,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.vehicle ? (
              <>
                <div className="grid grid-cols-2 pt-[0.3vw]   gap-[0.8vw] mx-[0.6vw]">
                  <button
                    className={`${
                      acfilter == "ac" ? "bg-[#1F487C]" : "bg-white"
                    }  ${
                      acfilter == "ac"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw] rounded-md cursor-pointer `}
                    onClick={() => {
                      if (acfilter == "ac") {
                        setAcFilter("");
                      } else {
                        setAcFilter("ac");
                      }
                    }}
                  >
                    <div className="py-[0.5vw] flex items-center justify-center gap-[0.5vw]">
                      {/* <span>
                    <TbAirConditioning size={15} className="mx-1 " />
                  </span> */}
                      {acfilter == "ac" ? (
                        <img src={s_c_ac} className="w-[1.3vw] h-[1.2vw]" />
                      ) : (
                        <img src={s_ac} className="w-[1.3vw] h-[1.2vw]" />
                      )}
                      <span
                        className={`${filtervalue.ac} font-semibold  text-[1vw]`}
                      >
                        AC
                      </span>
                    </div>
                  </button>
                  <button
                    className={`${
                      acfilter == "non_ac" ? "bg-[#1F487C]" : "bg-white"
                    } ${
                      acfilter == "non_ac"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw]  rounded-[0.6vw] cursor-pointer `}
                    onClick={() => {
                      if (acfilter == "non_ac") {
                        setAcFilter("");
                      } else {
                        setAcFilter("non_ac");
                      }
                    }}
                  >
                    <div className="py-[0.5vw] gap-[0.5vw] flex items-center justify-center">
                      {/* <span>
                    <TbAirConditioningDisabled size={20} className="mx-1" />
                  </span> */}
                      {acfilter == "non_ac" ? (
                        <img src={s_c_non_ac} className="w-[1.3vw] h-[1.2vw]" />
                      ) : (
                        <img src={s_non_ac} className="w-[1.3vw] h-[1.2vw]" />
                      )}
                      <span className="font-semibold  text-[1vw]">Non AC</span>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-2 pt-[1vw]  gap-[0.8vw] mx-[0.6vw]">
                  <button
                    className={`${
                      seattypefilter == "sleeper" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      seattypefilter == "sleeper"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300"
                    } w-full border-[0.1vw]  rounded-[0.6vw] cursor-pointer `}
                    onClick={() => {
                      if (seattypefilter == "sleeper") {
                        setSeatTypeFilter("");
                      } else {
                        setSeatTypeFilter("sleeper");
                      }
                    }}
                  >
                    <p className="py-[0.5vw] flex items-center justify-center gap-[0.5vw]">
                      {/* <span>
                    <MdAirlineSeatIndividualSuite size={20} className="pl-1" />
                  </span> */}
                      <img src={sleeper} className="w-[2vw] h-[1vw]" />
                      <span className="font-semibold  text-[1vw]">Sleeper</span>
                    </p>
                  </button>
                  <button
                    className={`${
                      seattypefilter == "seater" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      seattypefilter == "seater"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300 "
                    } w-full border-[0.1vw] rounded-[0.6vw] cursor-pointer `}
                    onClick={() => {
                      if (seattypefilter === "seater") {
                        setSeatTypeFilter("");
                      } else {
                        setSeatTypeFilter("seater");
                      }
                    }}
                  >
                    <div className="py-[0.5vw] flex gap-[0.5vw] items-center justify-center">
                      {/* <span>
                    <MdAirlineSeatReclineExtra size={20} className="pl-1" />
                  </span> */}
                      <img src={seats} className="w-[1.3vw] h-[1.2vw]" />
                      <span className="font-semibold text-[1vw]">Seater</span>
                    </div>
                  </button>
                </div>
                <div className=" mx-[0.6vw] my-[1vw]">
                  <button
                    className={`${
                      seattypefilter == "semi_sleeper"
                        ? "bg-[#1F487C]"
                        : "bg-white"
                    } h-full ${
                      seattypefilter == "semi_sleeper"
                        ? "text-white border-[#1F487C]"
                        : "border-gray-300 "
                    } w-full border-[0.1vw] rounded-[0.6vw] cursor-pointer `}
                    onClick={() => {
                      if (seattypefilter === "semi_sleeper") {
                        setSeatTypeFilter("");
                      } else {
                        setSeatTypeFilter("semi_sleeper");
                      }
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div className="py-[0.5vw] flex gap-[0.5vw] items-center justify-center">
                        <img src={sleeper} className="w-[2vw] h-[1vw]" />
                        <span className="font-semibold  text-[1vw]">
                          Semi Sleeper
                        </span>
                      </div>
                      {/* <p className="mx-[0.5vw]">+</p>
                      <div className="py-[0.5vw] flex gap-[0.5vw] items-center justify-center">
                        <img src={seats} className="w-[1.3vw] h-[1.2vw]" />
                        <span className="font-semibold text-[1vw]">Seater</span>
                      </div> */}
                    </div>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.6vw]">
                  {busdata.from
                    ? `Pick up point - ${
                        busdata?.from?.charAt(0).toUpperCase() +
                        busdata.from.slice(1)
                      }`
                    : "Pick up point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] float-end pr-[0.4vw] text-gray-500  cursor-pointer"
                  onClick={pickupClear}
                >
                  CLEAR
                </h3>
                {boolean.pickup == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        pickup: !boolean.pickup,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        pickup: !boolean.pickup,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.pickup == true ? (
              <>
                <div className="px-[0.6vw] py-[0.4vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"1.1vw"} />}
                    placeholder="Search"
                    className="mb-[1vw] text-[1vw] h-[2.5vw] "
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        pickup: e.target.value,
                      })
                    }
                  />
                  {/* 81110 66300 */}
                  {pickUp_list?.boarding_points?.length > 0
                    ? pickUp_list.boarding_points.slice(0, 5).map((item, i) => (
                        <div
                          className="flex items-center justify-between"
                          key={i}
                        >
                          <div className="flex items-center my-[0.25vw]">
                            <input
                              type="checkbox"
                              className="w-[1.2vw] h-[1.2vw] mr-[0.4vw]"
                              onChange={(e) => {
                                handlePickupCheckbox(e, item.name);
                                console.log(e, "pickup");
                              }}
                              checked={pickupchecked[item.name] || false}
                            />
                            <span className=" text-[1vw]">{item.name}</span>
                          </div>
                          <div>
                            <span className="text-[0.8vw]">{`(${item.count})`}</span>
                          </div>
                        </div>
                      ))
                    : ""}
                  <p
                    className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.5vw] cursor-pointer"
                    onClick={() => openModal("pickup")}
                  >{`SHOW ALL (${pickUp_list?.boarding_points?.length})`}</p>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
                <div className="col-span-3">
                  <h1 className="text-[1.1vw] text-black font-bold px-[0.6vw]">
                    {busdata.from
                      ? `Pick up time - ${
                          busdata.from.charAt(0).toUpperCase() +
                          busdata.from.slice(1)
                        }`
                      : "Pick up time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[0.8vw] pr-[0.4vw] text-gray-500 cursor-pointer"
                    onClick={pickuptimeClear}
                  >
                    CLEAR
                  </h3>
                  {boolean.pickup_time == true ? (
                    <button
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          pickup_time: !boolean.pickup_time,
                        })
                      }
                    >
                      <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"1vw"}
                      className="cursor-pointer"
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          pickup_time: !boolean.pickup_time,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {boolean.pickup_time ? (
              <>
                <div className="grid grid-cols-2 pt-[0.5vw]  gap-[0.5vw] mx-[0.5vw] ">
                  <button
                    className={`${
                      pickuptime == "6am-11am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime == "6am-11am" ? "text-white " : ""
                    } w-full  ${
                      pickuptime == "6am-11am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime == "6am-11am") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6am-11am");
                      }
                    }}
                  >
                    <span className="pb-[0.25vw]">
                      <LuSunrise className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6 AM to 11 AM
                    </span>
                  </button>
                  <button
                    className={`${
                      pickuptime == "11am-6pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime == "11am-6pm" ? "text-white " : ""
                    } w-full  ${
                      pickuptime == "11am-6pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime == "11am-6pm") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11am-6pm");
                      }
                    }}
                  >
                    <span className="pb-[0.1vw]">
                      <IoSunnyOutline size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11 AM to 6 PM
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[1vw]  gap-[0.5vw] mx-[0.5vw] mb-[1vw]">
                  <button
                    className={`${
                      pickuptime == "6pm-11pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime == "6pm-11pm" ? "text-white " : ""
                    } w-full  ${
                      pickuptime == "6pm-11pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime == "6pm-11pm") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("6pm-11pm");
                      }
                    }}
                  >
                    <span className="pb-[0.5vw]">
                      <LuSunset className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6 PM to 11 PM
                    </span>
                  </button>
                  <button
                    className={`${
                      pickuptime == "11pm-6am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      pickuptime == "11pm-6am" ? "text-white " : ""
                    } w-full  ${
                      pickuptime == "11pm-6am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (pickuptime == "11pm-6am") {
                        setPickUpTime("");
                      } else {
                        setPickUpTime("11pm-6am");
                      }
                    }}
                  >
                    <span className="pb-1">
                      <PiMoonLight size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11 PM to 6 AM
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold pl-[0.6vw] ">
                  Travel Operators
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={operatorClear}
                >
                  CLEAR
                </h3>
                {boolean.operators == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        operators: !boolean.operators,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        operators: !boolean.operators,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.operators === true && (
              <>
                <div className="px-[0.6vw] pb-[0.6vw]">
                  <Input
                    prefix={<CiSearch className="" size={"1.1vw"} />}
                    placeholder="Search"
                    className="mb-[1vw] h-[2.5vw]"
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        operator: e.target.value,
                      })
                    }
                  />
                  {pickUp_list?.operators?.length > 0
                    ? pickUp_list.operators.slice(0, 5).map((item, i) => {
                        console.log(item, "itemitemitem");
                        return (
                          <div
                            className="flex items-center justify-between"
                            key={i}
                          >
                            <div className="flex items-center my-[0.25vw]">
                              <input
                                type="checkbox"
                                className="w-[1.2vw] h-[1.2vw] mr-[0.5vw]"
                                onChange={(e) =>
                                  handleoperatorCheckbox(e, item.operator)
                                }
                                checked={
                                  operatorchecked[item.operator] || false
                                }
                              />
                              <span className="pt-[0.2vw] text-[1vw]">
                                {item.operator}
                              </span>
                            </div>
                            {/* Uncomment the below line if you want to display the count */}
                            {/* <div>
            <span className="text-[0.8vw]">{`(${item.count})`}</span>
          </div> */}
                          </div>
                        );
                      })
                    : ""}

                  <p
                    className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.5vw] cursor-pointer"
                    onClick={() => openModal("operators")}
                  >{`SHOW ALL (${pickUp_list?.operators?.length})`}</p>
                </div>
              </>
            )}

            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>

          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold pl-[0.6vw] ">
                  {busdata.from
                    ? `Drop point - ${
                        busdata.to.charAt(0).toUpperCase() + busdata.to.slice(1)
                      }`
                    : "Drop point"}
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={dropClear}
                >
                  CLEAR
                </h3>
                {boolean.drop == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        drop: !boolean.drop,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        drop: !boolean.drop,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {boolean.drop == true ? (
              <>
                <div className="px-[0.6vw] pb-[0.6vw]">
                  {/* <input className="border-2 border-gray-300 h-8 rounded-md w-full mb-4" /> */}
                  <Input
                    prefix={<CiSearch size={"1.1vw"} />}
                    placeholder="Search"
                    className="mb-[1vw] h-[2.5vw]"
                    onChange={(e) =>
                      setSearchValue({
                        ...searchvalue,
                        drop: e.target.value,
                      })
                    }
                  />
                  {pickUp_list?.dropping_points?.length > 0
                    ? pickUp_list.dropping_points.slice(0, 5).map((item, i) => (
                        <div
                          className="flex items-center justify-between"
                          key={i}
                        >
                          <div className="flex items-center my-[0.25vw]">
                            <input
                              type="checkbox"
                              className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                              onChange={(e) => handledropCheckbox(e, item.name)}
                              checked={dropchecked[item.name] || false}
                            />
                            <span className="pt-[0.1vw] text-[1vw]">
                              {item.name}
                            </span>
                          </div>
                          <div>
                            <span className="text-[0.8vw]">{`(${item.count})`}</span>
                          </div>
                        </div>
                      ))
                    : ""}
                  <p
                    className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.6vw] cursor-pointer"
                    onClick={() => openModal("drop")}
                  >{`SHOW ALL (${pickUp_list?.dropping_points?.length})`}</p>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div>
            <div className="">
              <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
                <div className="col-span-3">
                  <h1 className="text-[1.1vw] text-black font-bold px-[0.6vw]">
                    {busdata.from
                      ? `Drop time - ${
                          busdata.to.charAt(0).toUpperCase() +
                          busdata.to.slice(1)
                        }`
                      : "Drop time"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <h3
                    className="text-[0.8vw] pr-[0.4vw] text-gray-500 cursor-pointer"
                    onClick={timeClear}
                  >
                    CLEAR
                  </h3>
                  {boolean.drop_time == true ? (
                    <button
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          drop_time: !boolean.drop_time,
                        })
                      }
                    >
                      <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                    </button>
                  ) : (
                    <IoIosArrowDown
                      size={"1vw"}
                      className="cursor-pointer"
                      onClick={() =>
                        setBoolean({
                          ...boolean,
                          drop_time: !boolean.drop_time,
                        })
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {boolean.drop_time ? (
              <>
                <div className="grid grid-cols-2 pt-[0.5vw]  gap-[0.5vw] mx-[0.5vw] ">
                  <button
                    className={`${
                      droptime == "6am-11am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime == "6am-11am" ? "text-white " : ""
                    } w-full  ${
                      droptime == "6am-11am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime == "6am-11am") {
                        setDropTime("");
                      } else {
                        setDropTime("6am-11am");
                      }
                    }}
                  >
                    <span className="pb-[0.25vw]">
                      <LuSunrise className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6 AM to 11 AM
                    </span>
                  </button>
                  <button
                    className={`${
                      droptime == "11am-6pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime == "11am-6pm" ? "text-white " : ""
                    } w-full  ${
                      droptime == "11am-6pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime == "11am-6pm") {
                        setDropTime("");
                      } else {
                        setDropTime("11am-6pm");
                      }
                    }}
                  >
                    <span className="pb-[0.1vw]">
                      <IoSunnyOutline size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11 AM to 6 PM
                    </span>
                  </button>
                </div>
                <div className="grid grid-cols-2 pt-[1vw]  gap-[0.5vw] mx-[0.5vw] mb-[1vw]">
                  <button
                    className={`${
                      droptime == "6pm-11pm" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime == "6pm-11pm" ? "text-white " : ""
                    } w-full  ${
                      droptime == "6pm-11pm"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime == "6pm-11pm") {
                        setDropTime("");
                      } else {
                        setDropTime("6pm-11pm");
                      }
                    }}
                  >
                    <span className="pb-[0.5vw]">
                      <LuSunset className="" size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      6 PM to 11 PM
                    </span>
                  </button>
                  <button
                    className={`${
                      droptime == "11pm-6am" ? "bg-[#1F487C]" : "bg-white"
                    } h-full ${
                      droptime == "11pm-6am" ? "text-white " : ""
                    } w-full  ${
                      droptime == "11pm-6am"
                        ? "border-[#1F487C] border-[0.1vw]"
                        : "border-gray-300 border-[0.1vw]"
                    } rounded-[0.6vw] cursor-pointer flex flex-col items-center justify-center py-[0.5vw]`}
                    // onClick={() =>
                    //   setTimeFitervalue({
                    //     ...timefiltervalue,
                    //     time_6:00 AM to 11:00 AM: !timefiltervalue.time_6:00 AM to 11:00 AM,
                    //   })
                    // }
                    onClick={() => {
                      if (droptime == "11pm-6am") {
                        setDropTime("");
                      } else {
                        setDropTime("11pm-6am");
                      }
                    }}
                  >
                    <span className="pb-1">
                      <PiMoonLight size={"1vw"} />
                    </span>
                    <span className="font-semibold text-center text-[0.8vw]">
                      11 PM to 6 AM
                    </span>
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <p className="my-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
          </div>
          <div className="">
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.5vw]">Amenities</h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={amenitiesClear}
                >
                  CLEAR
                </h3>
                {boolean.amenities == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        amenities: !boolean.amenities,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        amenities: !boolean.amenities,
                      })
                    }
                  />
                )}
              </div>
            </div>
            <div>
              {boolean.amenities && (
                <div className="">
                  {pickUp_list?.amenities?.length > 0
                    ? pickUp_list.amenities.slice(0, 5).map((item, i) => (
                        <div
                          className="flex items-center justify-between"
                          key={i}
                        >
                          <div className="flex items-center my-[0.25vw]">
                            <input
                              type="checkbox"
                              className="w-[1.2vw] h-[1.2vw] mr-[0.4vw]"
                              onChange={(e) => {
                                handleAmenityCheckbox(e, item.amenity);
                                console.log(e, "amenity");
                              }}
                              checked={amenitiesvalue[item.amenity] || false}
                            />
                            <span className=" text-[1vw]">{item.amenity}</span>
                          </div>
                          <div>
                            <span className="text-[0.8vw]">{`(${item.count})`}</span>
                          </div>
                        </div>
                      ))
                    : ""}
                </div>
              )}
              <p
                className="text-[#1F487C] font-bold text-[0.8vw] pt-[0.5vw] cursor-pointer pl-[0.6vw]"
                onClick={() => openModal("amenities")}
              >{`${`SHOW ALL (${pickUp_list?.amenities?.length}`})`}</p>{" "}
              <p className="mt-[0.5vw] border-b-[0.01vw] border-gray-300"></p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-4 justify-between items-center my-[0.6vw]">
              <div className="col-span-3">
                <h1 className="text-[1.1vw] font-bold px-[0.5vw]">
                  Star Ratings
                </h1>
              </div>
              <div className="flex items-center">
                <h3
                  className="text-[0.8vw] pr-[0.4vw] float-end text-gray-500  cursor-pointer"
                  onClick={amenitiesClear}
                >
                  CLEAR
                </h3>
                {boolean.amenities == true ? (
                  <button
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        amenities: !boolean.amenities,
                      })
                    }
                  >
                    <IoIosArrowUp size={"1vw"} className="cursor-pointer" />
                  </button>
                ) : (
                  <IoIosArrowDown
                    size={"1vw"}
                    className="cursor-pointer"
                    onClick={() =>
                      setBoolean({
                        ...boolean,
                        amenities: !boolean.amenities,
                      })
                    }
                  />
                )}
              </div>
            </div>
            {/* {dropponitlist.map((item, i) => ( */}
            <div
              className="flex items-center justify-between px-[0.5vw]"
              // key={i}
            >
              <div className="flex items-center my-[0.25vw]">
                <input
                  type="checkbox"
                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                  // onChange={(e) => handledropCheckbox(e, item.place)}
                  // checked={dropchecked[item.place] || false}
                />
                <span className="pt-[0.1vw] pl-[0.5vw] gap-[0.7vw] text-[1vw] flex">
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                </span>
              </div>
              <div>
                <span className="text-[0.8vw]">{`(20)`}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-between px-[0.5vw]"
              // key={i}
            >
              <div className="flex items-center my-[0.25vw]">
                <input
                  type="checkbox"
                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                  // onChange={(e) => handledropCheckbox(e, item.place)}
                  // checked={dropchecked[item.place] || false}
                />
                <span className="pt-[0.1vw] pl-[0.5vw] gap-[0.7vw] text-[1vw] flex">
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                </span>
              </div>
              <div>
                <span className="text-[0.8vw]">{`(20)`}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-between px-[0.5vw]"
              // key={i}
            >
              <div className="flex items-center my-[0.25vw]">
                <input
                  type="checkbox"
                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                  // onChange={(e) => handledropCheckbox(e, item.place)}
                  // checked={dropchecked[item.place] || false}
                />
                <span className="pt-[0.1vw] pl-[0.5vw] gap-[0.7vw] text-[1vw] flex">
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                </span>
              </div>
              <div>
                <span className="text-[0.8vw]">{`(20)`}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-between px-[0.5vw]"
              // key={i}
            >
              <div className="flex items-center my-[0.25vw]">
                <input
                  type="checkbox"
                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                  // onChange={(e) => handledropCheckbox(e, item.place)}
                  // checked={dropchecked[item.place] || false}
                />
                <span className="pt-[0.1vw] pl-[0.5vw] gap-[0.7vw] text-[1vw] flex">
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                </span>
              </div>
              <div>
                <span className="text-[0.8vw]">{`(20)`}</span>
              </div>
            </div>
            <div
              className="flex items-center justify-between px-[0.5vw]"
              // key={i}
            >
              <div className="flex items-center my-[0.25vw]">
                <input
                  type="checkbox"
                  className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                  // onChange={(e) => handledropCheckbox(e, item.place)}
                  // checked={dropchecked[item.place] || false}
                />
                <span className="pt-[0.1vw] pl-[0.5vw] gap-[0.7vw] text-[1vw] flex">
                  <FaStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} color="1F487C" />
                  <FaRegStar size={"1.3vw"} className="" color="1F487C" />
                </span>
              </div>
              <div>
                <span className="text-[0.8vw]">{`(20)`}</span>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "45%", // Adjust width as needed
              height: "60%", // Adjust height as needed
              margin: "11vw 35vw",
              padding: "0px",
            },
          }}
        >
          <h1 className="border-l-[0.4vw] pl-[0.6vw] pt-[0.25vw] text-[1.5vw] border-[#1F487C]">
            {modalname === "pickup"
              ? "Pickup Point"
              : modalname === "drop"
              ? "Drop Point"
              : modalname === "amenities"
              ? "Amenities"
              : "Travel Operator"}
          </h1>
          <div className="p-[1vw] overflow-x-auto ">
            {" "}
            <Input
              prefix={<CiSearch size={"1vw"} />}
              placeholder="Search"
              className="mb-[0.6vw] text-[1vw] h-[2vw]"
              onChange={(e) => setModalSearch(e.target.value)}
            />
            <div>
              {/* <div className="flex flex-wrap">
              {Object.entries(modalshowdata).map(([row, letters], index) => (
                <div key={index} className="w-1/3 px-[0.6vw]">
                  <h2 className="text-[#1F487C] my-[0.6vw] text-[1vw] font-semibold text-center">
                    {row}
                  </h2>
                  {letters.map((item, j) => (
                    <div
                      className="flex items-center justify-between gap-4"
                      key={j}
                    >
                      <div className="flex items-center my-[0.25vw]">
                        <input
                          type="checkbox"
                          className="w-[1.2vw] h-[1.2vw] mr-[0.6vw]"
                          onChange={(e) =>
                            modalname === "pickup"
                              ? handlePickupCheckbox(e, item.place)
                              : modalname === "drop"
                              ? handledropCheckbox(e, item.place)
                              : modalname === "amenities"
                              ? handleAmenities(item.place)
                              : handleoperatorCheckbox(e, item.place)
                          }
                          checked={
                            modalname === "pickup"
                              ? pickupchecked[item.place] || false
                              : modalname === "drop"
                              ? dropchecked[item.place]
                              : operatorchecked[item.place]
                          }
                        />
                        <span className="pt-1 text-[1vw]">{item.place}</span>
                      </div>
                      <div>
                        <span className="text-[0.8vw]">{`(${
                          item.count / 8
                        })`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div> */}
            </div>
            <div className="h-[20vw] w-full grid grid-flow-col grid-rows-10  pb-[1vw] overflow-x-auto overflow-y-hidden">
              {sortedList.map((item, i) => (
                // <p key={item.place} className="whitespace-nowrap pr-[5vw] ">
                //   {item.place}
                // </p>
                <div
                  className="flex items-center justify-between pr-[5vw]"
                  key={i}
                >
                  <div className="whitespace-nowrap items-center flex justify-center">
                    <input
                      type="checkbox"
                      className="w-[1.1vw] h-[1.1vw] mr-[0.6vw]"
                      onChange={(e) =>
                        modalname === "pickup"
                          ? handlePickupCheckbox(e, item.name)
                          : modalname === "drop"
                          ? handledropCheckbox(e, item.name)
                          : modalname === "amenities"
                          ? handleAmenityCheckbox(e, item.amenity)
                          : handleoperatorCheckbox(e, item.operator)
                      }
                      checked={
                        modalname === "pickup"
                          ? pickupchecked[item.name] || false
                          : modalname === "drop"
                          ? dropchecked[item.name] || false
                          : modalname === "amenities"
                          ? amenitiesvalue[item.amenity]
                          : operatorchecked[item.operator]
                      }
                    />
                    <span className="pt-1 text-[1vw]">
                      {modalname === "amenities"
                        ? item.amenity.charAt(0).toUpperCase() +
                          item.amenity.slice(1).toLowerCase()
                        : modalname === "operators"
                        ? item.operator.charAt(0).toUpperCase() +
                          item.operator.slice(1).toLowerCase()
                        : item.name.charAt(0).toUpperCase() +
                          item.name.slice(1).toLowerCase()}
                      <span className="pl-[1vw]">
                        {modalname != "operators" && item.count}
                      </span>
                    </span>
                  </div>
                  {/* <div>
                    <span className="text-[0.8vw]">{`(${
                      item.count / 8
                    })`}</span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="w-full">
            {Object.entries(modalshowdata).map(([row, letters], index) => (
              <div key={index} className="grid grid-flow-row">
                {letters
                  .reduce((chunks, item, i) => {
                    if (i % 5 === 0) chunks.push(letters.slice(i, i + 5));
                    return chunks;
                  }, [])
                  .map((chunk, i) => (
                    <div key={i} className="grid grid-flow-col">
                      {chunk.map((item, j) => (
                        <div key={j} className="w-[10vw]">
                          {item.place}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            ))}
          </div> */}

          {/* <div className="grid grid-flow-col h-[20vw] grid-rows-2">
            {Object.entries(modalshowdata).map(([row, letters], index) => (
              <div key={index} className="">
                <h2 className="text-[#1F487C] text-[1vw] font-semibold p-[1vw]">
                  {row}
                </h2>
                {letters.map((item, index) => (
                  <p key={index}>{item.place}</p>
                ))}
              </div>
            ))}
          </div> */}

          {/* <div class="flex justify-center items-center w-full  py-[1vw]">
            <button class="bg-[#1F487C] w-[20%] py-[0.5vw] rounded-full text-[1vw] text-white font-semibold mr-[0.6vw]">
              Cancel
            </button>
            <button
              class="bg-[#03CCF4] w-[20%] py-[0.25vw] rounded-full text-[1vw] text-white font-semibold ml-2"
              onClick={handleonapply}
            >
              Apply
            </button>
          </div> */}
        </Modal>

        {/* <Modal
          isOpen={filtervalue.radius}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "30vw", // Adjust width as needed
              height: "30vw", // Adjust height as needed
              margin: "auto",
              padding: "0px",
            },
          }}
        >
          <Map />
        </Modal> */}
      </div>
    </>
  );
};

export default Sidebar;
