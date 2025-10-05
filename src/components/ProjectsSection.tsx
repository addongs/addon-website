import { useState, useMemo } from 'react';
import { Project, Category } from '../types';
import { Carousel } from './Carousel';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsSectionProps {
  projects: Project[];
  categories: Category[];
}

export const ProjectsSection = ({ projects, categories }: ProjectsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? projects
        : projects.filter((p) => String(p.category_id) === String(selectedCategory));
    setCurrentPage(1); // reset page when category changes
    return filtered;
  }, [projects, selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const carouselImages = filteredProjects.map((p) => ({
    url: p.imageUrl,
    alt: p.title,
    title: p.title,
  }));

  const gridVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    selected: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section className="py-20 bg-white" id="projects">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of high-quality printing work across various categories
          </p>
        </motion.div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <motion.button
            onClick={() => setSelectedCategory('all')}
            animate={selectedCategory === 'all' ? 'selected' : 'initial'}
            variants={buttonVariants}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Projects
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(String(category.id))}
              animate={selectedCategory === String(category.id) ? 'selected' : 'initial'}
              variants={buttonVariants}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === String(category.id)
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
              viewport={{ once: true }}
              className="mb-12 w-full overflow-hidden"
            >
              <Carousel images={carouselImages} height="500px" fullWidth={true} />
            </motion.div>

            {/* Project Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    custom={index}
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: [0.42, 0, 0.58, 1],
                    }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{project.title}</h3>
                      {project.description && (
                        <p className="text-gray-600 text-sm mb-1">{project.description}</p>
                      )}
                      {project.completionDate && (
                        <p className="text-gray-500 text-xs">Completed: {project.completionDate}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === 1
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Previous
              </button>

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};
