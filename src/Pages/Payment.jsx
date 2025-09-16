import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { billingData, selectedEvents, totalAmount, passType, passDetails } = location.state || {}

  if (!billingData) {
    navigate('/')
    return null
  }

  const isFullPass = passType === 'full-festival'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className={`${isFullPass ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-blue-600 to-blue-700'} px-8 py-6`}>
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
                  <p className="font-semibold text-gray-900">{billingData.name}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Email:</span>
                  <p className="font-semibold text-gray-900">{billingData.email}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Mobile:</span>
                  <p className="font-semibold text-gray-900">{billingData.mobileNo}</p>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Gender:</span>
                  <p className="font-semibold text-gray-900 capitalize">{billingData.gender}</p>
                </div>
              </div>
            </div>

            {/* Pass Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {isFullPass ? 'Festival Pass Details' : 'Selected Events'}
              </h2>
              
              {isFullPass ? (
                /* Full Pass Details */
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">{passDetails.name}</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Best Value
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{passDetails.duration}</div>
                      <div className="text-gray-600 text-sm">Festival Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">All Events</div>
                      <div className="text-gray-600 text-sm">Complete Access</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">₹{passDetails.savings}</div>
                      <div className="text-gray-600 text-sm">You Save</div>
                    </div>
                  </div>

                  <div className="border-t border-purple-200 pt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        All 9 Festival Days
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        VIP Seating & Priority Entry
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Cultural Workshops Access
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Premium Meals & Beverages
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* Selected Events for Sub Pass */
                <div className="space-y-3">
                  {selectedEvents?.map(event => (
                    <div key={event.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900">{event.name}</h3>
                        <p className="text-sm text-gray-600">{event.date} • {event.time}</p>
                      </div>
                      <span className="font-bold text-gray-900">₹{event.price}</span>
                    </div>
                  )) || (
                    <div className="text-center text-gray-500 py-8">
                      No events selected
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {isFullPass ? 'Full Festival Pass' : 'Selected Events'}
                  </span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-semibold">₹29</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold">₹{Math.round((totalAmount + 29) * 0.18)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className={`${isFullPass ? 'text-purple-600' : 'text-blue-600'}`}>
                    ₹{Math.round((totalAmount + 29) * 1.18)}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button className={`w-full py-4 ${isFullPass ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg`}>
              Pay ₹{Math.round((totalAmount + 29) * 1.18)} - Complete Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
