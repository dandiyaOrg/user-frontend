import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { SessionProvider } from './SessionContext';
import './index.css'

import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import BillingUser from "./Pages/BillingUser";
import SubEvents from "./Pages/SubEvents";
import SinglePass from "./Pages/SinglePass";
import GlobalPass from "./Pages/GlobalPass";
import Payment from "./Pages/Payment";
import Attendees from './Pages/Attendees';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import RefundPolicy from './Pages/RefundPolicy';
import TermsConditions from './Pages/TermsConditions';
import CookiePolicy from './Pages/CookiePolicy';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="/BillingUser" element={<BillingUser/>} />
        <Route path="/SubEvents" element={<SubEvents />} />
        <Route path="/SinglePass" element={<SinglePass />} />
        <Route path="/GlobalPass" element={<GlobalPass />} />
        <Route path="/Attendees" element={<Attendees />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Route>
    </>
));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
        <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)