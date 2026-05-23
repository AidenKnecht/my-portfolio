"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/",
    icon: Twitter,
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-gray-50/60 dark:bg-gray-900/30"
    >
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center space-y-8"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
          >
            Contact
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-md"
          >
            Have a project in mind or just want to say hello? My inbox is
            always open.
          </motion.p>

          {/* Email CTA */}
          <motion.a
            variants={fadeUp}
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 shadow-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@example.com
          </motion.a>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-5">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
