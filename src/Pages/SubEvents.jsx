import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import IsLoading from './IsLoading';
import { getSubEvents } from "../api";
import SessionContext from "../SessionContext"; 
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const SubEventSelection = () => {
  const navigate = useNavigate();
  const { sessionData, setSessionData } = useContext(SessionContext);

  const billingData = sessionData.billingUser;
  const eventId = sessionData.eventId; 
  
  const [subEvents, setSubEvents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSubEvents(eventId, billingData.billing_user_id);
        console.log(response)
        setSessionData(prev => ({...prev, subevents: response.data}));
        setSubEvents(response.data); 
      } catch (error) {
        setError(true);
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

  if (loading) return <IsLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

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
              <span className="ml-2 font-semibold text-gray-900">{billingData.mobile_no}</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1  gap-6 mb-8">
          {subEvents.map((subevent) => {

            return (
              <div 
                key={subevent.subevent_id}
                className="group relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
                onClick={() => {}}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex h-full">
                  {/* Left Side - Event Image (1/3 width) */}
                  {subevent.images && (
                    <div className="relative w-1/3 overflow-hidden">
                      <img 
                        src={subevent.images} 
                        alt={subevent.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                      
                      {/* Event Number Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                            DAY #{subevent.day}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Right Side - Content (2/3 width) */}
                  <div className="flex-1 relative p-6 flex flex-col">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {subevent.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {subevent.description}
                      </p>
                    </div>

                    {/* Event Details with Icons */}
                    <div className="space-y-4 mb-6 flex-1">
                      {/* Dates */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Date</div>
                            <div className="font-semibold text-gray-900">
                              {(subevent.date)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Venue */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Venue</div>
                          <div className="font-semibold text-gray-900 truncate">Udaipur</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default SubEventSelection
