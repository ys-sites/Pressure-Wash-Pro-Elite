/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Instagram,
  Clock,
  ShieldCheck,
  Sparkles,
  Quote,
  Globe,
  Play,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { translations } from "./translations";
import ShinyText from "./components/ShinyText";
import BlurText from "./components/BlurText";
import BorderGlow from "./components/BorderGlow";

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-neutral-600 mb-6">
              The application encountered an unexpected error. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && (
              <pre className="mt-6 p-4 bg-neutral-100 rounded text-left text-xs overflow-auto max-h-40">
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Section = ({
  children,
  className = "",
  innerClassName = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  id?: string;
  delay?: number;
}) => (
  <section id={id} className={`py-20 px-6 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`max-w-6xl mx-auto ${innerClassName}`}
    >
      {children}
    </motion.div>
  </section>
);

const Logo = ({ className = "" }: { className?: string }) => (
  <img
    src="/media/logo.png"
    alt="Pressure Wash Pro Elite"
    className={`object-contain ${className}`}
  />
);

const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  key?: React.Key;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.08)" }}
    className={`p-8 bg-white border border-neutral-200 shadow-sm rounded-2xl transition-all ${className}`}
  >
    {children}
  </motion.div>
);

const PortfolioGallery = ({ t, all = false }: { t: any; all?: boolean }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const CATEGORIES = [
    "All",
    "Driveways",
    "Patios",
    "Roofs",
  ];

  // One representative image per category shown on mobile home screen
  const MOBILE_PICKS = new Set([
    "/media/684143933_17887873155498336_5913042798487256020_n.jpg", // Driveways — luxury white mansion
    "/media/683610482_17887289685498336_7961019839406207397_n.jpg", // Patios — screened patio + pool
    "/media/694298566_17888807808498336_4462390657815014938_n.jpg", // Roofs — aerial drone before/after
  ]);

  const allProjectsRaw = [
    "/media/681223312_17887291482498336_5997628289701398457_n.jpg",
    "/media/681275693_17887875816498336_6461022882692909500_n.jpg",
    "/media/681283886_17887291281498336_2947960714908521656_n.jpg",
    "/media/681332233_17887291911498336_5683450116220470454_n.jpg",
    "/media/681506331_17887291524498336_4960231458414595658_n.jpg",
    "/media/681617677_17887874562498336_3618749318565064718_n.jpg",
    "/media/681810968_17887873440498336_2085463534930112871_n.jpg",
    "/media/682101925_17887874325498336_3088102195654254409_n.jpg",
    "/media/682256810_17887874334498336_584188443371572302_n.jpg",
    "/media/682577942_17887877904498336_6080353921922885483_n.jpg",
    "/media/682696776_17887874043498336_3317253884249633591_n-1.jpg",
    "/media/682709300_17887290807498336_6751879593226950581_n.jpg",
    "/media/682709303_17887291452498336_6038732104326364976_n.jpg",
    "/media/682775395_17887290222498336_969270796091008949_n.jpg",
    "/media/682775395_17887291149498336_2887580016143951022_n.jpg",
    "/media/682844403_17887289556498336_3248915509766235672_n.jpg",
    "/media/683006560_17887290711498336_9209943091701563187_n.jpg",
    "/media/683397576_17887873821498336_5902036501685157962_n.jpg",
    "/media/683610482_17887289685498336_7961019839406207397_n.jpg",
    "/media/683622205_17887873830498336_7753766581126247652_n-1.jpg",
    "/media/683624854_17887290816498336_2393985182751049173_n.jpg",
    "/media/683648378_17887291875498336_5685353851466788470_n.jpg",
    "/media/683650966_17887290204498336_8802762622775293997_n.jpg",
    "/media/684143933_17887873155498336_5913042798487256020_n.jpg",
    "/media/684145635_17887290213498336_1063026111179154528_n.jpg",
    "/media/684237841_17887291356498336_6494234406840005229_n.jpg",
    "/media/684237932_17888807850498336_8044254062453874601_n.jpg",
    "/media/684269044_17887291140498336_4656183899732942620_n.jpg",
    "/media/684391011_17888807835498336_2542985189160063614_n.jpg",
    "/media/684677177_17888807868498336_7242806722461931017_n.jpg",
    "/media/685043138_17887873614498336_5494646109088516105_n.jpg",
    "/media/694298566_17888807808498336_4462390657815014938_n.jpg",
  ];

  /* Category mapping verified by visual inspection of every image — July 2025.
     Driveways = front of house | Patios = back/side of house | Roofs = on top of house */
  const IMAGE_CATEGORIES: Record<string, string> = {
    "/media/681223312_17887291482498336_5997628289701398457_n.jpg":   "Patios",    // screened pool patio w/ flagstone
    "/media/681275693_17887875816498336_6461022882692909500_n.jpg":   "Driveways", // concrete driveway + garage front
    "/media/681283886_17887291281498336_2947960714908521656_n.jpg":   "Driveways", // concrete driveway + two-story house
    "/media/681332233_17887291911498336_5683450116220470454_n.jpg":   "Patios",    // wooden dock / waterfront deck
    "/media/681506331_17887291524498336_4960231458414595658_n.jpg":   "Driveways", // long concrete driveway + front house
    "/media/681617677_17887874562498336_3618749318565064718_n.jpg":   "Driveways", // luxury paver driveway, arched front
    "/media/681810968_17887873440498336_2085463534930112871_n.jpg":   "Driveways", // large luxury estate paver driveway
    "/media/682101925_17887874325498336_3088102195654254409_n.jpg":   "Driveways", // paver driveway + stone entry, front
    "/media/682256810_17887874334498336_584188443371572302_n.jpg":    "Driveways", // sidewalk & curb cleaning, front of homes
    "/media/682577942_17887877904498336_6080353921922885483_n.jpg":   "Driveways", // concrete driveway + white garage front
    "/media/682696776_17887874043498336_3317253884249633591_n-1.jpg": "Driveways", // large paver driveway, modern house front
    "/media/682709300_17887290807498336_6751879593226950581_n.jpg":   "Driveways", // concrete driveway + Mediterranean front
    "/media/682709303_17887291452498336_6038732104326364976_n.jpg":   "Patios",    // screened pool patio w/ flagstone (back)
    "/media/682775395_17887290222498336_969270796091008949_n.jpg":    "Patios",    // white vinyl fence in backyard
    "/media/682775395_17887291149498336_2887580016143951022_n.jpg":   "Driveways", // concrete sidewalk + front walkway
    "/media/682844403_17887289556498336_3248915509766235672_n.jpg":   "Roofs",     // cedar shake roof tiles cleaning
    "/media/683006560_17887290711498336_9209943091701563187_n.jpg":   "Roofs",     // red barrel tile roof from above
    "/media/683397576_17887873821498336_5902036501685157962_n.jpg":   "Driveways", // large concrete driveway + gray house front
    "/media/683610482_17887289685498336_7961019839406207397_n.jpg":   "Patios",    // screened back patio w/ brick pavers & pool
    "/media/683622205_17887873830498336_7753766581126247652_n-1.jpg": "Patios",    // back/side exterior wall cleaning
    "/media/683624854_17887290816498336_2393985182751049173_n.jpg":   "Driveways", // concrete driveway + SUV, front house
    "/media/683648378_17887291875498336_5685353851466788470_n.jpg":   "Driveways", // front driveway, white garage, trucks
    "/media/683650966_17887290204498336_8802762622775293997_n.jpg":   "Patios",    // white vinyl gate/fence in backyard
    "/media/684143933_17887873155498336_5913042798487256020_n.jpg":   "Driveways", // luxury white mansion, paver driveway front
    "/media/684145635_17887290213498336_1063026111179154528_n.jpg":   "Patios",    // white vinyl fence backyard cleaning
    "/media/684237841_17887291356498336_6494234406840005229_n.jpg":   "Roofs",     // shingle roof view from rooftop
    "/media/684237932_17888807850498336_8044254062453874601_n.jpg":   "Roofs",     // tile roof cleaning, standing on roof
    "/media/684269044_17887291140498336_4656183899732942620_n.jpg":   "Driveways", // paver + concrete driveway, modern townhouse
    "/media/684391011_17888807835498336_2542985189160063614_n.jpg":   "Roofs",     // red barrel tile roof, aerial view
    "/media/684677177_17888807868498336_7242806722461931017_n.jpg":   "Roofs",     // red barrel tile roof, close rooftop shot
    "/media/685043138_17887873614498336_5494646109088516105_n.jpg":   "Driveways", // concrete driveway + blue two-story house front
    "/media/694298566_17888807808498336_4462390657815014938_n.jpg":   "Roofs",     // red barrel tile roof before/after, drone view
  };

  const categorizedProjects = allProjectsRaw.map((src, idx) => {
    const cat = IMAGE_CATEGORIES[src] ?? CATEGORIES[1]; // default to Driveways if unmapped
    return { id: idx, src, category: cat };
  });

  const filteredProjects =
    activeCategory === "All"
      ? categorizedProjects
      : categorizedProjects.filter((p) => p.category === activeCategory);

  const displayProjects = all ? filteredProjects : filteredProjects.slice(0, 8);

  return (
    <Section id="portfolio" className="bg-neutral-50 overflow-hidden">
      <div className="flex flex-col items-center mb-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <ShinyText text={t.transformation.title} speed={3} color="#0f172a" shineColor="#0284c7" />
          </h2>
          <BlurText
            text={t.transformation.subtitle}
            delay={30}
            stepDuration={0.4}
            animateBy="words"
            direction="top"
            className="text-neutral-600 max-w-xl mx-auto justify-center"
          />
        </motion.div>
      </div>

      {all && (
        <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-neutral-500 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className={`grid gap-6 px-4 md:px-0 ${all ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3'}`}>
        <AnimatePresence mode="popLayout">
          {displayProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`rounded-2xl overflow-hidden shadow-md border border-neutral-200/60 bg-white cursor-pointer group relative${!all && !MOBILE_PICKS.has(project.src) ? ' hidden' : ''}`}
              onClick={() => setSelectedImage(project.src)}
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                 <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                   View Image
                 </span>
              </div>
              <img
                src={project.src}
                alt={`Professional ${project.category.toLowerCase()} pressure washing transformation by Pressure Wash Pro Elite`}
                title={`${project.category} Pressure Washing`}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 z-20">
                 <span className="bg-white/90 backdrop-blur-sm text-neutral-800 text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm scale-90 origin-top-left group-hover:scale-100 transition-transform">
                   {project.category}
                 </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!all && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            See More <ArrowRight size={18} />
          </Link>
        </motion.div>
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-3xl max-h-[70vh] w-full"
              onClick={(e) => e.stopPropagation()} // Prevent clicks on image from closing
            >
              <button
                className="absolute -top-12 right-0 sm:-right-12 sm:top-0 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors border border-white/20 backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </button>
              <img
                src={selectedImage}
                alt="Pressure Wash Pro Elite full transformation view"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};

const Navbar = ({ t }: { t: any }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Desktop Logo (Top Left) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-4 md:top-6 left-4 md:left-8 z-50 pointer-events-auto hidden lg:block"
      >
        <Link to="/" className="hover:opacity-80 transition-opacity block">
          <Logo className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto drop-shadow-xl" />
          <span className="sr-only">Pressure Wash Pro Elite</span>
        </Link>
      </motion.div>

      {/* Desktop Centered Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto hidden lg:block"
      >
        <nav className="bg-white/95 backdrop-blur-sm border border-neutral-200/50 rounded-full pl-2 pr-2 py-2 flex items-center shadow-lg">
          <div className="flex items-center bg-transparent rounded-full px-2 gap-1 mr-2">
            <Link to="/#hero" className="px-3 py-2 rounded-full text-sm font-bold bg-blue-100/80 text-primary shadow-sm hover:opacity-90 whitespace-nowrap">{t.nav.home}</Link>
            <Link to="/#about" className="px-3 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 whitespace-nowrap">{t.nav.about}</Link>
            <Link to="/#services" className="px-3 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 whitespace-nowrap">{t.nav.services}</Link>
            <Link to="/#process" className="px-3 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 whitespace-nowrap">{t.nav.process}</Link>
            <Link to="/portfolio" className="px-3 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 whitespace-nowrap">{t.nav.portfolio}</Link>
            <Link to="/#testimonials" className="px-3 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 whitespace-nowrap">{t.nav.reviews}</Link>
          </div>
          <Link
            to="/#contact"
            className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-blue-600 flex items-center gap-2"
          >
            {t.nav.getQuote} <ArrowRight size={16} />
          </Link>
        </nav>
      </motion.div>

      {/* Mobile Top Bar (Logo + Actions) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-4 left-0 right-0 pl-5 pr-4 z-50 pointer-events-auto flex items-start justify-between lg:hidden"
      >
        <Link to="/" className="hover:opacity-80 transition-opacity block shrink-0 mt-2">
          <Logo className="h-16 w-auto drop-shadow-xl" />
        </Link>
        <div className="flex items-center gap-2 mt-2 bg-white/95 backdrop-blur-sm border border-neutral-200/50 rounded-full px-2 py-2 shadow-lg">
          <Link
            to="/#contact"
            className="bg-primary text-white px-4 py-2 rounded-full font-bold text-sm shadow-md"
          >
            {t.nav.getQuote}
          </Link>
          <button
            className="p-1.5 text-neutral-600 hover:bg-neutral-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {isMobileMenuOpen ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <div className="absolute top-24 left-0 right-0 z-50 px-4 lg:hidden pointer-events-auto">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden flex flex-col p-4 gap-2 origin-top"
            >
              <Link to="/#hero" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50">{t.nav.home}</Link>
              <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50">{t.nav.about}</Link>
              <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50">{t.nav.services}</Link>
              <Link to="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50">{t.nav.portfolio}</Link>
              <Link to="/#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl font-medium text-neutral-700 hover:bg-neutral-50">{t.nav.reviews}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

const Footer = ({ t }: { t: any }) => {
  const [mobileCTAOpen, setMobileCTAOpen] = React.useState(false);
  const [autoCTAShown, setAutoCTAShown] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!autoCTAShown && window.scrollY > window.innerHeight * 3) {
        setMobileCTAOpen(true);
        setAutoCTAShown(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoCTAShown]);

  React.useEffect(() => {
    if (mobileCTAOpen) {
      const timer = setTimeout(() => setMobileCTAOpen(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [mobileCTAOpen]);

  return (
    <>
      <footer className="bg-neutral-950 text-neutral-400 py-10 border-t border-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center gap-x-12 gap-y-10 items-center"
        >
          <div className="flex flex-col items-start gap-4 shrink-0 md:w-1/3">
            <div className="text-white flex flex-col md:flex-row items-center md:items-start gap-6">
              <Logo className="w-auto h-24 sm:h-32 object-contain" />
              <div className="flex flex-col gap-3 items-center md:items-start">
                <span className="text-2xl font-bold tracking-tight">
                  Pressure Wash Pro Elite
                </span>
                <div className="flex gap-4 justify-start">
                  <a
                    href="https://www.instagram.com/pressurewashpross"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xs text-center md:text-left md:w-1/3">
            <p className="leading-relaxed text-neutral-300 text-sm">
              {t.footer.desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 md:gap-12 text-center md:text-left md:w-1/3 justify-end">
            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.links}</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/#services"
                    className="hover:text-primary transition-colors"
                  >
                    {t.nav.services}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#process"
                    className="hover:text-primary transition-colors"
                  >
                    {t.nav.process}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#testimonials"
                    className="hover:text-primary transition-colors"
                  >
                    {t.nav.reviews}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="hover:text-primary transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">{t.footer.contact}</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-primary" /> (321) 367-6110
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-primary" /> {t.footer.email}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />{" "}
                  {t.footer.location}
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-900 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>{t.footer.rights}</p>
        </div>
      </footer>

      {/* Mobile CTA Popup — floats above phone button, no overlay, auto-closes in 5s */}
      <AnimatePresence>
        {mobileCTAOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 12 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 12 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-4 right-20 z-50 w-[218px] bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden origin-right pointer-events-auto"
          >
            {/* 5s countdown progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-0.5 bg-primary origin-left"
            />
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <p className="font-bold text-neutral-900 text-sm leading-snug">Ready to get started?</p>
                <button
                  onClick={() => setMobileCTAOpen(false)}
                  className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 shrink-0 ml-2"
                >
                  <span className="text-[10px] leading-none">✕</span>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:3213676110"
                  className="w-full bg-primary text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-primary/20"
                  onClick={() => setMobileCTAOpen(false)}
                >
                  <Phone size={13} /> Call (321) 367-6110
                </a>
                <Link
                  to="/#contact"
                  className="w-full bg-neutral-100 text-neutral-800 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
                  onClick={() => setMobileCTAOpen(false)}
                >
                  Get a Free Quote <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Call Button — Mobile: opens CTA sheet */}
      <motion.button
        onClick={() => setMobileCTAOpen(true)}
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Call Pressure Wash Pro Elite"
      >
        <Phone size={24} />
      </motion.button>

    </>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function PortfolioPage() {
  const t = translations.en;

  // Quick scroll to top effect on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-neutral-50 text-neutral-900 min-h-screen selection:bg-primary selection:text-white scroll-smooth relative">
      <Navbar t={t} />

      <div className="pt-24 min-h-[85vh]">
        <PortfolioGallery t={t} all={true} />
      </div>

      <Footer t={t} />
    </main>
  );
}

function AppContent() {
  const t = translations.en;
  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [hash]);

  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    service: "",
    details: "",
  });
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://services.leadconnectorhq.com/hooks/o7aUwpKbtkP4AOP0pEjC/webhook-trigger/162782af-467c-44ec-8e0a-890a65bb1f8b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        setStatus("success");
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          city: "",
          service: "",
          details: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <main className="bg-white text-neutral-900 min-h-screen selection:bg-primary selection:text-white scroll-smooth">
      <Navbar t={t} />

      {/* Hero - Attention & Intent */}
      <Section
        id="hero"
        className="pt-32 pb-24 text-center relative overflow-hidden min-h-[85vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full bg-[url('/media/hero.jpg')] bg-cover bg-center"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: "transform", transformOrigin: "center center" }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white font-medium text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-md border border-white/20"
          >
            <Star size={14} className="fill-white text-white" /> {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 sm:mb-8 text-white drop-shadow-2xl leading-[1.1] max-w-4xl mx-auto"
          >
            <ShinyText text={t.hero.title} speed={3} color="#f8fafc" shineColor="#38bdf8" />
          </motion.h1>

          <BlurText
            text={t.hero.subtitle}
            delay={30}
            stepDuration={0.4}
            animateBy="words"
            direction="top"
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium drop-shadow-lg leading-relaxed justify-center"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="flex flex-row items-center justify-center gap-3">
              <Link
                to="/#contact"
                className="bg-primary text-white px-5 sm:px-10 py-3 sm:py-5 rounded-full font-bold text-sm sm:text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1"
              >
                {t.hero.cta} <ArrowRight size={16} />
              </Link>
              <a
                href="https://www.instagram.com/pressurewashpross"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-[60px] sm:h-[60px] bg-gradient-to-tr from-sky-400 via-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-2xl hover:scale-110 transition-transform flex-shrink-0"
              >
                <Instagram size={22} />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-semibold flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-sm">
              <Clock size={12} /> {t.hero.consultation}
            </p>
          </motion.div>
        </div>

      </Section>

      {/* About Us - Side by Side */}
      <Section
        id="about"
        className="!py-0 !px-0"
        innerClassName="!max-w-none !mx-0"
      >
        <div className="grid md:grid-cols-2 min-h-[450px]">
          {/* Video Side */}
          <div className="relative w-full bg-gradient-to-br from-slate-800 to-sky-900 flex items-center justify-center p-6 md:p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527581177303-34eeb8ce5468?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

            <div className="relative z-10 w-full max-w-[260px] md:max-w-[300px] lg:max-w-[320px]">
              <IgVideoCard
                videoUrl="/media/Insta.mp4"
                poster=""
                igLink="https://www.instagram.com/reel/DXxuHEAM7Ea/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                title="Pressure Wash Pro Elite"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="bg-slate-900 text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight whitespace-nowrap">
              <ShinyText text={t.about.title} speed={3} color="#f8fafc" shineColor="#38bdf8" />
            </h2>
            <BlurText
              text={t.about.subtitle}
              delay={30}
              stepDuration={0.4}
              animateBy="words"
              direction="top"
              className="text-base font-medium mb-5 text-white/80"
            />

            <div className="mb-5 space-y-3">
              {t.about.desc
                .split("\n\n")
                .map((paragraph: string, i: number) => (
                  <BlurText
                    key={i}
                    text={paragraph}
                    delay={20}
                    stepDuration={0.35}
                    animateBy="words"
                    direction="top"
                    className="text-white/70 leading-relaxed text-sm"
                  />
                ))}
            </div>

            <ul className="space-y-2 mb-6">
              {t.about.points.map((item: string, i: number) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-white/90 text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mb-6 text-white/90 font-medium text-sm">
              <span className="underline underline-offset-4 decoration-primary">
                {t.about.goal.split(":")[0]}
              </span>
              : {t.about.goal.split(":")[1]}
            </p>

            <div>
              <Link
                to="/#contact"
                className="inline-block bg-primary text-white px-6 py-3 font-bold hover:bg-blue-600 transition-colors rounded-full text-sm"
              >
                {t.about.cta}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 tracking-tight">
            <ShinyText text={t.services.title} speed={3} color="#0f172a" shineColor="#0284c7" />
          </h2>
          <BlurText
            text={t.services.subtitle}
            delay={30}
            stepDuration={0.4}
            animateBy="words"
            direction="top"
            className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base justify-center"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {/* Services checklist column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100 relative overflow-hidden"
          >
            {/* Decorative background lines */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                {[...Array(12)].map((_, i) => (
                  <circle key={i} cx="200" cy="200" r={30 + i * 30} fill="none" stroke="#0284c7" strokeWidth="1" />
                ))}
              </svg>
            </div>
            <ul className="space-y-6 relative z-10">
              {t.services.items.map((svc: { title: string; desc: string }, i: number) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 mt-0.5 w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-lg leading-snug">{svc.title}</p>
                    <p className="text-neutral-500 text-sm mt-0.5">{svc.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right column: CTA card + trust badges */}
          <div className="flex flex-col gap-6">
            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-gradient-to-br from-blue-700 to-primary text-white rounded-3xl p-8 shadow-lg flex flex-col justify-center items-start relative overflow-hidden flex-1"
            >
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <ShieldCheck size={160} />
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">{t.services.cta.title}</h3>
              <p className="text-white/80 mb-6 text-sm relative z-10">{t.services.cta.subtitle}</p>
              <Link
                to="/#contact"
                className="bg-white text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-neutral-50 transition-colors flex items-center gap-2 relative z-10"
              >
                {t.services.cta.button} <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex flex-col gap-4"
            >
              {/* Phone CTA */}
              <a
                href="tel:3213676110"
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={18} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-neutral-500 font-medium">Get a free quote — Call us</p>
                  <p className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-primary transition-colors">(321) 367-6110</p>
                </div>
              </a>

              <div className="h-px bg-neutral-100" />

              {/* Trust points */}
              <ul className="space-y-3">
                {[
                  { icon: <CheckCircle size={18} className="text-primary" />, label: "Locally Owned & Operated" },
                  { icon: <Star size={18} className="fill-yellow-400 text-yellow-400" />, label: "5-Star Rated on Google" },
                  { icon: <ShieldCheck size={18} className="text-primary" />, label: "Licensed & Insured" },
                ].map(({ icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-neutral-700 font-medium text-sm">
                    <span className="shrink-0">{icon}</span>
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-center gap-8 opacity-80"
        >
          <p className="text-neutral-500 font-medium text-sm uppercase tracking-widest">
            {t.services.socialProof}
          </p>
          <div className="flex -space-x-3">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Satisfied customer ${i + 1} of Pressure Wash Pro Elite services`}
                title="Pressure Wash Pro Elite Customer"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
              +25
            </div>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 font-medium">
            <div className="flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={18} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-lg">5.0</span>
          </div>
        </motion.div>
      </Section>

      {/* Process - Validating the Next Action */}
      <Section
        id="process"
        className="bg-gradient-to-br from-slate-900 to-[#0e172e] text-white border-t border-white/10"
      >
        <h2 className="text-4xl font-bold mb-4 text-center tracking-tight flex justify-center">
          <ShinyText text={t.process.title} speed={3} color="#f8fafc" shineColor="#38bdf8" />
        </h2>
        <BlurText
          text={t.process.subtitle}
          delay={30}
          stepDuration={0.4}
          animateBy="words"
          direction="top"
          className="text-neutral-400 text-center mb-16 max-w-2xl mx-auto justify-center"
        />

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-neutral-800 -translate-y-1/2 z-0"></div>

          {t.process.steps.map((item, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/5"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 ring-8 ring-slate-900 shadow-xl">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Before/After Sliders */}
      <Section id="comparison" className="bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex justify-center">
            <ShinyText text={t.transformation.title} speed={3} color="#0f172a" shineColor="#0284c7" />
          </h2>
          <BlurText
            text={t.transformation.subtitle}
            delay={30}
            stepDuration={0.4}
            animateBy="words"
            direction="top"
            className="text-neutral-600 max-w-xl mx-auto justify-center"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {[
            { src: "/media/684143933_17887873155498336_5913042798487256020_n.jpg", category: "Driveway" },
            { src: "/media/683610482_17887289685498336_7961019839406207397_n.jpg", category: "Patio" },
            { src: "/media/694298566_17888807808498336_4462390657815014938_n.jpg", category: "Roof" },
          ].map(({ src, category }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg border border-neutral-200/60 group"
            >
              <img
                src={src}
                alt={`${category} pressure washing result`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute bottom-3 left-3 bg-white/90 text-neutral-800 text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm">
                {category}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/portfolio"
            className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5"
          >
            See More <ArrowRight size={18} />
          </Link>
        </motion.div>
      </Section>

      {/* Proof - Validating the Outcome */}
      <Section id="testimonials" className="overflow-hidden bg-neutral-50">
        <h2 className="text-4xl font-bold mb-4 text-center tracking-tight flex justify-center">
          <ShinyText text={t.testimonials.title} speed={3} color="#0f172a" shineColor="#0284c7" />
        </h2>
        <BlurText
          text={t.testimonials.subtitle}
          delay={30}
          stepDuration={0.4}
          animateBy="words"
          direction="top"
          className="text-neutral-600 text-center mb-12 max-w-2xl mx-auto justify-center"
        />

        <div className="relative w-full py-4 mb-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto bg-primary rounded-2xl p-4 md:p-5 text-center text-white border border-primary shadow-xl mb-10 flex items-center gap-4"
          >
            <div className="shrink-0 w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shadow-inner">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="font-bold text-sm leading-snug">Enjoyed working with us? Leave a 5-star Google review!</p>
              <p className="text-white/75 text-xs mt-0.5">It helps more homeowners find us.</p>
            </div>
            <a
              href="https://www.google.com/search?client=mobilesearchapp&channel=iss&cs=1&hl=en&rlz=1MDAPLA_enUS989US989&sca_esv=8b8e1d908a60a98a&v=414.0.890628820&sxsrf=ANbL-n6jY_iorR0Lso_QbTDNk4YnsjySUA:1778878977132&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXAlFZFY_F7VLDQYR5opUE_7cURd6gpP-6c6JEb4OnZQ_DYLSzas36k9g9Vz2s2vw178MrBoV2Zs70K5XbAZVnizQQyqfSUIF4hkOHyXgowOpkJbRg%3D%3D&q=Pressure+Wash+Pros+Elite+Reviews&sa=X&ved=2ahUKEwjd4p7MmLyUAxUkKFkFHT56NIUQ0bkNegQIIhAF&biw=1491&bih=710&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 bg-white text-primary px-4 py-2 rounded-full font-bold text-xs hover:bg-neutral-100 transition-colors shadow-md whitespace-nowrap"
            >
              Review Us <ArrowRight size={13} />
            </a>
          </motion.div>

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            style={{ willChange: "transform" }}
          >
            {[...t.testimonials.items, ...t.testimonials.items].map(
              (testimonial, i) => (
                <div key={i} className="w-[270px] sm:w-[300px] md:w-[320px] lg:w-[280px] shrink-0">
                  <Card className="h-full flex flex-col justify-between bg-white shadow-sm border border-neutral-100 !p-5 lg:!p-6 relative">
                    <div className="absolute bottom-6 right-6 text-primary/5 font-serif text-8xl leading-none select-none pointer-events-none">
                      <Quote size={80} className="text-primary/10" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={14}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-neutral-700 italic mb-4 leading-relaxed text-sm">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                        <svg
                          className="w-8 h-8 text-neutral-300 mt-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ),
            )}
          </motion.div>
        </div>


      </Section>

      {/* Frictionless CTA Form */}
      <Section
        id="contact"
        className="bg-blue-50 border-y border-neutral-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://images.unsplash.com/photo-1527581177303-34eeb8ce5468?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center grayscale" />
        <div className="max-w-3xl mx-auto relative z-10 px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight flex justify-center">
              <ShinyText text={t.contact.title} speed={3} color="#0f172a" shineColor="#0284c7" />
            </h2>
            <BlurText
              text={t.contact.subtitle}
              delay={30}
              stepDuration={0.4}
              animateBy="words"
              direction="top"
              className="text-neutral-600 text-base md:text-lg justify-center"
            />
          </div>

          <BorderGlow
            glowColor="200 50 60"
            backgroundColor="#ffffff"
            colors={["#38bdf8", "#7dd3fc", "#bae6fd"]}
            borderRadius={24}
            className="shadow-2xl shadow-blue-900/10"
            glowRadius={20}
          >
            <div className="bg-white rounded-3xl p-6 md:p-10 w-full relative z-10">
              {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} md-size={40} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {t.contact.form.success.title}
                </h3>
                <p className="text-neutral-600 mb-8 text-sm md:text-base">
                  {t.contact.form.success.desc}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-primary font-bold hover:underline"
                >
                  {t.contact.form.success.button}
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm md:text-base"
                      placeholder="Jean Francois"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                      {t.contact.form.phone} *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm md:text-base"
                      placeholder="(514) 622-1599"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm md:text-base"
                        placeholder="jean@example.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                        {t.contact.form.city} *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm md:text-base"
                        placeholder="Winter Garden"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                    {t.contact.form.serviceLabel} *
                  </label>
                  <select
                    className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white appearance-none text-sm md:text-base"
                    required
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      {t.contact.form.servicePlaceholder}
                    </option>
                    {t.contact.services.map((option, i) => (
                      <option key={i}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold mb-1.5 md:mb-2 text-neutral-900">
                    {t.contact.form.details} (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 md:px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white text-sm md:text-base"
                    rows={3}
                    placeholder={t.contact.form.detailsPlaceholder}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                  ></textarea>
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs md:text-sm font-medium">
                    {t.contact.form.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-white font-bold text-base md:text-lg py-4 md:py-5 rounded-xl hover:bg-blue-700 transition-all mt-2 md:mt-4 flex justify-center items-center gap-2 shadow-lg shadow-primary/20 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? t.contact.form.sending
                    : t.contact.form.submit}{" "}
                  <ArrowRight size={18} md-size={20} />
                </button>
                <p className="text-center text-[10px] md:text-xs text-neutral-500 mt-3 md:mt-4 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={12} md-size={14} /> {t.contact.form.secure}
                </p>
              </form>
            )}
            </div>
          </BorderGlow>
        </div>
      </Section>

      {/* Footer */}
      <Footer t={t} />
    </main>
  );
}

function IgVideoCard({
  videoUrl,
  poster,
  igLink,
  title,
}: {
  videoUrl: string;
  poster: string;
  igLink: string;
  title: string;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPlayPending, setIsPlayPending] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current || isPlayPending) return;

    if (!videoRef.current.paused) {
      videoRef.current.pause();
    } else {
      setIsPlayPending(true);
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayPending(false))
          .catch((error) => {
            console.log("Playback prevented:", error);
            setIsPlayPending(false);
          });
      } else {
        setIsPlayPending(false);
      }
    }
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group hover:border-white/30 transition-colors shadow-2xl w-full mx-auto">
      <a
        href={igLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/10 transition-colors cursor-pointer gap-2"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px] shrink-0">
            <div className="w-full h-full bg-neutral-900 rounded-full flex items-center justify-center">
              <Instagram size={14} className="text-white" />
            </div>
          </div>
          <span className="text-white font-medium text-sm truncate">
            {title}
          </span>
        </div>
        <div className="flex-none">
          <span className="block text-[11px] sm:text-xs text-neutral-400 font-medium px-3 py-1.5 rounded-full bg-white/10 group-hover:bg-white/20 group-hover:text-white transition-colors whitespace-nowrap">
            View on IG
          </span>
        </div>
      </a>

      <div
        className="relative aspect-[9/16] bg-black cursor-pointer overflow-hidden"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={videoUrl + "#t=0.001"}
          poster={poster}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transform group-hover:scale-110 transition-transform">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
