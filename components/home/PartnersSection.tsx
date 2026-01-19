'use client';

import { motion } from 'motion/react';

const partners = [
  { name: 'Metro Taipei', logo: 'Metro Taipei' },
  { name: '遠東 SOGO', logo: 'SOGO' },
  { name: 'HYUNDAI', logo: 'HYUNDAI' },
  { name: 'Taipei 101', logo: '101' },
];

export function PartnersSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl font-bold text-neutral-900 mb-12"
        >
          合作夥伴
        </motion.h2>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16"
        >
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center bg-neutral-100 rounded-xl"
            >
              <span className="text-neutral-400 font-semibold text-sm sm:text-base">
                {partner.logo}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
