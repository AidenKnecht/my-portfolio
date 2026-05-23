"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-4">
      <div ref={ref} className="max-w-4xl mx-auto">
        {/*
          Grid lets heading span full width while photo + bio sit side-by-side
          as direct children of the stagger container — no extra wrapper needed.
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-12 gap-y-10 items-center"
        >
          <motion.h2
            variants={fadeUp}
            className="col-span-full text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
          >
            About
          </motion.h2>

          {/* Profile photo */}
          <motion.div
            variants={slideInLeft}
            className="relative justify-self-center md:justify-self-start"
          >
            <div className="w-44 h-44 rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="AtriCure_Headshot.jpeg"
                alt="Aiden Knecht"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative dashed ring */}
            <div className="absolute -inset-2 rounded-full border-2 border-dashed border-gray-200 dark:border-white/10 pointer-events-none" />
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={slideInRight}
            className="space-y-4 text-gray-600 dark:text-gray-300"
          >
            <p className="text-lg leading-relaxed">
              CompTIA Security+ certified Cybersecurity student with a 4.0 GPA
              at the University of Cincinnati, pursuing a Bachelor of Science in
              Cybersecurity (Anticipated Graduation: Summer 2028).
            </p>
            <p className="text-lg leading-relaxed">
              Currently gaining hands-on enterprise experience through an IT
              Security and Infrastructure Co-op, bringing a disciplined,
              athletic work ethic to every challenge.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
