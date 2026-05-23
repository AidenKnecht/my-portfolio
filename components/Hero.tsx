"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  GraduationCap,
  Mail,
  Search,
  Shield,
  ShieldAlert,
} from "lucide-react";
import TranscriptModal from "@/components/TranscriptModal";

// ─── Variants ────────────────────────────────────────────────────────────────

// Parent: staggers heading → subheading → CTA buttons
const heroVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

// Shared fade-up used by each direct child of heroVariants
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Parent: staggers each bento card in after a short delay
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
};

// Each bento card fades up individually
const gridItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  onClick?: () => void;
}

interface BentoGridProps {
  items: BentoItem[];
}

// ─── BentoGrid ───────────────────────────────────────────────────────────────

function BentoGrid({ items }: BentoGridProps) {
  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto w-full"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={gridItemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          onClick={item.onClick}
          // Keyboard accessibility for clickable cards
          role={item.onClick ? "button" : undefined}
          tabIndex={item.onClick ? 0 : undefined}
          onKeyDown={
            item.onClick
              ? (e) => { if (e.key === "Enter" || e.key === " ") item.onClick?.(); }
              : undefined
          }
          className={cn(
            "group relative p-4 rounded-xl overflow-hidden",
            "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
            "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
            "will-change-transform",
            // colSpan classes
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
            // Pointer cursor only on interactive cards
            item.onClick ? "cursor-pointer" : "",
            {
              "shadow-[0_2px_12px_rgba(0,0,0,0.03)]": item.hasPersistentHover,
              "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
                item.hasPersistentHover,
            }
          )}
        >
          <div
            className={`absolute inset-0 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                  "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                  "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                )}
              >
                {item.status || "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                {item.title}
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                  {item.meta}
                </span>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.cta || "Explore →"}
              </span>
            </div>
          </div>

          <div
            className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            } transition-opacity duration-300`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  // Track how far the section has scrolled out of view
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background grid moves at ~25% of the scroll speed (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  // Items defined here so the education card can close over setTranscriptOpen.
  // Layout: NCL(2) + Forensics(1) on row 1 | BrowserSec(2) + Education(1) on row 2
  const items: BentoItem[] = [
    {
      title: "National Cyber League (NCL)",
      meta: "CTF",
      description:
        "Competed in a collegiate-level CTF, solving real-world challenges in OSINT, Log Analysis, and Network Traffic Analysis.",
      icon: <Shield className="w-4 h-4 text-blue-500" />,
      status: "Competed",
      tags: ["CTF", "OSINT", "NetworkAnalysis"],
      colSpan: 2,
      hasPersistentHover: true,
    },
    {
      title: "Digital Forensic Investigation",
      meta: "Academic",
      description:
        "Conducted a simulated forensic analysis of a compromised system with proper evidence handling and document control.",
      icon: <Search className="w-4 h-4 text-emerald-500" />,
      status: "Completed",
      tags: ["Forensics", "Cybersecurity"],
    },
    {
      title: "Browser Security Analysis",
      meta: "Research",
      description:
        "Performed a comparative analysis of browser security using CVE data to create an evidence-based recommendation report.",
      icon: <ShieldAlert className="w-4 h-4 text-violet-500" />,
      status: "Completed",
      tags: ["CVE", "SecurityResearch"],
      colSpan: 2,
    },
    {
      title: "University of Cincinnati",
      meta: "4.0 GPA",
      description:
        "Pursuing a B.S. in Cybersecurity with a 4.0 GPA and Dean's List recognition. Click to view full transcript.",
      icon: <GraduationCap className="w-4 h-4 text-amber-500" />,
      status: "Dean's List",
      tags: ["Education", "Dean's List", "Cybersecurity"],
      cta: "View Transcript →",
      onClick: () => setTranscriptOpen(true),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-950"
    >
      {/* ── Parallax background ── */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      {/* Soft vignette that fades the grid toward the bottom of the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,transparent_0%,rgba(249,250,251,0.95)_100%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,transparent_0%,rgba(3,7,18,0.95)_100%)]"
      />

      <div className="flex flex-col items-center px-4 pt-28 pb-16">
        {/* ── Heading → subheading → CTA buttons (staggered) ── */}
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6 max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
          >
            Hello, I&apos;m{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Aiden Knecht
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl"
          >
            CompTIA Security+ Certified Cybersecurity Student &amp; IT Security Co-op
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-2"
          >
            <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-gray-900 shadow-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors">
              View Work <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              Contact Me <Mail className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>

        {/* ── BentoGrid showcase — cards stagger in below the header text ── */}
        <div className="mt-16 w-full">
          <BentoGrid items={items} />
        </div>
      </div>

      {/* ── Transcript modal — always mounted, AnimatePresence handles visibility ── */}
      <TranscriptModal
        isOpen={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
      />
    </section>
  );
}

export { BentoGrid };
