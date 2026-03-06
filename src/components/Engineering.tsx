"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const reveal = {
  initial: { opacity: 0, y: 16 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const stats = [
  { value: "4+ Years", label: "Production Experience" },
  { value: "Kaggle", label: "Notebooks Expert" },
];

export default function Engineering() {
  return (
    <section className="py-20 sm:py-24 lg:py-32 px-5 sm:px-6 relative overflow-hidden">
      <div className="max-w-5xl xl:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div {...reveal}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Engineering at Scale</h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Currently at Bank of America, I design and maintain critical
              backend infrastructure that processes millions of transactions. My work centers
              on building systems that are observable, resilient, and maintainable — because
              production incidents don't wait for business hours.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
              Beyond just writing code, I drive release validation, lead production triage,
              and ensure that our microservices architecture can withstand the unpredictability
              of real-world usage at enterprise scale.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-5 transition-colors duration-300"
                  style={{ borderColor: "var(--border)", background: "var(--surface)" }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: "var(--accent)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono" style={{ color: "var(--muted-fg)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            className="relative rounded-2xl overflow-hidden border group"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="aspect-[4/3] relative">
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
                alt="Data center servers"
                fill
                className="object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, var(--bg) 10%, transparent 60%)",
                }}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div
                className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono mb-3"
                style={{ background: "var(--accent-dim)", color: "var(--accent)" }}
              >
                PRODUCTION-FIRST MINDSET
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                Building systems that are reliable, observable, and built to last
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
