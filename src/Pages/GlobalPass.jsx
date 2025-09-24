import React from 'react'
import { useNavigate } from 'react-router-dom'

const GlobalPass = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (formData) => {
    try {
      console.log('Full Pass Billing form data:', formData)
      
      navigate('/payment', { 
        state: { 
          billingData: formData,
          passType: 'full-festival',
          selectedEvents: 'all', // All events included
          totalAmount: 1999,
          passDetails: {
            name: 'Full Festival Pass',
            duration: '9 Days',
            access: 'All Events + VIP Benefits',
            savings: 691
          }
        }
      })
    } catch (error) {
      console.error('Error processing full pass form:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Custom Header for Full Pass */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Full Festival Pass</h1>
              <p className="text-purple-100">Complete 9-day cultural festival experience</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">₹1,999</div>
              <div className="text-green-300 font-semibold">Save ₹691!</div>
            </div>
          </div>
          
          {/* Pass Benefits */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-white font-semibold text-sm">All 9 Days</div>
              <div className="text-purple-200 text-xs">Full Access</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-white font-semibold text-sm">VIP Seating</div>
              <div className="text-purple-200 text-xs">Priority Entry</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-white font-semibold text-sm">Workshops</div>
              <div className="text-purple-200 text-xs">All Included</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-white font-semibold text-sm">Meals</div>
              <div className="text-purple-200 text-xs">Premium Food</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GlobalPass;
