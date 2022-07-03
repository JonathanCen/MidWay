import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MeetingLocations from "./MeetingLocations";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";

export const appHistory = createBrowserHistory();

const App = () => {

  useEffect(() => {
    fetch("http://localhost:5000/testingAPICall")
      .then(response => {
        response.json().then(data => {
          console.log(data.message);
        })
      })
      .catch(err => {console.log(`There was an error : ${err}`)});
  }, []);

  return (
    <BrowserRouter history={appHistory}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meeting-locations/firstAddress=:firstAddress/secondAddress=:secondAddress/activity=:activity/transportation=:transportation" element={<MeetingLocations />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
