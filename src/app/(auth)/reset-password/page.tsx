"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

interface TouchedFields {
  newPassword: boolean;
  confirmPassword: boolean;
}

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const PasswordReset = () => {
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    newPassword: false,
    confirmPassword: false,
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ----------------------------- VALIDATION ----------------------------- */
  const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password.length > 20) return "Password must not exceed 20 characters";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Password must contain a number";
    if (!/(?=.*[#?!@$%^&*-])/.test(password))
      return "Password must contain special character";
    return undefined;
  };

  const validateConfirmPassword = (
    confirmPassword: string,
    newPassword: string
  ): string | undefined => {
    if (!confirmPassword) return "Please confirm your password";
    if (confirmPassword !== newPassword) return "Passwords do not match";
    return undefined;
  };

  /* ----------------------------- HANDLERS ----------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof TouchedFields]) {
      const newErrors: FormErrors = { ...errors };

      if (name === "newPassword") {
        newErrors.newPassword = validatePassword(value);

        if (touched.confirmPassword) {
          newErrors.confirmPassword = validateConfirmPassword(
            formData.confirmPassword,
            value
          );
        }
      }

      if (name === "confirmPassword") {
        newErrors.confirmPassword = validateConfirmPassword(
          value,
          formData.newPassword
        );
      }

      setErrors(newErrors);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const newErrors: FormErrors = { ...errors };

    if (name === "newPassword") {
      newErrors.newPassword = validatePassword(formData.newPassword);
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword = validateConfirmPassword(
        formData.confirmPassword,
        formData.newPassword
      );
    }

    setErrors(newErrors);
  };

  const hasErrors = () => {
    return (
      !formData.newPassword ||
      !formData.confirmPassword ||
      !!errors.newPassword ||
      !!errors.confirmPassword
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPasswordError = validatePassword(formData.newPassword);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.newPassword
    );

    if (newPasswordError || confirmPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({ newPassword: true, confirmPassword: true });
      return;
    }

    console.log("Password reset submitted:", formData);
  };

  /* ----------------------------- UI ----------------------------- */
  return (
    <section className="flex min-h-screen w-full bg-white overflow-x-hidden">
      {/* Left side image (Desktop only) */}
      <div className="hidden lg:block lg:w-1/2 relative shrink-0">
        <Image
          src="/assets/images/auth/sign-up-image.png"
          alt="Sign Up Illustration"
          fill
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-start pt-[132px] px-4 sm:px-8 lg:px-12 xl:px-20">
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="School Logo"
            width={120}
            height={120}
            className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]"
          />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[464px]">
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#2D2D2D] mb-8 text-center">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#2D2D2D]">
                Enter New Password
              </label>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="••••••"
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none ${
                    touched.newPassword && errors.newPassword
                      ? "border-[#DA3743]"
                      : "border-[#E0E0E0] focus:border-[#2D2D2D]"
                  }`}
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={
                      showNewPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {touched.newPassword && errors.newPassword && (
                <p className="text-[#DA3743] text-xs mt-2 flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-[#DA3743] text-[#DA3743] text-[10px] font-bold flex items-center justify-center">
                    !
                  </span>
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-[#2D2D2D]">
                Confirm New Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••"
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "border-[#DA3743]"
                      : "border-[#E0E0E0] focus:border-[#2D2D2D]"
                  }`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <Image
                    src={
                      showConfirmPassword
                        ? "/assets/images/auth/show-password-icon.png"
                        : "/assets/images/auth/hide-password-icon.png"
                    }
                    alt="Toggle Password Visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>

              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[#DA3743] text-xs mt-2 flex items-start gap-2">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-[#DA3743] text-[#DA3743] text-[10px] font-bold flex items-center justify-center">
                    !
                  </span>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <ul className="mb-6 sm:mb-8 text-[#6B6B6B] text-xs space-y-[10px] list-disc list-inside">
              <li>6 characters (20 max)</li>
              <li>1 letter, 1 number, 1 special character (# ? ! @ $)</li>
              <li>Strong password</li>
            </ul>

            {/* Submit */}
            <button
              type="submit"
              disabled={hasErrors()}
              className={`w-full rounded-lg py-3 text-[16px] font-semibold text-white transition ${
                hasErrors()
                  ? "bg-[#F5A6AC] cursor-not-allowed"
                  : "bg-[#DA3743] hover:bg-[#C32F3A]"
              }`}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
