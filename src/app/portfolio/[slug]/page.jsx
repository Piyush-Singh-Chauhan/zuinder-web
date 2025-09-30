"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PortfolioDetail() {
  const { t, language } = useLanguage();
  const params = useParams();
  const slug = params.slug;
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/admin/portfolio/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setPortfolio(result.data);
          } else {
            setError('Invalid API response');
          }
        } else if (response.status === 404) {
          setError('Portfolio item not found');
        } else {
          setError('Failed to fetch portfolio');
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setError('Error loading portfolio');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPortfolio();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header Loading Skeleton */}
        <section className="relative z-10 overflow-hidden bg-white pb-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="-mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-0">
              <div className="w-full px-4 md:w-8/12 lg:w-7/12">
                <div className="mb-8 max-w-[570px] md:mb-0">
                  <div className="mb-4 h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
              <div className="w-full px-4 md:w-4/12 lg:w-5/12">
                <div className="text-start md:text-end">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Loading Skeleton */}
        <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[120px] px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8 aspect-video bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            href="/portfolio"
            className="inline-block px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Portfolio Not Found</h1>
          <Link
            href="/portfolio"
            className="inline-block px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const portfolioTitle = portfolio.title?.[currentLanguage] || portfolio.title?.en || portfolio.title || 'Untitled';
  const portfolioDescription = portfolio.description?.[currentLanguage] || portfolio.description?.en || portfolio.description || '';
  const portfolioCategory = portfolio.category?.[currentLanguage] || portfolio.category?.en || portfolio.category || '';
  const portfolioImage = portfolio.image || '/assets/img/portfolio/portfolio-01.jpg';

  return (
    <>
      {/* Header Section */}
      <section className="relative z-10 overflow-hidden bg-white pb-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="-mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-0">
            {/* Left — Title & Intro */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0">
                <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004A70] leading-snug">
                  {portfolioTitle}
                </h1>
                {portfolioCategory && (
                  <p className="text-sm sm:text-base md:text-lg font-medium text-[#F15A29] mb-2">
                    {portfolioCategory}
                  </p>
                )}
                {portfolioDescription && (
                  <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                    {portfolioDescription}
                  </p>
                )}
              </div>
            </div>

            {/* Right — Breadcrumb */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-start md:text-end">
                <ul className="flex flex-wrap items-center md:justify-end text-sm sm:text-base">
                  <li className="flex items-center">
                    <Link
                      href="/"
                      className="pr-1 font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
                    >
                      {t("common.home")}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
                  </li>
                  <li className="flex items-center">
                    <Link
                      href="/portfolio"
                      className="pr-1 font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
                    >
                      {t("portfolio.breadcrumb")}
                    </Link>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
                  </li>
                  <li className="font-medium text-[#F15A29]">
                    {portfolioTitle}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background Left */}
        <span className="absolute bottom-0 left-0 z-[-1]">
          <svg
            width="730"
            height="206"
            viewBox="0 0 730 206"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.08"
              width="136.991"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 -201.278 330.677)"
              fill="url(#paint0_linear_0:1)"
            />
            <rect
              opacity="0.05"
              width="345.355"
              height="563.705"
              transform="matrix(0.632736 0.774368 0.774368 -0.632736 74 330.677)"
              fill="url(#paint1_linear_0:1)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0:1"
                x1="68.4956"
                y1="0"
                x2="68.4956"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_0:1"
                x1="172.678"
                y1="0"
                x2="172.678"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>

        {/* Decorative Background Right */}
        <span className="absolute right-0 top-0 z-[-1]">
          <svg
            width="405"
            height="206"
            viewBox="0 0 405 206"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.08"
              width="289.718"
              height="563.705"
              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 603.461 -125.138)"
              fill="url(#paint0_linear_54:595)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_54:595"
                x1="144.859"
                y1="0"
                x2="144.859"
                y2="563.705"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e46703"></stop>
                <stop offset="1" stopColor="#c7340d" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </span>
      </section>

      {/* Portfolio Content Section */}
      <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Featured Image */}
            <div className="relative aspect-video">
              <Image
                src={portfolioImage}
                alt={portfolioTitle}
                fill
                className="object-cover"
              />
            </div>

            {/* Portfolio Content */}
            <div className="p-8 lg:p-12">
              {/* Project Information */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolio.client && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Client
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {portfolio.client}
                    </p>
                  </div>
                )}

                {portfolioCategory && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Category
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {portfolioCategory}
                    </p>
                  </div>
                )}

                {portfolio.technologies && portfolio.technologies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {portfolio.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#004A70]/10 text-[#004A70] rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {portfolio.projectDate && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Project Date
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {new Date(portfolio.projectDate).toLocaleDateString(currentLanguage === 'pt' ? 'pt-BR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Project Description */}
              {portfolioDescription && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Project Overview
                  </h3>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {portfolioDescription}
                    </p>
                  </div>
                </div>
              )}

              {/* Project URL */}
              {portfolio.projectUrl && (
                <div className="mb-8">
                  <a
                    href={portfolio.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#F15A29] text-white rounded-lg hover:bg-[#004A70] transition-colors font-medium"
                  >
                    View Live Project
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3C6 2.44772 6.44772 2 7 2H13C13.5523 2 14 2.44772 14 3V9C14 9.55228 13.5523 10 13 10C12.4477 10 12 9.55228 12 9V5.41421L4.70711 12.7071C4.31658 13.0976 3.68342 13.0976 3.29289 12.7071C2.90237 12.3166 2.90237 11.6834 3.29289 11.2929L10.5858 4H7C6.44772 4 6 3.55228 6 3Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {/* Back to Portfolio Button */}
              <div className="pt-8 border-t border-gray-200">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#004A70] text-white rounded-lg hover:bg-[#F15A29] transition-colors font-medium"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                      fill="currentColor"
                    />
                  </svg>
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}