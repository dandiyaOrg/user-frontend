import React, { useState, useEffect, useContext } from 'react';
import InputField from './InputField';
import SessionContext from '../SessionContext';

const BillingUserForm = ({ onSubmit }) => {

  const { sessionData, updateSection } = useContext(SessionContext)

  const [formData, setFormData] = useState({
    name: sessionData.billingUser?.name || '',
    mobile_no: sessionData.billingUser?.mobile_no || '',
    whatsapp: sessionData.billingUser?.whatsapp || '',
    email: sessionData.billingUser?.email || '',
    address: sessionData.billingUser?.address || '',
    dob: sessionData.billingUser?.dob || '',
    gender: sessionData.billingUser?.gender || '',
    event_id: sessionData.eventId || ''
  })

  const [errors, setErrors] = useState({})
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    updateSection("billingUser", { [name]: value })
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  useEffect(() => {
    if (sameAsMobile) {
      setFormData((prev) => ({
        ...prev,
        whatsapp: prev.mobile_no,
      }));
      updateSection("billingUser", { whatsapp: formData.mobile_no });
    }
  }, [sameAsMobile, formData.mobile_no]);

  // Validation functions
  const validateForm = () => {
    const newErrors = {}
    const mobileRegex = /^[6-9]\d{9}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'

    if (!formData.mobile_no.trim()) newErrors.mobile_no = 'Mobile number is required'
    else if (!mobileRegex.test(formData.mobile_no)) newErrors.mobile_no = 'Enter valid 10-digit mobile number'

    if (formData.whatsapp && !mobileRegex.test(formData.whatsapp))
      newErrors.whatsapp = 'Enter valid 10-digit WhatsApp number'

    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email address'

    if (!formData.address.trim()) newErrors.address = 'Address is required'
    else if (formData.address.trim().length < 10) newErrors.address = 'Address must be at least 10 characters'

    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    else {
      const today = new Date()
      const birthDate = new Date(formData.dob)
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 13 || age > 100) newErrors.dob = 'Age must be between 13 and 100 years'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (validateForm()) {
      try {
        updateSection("billingUser", formData)
        if (onSubmit) {
          await onSubmit(formData)
        }
      } catch (error) {
        console.error('Submission error:', error)
      }
    }
    setIsSubmitting(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Billing Information</h2>
        <p className="text-blue-100">Please provide your details for billing and registration</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
            </div>

            {/* Name */}
            <InputField
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              icon={({ className }) => (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            />

            {/* DOB and Gender Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
                required
                icon={({ className }) => (
                  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              />

              {/* Gender Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((option) => (
                    <label
                      key={option}
                      className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                        formData.gender === option.toLowerCase()
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <span className="font-medium">{option}</span>
                      {formData.gender === option && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {errors.gender}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="pt-8 border-t border-gray-200 space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
            </div>

            {/* Mobile and WhatsApp Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mobile */}
              <InputField
                label="Mobile Number"
                name="mobile_no"
                type="tel"
                placeholder="9876543210"
                value={formData.mobile_no}
                onChange={handleChange}
                error={errors.mobile_no}
                required
                helperText="10-digit mobile number without +91"
              />

              {/* WhatsApp + Checkbox */}
              <div>
                <InputField
                  label="WhatsApp Number"
                  name="whatsapp"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  error={errors.whatsapp}
                  disabled={sameAsMobile} // disable if checked
                  helperText="Leave blank if same as mobile"
                />

                {/* Checkbox */}
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    id="sameAsMobile"
                    type="checkbox"
                    checked={sameAsMobile}
                    onChange={(e) => setSameAsMobile(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAsMobile" className="text-sm text-gray-700">
                    Same as Mobile Number
                  </label>
                </div>
              </div>
            </div>

            {/* Email */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              helperText="We'll send your ticket and updates to this email"
              icon={({ className }) => (
                <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              )}
            />

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 ${
                  errors.address
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-400'
                } placeholder-gray-500 resize-none`}
              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.address}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          {Object.keys(errors).length > 0 && (
            <ul className="mt-2 text-sm text-red-600 space-y-1">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field} className="flex items-center">
                  <svg className="w-4 h-4 mr-1"/>
                  {message}
                </li>
              ))}
            </ul>
          )}
          <div className="pt-8 border-t border-gray-200">
            <button
              type="submit"
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
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BillingUserForm
