"use client";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Globe,
  Server,
  Database,
  Layers,
  FileText,
  Sparkles,
  CheckCircle,
  Clock,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

// ════════════════════════════════════════════
// 1. PROJECT DATA WITH IMAGES
// ════════════════════════════════════════════

const projects = [
  {
    id: 1,
    title: "RatedCare Connect (RCC)",
    description:
      "A production-ready healthcare workforce management SaaS platform built for nurse rostering, attendance tracking, payroll, FTE management, revenue analytics, and GPS check-in/check-out with AI-powered document verification.",
    tags: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Anthropic Claude",
      "DigitalOcean",
    ],
    icon: Database,
    color: "from-accent-cyan/20 to-accent-cyan/5",
    borderColor: "border-accent-cyan/20",
    glowColor: "rgba(34, 211, 238, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "Healthcare SaaS",
      duration: "6 months",
      team: "5 developers",
    },
    achievements: [
      "Reduced nurse scheduling time by 40%",
      "Handles 10,000+ daily check-ins",
      "99.9% uptime in production",
    ],
  },
  {
    id: 2,
    title: "SYM Forklifts",
    description:
      "Production platform for an Australian industrial machinery company featuring product management, AI chatbot, freight management, Google Maps integration, lead management, Meta Pixel, and cloud deployment.",
    tags: [
      "React.js",
      "Node.js",
      "MongoDB",
      "OpenAI",
      "Google Maps API",
      "Nginx",
    ],
    icon: Globe,
    color: "from-accent-purple/20 to-accent-purple/5",
    borderColor: "border-accent-purple/20",
    glowColor: "rgba(167, 139, 250, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "Industrial Platform",
      duration: "4 months",
      team: "3 developers",
    },
    achievements: [
      "50% increase in lead conversion",
      "AI chatbot handles 70% of inquiries",
      "Real-time freight tracking",
    ],
  },
  {
    id: 3,
    title: "AI Chatbot & AI Agent",
    description:
      "Intelligent AI assistant built for customer support, product recommendations, lead qualification, FAQ automation, and knowledge-base search using RAG and modern LLMs.",
    tags: [
      "OpenAI",
      "Claude",
      "Gemini",
      "AI Agents",
      "RAG",
      "Vector Embeddings",
    ],
    icon: Code2,
    color: "from-accent-pink/20 to-accent-pink/5",
    borderColor: "border-accent-pink/20",
    glowColor: "rgba(244, 114, 182, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "AI Solution",
      duration: "3 months",
      team: "2 developers",
    },
    achievements: [
      "90% reduction in support response time",
      "Handles 5,000+ conversations daily",
      "Supports 3 major LLM providers",
    ],
  },
  {
    id: 4,
    title: "Freight Management System",
    description:
      "Complete logistics management solution with freight jobs, company registration, quotation workflows, automated email notifications, SMS integration, machine specifications, pickup and delivery management.",
    tags: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "ClickSend",
      "Nodemailer",
    ],
    icon: Server,
    color: "from-accent-cyan/20 to-accent-purple/5",
    borderColor: "border-accent-cyan/20",
    glowColor: "rgba(34, 211, 238, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "Logistics SaaS",
      duration: "5 months",
      team: "4 developers",
    },
    achievements: [
      "Automated 200+ freight quotes daily",
      "Real-time shipment tracking",
      "Integrated with 5+ carriers",
    ],
  },
  {
    id: 5,
    title: "The Palm",
    description:
      "Production website developed and maintained for an international client, including frontend development, backend features, performance improvements, deployment, and ongoing maintenance.",
    tags: ["React.js", "Node.js", "MongoDB", "REST APIs", "Production"],
    icon: Globe,
    color: "from-accent-purple/20 to-accent-pink/5",
    borderColor: "border-accent-purple/20",
    glowColor: "rgba(167, 139, 250, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "E-Commerce",
      duration: "8 months",
      team: "2 developers",
    },
    achievements: [
      "40% faster page load times",
      "Increased conversion rate by 25%",
      "Scaled to handle 10x traffic",
    ],
  },
  {
    id: 6,
    title: "Campus Shoes",
    description:
      "Production e-commerce platform with feature enhancements, backend development, API integrations, deployment support, and continuous maintenance for a high-traffic retail business.",
    tags: ["React.js", "Node.js", "MongoDB", "API Integration", "E-Commerce"],
    icon: Layers,
    color: "from-accent-pink/20 to-accent-cyan/5",
    borderColor: "border-accent-pink/20",
    glowColor: "rgba(244, 114, 182, 0.15)",
    image: "/images/projects/ratedcare.png",
    caseStudy: "/assets/case-studies/resume-tariq-mehmood.pdf",
    stats: {
      type: "Retail Platform",
      duration: "6 months",
      team: "3 developers",
    },
    achievements: [
      "1M+ monthly active users",
      "Integrated 5+ payment gateways",
      "99.95% uptime during sales events",
    ],
  },
];

// ════════════════════════════════════════════
// 2. PDF VIEWER MODAL
// ════════════════════════════════════════════

