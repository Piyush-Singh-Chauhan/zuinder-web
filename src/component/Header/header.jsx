"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const handleSelectLang = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
    }
    setLangOpen(false);
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 left-0 z-40 w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? "fixed bg-[#004A70]/90 backdrop-blur-md shadow-lg"
          : "absolute bg-[#004A70]"
      }`}
    >
      <div className="mx-auto w-full px-4 xl:container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="w-52 max-w-full px-4 xl:w-60 transition-all duration-500 ease-in-out">
            <a
              className={`block w-full ${
                scrolled ? "py-4" : "py-6 lg:py-8"
              } transition-all duration-500`}
              href="/"
            >
              <Image
                src="/assets/img/logo/logo.jpeg"
                alt="logo"
                width={175}
                height={40}
                className="object-contain"
              />
            </a>
          </div>

          {/* Navbar & toggler */}
          <div className="flex w-full items-center justify-between px-4">
            <div>
              {/* Hamburger button */}
              <button
                aria-label="navbarToggler"
                className="absolute top-1/2 right-4 block -translate-y-1/2 rounded-lg px-3 py-1.5 lg:hidden focus:ring-2"
                onClick={() => {
                  setNavbarOpen(!navbarOpen);
                  setPagesDropdownOpen(false);
                }}
              >
                <span className="block h-[2px] w-[30px] my-1 bg-white"></span>
                <span className="block h-[2px] w-[30px] my-1 bg-white"></span>
                <span className="block h-[2px] w-[30px] my-1 bg-white"></span>
              </button>

              {/* Navbar */}
              <nav
                className={`${
                  navbarOpen ? "block" : "hidden"
                } lg:block absolute top-full right-4 w-full max-w-[250px] rounded-lg bg-[#004A70] p-5 py-5 shadow-lg max-lg:max-h-[350px] max-lg:overflow-y-auto lg:static lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none xl:px-6`}
              >
                <ul className="block font-bold lg:flex">
                  {[
                    { name: t("nav.about"), href: "/#about" },
                    { name: t("nav.services"), href: "/#services" },
                    { name: t("nav.portfolio"), href: "/#portfolio" },
                  ].map((item) => (
                    <li key={item.name} className="group relative lg:px-5">
                      <a
                        href={item.href}
                        className="flex py-2 text-base text-darkBlue lg:py-6 hover:text-orangeBrand transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}

                  {/* Pages Dropdown */}
                  <li className="group relative lg:px-5">
                    <button
                      className="flex w-full items-center justify-between py-2 text-base text-darkBlue lg:py-6 hover:text-orangeBrand transition-colors"
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setPagesDropdownOpen(!pagesDropdownOpen);
                        }
                      }}
                    >
                      {t("nav.pages")}
                      <span className="pl-3">
                        <svg
                          width="14"
                          height="8"
                          viewBox="0 0 14 8"
                          className={`fill-current duration-200 ${
                            pagesDropdownOpen ? "-scale-y-100" : ""
                          }`}
                        >
                          <path d="M6.54564 5.09128L11.6369 0L13.0913 1.45436L6.54564 8L0 1.45436L1.45436 0L6.54564 5.09128Z"></path>
                        </svg>
                      </span>
                    </button>

                    <ul
                      className={`transition-all duration-300 ${
                        pagesDropdownOpen ? "block" : "hidden"
                      } lg:group-hover:block lg:absolute lg:top-full lg:left-0 lg:w-[250px] lg:rounded-sm lg:bg-[#004A70] lg:p-4 lg:shadow-lg z-50`}
                    >
                      {[
                        { name: t("nav.home"), href: "/" },
                        { name: t("nav.servicesPage"), href: "/services" },
                        { name: t("nav.portfolioPage"), href: "/portfolio" },
                        { name: t("nav.blogPage"), href: "/blog" },
                        { name: t("nav.contactPage"), href: "/contact" },
                      ].map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={sub.href}
                            className="block rounded-sm px-4 py-2 text-md text-black hover:text-orangeBrand"
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right buttons */}
            <div className="hidden sm:flex items-center justify-end gap-4 pr-16 lg:pr-0">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md border border-darkBlue transition duration-300
                    ${
                      langOpen
                        ? "text-black bg-white"
                        : "text-darkBlue hover:bg-darkBlue hover:text-white"
                    }`}
                >
                  {language === "en" ? (
                    <>
                      <span role="img" aria-label="UK flag">🇬🇧</span>
                      English
                    </>
                  ) : (
                    <>
                      <span role="img" aria-label="Portuguese flag">🇵🇹</span>
                      Português
                    </>
                  )}
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button
                        onClick={() => handleSelectLang("en")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-black text-sm text-left hover:bg-gray-100"
                      >
                        🇬🇧 English
                      </button>
                      <button
                        onClick={() => handleSelectLang("pt")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-black text-sm text-left hover:bg-gray-100"
                      >
                        🇵🇹 Português
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <a
                href="/contact"
                className="px-8 py-3 rounded-full font-medium text-white
                             [background:linear-gradient(98deg,#e46703_-1.68%,#c7340d_103.45%)]
                             hover:[background:linear-gradient(98deg,#c7340d_-1.68%,#e46703_103.45%)]
                             transition duration-500 ease-in-out"
              >
                {t("cta.quote")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}