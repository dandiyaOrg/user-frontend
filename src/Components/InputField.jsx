import React, { useState, forwardRef } from 'react'

const InputField = forwardRef(({ 
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  size = "md",
  variant = "outlined",
  className = "",
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Size variants
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base"
  }

  // Variant styles
  const variantClasses = {
    outlined: `bg-white border-2 ${
      error 
        ? 'border-red-300 focus:border-red-500' 
        : isFocused 
          ? 'border-blue-500' 
          : 'border-gray-300 hover:border-gray-400'
    }`,
    filled: `bg-gray-50 border-b-2 ${
      error 
        ? 'border-red-300 focus:border-red-500' 
        : isFocused 
          ? 'border-blue-500' 
          : 'border-gray-300'
    } rounded-t-lg`,
    ghost: `bg-transparent border-2 border-transparent ${
      error 
        ? 'border-red-300 focus:border-red-500' 
        : 'focus:border-blue-500'
    } hover:bg-gray-50`
  }

  const handleFocus = (e) => {
    setIsFocused(true)
    if (props.onFocus) props.onFocus(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) onBlur(e)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={name}
          className={`block text-sm font-semibold mb-2 transition-colors duration-200 ${
            error ? 'text-red-700' : 'text-gray-700'
          }`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
            w-full rounded-xl transition-all duration-200 
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${Icon && iconPosition === 'left' ? 'pl-11' : ''}
            ${(Icon && iconPosition === 'right') || type === 'password' ? 'pr-11' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
            ${error ? 'text-red-900' : 'text-gray-900'}
            focus:outline-none focus:ring-4 ${
              error ? 'focus:ring-red-100' : 'focus:ring-blue-100'
            }
            placeholder-gray-500
            ${isFocused ? 'transform scale-[1.02]' : ''}
          `}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {((Icon && iconPosition === 'right') || type === 'password') && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {type === 'password' ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            ) : (
              Icon && <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
            )}
          </div>
        )}

        {/* Focus Ring Effect */}
        {isFocused && (
          <div className={`absolute inset-0 rounded-xl pointer-events-none ${
            error ? 'ring-2 ring-red-200' : 'ring-2 ring-blue-200'
          }`} />
        )}
      </div>

      {/* Helper Text or Error Message */}
      {(error || helperText) && (
        <div className="mt-2 flex items-start space-x-2">
          {error && (
            <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        </div>
      )}
    </div>
  )
})

InputField.displayName = 'InputField'

export default InputField
