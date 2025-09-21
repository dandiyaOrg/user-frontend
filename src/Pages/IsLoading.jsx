import React from "react";

const IsLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default IsLoading;
