import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa';

function Attendees() {
  const location = useLocation();
  const state = location?.state || {};
  const selectedPasses = state.selectedPasses || [];
  const [sendAllToEmail, setSendAllToEmail] = useState(false);

  // Parse pass types into sections
  const getRows = () => {
    const stagMale = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'stag male')?.quantity || 0;
    const stagFemale = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'stag female')?.quantity || 0;
    const coupleRows = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'couple')?.quantity || 0;
    const group = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'group')?.quantity || 0;
    return { stagMale, stagFemale, coupleRows, group };
  };

  const { stagMale, stagFemale, coupleRows, group } = getRows();

  // Helper to render input row
  const AttendeeRow = ({ icon, label, idx, skipEmail, showGender }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 py-3 border border-gray-200 rounded-xl px-4 hover:shadow-md transition-shadow duration-200">
    {/* Icon or Gender */}
    {icon ? (
      <div className="flex items-center">{icon}</div>
    ) : showGender ? (
      <select
        name={`gender_${label}_${idx}`}
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    ) : null}

    {/* Name */}
    <input
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="Name"
      name={`name_${label}_${idx}`}
      type="text"
      required
    />

    {/* DOB */}
    <input
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="DOB"
      name={`dob_${label}_${idx}`}
      type="date"
      required
    />

    {/* WhatsApp */}
    <input
      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      placeholder="WhatsApp number"
      name={`whatsapp_${label}_${idx}`}
      type="tel"
      required
    />

    {/* Email (optional if sendAllToEmail) */}
    {!skipEmail && (
      <input
        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        placeholder="Email"
        name={`email_${label}_${idx}`}
        type="email"
        required
      />
    )}
  </div>
);


  return (
    <div className="max-w-6xl mx-auto py-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Add Attendees</h2>
            <p className="text-blue-100">Add the attendee details below</p>
        </div>

        <label className="inline-flex items-center space-x-2 text-black cursor-pointer select-none">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={sendAllToEmail}
            onChange={(e) => setSendAllToEmail(e.target.checked)}
          />
          <span className="text-lg">Send all the passes to my email Id</span>
        </label>

        {/* Stag Male Section */}
        {stagMale > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-700">
                <FaMale className="text-3xl" />
                Stag Male
            </h3>
            <div className="space-y-6">
                {Array.from({ length: stagMale }).map((_, idx) => (
                <AttendeeRow
                    key={`male-${idx}`}
                    icon={<FaMale className="text-blue-700 text-2xl" />}
                    label="male"
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                />
                ))}
            </div>
            </div>
        )}

        {/* Stag Female Section */}
        {stagFemale > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-pink-600">
                <FaFemale className="text-3xl" />
                Stag Female
            </h3>
            <div className="space-y-6">
                {Array.from({ length: stagFemale }).map((_, idx) => (
                <AttendeeRow
                    key={`female-${idx}`}
                    icon={<FaFemale className="text-pink-600 text-2xl" />}
                    label="female"
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                />
                ))}
            </div>
            </div>
        )}

        {/* Couple Section */}
        {coupleRows > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <FaMale className="text-blue-700 text-3xl" />
                <FaFemale className="text-pink-600 text-3xl" /> Couple
            </h3>
            <div className="space-y-6">
                {Array.from({ length: coupleRows }).map((_, idx) => (
                <React.Fragment key={`couple-${idx}`}>
                    <AttendeeRow
                    icon={<FaMale className="text-blue-700 text-2xl" />}
                    label={`couple_male`}
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                    />
                    <AttendeeRow
                    icon={<FaFemale className="text-pink-600 text-2xl" />}
                    label={`couple_female`}
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                    />
                </React.Fragment>
                ))}
            </div>
            </div>
        )}

        {group > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-700">
            Group Members
            </h3>
            <div className="space-y-6">
            {Array.from({ length: 10 }).map((_, idx) => (
                <AttendeeRow
                key={`group-${idx}`}
                icon={null} // no icon
                label="group"
                idx={idx + 1}
                skipEmail={sendAllToEmail}
                showGender={true}
                />
            ))}
            </div>
        </div>
        )}
    </div>

  );
}

export default Attendees;
