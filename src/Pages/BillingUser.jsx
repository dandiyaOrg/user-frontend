import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import BillingUserForm from '../Components/BillingUserForm'
import SessionContext from '../SessionContext'
import api from "../api";

const BillingUser = () => {
  const navigate = useNavigate()
  const { sessionData, setSessionData } = useContext(SessionContext);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await api.post("/billingUser/create", formData);
      const billingUser = response.data.data.billingUser;
      setSessionData(prev => ({ ...prev, billingUser: billingUser }));
      
      if (sessionData.passType === 'single') {
        navigate("/SubEventSelection", {
          state: {
            billingUser,
            fromBilling: true,
            },
          });
        } else if (sessionData.passType === "global") {
          navigate("/GlobalPass", {
            state: {
              billingUser,
              fromBilling: true,
            },
         });
        } else {
          console.warn("Unknown passType, staying on same page.");
        }
      } catch (error) {
        if (error.response) {
          console.error("Server error:", error.response.data);
        } else {
          console.error("Error:", error.message);
        }
      }
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BillingUserForm onSubmit={handleFormSubmit} />
    </div>
  )
}

export default BillingUser;
