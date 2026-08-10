"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Globe,
  Database,
  Server,
  Puzzle,
  Layers,
  Cpu,
  Terminal,
} from "lucide-react";

const skills = [
  {
    category: "Full Stack Development",
    items: [
      { name: "React.js & Next.js", level: 95, icon: Globe },
      { name: "Node.js & Express.js", level: 94, icon: Server },
      { name: "MongoDB & MySQL", level: 92, icon: Database },
      { name: "REST API Development", level: 95, icon: Code2 },
    ],
  },
  {
    category: "AI, Cloud & DevOps",
    items: [
      { name: "OpenAI / Claude / Gemini", level: 90, icon: Cpu },
      { name: "DigitalOcean • Nginx • PM2", level: 90, icon: Terminal },
      { name: "GitHub Actions & CI/CD", level: 88, icon: Layers },
      { name: "Problem Solving", level: 96, icon: Puzzle },
    ],
  },
];

const additionalSkills = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "Laravel",
  "MongoDB",
  "MongoDB Atlas",
  "MySQL",
  "Tailwind CSS",
  "Bootstrap",
  "JWT Authentication",
  "REST APIs",
  "OpenAI",
  "Anthropic Claude",
  "Google Gemini",
  "AI Agents",
  "RAG",
  "Semantic Search",
  "Vector Embeddings",
  "Git",
  "GitHub",
  "GitHub Actions",
  "Linux",
  "Nginx",
  "PM2",
  "DigitalOcean",
  "Google Maps API",
  "Postman",
  "Nodemailer",
  "ClickSend SMS",
  "Meta Pixel",
  "SEO",
];

function SkillBar({
  name,
  level,
  icon: Icon,
  index,
}: {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
            <Icon className="w-4 h-4 text-accent-cyan" />
          </div>
          <span className="text-text-primary font-medium">{name}</span>
        </div>
        <span className="text-accent-cyan font-semibold">{level}%</span>
      </div>
      <div className="h-2.5 bg-bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: index * 0.1 + 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="h-full rounded-full bg-accent-cyan relative overflow-hidden"
        >
          <div className="absolute inset-0 skill-bar-shimmer" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-accent-cyan text-sm font-semibold tracking-wider uppercase mb-4">
            My Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            My technical expertise spans modern Full Stack MERN development,
            AI integrations, cloud infrastructure, DevOps, and production
            deployments. I build scalable web applications, secure REST APIs,
            intelligent AI solutions, and enterprise-grade systems for
            healthcare, logistics, e-commerce, and SaaS platforms.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {skills.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.2 }}
              className="glass rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-accent-cyan to-accent-purple rounded-full" />
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    index={index + catIndex * 4}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl font-bold text-text-primary mb-6 text-center">
            Additional <span className="gradient-text">Technologies</span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-lg bg-bg-secondary border border-border text-text-secondary text-sm font-medium hover:border-accent-cyan/30 hover:text-accent-cyan transition-all duration-300 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
