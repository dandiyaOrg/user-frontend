import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getSubEvents } from "../api";
import SessionContext from "../SessionContext"; 

const SubEventSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { sessionData } = useContext(SessionContext);
  const billingData = sessionData.billingUser
  const eventId = sessionData.eventId; 
  const billingUserId = sessionData.billingUser?.billing_user_id;
  
  const [selectedEvents, setSelectedEvents] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [subEvents, setSubEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { 
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('eid', eventId)
        const response = await getSubEvents(eventId, billingUserId);
        console.log("response", response);
        setSubEvents(response.data); 
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error);
          console.error("Server error:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading subevents...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  const handleEventSelection = (eventId) => {
    setSelectedEvents(prev => {
      if (prev.includes(eventId)) {
        return prev.filter(id => id !== eventId)
      } else {
        return [...prev, eventId]
      }
    })
  }

  const calculateTotal = () => {
    return selectedEvents.reduce((total, eventId) => {
      const event = subEvents.find(e => e.id === eventId)
      return total + (event?.price || 0)
    }, 0)
  }

  const handleProceedToPayment = async () => {
    if (selectedEvents.length === 0) {
      alert('Please select at least one event')
      return
    }

    setIsSubmitting(true)
    try {
      const selectedEventDetails = selectedEvents.map(eventId => 
        subEvents.find(e => e.id === eventId)
      )

      // Navigate to payment with all data
      navigate('/payment', {
        state: {
          billingData,
          selectedEvents: selectedEventDetails,
          totalAmount: calculateTotal(),
          passType: 'sub-events'
        }
      })
    } catch (error) {
      console.error('Error proceeding to payment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Select Sub Event</h1>
          <p className="text-blue-100">Choose the Event you'd like to attend</p>
        </div>

        {/* Billing Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingData.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingData.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Mobile:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingData.mobileNo}</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {subEvents.map((event) => {
            const isSelected = selectedEvents.includes(event.id)
            const availableSeats = event.seats - event.bookedSeats
            const isFullyBooked = availableSeats <= 0

            return (
              <div
                key={event.id}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 shadow-2xl transform scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
                } ${isFullyBooked ? 'opacity-60 cursor-not-allowed' : ''}`}
                onClick={() => !isFullyBooked && handleEventSelection(event.id)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Fully Booked Badge */}
                {isFullyBooked && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    FULLY BOOKED
                  </div>
                )}

                <div className="p-6">
                  {/* Event Image */}
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Event Details */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {availableSeats} seats available
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{event.price}</span>
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      isSelected 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isSelected ? 'Selected' : 'Select'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selection Summary */}
        {selectedEvents.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Events Summary</h3>
            <div className="space-y-3">
              {selectedEvents.map(eventId => {
                const event = subEvents.find(e => e.id === eventId)
                return (
                  <div key={eventId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <div>
                      <span className="font-semibold text-gray-900">{event.name}</span>
                      <span className="text-sm text-gray-600 block">{event.date} • {event.time}</span>
                    </div>
                    <span className="font-bold text-gray-900">₹{event.price}</span>
                  </div>
                )
              })}
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200">
                <span className="text-xl font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => navigate('/BillingUserSubEvent')}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            ← Back to Billing
          </button>

          <button
            onClick={handleProceedToPayment}
            disabled={selectedEvents.length === 0 || isSubmitting}
            className={`px-8 py-3 font-bold rounded-xl transition-all duration-200 ${
              selectedEvents.length === 0 || isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
            }`}
          >
            {isSubmitting ? 'Processing...' : `Proceed to Payment (₹${calculateTotal()})`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubEventSelection
