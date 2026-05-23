"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const skills = [
  { label: "TypeScript", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { label: "JavaScript", color: "bg-yellow-400/10 text-yellow-700 dark:text-yellow-400" },
  { label: "React", color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400" },
  { label: "Next.js", color: "bg-gray-500/10 text-gray-700 dark:text-gray-300" },
  { label: "Node.js", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  { label: "Tailwind CSS", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { label: "Framer Motion", color: "bg-pink-500/10 text-pink-700 dark:text-pink-400" },
  { label: "PostgreSQL", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { label: "Prisma", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  { label: "GraphQL", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
  { label: "Docker", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { label: "Git", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { label: "REST APIs", color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
  { label: "Figma", color: "bg-violet-500/10 text-violet-700 dark:text-violet-400" },
];

const tagContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const tagVariant = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      className="py-24 px-4 bg-gray-50/60 dark:bg-gray-900/30"
    >
      <div ref={ref} className="max-w-4xl mx-auto space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
        >
          Skills
        </motion.h2>

        <motion.div
          variants={tagContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <motion.span
              key={skill.label}
              variants={tagVariant}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium",
                "border border-current/10",
                skill.color
              )}
            >
              {skill.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
