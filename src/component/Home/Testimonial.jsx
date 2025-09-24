"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function TestimonialSection() {
  const { t } = useLanguage();
  return (
    <section id="testimonial" className="bg-white py-10 ">
      <div className="container mx-auto px-8">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[600px] text-center">
              <span className="mb-2 block text-lg font-semibold text-[#F15A29]">
                {t("testimonial.badge")}
              </span>
              <h2 className="mb-4 text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-[45px]">
                {t("testimonial.title")}
              </h2>
              <p className="text-base sm:text-lg font-medium text-body-color">
                {t("testimonial.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {t("testimonial.items", { returnObjects: true }).map((testimonial, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl bg-white p-7 sm:p-10 shadow-lg">
              <div className="mb-5">
                <Image
                  src={`/assets/img/clients/${testimonial.company.toLowerCase()}.svg`}
                  alt={testimonial.company}
                  width={154}
                  height={25}
                />
              </div>
              <p className="mb-8 text-base sm:text-lg font-medium text-body-color">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="mr-3 h-[60px] w-[60px] overflow-hidden rounded-full">
                  <Image
                    src={`/assets/img/testimonial/image-${index + 1}.webp`}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-black">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-body-color">{testimonial.position}</p>
                </div>
              </div>
              <div className="absolute bottom-6 flex right-2 opacity-10">
                <svg
                  width="51"
                  height="29"
                  viewBox="0 0 51 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4 0C7.1 -0.08 2.3 3.33 1.2 7.96C0.56 10.8 1.13 13.65 2.84 15.93C4.63 18.36 7.39 19.9 10.48 20.31L13.32 27.3C13.64 28.03 14.38 28.52 15.19 28.52C16 28.52 16.73 28.03 17.06 27.3C18.11 24.78 19.49 21.45 20.55 18.2C21.69 14.79 21.2 11.1 19.25 8.42C17.3 5.74 14.2 4.28 10.48 4.2Z"
                    fill="#4A6CF7"
                  />
                </svg>
                <svg
                  width="51"
                  height="29"
                  viewBox="0 0 51 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4 0C7.1 -0.08 2.3 3.33 1.2 7.96C0.56 10.8 1.13 13.65 2.84 15.93C4.63 18.36 7.39 19.9 10.48 20.31L13.32 27.3C13.64 28.03 14.38 28.52 15.19 28.52C16 28.52 16.73 28.03 17.06 27.3C18.11 24.78 19.49 21.45 20.55 18.2C21.69 14.79 21.2 11.1 19.25 8.42C17.3 5.74 14.2 4.28 10.48 4.2Z"
                    fill="#4A6CF7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
