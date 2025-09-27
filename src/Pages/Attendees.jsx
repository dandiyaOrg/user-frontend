// Attendees.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa';
import AttendeeRow from '../Components/AttendeeRow';

function Attendees() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location?.state || {};
  const selectedPasses = state.selectedPasses || [];
  const [sendAllToEmail, setSendAllToEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendees, setAttendees] = useState({}); // ✅ store data here
  const [errors, setErrors] = useState({});       // ✅ track validation errors

  // Parse pass types
  const getRows = () => {
    const stagMale = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'stag male')?.quantity || 0;
    const stagFemale = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'stag female')?.quantity || 0;
    const coupleRows = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'couple')?.quantity || 0;
    const groupUnits = selectedPasses.find(sp => sp.pass.category.toLowerCase() === 'group')?.quantity || 0;
    const group = groupUnits * 10;
    return { stagMale, stagFemale, coupleRows, group };
  };

  const { stagMale, stagFemale, coupleRows, group } = getRows();

  const updateAttendee = (key, data) => {
    setAttendees(prev => ({
      ...prev,
      [key]: { ...prev[key], ...data }
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    Object.entries(attendees).forEach(([key, data]) => {
      const rowErrors = {};
      if (!data.name?.trim()) {
        rowErrors.name = "Name is required";
        valid = false;
      }
      if (data.showGender && !data.gender) {
        rowErrors.gender = "Gender is required";
        valid = false;
      }
      if (!data.whatsapp?.trim()) {
        rowErrors.whatsapp = "Whatsapp number is required";
        valid = false;
      }
      if (!sendAllToEmail && !data.email?.trim()) {
        rowErrors.email = "Email is required";
        valid = false;
      }
      if (Object.keys(rowErrors).length > 0) {
        newErrors[key] = rowErrors;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    setIsSubmitting(true);
    console.log("Submitting attendees:", attendees);
    navigate("/payment", { 
      state: { 
        attendees: attendees, 
        selectedPasses: selectedPasses, 
        sendAllToEmail: sendAllToEmail 
      } 
    });
  };

  useEffect(() => {
    const initial = {};

    // Stag Male
    selectedPasses
      .filter(sp => sp.pass.category.toLowerCase() === "stag male")
      .forEach(sp => {
        Array.from({ length: sp.quantity }).forEach((_, idx) => {
          initial[`male-${idx + 1}`] = {
            name: "",
            whatsapp: "",
            email: "",
            dob: "",
            gender: "Male",
            pass_id: sp.pass.pass_id, // ✅ store pass_id
          };
        });
      });

    // Stag Female
    selectedPasses
      .filter(sp => sp.pass.category.toLowerCase() === "stag female")
      .forEach(sp => {
        Array.from({ length: sp.quantity }).forEach((_, idx) => {
          initial[`female-${idx + 1}`] = {
            name: "",
            whatsapp: "",
            email: "",
            dob: "",
            gender: "Female",
            pass_id: sp.pass.pass_id,
          };
        });
      });

    // Couples
    selectedPasses
      .filter(sp => sp.pass.category.toLowerCase() === "couple")
      .forEach(sp => {
        Array.from({ length: sp.quantity }).forEach((_, idx) => {
          initial[`couple_male-${idx + 1}`] = {
            name: "",
            whatsapp: "",
            email: "",
            dob: "",
            gender: "Male",
            pass_id: sp.pass.pass_id,
          };
          initial[`couple_female-${idx + 1}`] = {
            name: "",
            whatsapp: "",
            email: "",
            dob: "",
            gender: "Female",
            pass_id: sp.pass.pass_id,
          };
        });
      });

    // Groups
    selectedPasses
      .filter(sp => sp.pass.category.toLowerCase() === "group")
      .forEach(sp => {
        const members = sp.quantity * 10;
        let startIndex = Object.keys(initial).filter(k => k.startsWith('group-')).length;

        for (let i = 0; i < members; i++) {
          const idx = startIndex + i + 1;
          initial[`group-${idx}`] = {
            name: "",
            whatsapp: "",
            email: "",
            dob: "",
            gender: "",
            pass_id: sp.pass.pass_id,
          };
        }
      });

    setAttendees(initial);
  }, [selectedPasses]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Add Attendees</h2>
        <p className="text-blue-100">Add the attendee details below</p>
      </div>

      <label className="inline-flex items-center space-x-2 text-black cursor-pointer select-none mb-6">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-600"
          checked={sendAllToEmail}
          onChange={(e) => setSendAllToEmail(e.target.checked)}
        />
        <span className="text-lg">Send all the passes to my email Id</span>
      </label>

      {/* Example: Stag Male Section */}
      {stagMale > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-blue-700">
            <FaMale className="text-3xl" /> Stag Male
          </h3>
          <div className="space-y-6">
            {Array.from({ length: stagMale }).map((_, idx) => {
              const key = `male-${idx + 1}`;
              return (
                <AttendeeRow
                  key={key}
                  rowKey={key}
                  icon={<FaMale className="text-blue-700 text-2xl" />}
                  label="male"
                  idx={idx + 1}
                  skipEmail={sendAllToEmail}
                  updateAttendee={updateAttendee}
                  errors={errors[key] || {}}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Stag Female Section */}
      {stagFemale > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-pink-600">
            <FaFemale className="text-3xl" /> Stag Female
          </h3>
          <div className="space-y-6">
            {Array.from({ length: stagFemale }).map((_, idx) => {
              const key = `female-${idx + 1}`;
              return (
                <AttendeeRow
                  key={key}
                  rowKey={key}
                  icon={<FaFemale className="text-pink-600 text-2xl" />}
                  label="female"
                  idx={idx + 1}
                  skipEmail={sendAllToEmail}
                  updateAttendee={updateAttendee}
                  errors={errors[key] || {}}
                />
              );
            })}
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
            {Array.from({ length: coupleRows }).map((_, idx) => {
              const maleKey = `couple_male-${idx + 1}`;
              const femaleKey = `couple_female-${idx + 1}`;

              return (
                <React.Fragment key={`couple-${idx}`}>
                  <AttendeeRow
                    rowKey={maleKey}
                    icon={<FaMale className="text-blue-700 text-2xl" />}
                    label="couple_male"
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                    updateAttendee={updateAttendee}
                    errors={errors[maleKey] || {}}
                  />
                  <AttendeeRow
                    rowKey={femaleKey}
                    icon={<FaFemale className="text-pink-600 text-2xl" />}
                    label="couple_female"
                    idx={idx + 1}
                    skipEmail={sendAllToEmail}
                    updateAttendee={updateAttendee}
                    errors={errors[femaleKey] || {}}
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Group Section */}
      {group > 0 && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-3 text-green-700">
            Group Members
          </h3>
          <div className="space-y-6">
            {Array.from({ length: group }).map((_, idx) => {
              const key = `group-${idx + 1}`;
              return (
                <AttendeeRow
                  key={key}
                  rowKey={key}
                  icon={null} 
                  label="group"
                  idx={idx + 1}
                  skipEmail={sendAllToEmail}
                  showGender={true}
                  updateAttendee={updateAttendee}
                  errors={errors[key] || {}}
                />
              );
            })}
          </div>
        </div>
      )}

      
      <div className="pt-8 border-t border-gray-200">
        <button
          type="submit"
          onClick={(e) => handleNext()}
          disabled={isSubmitting}
          className={`w-full py-4 px-8 rounded-xl font-bold text-white transition-all duration-200 transform ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-2xl'
          }`}
        >
          {isSubmitting ? "Processing..." : "Add Passes to Order"}
        </button>
      </div>
    </div>
  );
}

export default Attendees;