function PDFViewerModal({
  pdfUrl,
  title,
  onClose,
}: {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full h-[90vh] sm:h-[85vh] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl bg-bg-primary rounded-t-2xl sm:rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-bg-card/50 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-accent-cyan shrink-0" />
                <h3 className="text-sm sm:text-base font-semibold text-text-primary truncate">
                  {title} - Case Study
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href={pdfUrl}
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan hover:bg-accent-cyan/20 transition-colors"
                  aria-label="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </motion.a>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.05, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl border border-border hover:border-accent-cyan/30 hover:bg-accent-cyan/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </motion.button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 bg-bg-secondary/50 relative overflow-hidden">
              <iframe
                src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="w-full h-full border-0"
                title={`${title} Case Study`}
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════
// 3. PROJECT CARD COMPONENT
// ════════════════════════════════════════════

function ProjectCard({
  project,
  index,
  onViewCaseStudy,
}: {
  project: (typeof projects)[0];
  index: number;
  onViewCaseStudy: (pdfUrl: string, title: string) => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rotateX = useSpring(0, { stiffness: 220, damping: 22, mass: 0.45 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22, mass: 0.45 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    rotateX.set(yPercent * -11);
    rotateY.set(xPercent * 11);
    event.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className="group relative h-full"
    >
      <div
        className={`relative glass rounded-2xl border ${project.borderColor} transition-all duration-500 overflow-hidden ${
          isHovered ? "border-opacity-100 shadow-2xl" : "border-opacity-40"
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)`
            : "rgba(255,255,255,0.02)",
        }}
      >
        {/* ─── Image Section ────────────────── */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-bg-secondary">
          {!imageError ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-primary">
              <ImageIcon className="w-12 h-12 text-text-muted/30" />
            </div>
          )}

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />

          {/* Duration badge on image */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 text-xs">
            <Clock className="w-3 h-3" />
            <span>{project.stats.duration}</span>
          </div>

          {/* Type badge on image */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-white/90 text-xs">
            <Sparkles className="w-3 h-3" />
            <span>{project.stats.type}</span>
          </div>
        </div>

        {/* ─── Content ────────────────────── */}
        <div className="p-5 sm:p-6 relative z-10">
          {/* ─── Header: Icon + Title ────── */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border flex items-center justify-center group-hover:scale-110 group-hover:border-accent-cyan/30 transition-all duration-500 shrink-0">
              <project.icon className="w-5 h-5 text-accent-cyan" />
            </div>
            <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-cyan transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
          </div>

          {/* ─── Description ───────────────── */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* ─── Achievements ──────────────── */}
          <div className="space-y-1.5 mb-4">
            {project.achievements
              .slice(0, isExpanded ? 3 : 2)
              .map((achievement, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-cyan mt-0.5 shrink-0" />
                  <span className="text-text-secondary">{achievement}</span>
                </div>
              ))}
            {project.achievements.length > 2 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-accent-cyan text-xs font-medium hover:underline mt-1"
              >
                {isExpanded
                  ? "Show less"
                  : `+ ${project.achievements.length - 2} more`}
              </button>
            )}
          </div>

          {/* ─── Tags ──────────────────────── */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-bg-secondary border border-border text-[10px] text-text-muted group-hover:text-text-secondary group-hover:border-accent-cyan/20 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-0.5 rounded-md bg-bg-secondary border border-border text-[10px] text-text-muted">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* ─── Action Buttons ───────────── */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
            <motion.button
              onClick={() => onViewCaseStudy(project.caseStudy, project.title)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 text-accent-cyan text-xs font-medium hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300 flex-1 sm:flex-none justify-center"
            >
              <FileText className="w-3.5 h-3.5" />
              Case Study
            </motion.button>
          </div>
        </div>

        {/* ─── Hover Border Glow ──────────── */}
        <div
          className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: `inset 0 0 80px ${project.glowColor}`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ════════════════════════════════════════════
// 4. MAIN PROJECTS COMPONENT
// ════════════════════════════════════════════

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);
  const [pdfViewer, setPdfViewer] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <>
      <section
        id="projects"
        className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* ─── Background Decorations ────────── */}
        <div className="absolute inset-0 bg-grid-bg opacity-20" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* ─── Header ──────────────────────── */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-14"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-accent-cyan text-xs sm:text-sm font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              Portfolio
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-4"
            >
              Featured{" "}
              <span className="gradient-text bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
                Production Projects
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4"
            >
              A collection of production-ready applications built for
              healthcare, logistics, e-commerce, and enterprise businesses.
            </motion.p>
          </motion.div>

          {/* ─── Projects Grid ────────────────── */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
          >
            <AnimatePresence>
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onViewCaseStudy={(url, title) =>
                      setPdfViewer({ url, title })
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ─── View More / View Less CTA ───── */}
          {projects.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-8 sm:mt-10"
            >
              <motion.button
                onClick={() => setShowAll(!showAll)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-border bg-bg-card/30 text-text-primary font-semibold hover:border-accent-cyan/50 hover:text-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 transition-all duration-300 text-sm sm:text-base"
              >
                <span>{showAll ? "Show Less" : "View All Projects"}</span>
                {showAll ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── PDF Viewer Modal ────────────────── */}
      <AnimatePresence>
        {pdfViewer && (
          <PDFViewerModal
            pdfUrl={pdfViewer.url}
            title={pdfViewer.title}
            onClose={() => setPdfViewer(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
