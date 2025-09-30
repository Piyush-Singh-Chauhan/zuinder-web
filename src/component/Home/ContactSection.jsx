"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Capitalize First Letter for Name
  const capitalizeName = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "name") {
      processedValue = capitalizeName(value.replace(/[^\p{L}\s'.-]/gu, ""));
    } else if (name === "phone") {
      processedValue = value.replace(/(?!^\+)[^0-9]/g, "");
    } else if (name === "company") {
      processedValue = value.slice(0, 50);
    } else if (name === "message") {
      processedValue = value.slice(0, 500);
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));

    const error = validateField(name, processedValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = t("contactSection.validation.nameRequired");
      else if (value.trim().length < 2) error = t("contactSection.validation.nameMin");
      else if (value.trim().length > 50) error = t("contactSection.validation.nameMax");
      else if (!/^[\p{L}][\p{L}\s'.-]*$/u.test(value.trim()))
        error = t("contactSection.validation.nameFormat");
    }
    if (name === "company") {
      if (value.length > 50) error = t("contactSection.validation.companyMax");
    }
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) error = t("contactSection.validation.emailRequired");
      else if (!emailRegex.test(value)) error = t("contactSection.validation.emailInvalid");
    }
    if (name === "phone") {
      const raw = value.trim();
      if (!raw) error = t("contactSection.validation.phoneRequired");
      else {
        try {
          let phoneNumber;
          if (raw.startsWith("+")) phoneNumber = parsePhoneNumberFromString(raw);
          else phoneNumber = parsePhoneNumberFromString(raw, "IN");
          if (!phoneNumber || !phoneNumber.isValid()) error = t("contactSection.validation.phoneInvalid");
          else {
            const digitsOnly = phoneNumber.number.replace(/\D/g, "");
            if (digitsOnly.startsWith("0")) error = t("contactSection.validation.phoneNoLeadingZero");
            else if (digitsOnly.length < 6 || digitsOnly.length > 15) error = t("contactSection.validation.phoneLength");
          }
        } catch {
          error = t("contactSection.validation.phoneInvalid");
        }
      }
    }
    if (name === "message") {
      if (!value.trim()) error = t("contactSection.validation.messageRequired");
      else if (value.length < 10) error = t("contactSection.validation.messageMin");
      else if (value.length > 500) error = t("contactSection.validation.messageMax");
    }
    return error;
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (field === "website") return;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.website) return;
    if (!validateForm()) return;

    setLoading(true);
    try {
      let normalizedPhone = formData.phone;
      try {
        let phoneNumber;
        if (formData.phone.startsWith("+")) phoneNumber = parsePhoneNumberFromString(formData.phone);
        else phoneNumber = parsePhoneNumberFromString(formData.phone, "IN");
        if (phoneNumber && phoneNumber.isValid()) {
          normalizedPhone = phoneNumber.number;
        }
      } catch {}
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: normalizedPhone,
          website: undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Swal.fire(
          ` ${t("contactSection.alerts.successTitle")}`,
          data.message || t("contactSection.alerts.successDefault"),
          "success"
        );
        setFormData({ name: "", company: "", email: "", phone: "", message: "", website: "" });
        setErrors({});
      } else {
        Swal.fire("❌ " + t("contactSection.alerts.errorTitle"), data.message || t("contactSection.alerts.errorDefault"), "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("❌ " + t("contactSection.alerts.errorTitle"), t("contactSection.alerts.serverError"), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8  px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm sm:text-base md:text-lg uppercase font-semibold text-[#d0440a] tracking-wider">
          {t("contactSection.badge")}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-2 leading-tight">
          {t("contactSection.title")}
        </h2>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          {t("contactSection.desc")}
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Honeypot */}
          <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" autoComplete="off" tabIndex="-1" />

          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder={t("contactSection.placeholder.name")}
              value={formData.name}
              onChange={handleChange}
              onBlur={() => setErrors(prev => ({ ...prev, name: validateField("name", formData.name) }))}
              maxLength={50}
              className={`w-full px-4 py-3 sm:py-4 bg-gray-50 border-0 border-b-2 transition-colors text-sm sm:text-base ${
                errors.name 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 focus:outline-none focus:border-[#df5f04]"
              }`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Company */}
          <div>
            <input
              type="text"
              name="company"
              placeholder={t("contactSection.placeholder.company")}
              value={formData.company}
              onChange={handleChange}
              onBlur={() => setErrors(prev => ({ ...prev, company: validateField("company", formData.company) }))}
              maxLength={50}
              className={`w-full px-4 py-3 sm:py-4 bg-gray-50 border-0 border-b-2 transition-colors text-sm sm:text-base ${
                errors.company 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 focus:outline-none focus:border-[#df5f04]"
              }`}
            />
            {errors.company && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.company}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder={t("contactSection.placeholder.email")}
              value={formData.email}
              onChange={handleChange}
              onBlur={() => setErrors(prev => ({ ...prev, email: validateField("email", formData.email) }))}
              maxLength={50}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              className={`w-full px-4 py-3 sm:py-4 bg-gray-50 border-0 border-b-2 transition-colors text-sm sm:text-base ${
                errors.email 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 focus:outline-none focus:border-[#df5f04]"
              }`}
              required
            />
            {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              name="phone"
              placeholder={t("contactSection.placeholder.phone")}
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => setErrors(prev => ({ ...prev, phone: validateField("phone", formData.phone) }))}
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              minLength={6}
              className={`w-full px-4 py-3 sm:py-4 bg-gray-50 border-0 border-b-2 transition-colors text-sm sm:text-base ${
                errors.phone 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 focus:outline-none focus:border-[#df5f04]"
              }`}
              required
            />
            {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder={t("contactSection.placeholder.message")}
              rows="5"
              value={formData.message}
              onChange={handleChange}
              onBlur={() => setErrors(prev => ({ ...prev, message: validateField("message", formData.message) }))}
              maxLength={500}
              className={`w-full px-4 py-3 sm:py-4 bg-gray-50 border-0 border-b-2 transition-colors text-sm sm:text-base ${
                errors.message 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 focus:outline-none focus:border-[#df5f04]"
              }`}
              required
            ></textarea>
            {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
            <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-white text-sm sm:text-base
                         [background:linear-gradient(98deg,#e46703_-1.68%,#c7340d_103.45%)] 
                         hover:[background:linear-gradient(98deg,#c7340d_-1.68%,#e46703_103.45%)] 
                         transition duration-300 disabled:opacity-50"
            >
              {loading ? t("contactSection.button.sending") : t("contactSection.button.send")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}