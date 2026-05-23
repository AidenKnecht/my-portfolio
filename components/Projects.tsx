"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "National Cyber League (NCL)",
    description:
      "Competed in a collegiate-level CTF, solving real-world challenges in OSINT, Log Analysis, and Network Traffic Analysis.",
    tech: ["CTF", "OSINT", "NetworkAnalysis"],
  },
  {
    title: "Digital Forensic Investigation",
    description:
      "Conducted a simulated forensic analysis of a compromised system with proper evidence handling and document control.",
    tech: ["Forensics", "Cybersecurity"],
  },
  {
    title: "Browser Security Analysis",
    description:
      "Performed a comparative analysis of browser security using CVE data to create an evidence-based recommendation report.",
    tech: ["CVE", "SecurityResearch"],
  },
];

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 px-4">
      <div ref={ref} className="max-w-4xl mx-auto space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
        >
          Projects
        </motion.h2>

        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariant}
              className={cn(
                "group flex flex-col gap-4 p-5 rounded-xl",
                "border border-gray-100/80 dark:border-white/10",
                "bg-white dark:bg-black",
                "hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.04)]",
                "transition-shadow duration-300"
              )}
            >
              {/* Title + description */}
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-xs font-medium bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links — only rendered when URLs are provided */}
              {(project.github || project.live) && (
                <div className="flex items-center gap-3 pt-1 border-t border-gray-100 dark:border-white/10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
