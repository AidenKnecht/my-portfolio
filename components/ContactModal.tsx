"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CheckCircle,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactItem {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const contactItems: ContactItem[] = [
  {
    icon: Mail,
    iconColor: "text-blue-500",
    label: "Email",
    value: "knechtaj@mail.uc.edu",
    href: "mailto:knechtaj@mail.uc.edu",
  },
  {
    icon: Phone,
    iconColor: "text-green-500",
    label: "Phone",
    value: "(225) 253-2457",
    href: "tel:+12252532457",
  },
  {
    icon: MapPin,
    iconColor: "text-rose-500",
    label: "Location",
    value: "Cincinnati, OH",
    href: null,
  },
  {
    icon: Linkedin,
    iconColor: "text-sky-500",
    label: "LinkedIn",
    value: "linkedin.com/in/aiden-knecht",
    href: "https://linkedin.com/in/aiden-knecht",
    external: true,
  },
  {
    icon: Github,
    iconColor: "text-gray-600 dark:text-gray-400",
    label: "GitHub",
    value: "github.com/aidenknecht",
    href: "https://github.com/aidenknecht",
    external: true,
  },
];

// Shared input class keeps all fields visually consistent
const inputClass = [
  "w-full rounded-lg border border-gray-200 dark:border-white/10",
  "bg-transparent px-3 py-2 text-sm",
  "text-gray-900 dark:text-gray-100",
  "placeholder:text-gray-400 dark:placeholder:text-gray-600",
  "focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent",
  "transition-all duration-200",
].join(" ");

// ─── ContactModal ─────────────────────────────────────────────────────────────

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

  // Reset form after the exit animation finishes (300 ms matches exit duration)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const patch = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <AnimatePresence>
      {isOpen && (
        // Outer: fades the whole overlay
        <motion.div
          key="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        >
          {/* Inner: scales + slides the panel */}
          <motion.div
            key="contact-panel"
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1,    y: 0  }}
            exit={{ scale: 0.95,    y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Contact Aiden Knecht"
            className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Sticky header ── */}
            <div className="flex-shrink-0 flex items-start justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-gray-900">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Let&apos;s Connect
                </h2>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  I&apos;m always open to discussing cybersecurity, automation,
                  or new opportunities. Feel free to reach out!
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close contact modal"
                className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

                {/* ── Left column: contact info cards ── */}
                <div className="space-y-2">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                    Direct Contact
                  </p>
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const cardInner = (
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                          <Icon className={cn("w-4 h-4", item.iconColor)} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                            {item.label}
                          </p>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={item.label}
                        whileHover={item.href ? { scale: 1.02 } : undefined}
                        transition={{ duration: 0.15 }}
                        className={cn(
                          "p-3 rounded-xl border border-gray-100 dark:border-white/10",
                          item.href
                            ? "hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                            : "opacity-80"
                        )}
                      >
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="block"
                          >
                            {cardInner}
                          </a>
                        ) : (
                          cardInner
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Right column: contact form ── */}
                <div className="flex flex-col">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                    Send a Message
                  </p>

                  {submitted ? (
                    // Success state
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                        Message sent!
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[220px]">
                        Thanks for reaching out! I&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    // Form
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={patch("name")}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={form.email}
                          onChange={patch("email")}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          required
                          rows={4}
                          placeholder="Hi Aiden, I'd love to connect about..."
                          value={form.message}
                          onChange={patch("message")}
                          className={cn(inputClass, "resize-none")}
                        />
                      </div>

                      <button
                        type="submit"
                        className="mt-1 inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-gray-900 shadow-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
