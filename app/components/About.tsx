"use client";
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Award, 
  Calendar, 
  Code2, 
  Zap, 
  FileText, 
  Download, 
  X, 
  ExternalLink,
  Briefcase,
  Users,
  GraduationCap,
  Star,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Shield,
  User,
} from 'lucide-react';

import {
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';

// ════════════════════════════════════════════
// 1. STATS DATA
// ════════════════════════════════════════════

const stats = [
  { icon: Calendar, value: "2+", label: "Years Experience" },
  { icon: Code2, value: "15+", label: "Production Projects" },
  { icon: Zap, value: "30+", label: "Technologies" },
  { icon: Award, value: "100%", label: "Production Focus" },
];

// ════════════════════════════════════════════
// 2. RESUME DATA
// ════════════════════════════════════════════

const experienceData = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    company: "TechVault Solutions",
    location: "Remote",
    period: "2023 - Present",
    description:
      "Leading a team of 5 developers building enterprise SaaS platforms. Architecting scalable microservices, implementing AI integrations, and managing cloud infrastructure on AWS and DigitalOcean.",
    technologies: ["React", "Node.js", "MongoDB", "AWS", "OpenAI", "Docker"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "DigitalNest Agency",
    location: "Remote",
    period: "2021 - 2023",
    description:
      "Developed and deployed 15+ production-ready web applications for healthcare, logistics, and e-commerce clients. Implemented CI/CD pipelines and optimized application performance.",
    technologies: ["Next.js", "Nest.js", "PostgreSQL", "GitHub Actions", "Redis"],
  },
  {
    id: 3,
    title: "Junior Developer",
    company: "CodeCraft Studios",
    location: "Remote",
    period: "2020 - 2021",
    description:
      "Built responsive web applications using React and Laravel. Collaborated with design teams to implement pixel-perfect interfaces and RESTful APIs.",
    technologies: ["React", "Laravel", "MySQL", "Tailwind CSS", "REST APIs"],
  },
];

const skillsData = [
  {
    category: "Frontend",
    icon: Layers,
    color: "accent-cyan",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: Server,
    color: "accent-purple",
    skills: ["Node.js", "Express.js", "Nest.js", "Laravel", "Python"],
  },
  {
    category: "Database",
    icon: Database,
    color: "accent-pink",
    skills: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "accent-cyan",
    skills: ["AWS", "DigitalOcean", "Docker", "GitHub Actions", "Nginx"],
  },
  {
    category: "AI & ML",
    icon: Cpu,
    color: "accent-purple",
    skills: ["OpenAI", "Claude", "Gemini", "RAG", "LangChain"],
  },
  {
    category: "Tools & Others",
    icon: Shield,
    color: "accent-pink",
    skills: ["Git", "JWT", "REST APIs", "WebSockets", "GraphQL"],
  },
];

const certificationsData = [
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    date: "2023",
    icon: Cloud,
  },
  {
    name: "MongoDB Atlas Certified Developer",
    issuer: "MongoDB",
    date: "2023",
    icon: Database,
  },
  {
    name: "OpenAI API Developer Certification",
    issuer: "OpenAI",
    date: "2024",
    icon: Cpu,
  },
];

// ════════════════════════════════════════════
// 3. RESUME PDF VIEWER MODAL (FIXED)
// ════════════════════════════════════════════

function ResumeViewerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const pdfUrl = "/assets/resume-tariq-mehmood.pdf";

  useEffect(() => {
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
                  Tariq Mehmood - Resume
                </h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <motion.a
                  href={pdfUrl}
                  download="Tariq_Mehmood_Resume.pdf"
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
              {!pdfError ? (
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full border-0"
                  title="Resume"
                  loading="lazy"
                  onError={() => setPdfError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <FileText className="w-16 h-16 text-text-muted/30 mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    Resume PDF Not Found
                  </h3>
                  <p className="text-text-secondary text-sm max-w-md">
                    Please make sure the resume PDF file is placed in the 
                    <code className="px-2 py-1 mx-1 rounded bg-bg-secondary text-accent-cyan text-xs">
                      /public/assets/
                    </code>
                    folder as <code className="px-2 py-1 mx-1 rounded bg-bg-secondary text-accent-cyan text-xs">
                      resume-tariq-mehmood.pdf
                    </code>
                  </p>
                  <motion.a
                    href={pdfUrl}
                    download="Tariq_Mehmood_Resume.pdf"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 border border-accent-cyan/30 text-accent-cyan font-medium hover:shadow-lg hover:shadow-accent-cyan/20 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Instead
                  </motion.a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ════════════════════════════════════════════
// 4. EXPANDABLE RESUME CARD (FIXED)
// ════════════════════════════════════════════

function ResumeCard({ onViewResume }: { onViewResume: () => void }) {
  const [showFullResume, setShowFullResume] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-8 sm:mt-10"
    >
      <div className="glass rounded-2xl border border-border overflow-hidden">
        {/* ─── Quick Stats ────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-6 bg-bg-primary/30">
          {[
            { label: "Experience", value: "2+ Years", icon: Briefcase },
            { label: "Projects", value: "15+", icon: Code2 },
            { label: "Certifications", value: "3", icon: GraduationCap },
            { label: "Clients", value: "10+", icon: Users },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-accent-cyan">
                <stat.icon className="w-4 h-4" />
                <span className="text-sm font-bold text-text-primary">
                  {stat.value}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ─── Expandable Full Resume ────── */}
        <AnimatePresence initial={false}>
          {showFullResume && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-t border-border space-y-6">
                {/* Experience */}
                <div>
                  <h5 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-accent-cyan" />
                    Work Experience
                  </h5>
                  <div className="space-y-4">
                    {experienceData.map((exp, index) => (
                      <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-4 sm:pl-6 border-l-2 border-accent-cyan/20 hover:border-accent-cyan/60 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-1">
                          <h6 className="text-sm font-medium text-text-primary">
                            {exp.title}
                          </h6>
                          <span className="text-xs text-text-muted shrink-0">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-xs text-accent-cyan font-medium">
                          {exp.company} • {exp.location}
                        </p>
                        <p className="text-xs text-text-secondary mt-1.5">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-bg-secondary border border-border text-[10px] text-text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div>
                  <h5 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent-purple" />
                    Certifications
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {certificationsData.map((cert) => (
                      <div
                        key={cert.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-bg-primary/50 border border-border"
                      >
                        <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center shrink-0">
                          <cert.icon className="w-4 h-4 text-accent-cyan" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-text-primary truncate">
                            {cert.name}
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {cert.issuer} • {cert.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Matrix */}
                <div>
                  <h5 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-accent-pink" />
                    Skills Matrix
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skillsData.map((skillGroup) => (
                      <div
                        key={skillGroup.category}
                        className="p-3 rounded-xl bg-bg-primary/50 border border-border"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <skillGroup.icon className={`w-4 h-4 text-${skillGroup.color}`} />
                          <span className="text-xs font-semibold text-text-primary">
                            {skillGroup.category}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {skillGroup.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-md bg-bg-secondary text-[10px] text-text-secondary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div> 
  );
}

// ════════════════════════════════════════════
// 5. MAIN ABOUT COMPONENT
// ════════════════════════════════════════════

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
        {/* ─── Background Decorations ────────── */}
        <div className="absolute inset-0 bg-grid-bg opacity-20" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* ─── Left Content ────────────────── */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 text-accent-cyan text-sm font-semibold tracking-wider uppercase mb-4"
              >
                <User className="w-4 h-4" />
                About Me
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6"
              >
                Building Scalable Software with{" "}
                <span className="gradient-text bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
                  AI & DevOps Expertise
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg leading-relaxed mb-4"
              >
                I am Tariq Mehmood, a Full Stack MERN Developer with 2+ years of experience
                building scalable web applications, AI-powered solutions, and production
                systems. I develop modern applications using React.js, Node.js, Express.js,
                MongoDB, Laravel, and Next.js for clients across healthcare, logistics,
                SaaS, and business management.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6"
              >
                My expertise includes REST API development, AI integrations with OpenAI,
                Claude, and Gemini, cloud deployment on DigitalOcean, CI/CD pipelines,
                GitHub Actions, Linux server management, and building secure, high-performance
                applications ready for production.
              </motion.p>
            </motion.div>

            {/* ─── Right Content - Holographic module ── */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative [perspective:1400px] mt-8 lg:mt-0"
            >
              <motion.div
                animate={{ y: [0, -12, 0], rotateX: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 rounded-3xl blur-2xl" />

                <div className="holo-surface relative glass rounded-3xl p-6 sm:p-8 lg:p-10 border border-border/50">
                  <div className="absolute left-0 right-0 top-10 h-px matrix-line" />
                  <div className="relative mx-auto mb-8 sm:mb-10 flex h-56 sm:h-64 lg:h-72 max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-border/50 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.08),transparent_54%)]">
                    <div className="absolute inset-8 rounded-full border border-accent-cyan/20" />
                    <div className="absolute inset-14 rounded-full border border-accent-purple/20" />
                    <div className="absolute h-40 w-40 sm:h-48 sm:w-48 rounded-full border border-accent-pink/20 animate-[spin_18s_linear_infinite]" />
                    <div className="relative h-[100px] w-[100px] sm:h-[120px] sm:w-[120px] lg:h-[140px] lg:w-[140px] [perspective:900px]">
                      <div className="holo-cube absolute inset-0">
                        {["React", "Node", "Mongo", "AI", "API", "Cloud"].map((label) => (
                          <div key={label} className="holo-cube-face text-[8px] sm:text-[10px] lg:text-xs">
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="group flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-bg-primary/50 border border-border/30 transition-all hover:bg-accent-cyan/5 hover:border-accent-cyan/20">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0">
                        <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent-cyan" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-text-muted">Primary Stack</p>
                        <p className="text-sm sm:text-base text-text-primary font-medium truncate">
                          MERN • Laravel • Next.js
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-bg-primary/50 border border-border/30 transition-all hover:bg-accent-purple/5 hover:border-accent-purple/20">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent-purple" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-text-muted">Specialization</p>
                        <p className="text-sm sm:text-base text-text-primary font-medium truncate">
                          AI Integration • REST APIs
                        </p>
                      </div>
                    </div>

                    <div className="group flex items-center gap-3 p-2 sm:p-3 rounded-xl bg-bg-primary/50 border border-border/30 transition-all hover:bg-accent-pink/5 hover:border-accent-pink/20">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent-pink" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-text-muted">Production Experience</p>
                        <p className="text-sm sm:text-base text-text-primary font-medium truncate">
                          DevOps • Cloud Deployment • CI/CD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ─── Resume Card ──────────────────── */}
          <ResumeCard onViewResume={() => setShowResume(true)} />

          {/* ─── Social Links ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
          </motion.div>
        </div>
      </section>

    </>
  );
}