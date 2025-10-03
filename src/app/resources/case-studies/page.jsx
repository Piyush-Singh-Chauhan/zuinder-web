"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function CaseStudies() {
  const { t, language } = useLanguage();

  // Case study data with detailed content
  const caseStudies = [
    {
      id: 1,
      title: {
        en: "E-commerce Platform Transformation for Global Retailer",
        pt: "Transformação da Plataforma de E-commerce para Varejista Global"
      },
      description: {
        en: "Complete overhaul of a legacy e-commerce platform for a multinational retail corporation, resulting in a 72% increase in conversion rates and 45% improvement in site performance.",
        pt: "Reformulação completa de uma plataforma de e-commerce legada para uma corporação de varejo multinacional, resultando em aumento de 72% nas taxas de conversão e melhoria de 45% no desempenho do site."
      },
      industry: {
        en: "Retail & E-commerce",
        pt: "Varejo & E-commerce"
      },
      challenge: {
        en: "The client's outdated e-commerce platform was struggling with slow load times, poor mobile experience, and declining conversion rates. They needed a modern solution that could handle high traffic volumes while providing an exceptional user experience.",
        pt: "A plataforma de e-commerce desatualizada do cliente estava enfrentando tempos de carregamento lentos, experiência móvel ruim e taxas de conversão em declínio. Eles precisavam de uma solução moderna que pudesse lidar com altos volumes de tráfego enquanto proporcionava uma experiência de usuário excepcional."
      },
      solution: {
        en: "We developed a custom headless e-commerce solution using Next.js and React, integrated with a robust backend system. The new platform featured a responsive design, personalized product recommendations, and streamlined checkout process.",
        pt: "Desenvolvemos uma solução de e-commerce headless personalizada usando Next.js e React, integrada com um sistema backend robusto. A nova plataforma apresentava design responsivo, recomendações personalizadas de produtos e processo de checkout simplificado."
      },
      results: {
        en: "72% increase in conversion rate, 45% improvement in page load speed, 35% reduction in bounce rate, 200% growth in mobile transactions",
        pt: "Aumento de 72% na taxa de conversão, melhoria de 45% na velocidade de carregamento da página, redução de 35% na taxa de rejeição, crescimento de 200% nas transações móveis"
      },
      testimonial: {
        en: "Zuinder's expertise transformed our online business. The new platform not only looks amazing but has significantly boosted our revenue and customer satisfaction.",
        pt: "A expertise da Zuinder transformou nosso negócio online. A nova plataforma não apenas parece incrível, mas aumentou significativamente nossa receita e satisfação do cliente."
      },
      client: {
        en: "Global Fashion Retailer",
        pt: "Varejista de Moda Global"
      }
    },
    {
      id: 2,
      title: {
        en: "Mobile Banking Revolution for Regional Financial Institution",
        pt: "Revolução do Banco Móvel para Instituição Financeira Regional"
      },
      description: {
        en: "Development of a secure, feature-rich mobile banking application for a regional bank, achieving over 2 million downloads and a 4.9-star rating within the first year of launch.",
        pt: "Desenvolvimento de um aplicativo de banco móvel seguro e rico em recursos para um banco regional, alcançando mais de 2 milhões de downloads e classificação de 4,9 estrelas no primeiro ano de lançamento."
      },
      industry: {
        en: "Financial Services",
        pt: "Serviços Financeiros"
      },
      challenge: {
        en: "The regional bank needed to modernize its digital offerings to compete with larger financial institutions. They required a mobile app that would provide comprehensive banking services while maintaining the highest security standards.",
        pt: "O banco regional precisava modernizar suas ofertas digitais para competir com instituições financeiras maiores. Eles precisavam de um aplicativo móvel que fornecesse serviços bancários abrangentes mantendo os mais altos padrões de segurança."
      },
      solution: {
        en: "We created a native mobile banking application for iOS and Android with biometric authentication, real-time notifications, budgeting tools, and investment tracking. The app featured end-to-end encryption and compliance with all financial regulations.",
        pt: "Criamos um aplicativo de banco móvel nativo para iOS e Android com autenticação biométrica, notificações em tempo real, ferramentas de orçamento e acompanhamento de investimentos. O aplicativo apresentava criptografia de ponta a ponta e conformidade com todas as regulamentações financeiras."
      },
      results: {
        en: "2.1M downloads in first year, 4.9/5 app store rating, 99.98% uptime, 60% reduction in branch visits",
        pt: "2,1M de downloads no primeiro ano, classificação 4,9/5 na loja de aplicativos, 99,98% de tempo de atividade, redução de 60% nas visitas à agência"
      },
      testimonial: {
        en: "The mobile app has revolutionized how our customers bank with us. Security and user experience were perfectly balanced.",
        pt: "O aplicativo revolucionou a forma como nossos clientes fazem banco conosco. Segurança e experiência do usuário foram perfeitamente equilibradas."
      },
      client: {
        en: "Regional Savings Bank",
        pt: "Banco de Poupança Regional"
      }
    },
    {
      id: 3,
      title: {
        en: "Enterprise Brand Identity for SaaS Startup",
        pt: "Identidade Visual Corporativa para Startup de SaaS"
      },
      description: {
        en: "Comprehensive brand development and digital presence strategy for a B2B SaaS startup, resulting in 300% growth in qualified leads and successful Series A funding.",
        pt: "Desenvolvimento completo da marca e estratégia de presença digital para uma startup de SaaS B2B, resultando em crescimento de 300% em leads qualificados e financiamento bem-sucedido na Série A."
      },
      industry: {
        en: "Software & Technology",
        pt: "Software & Tecnologia"
      },
      challenge: {
        en: "A new SaaS company needed to establish a strong brand identity and digital presence to attract enterprise clients and investors. They required a cohesive visual system that would differentiate them in a crowded market.",
        pt: "Uma nova empresa de SaaS precisava estabelecer uma identidade de marca forte e presença digital para atrair clientes corporativos e investidores. Eles precisavam de um sistema visual coeso que os diferenciasse em um mercado saturado."
      },
      solution: {
        en: "We developed a complete brand identity including logo design, color palette, typography, and brand guidelines. This was complemented by a responsive website, marketing materials, and a content strategy focused on thought leadership in their industry.",
        pt: "Desenvolvemos uma identidade de marca completa, incluindo design de logotipo, paleta de cores, tipografia e diretrizes da marca. Isso foi complementado por um site responsivo, materiais de marketing e uma estratégia de conteúdo focada em liderança de pensamento em sua indústria."
      },
      results: {
        en: "300% increase in qualified leads, successful Series A funding of $15M, 85% brand recognition in target market",
        pt: "Aumento de 300% em leads qualificados, financiamento bem-sucedido na Série A de $15M, 85% de reconhecimento da marca no mercado-alvo"
      },
      testimonial: {
        en: "Zuinder's branding work was instrumental in our fundraising success. They truly understood our vision and brought it to life.",
        pt: "O trabalho de branding da Zuinder foi fundamental para o sucesso do nosso financiamento. Eles realmente entenderam nossa visão e a deram vida."
      },
      client: {
        en: "Cloud Analytics Startup",
        pt: "Startup de Análise na Nuvem"
      }
    }
  ];

  // Helper function to get localized text
  const getLocalizedText = (textObj, fallback = '') => {
    if (!textObj) return fallback;
    if (typeof textObj === 'string') return textObj;
    return textObj[language] || textObj.en || textObj.pt || fallback;
  };

  return (
    <>
      {/* Header Section */}
      <section className="relative z-10 overflow-hidden bg-white pb-12 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mx-4 flex flex-col md:flex-row items-center gap-8 md:gap-0">
            {/* Left — Title & Intro */}
            <div className="w-full px-4 md:w-8/12 lg:w-7/12">
              <div className="mb-8 max-w-[570px] md:mb-0">
                <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004A70] leading-snug relative inline-block">
                  {language === 'pt' ? 'Estudos de Caso' : 'Case Studies'}
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#F15A29]"></span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                  {language === 'pt' 
                    ? 'Descubra como ajudamos empresas a superar desafios digitais e alcançar resultados excepcionais através de soluções personalizadas.' 
                    : 'Discover how we helped businesses overcome digital challenges and achieve exceptional results through customized solutions.'}
                </p>
              </div>
            </div>

            {/* Right — Breadcrumb */}
            <div className="w-full px-4 md:w-4/12 lg:w-5/12">
              <div className="text-start md:text-end">
                <ul className="flex flex-wrap items-center md:justify-end text-sm sm:text-base">
                  <li className="flex items-center">
                    <a
                      href="/"
                      className="pr-1 font-medium text-[#004A70] hover:text-[#F15A29] transition-colors"
                    >
                      {t("common.home")}
                    </a>
                    <span className="mr-3 block h-2 w-2 rotate-45 border-r-2 border-t-2 border-gray-600"></span>
                  </li>
                  <li className="font-medium text-[#F15A29]">
                    {language === 'pt' ? 'Estudos de Caso' : 'Case Studies'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Background */}
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

      {/* Case Studies Section */}
      <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[80px] px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-10 md:gap-12 grid-cols-1">
            {caseStudies.map((study) => (
              <div key={study.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[#F15A29] rounded-full">
                      {getLocalizedText(study.industry)}
                    </span>
                    <span className="text-sm font-medium text-[#004A70]">
                      {getLocalizedText(study.client)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#004A70] mb-4">
                    {getLocalizedText(study.title)}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg">
                    {getLocalizedText(study.description)}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-[#004A70] text-lg mb-3">
                        {language === 'pt' ? 'Desafio:' : 'Challenge:'}
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {getLocalizedText(study.challenge)}
                      </p>
                      
                      <h4 className="font-bold text-[#004A70] text-lg mb-3">
                        {language === 'pt' ? 'Solução:' : 'Solution:'}
                      </h4>
                      <p className="text-gray-600">
                        {getLocalizedText(study.solution)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#004A70] text-lg mb-3">
                        {language === 'pt' ? 'Resultados:' : 'Results:'}
                      </h4>
                      <p className="text-gray-600 mb-6">
                        {getLocalizedText(study.results)}
                      </p>
                      
                      <div className="bg-[#f0f7fa] p-6 rounded-lg mb-8 border-l-4 border-[#F15A29]">
                        <p className="text-gray-700 italic">
                          {getLocalizedText(study.excerpt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}