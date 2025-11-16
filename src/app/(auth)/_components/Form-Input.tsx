'use client'
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

// Type definitions
interface FormData {
  registrationNumber: string
  password: string
}

interface FormErrors {
  registrationNumber?: string
  password?: string
}

interface TouchedFields {
  registrationNumber: boolean
  password: boolean
}
interface Form_input_Props {
  label: string,
  input_placeholder: string
}
const Form_input = ({label,input_placeholder} : Form_input_Props) => {
  const [formData, setFormData] = useState<FormData>({
      registrationNumber: "",
      password: ""
    })
    
    const [errors, setErrors] = useState<FormErrors>({})
    const [touched, setTouched] = useState<TouchedFields>({
      registrationNumber: false,
      password: false
    })
    
    const [showPassword, setShowPassword] = useState(false)
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      
      // Clear error when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: ""
        }))
      }
    }
  
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      const { name } = e.target
      setTouched(prev => ({
          ...prev,
              [name]: true
            }))
            validateField(name as keyof FormData, formData[name as keyof FormData])
          }
        
          const validateField = (name: keyof FormData, value: string): void => {
            let error = ""
            
            switch (name) {
              case "registrationNumber":
                if (!value.trim()) {
                  error = "Registration number is required"
                } else if (value.trim().length < 3) {
                  error = "Registration number must be at least 3 characters"
                }
                break
              case "password":
                if (!value) {
                  error = "Password is required"
                } else if (value.length < 6) {
                  error = "Password must be at least 6 characters"
                }
                break
              default:
                break
            }
            
            setErrors(prev => ({
              ...prev,
              [name]: error
            }))
          }
        
          const validateForm = (): boolean => {
            const newErrors: FormErrors = {}
            
            if (!formData.registrationNumber.trim()) {
              newErrors.registrationNumber = "Registration number is required"
            } else if (formData.registrationNumber.trim().length < 3) {
              newErrors.registrationNumber = "Registration number must be at least 3 characters"
            }
            
            if (!formData.password) {
              newErrors.password = "Password is required"
            } else if (formData.password.length < 6) {
              newErrors.password = "Password must be at least 6 characters"
            }
            
            setErrors(newErrors)
            return Object.keys(newErrors).length === 0
          }
        
          const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
            e.preventDefault()
            
            // Mark all fields as touched
            setTouched({
              registrationNumber: true,
              password: true
            })
            
            if (validateForm()) {
              // Form is valid, proceed with login
              console.log("Form submitted:", formData)
              // Add your login logic here
            }
          }
        
          const hasErrors = (): boolean => {
             return Object.values(errors).some(error => error !== undefined && error !== "")
  }
  return (
     <section className="flex flex-1 flex-col max-[1400px]:items-center max-sm:gap-10 sm:max-[1400px]:gap-[43px] min-[1400px]:gap-1 px-4 max-sm:pt-[60px] sm:pt-6">
            {/* school logo */}
            <div className="flex items-center">
              <picture>
                <source media="(min-width: 641px)" srcSet="/assets/images/auth/desktop-school-logo.png" />
                <Image
                  className="sm:max-[1400px]:w-[152px] sm:max-[1400px]:h-[152px] min-[1400px]:w-[250px] min-[1400px]:h-[250px]"
                  src={"/assets/images/auth/school-logo.png"}
                  alt="School Logo"
                  width={56}
                  height={56}
                />
              </picture>
            </div>
            
            {/* main content */}
            <div className="w-full">
              <header className="mb-10 md:max-lg:text-center">
                {/* Login Header */}
                <h3 className="font-sans font-semibold max-sm:mb-2 max-sm:text-[24px] sm:max-[1400px]:text-[36px] min-[1400px]:text-[42px] max-sm:leading-8 sm:mb-3 sm:leading-[38px]">
                  Welcome Back
                </h3>
                <p className="font-sans leading-6 font-normal text-[#2D2D2DB2] max-sm:text-[14px] sm:text-[16px]">
                  Sign in your account to continue
                </p>
              </header>
              
              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                {/* Registration Number Field */}
                <div className="mb-6 lg:w-[488px]">
                  <div className="flex justify-between items-start">
                    <label
                      className="font-sans block text-[16px] leading-5 font-medium"
                      htmlFor="registration-number"
                    >
                      {label}
                      <span className="text-[#DA3743] ml-1">*</span>
                    </label>
                    {errors.registrationNumber && touched.registrationNumber && (
                      <span className="text-[12px] text-[#DA3743] font-medium max-w-[200px] text-right">
                        {errors.registrationNumber}
                      </span>
                    )}
                  </div>
                  <input
                    className={`mt-2 w-full min-[1400px]:max-w-[488px] rounded-xl border px-4 py-3.5 font-sans text-[14px] leading-5 font-normal text-[#535353] ${
                      errors.registrationNumber && touched.registrationNumber
                        ? 'border-[#DA3743] bg-[#FFF5F5]'
                        : 'border-[#2D2D2D4D] hover:border-[#2D2D2D]'
                    } focus:outline-none focus:ring-2 focus:ring-[#DA3743] focus:border-transparent transition-colors`}
                    type="text"
                    name="registrationNumber"
                    id="registration-number"
                    placeholder={input_placeholder}
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
    
                {/* Password Field */}
                <div className="mb-4 lg:w-[488px]">
                  <div className="flex justify-between items-start">
                    <label
                      className="block font-sans text-[16px] leading-5 font-medium"
                      htmlFor="password"
                    >
                      Password
                      <span className="text-[#DA3743] ml-1">*</span>
                    </label>
                    {errors.password && touched.password && (
                      <span className="text-[12px] text-[#DA3743] font-medium max-w-[200px] text-right">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="relative mt-2 lg:w-[488px]">
                    <input
                      className={`w-full min-[1400px]:max-w-[488px] rounded-xl border px-4 py-3.5 pr-12 font-sans text-[14px] leading-5 font-normal text-[#535353] ${
                        errors.password && touched.password
                          ? 'border-[#DA3743] bg-[#FFF5F5]'
                          : 'border-[#2D2D2D4D] hover:border-[#2D2D2D]'
                      } focus:outline-none focus:ring-2 focus:ring-[#DA3743] focus:border-transparent transition-colors`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="********"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D2D2D80] hover:text-[#2D2D2D] transition-colors"
                    >
                      {showPassword ? (
                        <Image 
                          src={'/assets/images/auth/show-password-icon.png'} 
                          alt="Hide password" 
                          width={16} 
                          height={16} 
                        />
                      ) : (
                        <Image 
                          src={'/assets/images/auth/hide-password-icon.png'} 
                          alt="Show password" 
                          width={16} 
                          height={16} 
                        />
                      )}
                    </button>
                  </div>
                  <p className="mt-2 text-right font-sans text-[14px] leading-5 font-normal text-[#DA3743] cursor-pointer hover:text-[#c53030] transition-colors">
                    Forgot Password?
                  </p>
                </div>
    
                <button 
                  type="submit"
                  className="mt-4 flex w-full lg:max-w-[488px] items-center justify-center gap-2 rounded-xl bg-[#DA3743] px-8 py-4 text-white font-medium hover:bg-[#c53030] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={hasErrors()}
                >
                  <Image
                    src={"/assets/images/auth/user-icon.png"}
                    alt="user icon"
                    width={16}
                    height={16}
                  />
                  Login &rarr;
                </button>
              </form>
            </div>
          </section>
  )
}

export default Form_input