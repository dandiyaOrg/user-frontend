import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ScrollToTop from './Components/ScrollToTop'
import Home from "./Pages/Home";
import BillingUserSubEvent from "./Pages/BillingUserSubEvent";
import SubEventSelection from "./Pages/SubEventSelection";
import Payment from "./Pages/Payment";
import BillingFullPass from "./Pages/BillingFullPass";



const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Define all your routes */}
      <ScrollToTop>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/BillingUserSubEvent" element={<BillingUserSubEvent />} />
        <Route path="/BillingFullPass" element={<BillingFullPass />} />
        <Route path="/SubEventSelection" element={<SubEventSelection />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      </ScrollToTop>
    </div>
  );
};

export default App;
