"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function NewsletterSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [toast, setToast] = useState({ type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ type, message });

    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast({ type: "", message: "" });
    }, 3000);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (email && !errors.email) {
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          showToast("success", t("newsletter.toast.success"));
          setEmail("");
        } else {
          showToast("error", data.error || t("newsletter.toast.errorDefault"));
        }
      } catch (error) {
        showToast("error", t("newsletter.toast.serverError"));
      }
    } else {
      showToast("error", t("newsletter.toast.invalid"));
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return t("newsletter.validation.required");
    if (value.length < 5) return t("newsletter.validation.min");
    if (value.length > 50) return t("newsletter.validation.max");
    if (!emailPattern.test(value))
      return t("newsletter.validation.invalid");
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleBlur = () => {
    setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  return (
    <>
      {/* ✅ Toast Notification */}
      {toast.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg text-white font-medium transition-all duration-500 z-50
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <section className="mt-[-110px] bg-white px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="container mx-auto">
          <div className="relative z-10 overflow-hidden rounded-md bg-[#F15A29] py-10 sm:py-14 md:py-16 text-center">
            <div className="relative z-10 mx-auto max-w-[770px] px-4 sm:px-6">
              <h2 className="mb-8 text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl lg:text-4xl">
                {t("newsletter.title")}
              </h2>

              <form
                onSubmit={handleSubscribe}
                className="relative mx-auto max-w-[500px] flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3"
              >
                <div className="flex-1 w-full">
                  <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder={t("newsletter.placeholder")}
                    maxLength={50}
                    minLength={5}
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleBlur}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className={`w-full rounded-full border px-6 py-3 text-center sm:text-left outline-none transition 
                      ${
                        errors.email
                          ? "border-red-500 bg-red-100 text-black"
                          : "border-white/20 bg-white/15 text-white placeholder-white/70"
                      }`}
                    required
                    
                  />

                  {errors.email && (
                    <p className="text-red-200 text-xs sm:text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-white px-6 py-3 text-sm md:text-base font-semibold text-primary transition hover:bg-[#004A70] hover:text-white"
                >
                  {t("newsletter.subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
