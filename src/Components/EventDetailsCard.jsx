import React from 'react'

const EventDetailsCard = ({ 
  eventName, 
  eventVenue, 
  eventDate, 
  eventTime,
  eventDetails,
}) => {
  return (
    <div className="relative group">
      
      
      {/* Main Card */}
      <div className="mt-4 relative bg-white ">
        
        

        {/* Event Details */}
        <div className="p-8 space-y-6">
          {/* Event Name with Gradient Text */}
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-3">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upcoming Event
            </div>
            <h3 className="text-4xl font-semibold   ">
              {eventName}
            </h3>
          </div>

          {/* Event Info Grid with Enhanced Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Venue */}
            <div className="group/item relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-700 mb-1 uppercase tracking-wide">Venue</p>
                  <p className="text-gray-900 font-semibold text-lg leading-snug">{eventVenue}</p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-blue-300/30 rounded-full blur-sm"></div>
            </div>

            {/* Date */}
            <div className="group/item relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-purple-700 mb-1 uppercase tracking-wide">Date</p>
                  <p className="text-gray-900 font-semibold text-lg leading-snug">{eventDate}</p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-purple-300/30 rounded-full blur-sm"></div>
            </div>

            {/* Time - Full Width */}
            <div className="md:col-span-2 group/item relative overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-5 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 border border-emerald-200/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-emerald-700 mb-1 uppercase tracking-wide">Time</p>
                  <p className="text-gray-900 font-semibold text-lg leading-snug">{eventTime}</p>
                </div>
                {/* Status Badge */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center px-3 py-1 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs font-semibold text-green-700">Live</span>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-2 right-16 w-6 h-6 bg-emerald-300/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-2 right-8 w-4 h-4 bg-emerald-400/30 rounded-full blur-sm"></div>
            </div>
          </div>

          {/* Event Details Section */}
          {eventDetails && (
            <div className="relative bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200/50">
              <div className="absolute top-0 left-6 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-gray-800 mb-3 pt-2">Event Details</h4>
              <div className="text-gray-700 leading-relaxed">
                {eventDetails}
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  )
}

export default EventDetailsCard
