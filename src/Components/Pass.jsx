import React, { useState } from "react";

const getDescription = (category, date) => {
  // Format date into "28 Sep 2025"
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  switch (category) {
    case "Stag Male":
      return `Valid for single male entry on ${formattedDate}`;
    case "Stag Female":
      return `Valid for single female entry on ${formattedDate}`;
    case "Couple":
      return `Valid for couple entry on ${formattedDate}`;
    case "Group":
      return `Valid for group entry on ${formattedDate}`;
    case "Full Pass":
      return `Valid for all subevents`;
    default:
      return `Valid on ${formattedDate}`;
  }
};

export const Pass = ({
  name,
  passId,
  price,
  final_price,
  discountPercent,
  category, 
  date,
  quantity,
  onQuantityChange,
  maxTotal,
  totalSelected
}) => {

  const increase = () => {
    if (totalSelected < maxTotal) {
      onQuantityChange(passId, quantity + 1);
    }
  };

  const decrease = () => {
    onQuantityChange(passId, Math.max(0, quantity - 1));
  };

  return (
    <div className="w-[95vw] sm:w-[80vw] md:w-[60vw] max-w-6xl mx-auto border border-black rounded-2xl bg-white/70 shadow-md p-6 transition-all">
      {/* Upper Part */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
        <div className="text-base text-gray-600 mt-1">
          {getDescription(category, date)}
        </div>
      </div>
      {/* Lower Part */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-300 mt-6 flex-col sm:flex-row gap-4 sm:gap-0">
        {/* Left: Price and Discount */}
        <div>
          <div className="flex items-center gap-3 text-xl mb-2">
            <span className="line-through text-gray-500">&#8377;{price}</span>
            <span className="bg-green-200 text-green-900 rounded-md px-2 py-0.5 text-base font-medium border border-green-500">
              {discountPercent}% OFF
            </span>
          </div>
          <div className="text-lg text-gray-700 font-normal">
            Final Price - <span className="font-semibold">&#8377;{final_price}/-</span>
          </div>
        </div>

        {/* Right: Quantity Selector */}
        <div className="flex flex-col items-center">
            <div className="border border-black rounded-xl px-4 py-2 flex items-center bg-white">
                <button
                onClick={decrease}
                className="text-2xl px-2 focus:outline-none"
                >-</button>
                <span className="mx-3 text-2xl">{quantity}</span>
                <button
                onClick={increase}
                disabled={totalSelected >= maxTotal}
                className={`text-2xl px-2 focus:outline-none ${
                    totalSelected >= maxTotal ? "text-gray-400 cursor-not-allowed" : ""
                }`}
                >+</button>
            </div>

            {/* ⚠️ New line added */}
            {totalSelected >= maxTotal && (
                <p className="text-xs text-red-600 mt-1">
                You cannot add more passes
                </p>
            )}
            </div>

            </div>
        </div>
    );
};