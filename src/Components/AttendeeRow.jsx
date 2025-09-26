import React from 'react';

function AttendeeRow({ rowKey, icon, label, idx, skipEmail, showGender, updateAttendee, errors }) {


  const handleChange = (e) => {
    const { name, value } = e.target;
    updateAttendee(rowKey, { [name]: value });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-4 py-3 border border-gray-200 rounded-xl px-4 hover:shadow-md transition-shadow duration-200">
      {/* Icon or Gender */}
      {icon ? (
        <div className="flex items-center">{icon}</div>
      ) : showGender ? (
        <select
          name="gender"
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      ) : null}
      {errors?.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}

      {/* Name */}
      <div>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full"
        />
        {errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      {/* DOB */}
      <input
        name="dob"
        placeholder="Enter Date of Birth"
        type="text"
        onChange={handleChange}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => !e.target.value && (e.target.type = "text")}
        className="px-3 py-2 border border-gray-300 rounded-lg w-full"
      />

      {/* Whatsapp */}
      <div>
        <input
          name="whatsapp"
          placeholder="Whatsapp number"
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg w-full"
        />
        {errors?.whatsapp && <span className="text-red-500 text-sm">{errors.whatsapp}</span>}
      </div>

      {/* Email (optional if skipEmail) */}
      {!skipEmail && (
        <div>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full"
          />
          {errors?.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>
      )}
    </div>
  );
}

export default AttendeeRow;
