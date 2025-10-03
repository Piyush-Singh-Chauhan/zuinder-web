"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export default function FreeTemplates() {
  const { t, language } = useLanguage();

  // Free templates data with detailed content
  const templates = [
    {
      id: 1,
      title: {
        en: "Modern Business Website Template",
        pt: "Modelo de Site Empresarial Moderno"
      },
      description: {
        en: "Professional website template designed for modern businesses with responsive layout, clean design, and comprehensive sections for showcasing services, portfolio, and team members.",
        pt: "Modelo de site profissional projetado para empresas modernas com layout responsivo, design limpo e seções abrangentes para apresentar serviços, portfólio e membros da equipe."
      },
      category: {
        en: "Website",
        pt: "Site"
      },
      excerpt: {
        en: "This template features a contemporary design with smooth animations, SEO-optimized structure, and easy customization options. Perfect for agencies, consultancies, and service-based businesses looking to establish a strong online presence.",
        pt: "Este modelo apresenta um design contemporâneo com animações suaves, estrutura otimizada para SEO e opções fáceis de personalização. Perfeito para agências, consultorias e empresas de serviços que buscam estabelecer uma forte presença online."
      },
      features: {
        en: [
          "Fully responsive design for all devices",
          "SEO-optimized structure and meta tags",
          "Easy customization with Tailwind CSS",
          "Contact form with validation",
          "Blog section template included",
          "Portfolio showcase with filtering",
          "Team member profiles",
          "Testimonials section"
        ],
        pt: [
          "Design totalmente responsivo para todos os dispositivos",
          "Estrutura e meta tags otimizadas para SEO",
          "Fácil personalização com Tailwind CSS",
          "Formulário de contato com validação",
          "Seção de blog incluída",
          "Mostruário de portfólio com filtragem",
          "Perfis de membros da equipe",
          "Seção de depoimentos"
        ]
      },
      technologies: {
        en: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
        pt: ["Next.js", "React", "Tailwind CSS", "Framer Motion"]
      },
      downloadLink: "#"
    },
    {
      id: 2,
      title: {
        en: "Mobile App UI Kit",
        pt: "Kit de UI para Aplicativo Móvel"
      },
      description: {
        en: "Complete UI kit for mobile applications with customizable components, modern design elements, and comprehensive screens for both iOS and Android platforms.",
        pt: "Kit de UI completo para aplicativos móveis com componentes personalizáveis, elementos de design modernos e telas abrangentes para plataformas iOS e Android."
      },
      category: {
        en: "Mobile App",
        pt: "Aplicativo Móvel"
      },
      excerpt: {
        en: "Our mobile app UI kit includes over 100 professionally designed components, 25+ screen templates, and a consistent design system that follows both Material Design and iOS Human Interface Guidelines.",
        pt: "Nosso kit de UI para aplicativo móvel inclui mais de 100 componentes profissionalmente projetados, 25+ modelos de tela e um sistema de design consistente que segue as Diretrizes de Interface Humana do Material Design e do iOS."
      },
      features: {
        en: [
          "100+ customizable UI components",
          "25+ screen templates (login, dashboard, profile, etc.)",
          "Light and dark mode support",
          "Figma source files included",
          "Responsive design for all screen sizes",
          "Consistent design system",
          "Easy integration with React Native",
          "Comprehensive documentation"
        ],
        pt: [
          "100+ componentes de UI personalizáveis",
          "25+ modelos de tela (login, painel, perfil, etc.)",
          "Suporte a modo claro e escuro",
          "Arquivos fonte Figma incluídos",
          "Design responsivo para todos os tamanhos de tela",
          "Sistema de design consistente",
          "Fácil integração com React Native",
          "Documentação abrangente"
        ]
      },
      technologies: {
        en: ["Figma", "React Native", "Material Design", "iOS HIG"],
        pt: ["Figma", "React Native", "Material Design", "iOS HIG"]
      },
      downloadLink: "#"
    },
    {
      id: 3,
      title: {
        en: "Marketing Dashboard Template",
        pt: "Modelo de Painel de Marketing"
      },
      description: {
        en: "Analytics dashboard template with charts, graphs, and data visualization components for marketing teams to track performance metrics, campaign results, and customer insights.",
        pt: "Modelo de painel de análise com gráficos, tabelas e componentes de visualização de dados para equipes de marketing acompanharem métricas de desempenho, resultados de campanhas e insights de clientes."
      },
      category: {
        en: "Dashboard",
        pt: "Painel"
      },
      excerpt: {
        en: "This dashboard template provides a comprehensive solution for marketing analytics with real-time data visualization, customizable widgets, and intuitive user interface designed for non-technical users.",
        pt: "Este modelo de painel fornece uma solução abrangente para análises de marketing com visualização de dados em tempo real, widgets personalizáveis e interface de usuário intuitiva projetada para usuários não técnicos."
      },
      features: {
        en: [
          "Real-time data visualization with charts and graphs",
          "Customizable dashboard widgets",
          "Multi-data source integration",
          "Export functionality (PDF, CSV, Excel)",
          "User role management",
          "Responsive design for desktop and tablet",
          "Dark/light theme toggle",
          "Performance metrics tracking"
        ],
        pt: [
          "Visualização de dados em tempo real com gráficos e tabelas",
          "Widgets de painel personalizáveis",
          "Integração de múltiplas fontes de dados",
          "Funcionalidade de exportação (PDF, CSV, Excel)",
          "Gerenciamento de funções de usuário",
          "Design responsivo para desktop e tablet",
          "Alternância de tema claro/escuro",
          "Acompanhamento de métricas de desempenho"
        ]
      },
      technologies: {
        en: ["React", "Chart.js", "Tailwind CSS", "Redux"],
        pt: ["React", "Chart.js", "Tailwind CSS", "Redux"]
      },
      downloadLink: "#"
    },
    {
      id: 4,
      title: {
        en: "E-commerce Product Page Template",
        pt: "Modelo de Página de Produto E-commerce"
      },
      description: {
        en: "E-commerce product page template with image gallery, customer reviews, variant selection, and seamless checkout integration for online stores and marketplaces.",
        pt: "Modelo de página de produto e-commerce com galeria de imagens, avaliações de clientes, seleção de variantes e integração de checkout perfeita para lojas online e marketplaces."
      },
      category: {
        en: "E-commerce",
        pt: "Comércio Eletrônico"
      },
      excerpt: {
        en: "Optimized for conversion with strategic placement of call-to-action buttons, detailed product information sections, and social proof elements. Includes responsive design and accessibility features.",
        pt: "Otimizado para conversão com posicionamento estratégico de botões de chamada para ação, seções detalhadas de informações do produto e elementos de prova social. Inclui design responsivo e recursos de acessibilidade."
      },
      features: {
        en: [
          "Interactive image gallery with zoom functionality",
          "Customer reviews and rating system",
          "Product variant selection (size, color, etc.)",
          "Wishlist and compare functionality",
          "Related products section",
          "SEO-optimized product descriptions",
          "Mobile-first responsive design",
          "Accessibility compliant (WCAG 2.1)"
        ],
        pt: [
          "Galeria de imagens interativa com funcionalidade de zoom",
          "Sistema de avaliações e classificações de clientes",
          "Seleção de variantes do produto (tamanho, cor, etc.)",
          "Funcionalidade de lista de desejos e comparação",
          "Seção de produtos relacionados",
          "Descrições de produtos otimizadas para SEO",
          "Design responsivo mobile-first",
          "Compatível com acessibilidade (WCAG 2.1)"
        ]
      },
      technologies: {
        en: ["Next.js", "React", "Tailwind CSS", "Swiper.js"],
        pt: ["Next.js", "React", "Tailwind CSS", "Swiper.js"]
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
                  {language === 'pt' ? 'Templates Gratuitos' : 'Free Templates'}
                  <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#F15A29]"></span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed text-gray-600">
                  {language === 'pt' 
                    ? 'Acesse nossa coleção de templates gratuitos cuidadosamente criados para acelerar seu processo de design e desenvolvimento.' 
                    : 'Access our collection of carefully crafted free templates to accelerate your design and development process.'}
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
                    {language === 'pt' ? 'Templates Gratuitos' : 'Free Templates'}
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

      {/* Templates Section */}
      <section className="bg-[#f8f9ff] py-14 sm:py-20 lg:pt-[80px] px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid gap-10 md:gap-12 grid-cols-1">
            {templates.map((template) => (
              <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between mb-6">
                    <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[#F15A29] rounded-full">
                      {getLocalizedText(template.category)}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#004A70] mb-4">
                    {getLocalizedText(template.title)}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {getLocalizedText(template.description)}
                  </p>
                  
                  <div className="bg-[#f0f7fa] p-6 rounded-lg mb-8 border-l-4 border-[#F15A29]">
                    <p className="text-gray-700 italic">
                      {getLocalizedText(template.excerpt)}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="font-bold text-[#004A70] text-lg mb-4">
                        {language === 'pt' ? 'Recursos:' : 'Features:'}
                      </h4>
                      <ul className="space-y-3">
                        {getLocalizedText(template.features).map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-6 w-6 text-[#F15A29] mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#004A70] text-lg mb-4">
                        {language === 'pt' ? 'Tecnologias:' : 'Technologies:'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getLocalizedText(template.technologies).map((tech, index) => (
                          <span key={index} className="inline-block px-3 py-1 text-sm font-medium text-[#F15A29] bg-[#f0f7fa] rounded-full border border-[#F15A29]">
                            {tech}
                          </span>
                        ))}
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