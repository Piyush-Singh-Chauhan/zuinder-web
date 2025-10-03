"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function IndustryReports() {
  const { t, language } = useLanguage();

  // Industry reports data with detailed content
  const reports = [
    {
      id: 1,
      title: {
        en: "2025 Digital Transformation Trends: Navigating the New Business Landscape",
        pt: "Tendências de Transformação Digital 2025: Navegando no Novo Cenário Empresarial"
      },
      description: {
        en: "An in-depth analysis of emerging technologies, strategic frameworks, and implementation methodologies that are reshaping industries and creating new competitive advantages for forward-thinking organizations.",
        pt: "Uma análise aprofundada das tecnologias emergentes, estruturas estratégicas e metodologias de implementação que estão remodelando indústrias e criando novas vantagens competitivas para organizações visionárias."
      },
      date: {
        en: "April 2025",
        pt: "Abril de 2025"
      },
      category: {
        en: "Technology & Innovation",
        pt: "Tecnologia & Inovação"
      },
      excerpt: {
        en: "This comprehensive report examines how artificial intelligence, edge computing, and quantum technologies are converging to create unprecedented opportunities for business transformation. We analyze adoption patterns across industries and provide actionable insights for strategic planning.",
        pt: "Este relatório abrangente examina como a inteligência artificial, a computação de borda e as tecnologias quânticas estão convergindo para criar oportunidades sem precedentes para transformação empresarial. Analisamos padrões de adoção em indústrias e fornecemos insights acionáveis para planejamento estratégico."
      },
      keyInsights: {
        en: [
          "AI integration is accelerating 3x faster than previous technology waves",
          "Edge computing investments increased by 127% year-over-year",
          "Organizations adopting quantum-ready strategies show 40% higher innovation metrics"
        ],
        pt: [
          "A integração de IA está acelerando 3x mais rápido que ondas tecnológicas anteriores",
          "Investimentos em computação de borda aumentaram 127% ano após ano",
          "Organizações adotando estratégias quânticas prontas mostram 40% mais métricas de inovação"
        ]
      },
      downloadLink: "#"
    },
    {
      id: 2,
      title: {
        en: "The Future of E-commerce: Consumer Behavior and Market Evolution 2025",
        pt: "O Futuro do E-commerce: Comportamento do Consumidor e Evolução do Mercado 2025"
      },
      description: {
        en: "A detailed examination of evolving consumer preferences, purchasing patterns, and emerging market dynamics that are defining the next generation of digital commerce experiences.",
        pt: "Um exame detalhado das preferências em evolução dos consumidores, padrões de compra e dinâmicas de mercado emergentes que estão definindo a próxima geração de experiências de comércio digital."
      },
      date: {
        en: "March 2025",
        pt: "Março de 2025"
      },
      category: {
        en: "E-commerce & Retail",
        pt: "E-commerce & Varejo"
      },
      excerpt: {
        en: "Our research reveals significant shifts in consumer behavior driven by sustainability concerns, personalization expectations, and the integration of social commerce. This report provides data-driven insights to help businesses adapt their strategies for the evolving digital marketplace.",
        pt: "Nossa pesquisa revela mudanças significativas no comportamento do consumidor impulsionadas por preocupações de sustentabilidade, expectativas de personalização e integração do comércio social. Este relatório fornece insights baseados em dados para ajudar as empresas a adaptarem suas estratégias para o mercado digital em evolução."
      },
      keyInsights: {
        en: [
          "78% of consumers now prioritize sustainable brands in purchasing decisions",
          "Social commerce transactions grew 185% compared to traditional e-commerce",
          "Voice commerce adoption increased 67% among Gen Z consumers"
        ],
        pt: [
          "78% dos consumidores agora priorizam marcas sustentáveis nas decisões de compra",
          "Transações de comércio social cresceram 185% comparadas ao e-commerce tradicional",
          "Adoção de comércio por voz aumentou 67% entre consumidores da Geração Z"
        ]
      },
      downloadLink: "#"
    },
    {
      id: 3,
      title: {
        en: "Mobile-First Design: Impact on User Engagement and Conversion Optimization",
        pt: "Design Mobile-First: Impacto no Engajamento do Usuário e Otimização de Conversão"
      },
      description: {
        en: "An extensive study examining how mobile-first approaches influence user interaction patterns, engagement metrics, and conversion rates across different digital platforms and user demographics.",
        pt: "Um estudo extenso examinando como as abordagens mobile-first influenciam padrões de interação do usuário, métricas de engajamento e taxas de conversão em diferentes plataformas digitais e demografias de usuários."
      },
      date: {
        en: "February 2025",
        pt: "Fevereiro de 2025"
      },
      category: {
        en: "UI/UX Design & User Experience",
        pt: "Design de UI/UX & Experiência do Usuário"
      },
      excerpt: {
        en: "This research provides empirical evidence of the correlation between mobile-first design principles and business outcomes. We analyzed user behavior data from 50,000+ sessions across 200+ digital products to identify best practices and common pitfalls in mobile-first implementation.",
        pt: "Esta pesquisa fornece evidências empíricas da correlação entre princípios de design mobile-first e resultados empresariais. Analisamos dados de comportamento do usuário de mais de 50.000 sessões em mais de 200 produtos digitais para identificar melhores práticas e armadilhas comuns na implementação mobile-first."
      },
      keyInsights: {
        en: [
          "Mobile-first designs show 52% higher user retention rates",
          "Page load speed improvements of 1 second increase conversions by 27%",
          "Touch-friendly navigation reduces bounce rates by 35%"
        ],
        pt: [
          "Designs mobile-first mostram 52% mais altas taxas de retenção de usuários",
          "Melhorias de 1 segundo na velocidade de carregamento da página aumentam conversões em 27%",
          "Navegação touch-friendly reduz taxas de rejeição em 35%"
        ]
      },
      downloadLink: "#"
    },
    {
      id: 4,
      title: {
        en: "Cybersecurity in the Age of Remote Work: Threats, Solutions, and Best Practices",
        pt: "Cibersegurança na Era do Trabalho Remoto: Ameaças, Soluções e Melhores Práticas"
      },
      description: {
        en: "A comprehensive analysis of evolving cybersecurity challenges, emerging threats, and proven protective strategies for organizations with distributed workforces and hybrid operational models.",
        pt: "Uma análise abrangente dos desafios de cibersegurança em evolução, ameaças emergentes e estratégias protetoras comprovadas para organizações com forças de trabalho distribuídas e modelos operacionais híbridos."
      },
      date: {
        en: "January 2025",
        pt: "Janeiro de 2025"
      },
      category: {
        en: "Security & Compliance",
        pt: "Segurança & Conformidade"
      },
      excerpt: {
        en: "Our investigation into remote work security reveals critical vulnerabilities in home networks, collaboration tools, and endpoint protection. This report offers practical recommendations for securing distributed teams while maintaining productivity and user experience.",
        pt: "Nossa investigação sobre segurança no trabalho remoto revela vulnerabilidades críticas em redes domésticas, ferramentas de colaboração e proteção de endpoints. Este relatório oferece recomendações práticas para proteger equipes distribuídas mantendo produtividade e experiência do usuário."
      },
      keyInsights: {
        en: [
          "68% of security incidents originate from unsecured home networks",
          "Zero-trust architecture adoption reduces breach impact by 73%",
          "Employee security training decreases incident rates by 55%"
        ],
        pt: [
          "68% dos incidentes de segurança originam-se de redes domésticas não seguras",
          "Adoção de arquitetura zero-trust reduz impacto de violações em 73%",
          "Treinamento de segurança para funcionários diminui taxas de incidentes em 55%"
        ]
      },
      downloadLink: "#"
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
                  {language === 'pt' ? 'Relatórios da Indústria' : 'Industry Reports'}
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#F15A29]"></span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                  {language === 'pt' 
                    ? 'Acesse nossos relatórios abrangentes sobre tendências da indústria, insights de pesquisa e análises de mercado para manter sua empresa à frente da concorrência.' 
                    : 'Access our comprehensive industry reports, research insights, and market analysis to keep your business ahead of the competition.'}
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
                    {language === 'pt' ? 'Relatórios da Indústria' : 'Industry Reports'}
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

      {/* Reports Section */}
      <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[80px] px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-10 md:gap-12 grid-cols-1">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[#F15A29] rounded-full">
                      {getLocalizedText(report.category)}
                    </span>
                    <span className="text-sm font-medium text-gray-500">
                      {getLocalizedText(report.date)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#004A70] mb-4">
                    {getLocalizedText(report.title)}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {getLocalizedText(report.description)}
                  </p>
                  
                  <div className="bg-[#f0f7fa] p-6 rounded-lg mb-8 border-l-4 border-[#F15A29]">
                    <p className="text-gray-700 italic">
                      {getLocalizedText(report.excerpt)}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-[#004A70] text-lg mb-4">
                      {language === 'pt' ? 'Principais Insights:' : 'Key Insights:'}
                    </h4>
                    <ul className="space-y-3">
                      {getLocalizedText(report.keyInsights).map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="h-6 w-6 text-[#F15A29] mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-700">{insight}</span>
                        </li>
                      ))}
                    </ul>
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