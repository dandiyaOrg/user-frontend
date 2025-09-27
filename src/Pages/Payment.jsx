import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SessionContext from '../SessionContext' ;
import { convertDate } from '../utils/dateConverter';
import { createPassOrder, createGlobalPassOrder } from '../api'

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionData } = useContext(SessionContext);
  const billingUser = sessionData.billingUser;
  const subevent = sessionData?.subevent;
  const state = location.state;
  const passes = state?.selectedPasses;
  const attendees = state?.attendees;
  const sendAllToBilling = state?.sendAllToEmail;
  const GRAND_TOTAL = passes?.reduce((sum, p) => {
    return sum + (p.pass.final_price * p.quantity);
  }, 0) || 0;
  
  const isFullPass = sessionData.passType === 'global' ? true : false;  

  const attendeesList = Object.values(attendees || []).map(({ dob, ...rest }) => rest)

  const GLOBALPASS = async () => {
    try {
      const payload = {
        event_id: sessionData.eventId,
        billing_user_id: billingUser.billing_user_id,
        total_amount: GRAND_TOTAL,
        attendees: attendeesList,
        sendAllToBilling: sendAllToBilling
      }
      console.log("Payload for Full Pass:", payload);
      const response = await createGlobalPassOrder(payload);
      console.log("Response from Global Pass Order:", response);
      navigate("/payment/result");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert(`Something went wrong while creating your order, Please try again. ${error.response.data.errors[0]}`);
      navigate("/");
    }
  }

  const NORMALPASS = async () => {
    try {
      const payload = {
        subevent_id: subevent.subevent_id,
        billing_user_id: billingUser.billing_user_id,
        total_amount: GRAND_TOTAL,
        attendees: attendeesList,
        sendAllToBilling: sendAllToBilling
      }
      console.log("Payload for Full Pass:", payload);
      const response = await createPassOrder(payload);
      console.log("Response from Subevent Pass Order:", response);
      navigate("/payment/result");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert(`Something went wrong while creating your order, Please try again.`);
      
    } 
  }

  const handlePayment = () => {
    if (isFullPass) {
      GLOBALPASS();
    } else  {
      NORMALPASS();
    } 
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className= 'bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6'>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Summary</h1>
            <p className="text-white/80">Review your order and complete payment</p>
          </div>

          <div className="p-8">
            {/* Billing Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing Information</h2>
              <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600 text-sm">Name:</span>
                  <p className="font-semibold text-gray-900">{billingUser.name}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Email:</span>
                  <p className="font-semibold text-gray-900">{billingUser.email}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Mobile:</span>
                  <p className="font-semibold text-gray-900">{billingUser.mobile_no}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Gender: </span>
                  <p className="font-semibold text-gray-900 capitalize">{billingUser.gender}</p>
                </div>
              </div>
            </div>

            {/* Pass Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pl-6">
                Order Details
              </h2>
              
              {isFullPass ? (
                /* Full Pass Details */
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">Full Festival Passes</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Best Value
                    </div>
                  </div>
                </div>
              ) : (
                /* Single pass */
                <div>
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{subevent.name}</h3>
                      <p className="text-sm sm:text-xl text-gray-600">{convertDate(subevent.date)} • 7:00 PM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Invoice-style Passes List */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pl-6">Your Passes</h2>
              <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
                
                {/* Header */}
                <div className="grid grid-cols-4 px-6 py-4">
                  <p className="font-bold text-gray-900">Pass</p>
                  <p className="font-bold text-gray-900 text-center">Quantity</p>
                  <p className="font-bold text-gray-900 text-center">Price</p>
                  <p className="font-bold text-gray-900 text-right">Total Price</p>
                </div>

                {/* Rows */}
                {passes?.map((pass, idx) => (
                  <div key={idx} className="grid grid-cols-4 px-6 py-4">
                    <p className="text-gray-700">{pass.pass.category}</p>
                    <p className="text-sm text-gray-500 text-center">{pass.quantity}</p>
                    <p className="text-sm text-gray-500 text-center">₹{pass.pass.final_price}</p>
                    <p className="text-gray-700 text-right">₹{pass.pass.final_price * pass.quantity}</p>
                  </div>
                ))}

                {/* Grand Total */}
                <div className="grid grid-cols-4 px-6 py-4 text-lg font-bold text-purple-600">
                  <span className="col-span-3 text-right">Grand Total:</span>
                  <span className="text-right">₹{GRAND_TOTAL}</span>
                </div>
              </div>
            </div>



            {/* Payment Summary */}
            {/* <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Festival Pass</span>
                  <span className="font-semibold">₹2999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">₹29</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">₹545</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className='text-purple-600'>
                    ₹3573
                  </span>
                </div>
              </div>
            </div> */}

            {/* Payment Button */}
            <button 
              onClick={handlePayment}
              className='w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg'>
              PAY ₹{GRAND_TOTAL}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment;