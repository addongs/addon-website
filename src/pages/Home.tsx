import { useState, useEffect } from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { createDataService } from '../services/dataService';
import { DATA_REPO_CONFIG } from '../config';
import { Project, Category, Testimonial, Service } from '../types';
import { StatsSection } from '../components/StatsSection';

export const Home = ({ services }: { services: Service[] }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<{ label: string; value: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dataService = createDataService(
          DATA_REPO_CONFIG.owner,
          DATA_REPO_CONFIG.repo,
          DATA_REPO_CONFIG.branch
        );

        const [projectsData, categoriesData, testimonialsData, statsData] =
          await Promise.all([
            dataService.getProjects(),
            dataService.getCategories(),
            dataService.getTestimonials(),
            dataService.getStats(), // fetch stats from JSON
          ]);            
        setProjects(projectsData);
        setCategories(categoriesData);
        setTestimonials(testimonialsData);
        setStats(statsData);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div id="home">
      <StatsSection stats={stats} />
      <ProjectsSection projects={projects} categories={categories} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
};
