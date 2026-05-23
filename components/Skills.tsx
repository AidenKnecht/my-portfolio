"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const skills = [
  { label: "SIEM", color: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  { label: "Microsoft Defender XDR", color: "bg-sky-500/10 text-sky-700 dark:text-sky-400" },
  { label: "Kusto Query Language (KQL)", color: "bg-purple-500/10 text-purple-700 dark:text-purple-400" },
  { label: "SQL Query Scripting", color: "bg-orange-500/10 text-orange-700 dark:text-orange-400" },
  { label: "Windows Server Administration", color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400" },
  { label: "Linux/Unix", color: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  { label: "TCP/IP", color: "bg-green-500/10 text-green-700 dark:text-green-400" },
  { label: "Network Security Protocols", color: "bg-teal-500/10 text-teal-700 dark:text-teal-400" },
  { label: "CompTIA Security+", color: "bg-rose-500/10 text-rose-700 dark:text-rose-400" },
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
