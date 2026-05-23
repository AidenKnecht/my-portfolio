"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const courses = [
  { code: "ENGL 1001", name: "English Composition",                       credits: "3.0", grade: "A" },
  { code: "IT 1003",   name: "First Year Experience in the SOIT",         credits: "1.0", grade: "A" },
  { code: "IT 1050",   name: "Fundamentals of Information Technology",    credits: "3.0", grade: "A" },
  { code: "IT 1090",   name: "Computer Programming I",                    credits: "3.0", grade: "A" },
  { code: "IT 2020",   name: "Implications of IT",                        credits: "3.0", grade: "A" },
  { code: "IT 2030",   name: "Information Security & Assurance",          credits: "3.0", grade: "A" },
  { code: "IT 2035",   name: "Network Infrastructure Management",         credits: "3.0", grade: "A" },
  { code: "IT 2040",   name: "Fundamentals of Web Development",           credits: "3.0", grade: "A" },
  { code: "IT 2060",   name: "Database Management I",                     credits: "3.0", grade: "A" },
  { code: "MATH 1021", name: "College Algebra",                           credits: "3.0", grade: "A" },
  { code: "MATH 1022", name: "Trigonometry",                              credits: "3.0", grade: "A" },
  { code: "PD 1010",   name: "Professional Development for CECH",         credits: "1.0", grade: "A" },
];

const stats = [
  { label: "Cumulative GPA", value: "4.0"  },
  { label: "Total Credits",  value: "65.0" },
  { label: "Institutional",  value: "32.0" },
  { label: "Transfer",       value: "33.0" },
];

export default function TranscriptModal({ isOpen, onClose }: TranscriptModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        // Outer: fades the whole overlay in/out
        <motion.div
          key="transcript-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Inner: scales + slides the panel on top of the fade */}
          <motion.div
            key="transcript-panel"
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1,    y: 0  }}
            exit={{ scale: 0.95,    y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Academic Transcript"
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Sticky header ── */}
            <div className="flex-shrink-0 flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Academic Transcript
                </h2>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                  University of Cincinnati — B.S. in Cybersecurity
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close transcript"
                className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Stats row ── */}
            <div className="flex-shrink-0 grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 dark:divide-white/10 border-b border-gray-100 dark:border-white/10">
              {stats.map(({ label, value }) => (
                <div key={label} className="px-5 py-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    {label}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-50 tabular-nums">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Course table (scrollable) ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <table className="w-full text-sm border-separate border-spacing-0">
                <thead>
                  <tr>
                    {["Code", "Course Name", "Credits", "Grade"].map((h, i) => (
                      <th
                        key={h}
                        className={`pb-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-white/10 ${
                          i === 0 ? "text-left pr-4" :
                          i === 1 ? "text-left" :
                          "text-right pl-4"
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, i) => (
                    <tr
                      key={course.code}
                      className={i < courses.length - 1 ? "border-b border-gray-50 dark:border-white/5" : ""}
                    >
                      <td className="py-3 pr-4 font-mono text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap align-middle">
                        {course.code}
                      </td>
                      <td className="py-3 pr-4 text-gray-700 dark:text-gray-300 align-middle">
                        {course.name}
                      </td>
                      <td className="py-3 pl-4 text-right text-gray-500 dark:text-gray-400 tabular-nums align-middle">
                        {course.credits}
                      </td>
                      <td className="py-3 pl-4 text-right align-middle">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-xs">
                          {course.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
