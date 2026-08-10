"use client";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, 
  Code2, 
  Globe, 
  Mail, 
  Terminal, 
  Award,
  Briefcase,
  Users  } from "lucide-react";
  import { FaLinkedinIn, FaGithub} from "react-icons/fa"
import HeroHologram from "./HeroHologram";

const roles = [
  "Full Stack MERN Developer",
  "AI Integration Engineer",
  "Node.js Backend Developer",
  "React.js Frontend Developer",
  "DevOps & Cloud Engineer",
];

const codeTicker = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Laravel",
  "Next.js",
  "OpenAI",
  "Claude AI",
  "Google Gemini",
  "AI Agents",
  "RAG",
  "REST APIs",
  "DigitalOcean",
  "Nginx",
  "PM2",
  "GitHub Actions",
  "CI/CD",
  "JWT Auth",
  "MongoDB Atlas",
  "Google Maps API",
];

const stats = [
  { icon: Briefcase, label: "Experience", value: "2+ Years" },
  { icon: Code2, label: "Projects", value: "15+" },
  { icon: Users, label: "Clients", value: "10+" },
  { icon: Award, label: "Technologies", value: "30+" },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const speed = isDeleting ? 42 : 88;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else if (displayText.length > 0) {
        setDisplayText(role.slice(0, displayText.length - 1));
      } else {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-noise relative min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 bg-bg-primary"
    >
      <HeroHologram />
      
      {/* Grid Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="absolute inset-0 bg-gradient-radial from-accent-cyan/10 via-transparent to-transparent opacity-30 dark:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/80" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6 md:mb-7 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-[0.32em] lg:justify-start"
          >
            <span className="hidden sm:block h-px w-6 sm:w-10 bg-accent-cyan/70" />
            <div className="inline-flex rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-sm font-semibold text-accent-cyan backdrop-blur-sm">
              Full Stack MERN • AI • DevOps
            </div>
            <span className="hidden sm:block h-px w-6 sm:w-10 bg-accent-cyan/70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12 }}
            className="tech-title mb-4 sm:mb-5 md:mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-[-0.06em] text-text-primary"
          >
            <span className="block">Tariq</span>
            <span className="gradient-text block">Mehmood</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mb-4 sm:mb-5 flex h-10 sm:h-12 items-center justify-center gap-2 sm:gap-3 text-base sm:text-xl md:text-2xl lg:text-3xl text-text-secondary lg:justify-start"
          >
            <Terminal className="h-5 w-5 sm:h-6 sm:w-6 text-accent-cyan shrink-0" />
            <span className="typing-cursor font-semibold text-sm sm:text-base md:text-xl lg:text-2xl text-text-primary">
              {displayText}
            </span>
          </motion.div>

          {/* ─── Stats Bar ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.55 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:justify-start"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-2">
                <stat.icon className="h-5 w-5 text-accent-cyan/70" />
                <div>
                  <div className="text-sm font-bold text-text-primary">{stat.value}</div>
                  <div className="text-xs text-text-muted">{stat.label}</div>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block h-8 w-px bg-border-color/50" />
                )}
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.82 }}
            className="flex items-center justify-center gap-3 sm:gap-4 lg:justify-start"
          >
            {[
              { icon: FaGithub, href: "https://github.com/tariq992", label: "Projects" },
              {
                icon: FaLinkedinIn,
                href: "https://www.linkedin.com/in/tariq992",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:tmtariq110@gmail.com",
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                data-cursor="link"
                whileHover={{ scale: 1.12, y: -4, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-border-color bg-bg-card/40 text-text-secondary backdrop-blur-xl transition-all duration-300 hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-lg hover:shadow-accent-cyan/10 flex items-center justify-center"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.a>
            ))}
             
  {/* Resume Button */}
  <motion.a
    href="/assets/resume-tariq-mehmood.pdf"
    download="Tariq_Mehmood_Resume.pdf"
    whileHover={{ scale: 1.12, y: -4 }}
    className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-border bg-accent-cyan/10 text-accent-cyan backdrop-blur-xl transition-all duration-300 hover:border-accent-cyan/60 hover:shadow-lg hover:shadow-accent-cyan/10 flex items-center justify-center"
  >
    <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
  </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Tech Ticker */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-y border-border-color bg-bg-card/50 backdrop-blur-xl py-2.5 sm:py-3">
        <div className="code-ticker flex w-[200%] items-center gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">
          {[...codeTicker, ...codeTicker, ...codeTicker, ...codeTicker].map(
            (item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-4 sm:gap-6 md:gap-8 whitespace-nowrap"
              >
                <span>{item}</span>
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-accent-cyan/70" />
              </span>
            ),
          )}
        </div>
      </div>

      {/* Scroll Button */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        data-cursor="link"
        className="absolute bottom-20 right-6 z-20 hidden flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent-cyan lg:flex"
      >
        <span className="text-xs uppercase tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}