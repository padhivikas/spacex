import React, { useReducer, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import axios from "axios";
import Programs from "./components/Programs";

export const launchContext = React.createContext();

const initialState = {
  programs: [],
  error: "",
  uniqueYears: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "Fetch_Success":
      return { ...state, programs: action.payload, uniqueYears: action.years };
    case "Fetch_Error":
      return { ...state, error: "Something Went Wrong" };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filters, setFilters] = useState({
    launch_success: "",
    land_success: "",
    launch_year: "",
  });

  const API_BASE_URL = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${filters.launch_success}&land_success=${filters.land_success}&launch_year=${filters.launch_year}`;

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((res) => {
        let years = res.data.map((item) => {
          return item.launch_year;
        });

        let uniqueyears = [...new Set(years)];
        dispatch({
          type: "Fetch_Success",
          payload: res.data,
          years: uniqueyears,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "Fetch_Error" });
      });
  }, [filters]);

  const setY = (y) => {
    setFilters((prev) => {
      return {
        ...prev,
        launch_year: y,
      };
    });
  };

  const setL = (launch) => {
    setFilters((prev) => {
      return {
        ...prev,
        launch_success: launch,
      };
    });
  };

  const setLa = (landing) => {
    setFilters((prev) => {
      return {
        ...prev,
        land_success: landing,
      };
    });
  };

  return (
    <div className="App">
      <Header />
      <launchContext.Provider
        value={{
          setyear: setY,
          setlaunch: setL,
          setlanding: setLa,
          filter: filters,
          launchData: state,
          programDispatch: dispatch,
        }}
      >
        <Body />
      </launchContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
