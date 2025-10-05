import { FC } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  label: string;
  value: number;
}

interface StatsSectionProps {
  stats: Stat[];
}

export const StatsSection: FC<StatsSectionProps> = ({ stats }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative w-full bg-gradient-to-r from-green-400 via-green-300 to-green-50 py-28 overflow-hidden" id="stats">
      {/* Hero Content */}
      <div className="absolute inset-0 bg-green-100 opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Customer Satisfaction is Our <span className="text-green-700">Top Priority</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-16">
          We deliver exceptional printing solutions that bring your ideas to life. Quality, reliability, and happiness guaranteed.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="bg-white rounded-xl shadow-xl p-8 hover:scale-105 transition-transform duration-300"
            >
              <p className="text-4xl md:text-5xl font-bold text-green-600">{stat.value}+</p>
              <p className="text-gray-800 mt-2 text-lg md:text-xl">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
