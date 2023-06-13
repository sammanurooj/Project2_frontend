import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "../layout/signupPage";
import Signin from "../layout/loginPage";
import Mainpage from "../layout/mainPage";
import Banner from "../components/summarizedBOT/index";
import UserLocationtabledata from "../layout/userLocation";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/usertabledata" element={<UserLocationtabledata />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
