import axios from "axios";
import { toast } from "react-toastify";
import { CARD_DETAIL, DROP_POINT_LIST, SEAT_LAYOUT } from "../../Store/type";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const apiUrl = `http://192.168.90.47:4001/api`;
// export const GetCardDetails = async (dispatch, id) => {
//     try {
//         const response = await axios.get(`${apiUrl}/bus-details`);
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         console.log(response, "carddetails");
//         return response.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const SendTravelDetails = async (dispatch, from, to) => {
  console.log(to, "toooooo");

  console.log(from, "fromfrom");

  const payload = {
    source_name: from,
    destination_name: to,
    departure_date_time: new Date(),
  };

  const url = `${apiUrl}/process-bus-info`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    dispatch({ type: CARD_DETAIL, payload: response.data });
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const GetSeatLayout = async (busid, dispatch) => {
  const payload = {
    busId: busid,
  };

  const url = `${apiUrl}/seatLayout-ById`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response, "locationdatas");
    dispatch({ type: SEAT_LAYOUT, payload: response.data });
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};
// export const SendTravelDetails = async (fromValue, toValue, fromDate, dispatch) => {
//   const payload = {
//     source_name: fromValue,
//     destination_name: toValue,
//     departure_date_time: fromDate,
//   };

//   const url = `${apiUrl}/process-bus-info`;
//   const method = "post";
//   try {
//     const response = await api({
//       method,
//       url,
//       data: payload,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(payload, "locationdatas");
//     dispatch({ type: CARD_DETAIL, payload: response.data });
//     console.log(response.data, "submitlocationdata");
//     return response.data;
//   } catch (error) {
//     handleError(error);
//     return null;
//   }
// };

export const Filters = async (
  departure,
  arrival,
  date,
  acfilter,
  seattypefilter,
  pickuptime,
  droptime,
  pickupcheck,
  dropcheck,
  amenitycheck,
  operatorcheck,
  sort,
  dispatch
) => {
  console.log(sort, "sort11");

  const payload = {
    // source_name:  "Pondicherry",
    // destination_name: "Coimbatore",
    source_name: departure,
    destination_name: arrival,
    AC: acfilter === "ac" ? "true" : "false",
    NonAc: acfilter === "non_ac" ? "true" : "false",
    Seater: seattypefilter === "seater" ? "true" : "false",
    Sleeper: seattypefilter === "sleeper" ? "true" : "false",
    departure_time_range: pickuptime,
    arrival_time_range: droptime,
    //"price_range":
    departure_date: date,
    boarding_point: pickupcheck.join(","),
    dropping_point: dropcheck.join(","),
    amenities: amenitycheck.join(","),
    operator_name: operatorcheck.join(","),
    //"rating": 4
    sort: [
      {
        price: sort === "price" ? "true" : "false",
        seats: sort === "seats" ? "true" : "false",
        ratings: sort === "ratings" ? "true" : "false",
        departure_time: sort === "arrivalSort" ? "true" : "false",
        arrival_time: sort === "departureSort" ? "true" : "false",
      },
    ],
  };

  console.log(payload, "sort112");

  const url = `${apiUrl}/filters-In`;
  const method = "post";

  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: CARD_DETAIL, payload: response.data.data });
    console.log(response, "response filter");
    return response.data.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const Drop_Point_List = async (departure, arrival, date, dispatch) => {
  const payload = {
    source_name: departure,
    destination_name: arrival,
    departure_date_time: date,
  };

  const url = `${apiUrl}/count-board-drop`;
  const method = "post";
  try {
    const response = await api({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(payload, "locationdatas");
    dispatch({ type: DROP_POINT_LIST, payload: response.data });
    console.log(response.data, "submitlocationdata");
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

const handleError = (error) => {
  console.error("Error details:", error);
  let errorMessage = "An error occurred";

  if (error.response) {
    console.error("Error response from server:", error.response);
    errorMessage = `Server responded with status ${error.response.status}`;
  } else if (error.request) {
    console.error("No response received:", error.request);
    errorMessage = "No response received from server";
  } else {
    console.error("Error setting up request:", error.message);
    errorMessage = error.message;
  }

  if (error.code === "ERR_NETWORK") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  if (error.code === "ERR_CONNECTION_REFUSED") {
    errorMessage =
      "Network Error: Unable to connect to the server. Please check the server status and your network connection.";
  }
  toast.error(errorMessage);
};

// const apiUrl = 'https://example.com'; // Replace with your actual API URL

// export const SendTravelDetails = async () => {
//     const payload = {
//         key1: 'value1', // Correct syntax for object properties
//     };

//     const url = `${apiUrl}/bus-details`;
//     const method = 'post';
//     const dispatch = useDispatch(); // Initialize dispatch

//     try {
//         const response = await axios({
//             method,
//             url,
//             data: payload,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         console.log(response, 'submitelocationdatas');
//         dispatch({ type: CARD_DETAIL, payload: response.data });
//         return response.data;
//     } catch (error) {
//         handleError(error);
//         return null;
//     }
// };
