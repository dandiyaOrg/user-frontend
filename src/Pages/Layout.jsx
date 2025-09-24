import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer.jsx';
import ScrollToTop from '../Components/ScrollToTop';
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {

    const location = useLocation();
    const hideHeader = location.pathname === "/";

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <ScrollToTop>
          {!hideHeader && <Header />}
            <main className={`flex-grow ${!hideHeader ? "pt-16" : ""}`}>
                <Outlet />
            </main>
          <Footer />
        </ScrollToTop>
      </div>
    </>
  )
}

export default Layout;