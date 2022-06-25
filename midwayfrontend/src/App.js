import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/query" element={} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
