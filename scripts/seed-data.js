// scripts/seed-data.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import models
const blogSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    description: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    content: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    author: { type: String, default: "Zuinder Team" },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    description: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    category: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    image: { type: String, required: true },
    link: { type: String, required: true },
    technologies: { type: [String], default: [] },
    client: { type: String, default: "" },
    projectDate: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    description: {
      en: { type: String, required: true },
      pt: { type: String, required: true }
    },
    image: { type: String, required: true },
    features: {
      en: [{ type: String }],
      pt: [{ type: String }]
    },
    price: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

// Sample data
const sampleBlogs = [
  {
    title: {
      en: "Exploring the MERN Stack: Powering Modern Web Development",
      pt: "Explorando o MERN Stack: Impulsionando o Desenvolvimento Web Moderno"
    },
    description: {
      en: "Discover how MongoDB, Express.js, React, and Node.js work together to create powerful web applications.",
      pt: "Descubra como MongoDB, Express.js, React e Node.js trabalham juntos para criar aplicações web poderosas."
    },
    content: {
      en: `The MERN stack has revolutionized modern web development by providing a comprehensive JavaScript-based solution for building full-stack applications. Let's explore each component:

**MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents.
**Express.js**: A minimal and flexible Node.js web application framework.
**React**: A JavaScript library for building user interfaces.
**Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.

Together, these technologies enable developers to use JavaScript across the entire development stack, from frontend to backend to database operations.`,
      pt: `O stack MERN revolucionou o desenvolvimento web moderno ao fornecer uma solução abrangente baseada em JavaScript para construir aplicações full-stack. Vamos explorar cada componente:

**MongoDB**: Um banco de dados NoSQL que armazena dados em documentos flexíveis, semelhantes ao JSON.
**Express.js**: Um framework de aplicação web Node.js mínimo e flexível.
**React**: Uma biblioteca JavaScript para construir interfaces de usuário.
**Node.js**: Um runtime JavaScript construído no motor JavaScript V8 do Chrome.

Juntas, essas tecnologias permitem que os desenvolvedores usem JavaScript em toda a pilha de desenvolvimento, do frontend ao backend até as operações de banco de dados.`
    },
    slug: "exploring-the-mern-stack-powering-modern-web-development",
    image: "/assets/img/blog/blog1.webp",
    tags: ["MERN", "JavaScript", "Web Development", "React", "Node.js"],
    readTime: 8
  },
  {
    title: {
      en: "Best UI Components for Modern Websites",
      pt: "Melhores Componentes de UI para Sites Modernos"
    },
    description: {
      en: "Learn about the essential UI components that make websites both beautiful and functional.",
      pt: "Aprenda sobre os componentes essenciais de UI que tornam os sites bonitos e funcionais."
    },
    content: {
      en: `Modern web design relies heavily on well-crafted UI components that provide excellent user experience. Here are the essential components every modern website should have:

**Navigation Bars**: Clear, responsive navigation that works across all devices.
**Hero Sections**: Compelling introductory sections that capture attention.
**Cards**: Versatile containers for organizing content.
**Forms**: User-friendly forms with proper validation.
**Buttons**: Clear call-to-action elements with hover states.
**Modals**: Overlay dialogs for focused interactions.

Each component should be designed with accessibility, responsiveness, and user experience in mind.`,
      pt: `O design web moderno depende muito de componentes de UI bem elaborados que proporcionam excelente experiência do usuário. Aqui estão os componentes essenciais que todo site moderno deveria ter:

**Barras de Navegação**: Navegação clara e responsiva que funciona em todos os dispositivos.
**Seções Hero**: Seções introdutórias convincentes que capturam a atenção.
**Cards**: Contêineres versáteis para organizar conteúdo.
**Formulários**: Formulários amigáveis com validação adequada.
**Botões**: Elementos de call-to-action claros com estados de hover.
**Modais**: Diálogos de sobreposição para interações focadas.

Cada componente deve ser projetado com acessibilidade, responsividade e experiência do usuário em mente.`
    },
    slug: "best-ui-components-for-modern-websites",
    image: "/assets/img/blog/blog2.webp",
    tags: ["UI", "UX", "Design", "Components", "Web Design"],
    readTime: 6
  },
  {
    title: {
      en: "The Power of UI/UX: Elevating Digital Experiences",
      pt: "O Poder do UI/UX: Elevando Experiências Digitais"
    },
    description: {
      en: "Understanding how good UI/UX design can transform user engagement and business success.",
      pt: "Entendendo como um bom design de UI/UX pode transformar o engajamento do usuário e o sucesso do negócio."
    },
    content: {
      en: `UI/UX design is more than making things look pretty—it's about creating meaningful interactions that solve real problems. Here's why it matters:

**User Interface (UI)**: The visual elements users interact with—buttons, icons, typography, and layout.
**User Experience (UX)**: The overall feel and usability of the product.

Good UI/UX design leads to:
- Higher user satisfaction
- Increased conversion rates
- Reduced bounce rates
- Better brand perception
- Improved accessibility

The key is understanding your users' needs and designing solutions that are both beautiful and functional.`,
      pt: `O design de UI/UX é mais do que fazer as coisas parecerem bonitas—é sobre criar interações significativas que resolvem problemas reais. Aqui está por que isso importa:

**Interface do Usuário (UI)**: Os elementos visuais com os quais os usuários interagem—botões, ícones, tipografia e layout.
**Experiência do Usuário (UX)**: A sensação geral e usabilidade do produto.

Um bom design de UI/UX leva a:
- Maior satisfação do usuário
- Taxas de conversão aumentadas
- Taxas de rejeição reduzidas
- Melhor percepção da marca
- Acessibilidade melhorada

A chave é entender as necessidades dos seus usuários e projetar soluções que sejam bonitas e funcionais.`
    },
    slug: "the-power-of-uiux-elevating-digital-experiences",
    image: "/assets/img/blog/blog3.webp",
    tags: ["UI/UX", "Design", "User Experience", "Digital"],
    readTime: 7
  }
];

