import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionContext from '../SessionContext' ;
import { Pass } from '../Components/Pass';
import { getGlobalPasses } from "../api";
import { convertDate } from "../utils/dateConverter.js";
import IsLoading from './IsLoading.jsx';

const GlobalPass = () => {

  const navigate = useNavigate()
  const { sessionData } = useContext(SessionContext);
  const billingUser = sessionData.billingUser;
  const eventId = sessionData.eventId;
   
  const [passes, setPasses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const MAX_TOTAL_PASSES = 10;

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const hasGroup = passes.some(p => p.category === "Group");
  const hasSinglesOrCouple = passes.some(
    p => ["Stag Male", "Stag Female", "Couple"].includes(p.category)
  );

  const handleQuantityChange = (passId, newQuantity) => {
    const passObj = passes.find(p => p.pass_id === passId);
    if (!passObj) return;

    // Build prospective selected quantities object
    const prospective = { ...selectedQuantities };
    if (newQuantity === 0) {
      delete prospective[passId];
    } else {
      prospective[passId] = newQuantity;
    }

    // Determine if group vs singles/couple selection conflict exists (based on prospective selection)
    const hasGroupSelected = Object.entries(prospective).some(([id, qty]) => {
      const p = passes.find(pp => pp.pass_id === id);
      return qty > 0 && p?.category === "Group";
    });

    const hasSinglesSelected = Object.entries(prospective).some(([id, qty]) => {
      const p = passes.find(pp => pp.pass_id === id);
      return qty > 0 && ["Stag Male", "Stag Female", "Couple"].includes(p?.category);
    });

    if (hasGroupSelected && hasSinglesSelected) {
      setErrorMessage("❌ You cannot mix Group passes with Stag/Couple passes.");
      return;
    }

    // Helper to compute weight for a given category per single unit
    const unitWeight = (cat) => {
      if (cat === "Group") return 10;
      if (cat === "Couple") return 2;
      return 1;
    };

    // Compute prospective total (using weights)
    const prospectiveTotal = passes.reduce((sum, p) => {
      const qty = prospective[p.pass_id] || 0;
      return sum + qty * unitWeight(p.category);
    }, 0);

    if (prospectiveTotal > MAX_TOTAL_PASSES) {
      setErrorMessage(`❌ Maximum total allowed is ${MAX_TOTAL_PASSES} people/passes. Your selection counts as ${prospectiveTotal}.`);
      return;
    }

    // All good -> clear error and update selected quantities
    setErrorMessage("");
    setSelectedQuantities(prospective);
  };

  
  const handleNext = () => {
    setIsSubmitting(true);
    if (selectedPassesArray.length === 0) {
      setErrorMessage("⚠️ Please select at least one pass before proceeding.");
      setIsSubmitting(false);
      return;
    }

    // Clear error if valid
    setErrorMessage(""); 
    console.log("state ", selectedPassesArray);
    navigate("/Attendees", { state: { selectedPasses: selectedPassesArray } });
  }

  useEffect(() => { 
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await getGlobalPasses(billingUser.billing_user_id, eventId);
          setPasses([response?.data?.pass]);
          console.log(response);
          
        } catch (error) {
          setError(true);
          setErrorMessage(error.message || "An error occurred while fetching passes.");
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

  const totalSelected = passes.reduce((sum, p) => {
    const qty = selectedQuantities[p.pass_id] || 0;
    if (p.category === "Group") {
      return sum + qty * 10;  
    }
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

  if (loading) return <IsLoading />;
  if (error) return <p className="text-red-500 text-center mt-20">{errorMessage}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Full Festival Pass</h1>
              <p className="text-purple-100">Complete 3-day Garba Night passes</p>
            </div>
          </div>
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
        </div>

        {errorMessage && (
          <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded-lg mb-6">
            {errorMessage}
          </div>
        )}

        {/* Passes */}
        {/* Group Pass Section */}
        {passes.filter((p) => p.category === "Group").map((pass) => (
            <div className="mb-10" key={pass.pass_id}>
              <h3 className="text-2xl font-bold mb-4">Group Pass</h3>
                <Pass
                  key={pass.pass_id}
                  passId={pass.pass_id}
                  name={pass.category}
                  price={pass.total_price}
                  final_price={pass.final_price}
                  discountPercent={pass.discount_percentage}
                  category={pass.category}
                  quantity={selectedQuantities[pass.pass_id] || 0}
                  onQuantityChange={handleQuantityChange}
                  maxTotal={MAX_TOTAL_PASSES}
                  totalSelected={totalSelected}
                  errorMessage={errorMessage}
                  is_global={true}
                  />
            </div>
          ))}

        {/* Divider */}
        {hasGroup && hasSinglesOrCouple && (<div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-gray-50 text-gray-500">OR</span>
          </div>
        </div>)}

        {/* Single/Couple Passes Section */}
          {passes.filter((p) => p.category !== "Group" && p.category !== "Full Group").map((pass) => (
          <div key={pass.pass_id}>
            <h3 className="text-2xl font-bold mb-4">Single / Couple Passes</h3>
              <Pass
                key={pass.pass_id}
                passId={pass.pass_id}
                name={pass.category}
                price={pass.total_price}
                final_price={pass.final_price}
                discountPercent={pass.discount_percentage}
                category={pass.category}
                quantity={selectedQuantities[pass.pass_id] || 0}
                onQuantityChange={handleQuantityChange}
                maxTotal={MAX_TOTAL_PASSES}
                totalSelected={totalSelected}
                errorMessage={errorMessage}
                is_global={true}
              />
          </div>
          ))}


        <div className="pt-8 border-t border-gray-200">
            {errorMessage && (
              <div className="bg-red-100 text-red-700 border border-red-400 px-4 py-2 rounded-lg mb-6">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              onClick={handleNext}
              disabled={isSubmitting || errorMessage}
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
  </div>
  )
}

export default GlobalPass;
