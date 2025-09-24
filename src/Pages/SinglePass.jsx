import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SessionContext from '../SessionContext' ;
import { Pass } from '../Components/Pass';

function SinglePass() {

  const location = useLocation();
  const navigate = useNavigate();
  const { sessionData } = useContext(SessionContext);

  const { state } = location;
  const subevent = state?.subevent || {};
  const billingUser = sessionData.billingUser;
  const [passes, setPasses] = React.useState(state?.subevent?.passes || []);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const MAX_TOTAL_PASSES = 5;

  const totalSelected = passes.reduce((sum, p) => {
    const qty = selectedQuantities[p.pass_id] || 0;
    if (p.category === "Couple") {
      return sum + qty * 2;  
    }
    return sum + qty;
  }, 0);

  const selectedPassesArray = Object.entries(selectedQuantities).map(([id, qty]) => {
    const passObj = passes.find(p => p.pass_id === id);
    return {
      pass: passObj,
      quantity: qty,
    };
  });

  const handleQuantityChange = (passId, newQuantity) => {
    setSelectedQuantities((prev) => {
      // remove pass if quantity = 0
      if (newQuantity === 0) {
        const updated = { ...prev };
        delete updated[passId];
        return updated;
      }
      return {
        ...prev,
        [passId]: newQuantity,
      };
    });
    console.log("Selected Quantities:", selectedPassesArray);
  };

  const handleNext = () => {
    setIsSubmitting(true); 
    console.log("state ", selectedPassesArray);
    navigate("/Attendees", { state: { selectedPasses: selectedPassesArray } });
  }

  console.log("SinglePass state:", state);

  return (
      <div className="max-w-6xl mx-auto py-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Select Passes</h2>
          <p className="text-blue-100">Please select passes for registration</p>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingUser.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingUser.email}</span>
            </div>
            <div>
              <span className="text-gray-600">Mobile:</span>
              <span className="ml-2 font-semibold text-gray-900">{billingUser.mobile_no}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Subevent Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Name:</span>
              <span className="ml-2 font-semibold text-gray-900">{subevent.name}</span>
            </div>
            <div>
              <span className="text-gray-600">Date</span>
              <span className="ml-2 font-semibold text-gray-900">{subevent.date}</span>
            </div>
            <div>
              <span className="text-gray-600">Venue</span>
              <span className="ml-2 font-semibold text-gray-900">
                {new Date(`1970-01-01T${subevent.start_time}`).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Passes */}
        <div className="grid grid-cols-1 gap-y-6 mb-8">
          {passes.map((pass) => {

            return (
              <div key={pass.pass_id} >
                <Pass
                  key={pass.pass_id}
                  passId={pass.pass_id}
                  name={pass.category}
                  price={pass.total_price}
                  final_price={pass.final_price}
                  discountPercent={pass.discount_percentage}
                  category={pass.category}
                  date={subevent.date}
                  quantity={selectedQuantities[pass.pass_id] || 0}
                  onQuantityChange={handleQuantityChange}
                  maxTotal={MAX_TOTAL_PASSES}
                  totalSelected={totalSelected}
                />
              </div>
            )
          })}
        </div>

        <div className="pt-8 border-t border-gray-200">
            <button
              type="submit"
              onClick={handleNext}
              disabled={isSubmitting}
              className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-200 transform ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-2xl'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                'Add Passes to Order'
              )}
            </button>
          </div>
      </div>
  )
}

export default SinglePass;