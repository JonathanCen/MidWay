import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MeetingLocations from "./MeetingLocations";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
// import { Loader } from "@googlemaps/js-api-loader";
// import { GoogleLoaderContext } from "./GoogleLoaderContext";

export const appHistory = createBrowserHistory();

const App = () => {
  // const { setGoogleLoader } = useContext(GoogleLoaderContext);

  useEffect(() => {
    fetch("/testingAPICall")
      .then((response) => {
        response.json().then((data) => {
          console.log(data.message);
        });
      })
      .catch((err) => {
        console.log(`There was an error : ${err}`);
      });

    // setGoogleLoader(
    //   new Loader({
    //     apiKey: "YOUR_API_KEY",
    //     version: "weekly",
    //     libraries: ["places"],
    //   })
    // );
  }, []);

  return (
    <BrowserRouter history={appHistory}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/meeting-locations/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation"
          element={<MeetingLocations />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
