// PaymentStatus.jsx
import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const PaymentStatus = () => {
  const [status, setStatus] = useState("pending"); 

  useEffect(() => {
    // Simulate API call for confirmation
    const timer = setTimeout(() => {
      // Replace with your actual API call
      const isSuccess = Math.random() < 0.5; 
      setStatus(isSuccess ? "success" : "failed");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {status === "pending" && (
        <>
          {/* Spinner Animation */}
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-100">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
          <h1 className="mt-6 text-xl font-semibold text-gray-900 text-center">
            Waiting for Confirmation
          </h1>
          <p className="mt-2 text-gray-600 text-center max-w-sm animate-pulse">
            Please wait while we confirm your payment...
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 text-center">
            Payment Successful
          </h1>
          <p className="mt-2 text-gray-600 text-center max-w-sm">
            Your payment has been processed successfully. Thank you for your purchase!
          </p>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-100 animate-bounce">
            <XCircle className="w-16 h-16 text-red-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 text-center">
            Payment Failed
          </h1>
          <p className="mt-2 text-gray-600 text-center max-w-sm">
            Something went wrong while processing your payment. Please try again.
          </p>
        </>
      )}
    </div>
  );
};

export default PaymentStatus;