const samplePortfolio = [
  {
    title: {
      en: "Startup Landing Page",
      pt: "Página de Destino de Startup"
    },
    description: {
      en: "A modern and responsive landing page designed for tech startups to showcase their products and services.",
      pt: "Uma página de destino moderna e responsiva projetada para startups de tecnologia mostrarem seus produtos e serviços."
    },
    category: {
      en: "Web Development",
      pt: "Desenvolvimento Web"
    },
    image: "/assets/img/portfolio/portfolio-01.jpg",
    link: "/portfolio/startup-landing-page",
    technologies: ["React", "Next.js", "TailwindCSS", "TypeScript"],
    client: "TechStart Inc.",
    order: 1
  },
  {
    title: {
      en: "Job Portal Platform",
      pt: "Plataforma de Portal de Empregos"
    },
    description: {
      en: "A comprehensive job portal platform connecting employers with job seekers through advanced matching algorithms.",
      pt: "Uma plataforma abrangente de portal de empregos conectando empregadores com candidatos através de algoritmos avançados de correspondência."
    },
    category: {
      en: "Web Application",
      pt: "Aplicação Web"
    },
    image: "/assets/img/portfolio/portfolio-02.jpg",
    link: "/portfolio/job-portal-landing-page",
    technologies: ["MERN Stack", "MongoDB", "Express", "React", "Node.js"],
    client: "JobConnect Ltd.",
    order: 2
  },
  {
    title: {
      en: "SaaS Landing Page",
      pt: "Página de Destino SaaS"
    },
    description: {
      en: "A conversion-optimized landing page for SaaS products with integrated payment processing and user onboarding.",
      pt: "Uma página de destino otimizada para conversão para produtos SaaS com processamento de pagamento integrado e integração de usuários."
    },
    category: {
      en: "SaaS Solution",
      pt: "Solução SaaS"
    },
    image: "/assets/img/portfolio/portfolio-03.jpg",
    link: "/portfolio/saas-landing-page",
    technologies: ["Vue.js", "Nuxt.js", "Stripe API", "Firebase"],
    client: "CloudSoft Solutions",
    order: 3
  },
  {
    title: {
      en: "Business Corporate Website",
      pt: "Site Corporativo de Negócios"
    },
    description: {
      en: "A professional corporate website with CMS integration for easy content management and SEO optimization.",
      pt: "Um site corporativo profissional com integração CMS para fácil gerenciamento de conteúdo e otimização SEO."
    },
    category: {
      en: "Corporate Website",
      pt: "Site Corporativo"
    },
    image: "/assets/img/portfolio/portfolio-04.jpg",
    link: "/portfolio/business-corporate-template",
    technologies: ["WordPress", "PHP", "MySQL", "Bootstrap"],
    client: "Global Corp Inc.",
    order: 4
  }
];

const sampleServices = [
  {
    title: {
      en: "Web Development",
      pt: "Desenvolvimento Web"
    },
    description: {
      en: "Custom web applications built with modern technologies and best practices for optimal performance and user experience.",
      pt: "Aplicações web personalizadas construídas com tecnologias modernas e melhores práticas para performance otimizada e experiência do usuário."
    },
    image: "/assets/img/services/service-01.webp",
    features: {
      en: ["Responsive Design", "Modern Frameworks", "SEO Optimization", "Performance Tuning"],
      pt: ["Design Responsivo", "Frameworks Modernos", "Otimização SEO", "Ajuste de Performance"]
    },
    price: "Starting from $2,000",
    order: 1
  },
  {
    title: {
      en: "Mobile App Development",
      pt: "Desenvolvimento de Aplicativos Móveis"
    },
    description: {
      en: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
      pt: "Aplicações móveis nativas e multiplataforma que entregam experiências excepcionais de usuário em todos os dispositivos."
    },
    image: "/assets/img/services/service-02.webp",
    features: {
      en: ["iOS & Android", "Cross-platform", "App Store Deployment", "Maintenance Support"],
      pt: ["iOS & Android", "Multiplataforma", "Deploy na App Store", "Suporte de Manutenção"]
    },
    price: "Starting from $5,000",
    order: 2
  },
  {
    title: {
      en: "UI/UX Design",
      pt: "Design UI/UX"
    },
    description: {
      en: "User-centered design solutions that combine aesthetics with functionality to create engaging digital experiences.",
      pt: "Soluções de design centradas no usuário que combinam estética com funcionalidade para criar experiências digitais envolventes."
    },
    image: "/assets/img/services/service-03.webp",
    features: {
      en: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      pt: ["Pesquisa de Usuário", "Wireframing", "Prototipagem", "Sistemas de Design"]
    },
    price: "Starting from $1,500",
    order: 3
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODBURL, {
      dbName: process.env.DB_NAME || "contactDB"
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Blog.deleteMany({});
    await Portfolio.deleteMany({});
    await Service.deleteMany({});
    
  

    // Insert sample data
    const blogs = await Blog.insertMany(sampleBlogs);
    const portfolios = await Portfolio.insertMany(samplePortfolio);
    const services = await Service.insertMany(sampleServices);

    console.log(`✅ Created ${blogs.length} sample blogs`);
    console.log(`✅ Created ${portfolios.length} sample portfolio items`);
    console.log(`✅ Created ${services.length} sample services`);

    console.log("\n🎉 Sample data seeded successfully!");
    console.log("You can now view this content in your admin panel and on your website.");

  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected from MongoDB");
  }
}

seedData();