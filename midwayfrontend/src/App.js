import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import MeetingLocations from "./MeetingLocations";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";

export const appHistory = createBrowserHistory();

const App = () => {
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
