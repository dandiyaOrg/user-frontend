import React from "react";

const getDescription = (category, date, is_global) => {
  if (is_global) {
    switch (category) {
      case "Stag Male":
        return `Valid for single male entry for all days`;
      case "Stag Female":
        return `Valid for single female entry for all days`;
      case "Couple":
        return `Valid for couple entry for all days`;
      case "Group":
        return `Valid for total 10 person entry for all days`;
      case "Full Pass":
        return `Valid for all subevents`;
      default:
        return `Valid for all days`;
    }
  } else {
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
        return `Valid for total 10 person entry on ${formattedDate}`;
      case "Full Pass":
        return `Valid for all subevents`;
      default:
        return `Valid on ${formattedDate}`;
    }
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
  totalSelected,
  errorMessage,
  is_global
}) => {
  // weight added to total when this pass quantity is increased by 1
  const incrementWeight = category === "Group" ? 10 : category === "Couple" ? 2 : 1;

  // Check whether increasing by 1 would exceed maxTotal
  // Note: totalSelected already counts current quantities (including this pass's current qty)
  const canIncrease = totalSelected + incrementWeight <= maxTotal;

  const increase = () => {
    if (!canIncrease) return;
    onQuantityChange(passId, quantity + 1);
  };

  const decrease = () => {
    onQuantityChange(passId, Math.max(0, quantity - 1));
  };

  return (
    <div className="w-[95vw] sm:w-[80vw] md:w-[60vw] max-w-6xl mx-auto border border-black rounded-2xl bg-white/70 shadow-md p-6 transition-all mb-4">
      {/* Upper Part */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800">{name}</h2>
        <div className="text-base text-gray-600 mt-1">
          {getDescription(category, date, is_global)}
        </div>
      </div>
      {/* Lower Part */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-300 mt-6 flex-col sm:flex-row gap-4 sm:gap-0">
        {/* Left: Price and Discount */}
        <div>
          {discountPercent > 0 && (
            <div className="flex items-center gap-3 text-xl mb-2">
              <span className="line-through text-gray-500">&#8377;{price}</span>
              <span className="bg-green-200 text-green-900 rounded-md px-2 py-0.5 text-base font-medium border border-green-500">
                {discountPercent}% OFF
              </span>
            </div>
          )}

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
              disabled={!canIncrease}
              className={`text-2xl px-2 focus:outline-none ${!canIncrease ? "text-gray-400 cursor-not-allowed" : ""}`}
            >+</button>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-600 mt-1">
              {errorMessage}
            </p>
          )}
          </div>
        </div>
    </div>
  );
};
