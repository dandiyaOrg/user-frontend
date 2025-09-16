// In your BillingUserSubEvent.jsx component
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BillingUserForm from '../Components/BillingUserForm'

const BillingUserSubEvent = () => {
  const navigate = useNavigate()

  const handleFormSubmit = async (formData) => {
  try {
    // Process the form data
    console.log('Billing form data:', formData)
    
    // Store billing data in state and navigate to sub-event selection
    navigate('/SubEventSelection', { 
      state: { 
        billingData: formData,
        fromBilling: true
      }
    })
  } catch (error) {
    console.error('Error processing form:', error)
  }
}


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BillingUserForm onSubmit={handleFormSubmit} />
    </div>
  )
}

export default BillingUserSubEvent
