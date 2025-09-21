import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ScrollToTop from './Components/ScrollToTop'
import Home from "./Pages/Home";
import BillingUser from "./Pages/BillingUser";
import SubEventSelection from "./Pages/SubEventSelection";
import Payment from "./Pages/Payment";
import BillingFullPass from "./Pages/BillingFullPass";



const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Define all your routes */}
      <ScrollToTop>
        <Routes>
          <Route path="/:id" element={<Home />} />
          <Route path="/BillingUser" element={<BillingUser/>} />
          <Route path="/SubEventSelection" element={<SubEventSelection />} />
          <Route path="/GlobalPass" element={<BillingFullPass />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </ScrollToTop>
    </div>
  );
};

export default App;
