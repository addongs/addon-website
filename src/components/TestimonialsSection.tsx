import { FC } from 'react';
import { Testimonial } from '../types';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <motion.span
        key={index}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1, duration: 0.3 }}
      >
        <Star
          className={`w-5 h-5 ${
            index < rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      </motion.span>
    ));
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: (custom: number) => ({
        delay: custom * 0.15,
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeOut
      }),
    },
  };

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by businesses and individuals for exceptional printing quality
          </p>
        </motion.div>

        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                custom={index} // pass index to transition
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 -left-4 bg-gray-900 rounded-full p-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                >
                  <Quote className="w-6 h-6 text-white" />
                </motion.div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">{renderStars(testimonial.rating)}</div>

                {/* Feedback */}
                <motion.p
                  className="text-gray-700 mb-6 leading-relaxed italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
                  viewport={{ once: true }}
                >
                  "{testimonial.feedback}"
                </motion.p>

                {/* Customer Info */}
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.customerName}</p>
                  {testimonial.company && (
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  )}
                  {testimonial.date && (
                    <p className="text-xs text-gray-500 mt-1">{testimonial.date}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No testimonials available yet</p>
          </div>
        )}
      </div>
    </section>
  );
};
