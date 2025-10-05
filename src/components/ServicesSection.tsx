import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { Service } from '../types';
import React from 'react';

interface ServicesSectionProps {
  services: Service[]; // icon is a string like "FileText"
}

// Type of all Lucide icons as React components
type LucideIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export const ServicesSection = ({ services }: ServicesSectionProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-white" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            viewport={{ once: true }}
          >
            Comprehensive printing solutions for all your business and personal needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            // Convert string to icon component safely
            const Icon = LucideIcons[service.icon as unknown as keyof typeof LucideIcons] as
              | LucideIconComponent
              | undefined;

            return (
              <motion.div
                key={index}
                className="group p-8 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={cardVariants}
                transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
              >
                {Icon && (
                  <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            Don't see what you're looking for? We offer custom printing solutions.
          </p>

        </motion.div>
      </div>
    </section>
  );
};
