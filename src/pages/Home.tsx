import { useState, useEffect, useCallback } from 'react';
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
  const [newDataAvailable, setNewDataAvailable] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

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
          dataService.getStats(),
        ]);

      setProjects(projectsData);
      setCategories(categoriesData);
      setTestimonials(testimonialsData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(); // initial load

    const interval = setInterval(async () => {
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
            dataService.getStats(),
          ]);

        let updated = false;

        setProjects((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(projectsData)) {
            updated = true;
            return projectsData;
          }
          return prev;
        });

        setCategories((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(categoriesData)) {
            updated = true;
            return categoriesData;
          }
          return prev;
        });

        setTestimonials((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(testimonialsData)) {
            updated = true;
            return testimonialsData;
          }
          return prev;
        });

        setStats((prev) => {
          if (JSON.stringify(prev) !== JSON.stringify(statsData)) {
            updated = true;
            return statsData;
          }
          return prev;
        });

        if (updated) setNewDataAvailable(true);
      } catch (err) {
        console.error('Background refresh failed:', err);
      }
    }, 30000); // every 30s

    return () => clearInterval(interval);
  },[]);

  if (isLoading) return <LoadingSpinner />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-6 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div id="home" className="relative">
      {/* Notification for new updates */}
      {newDataAvailable && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow cursor-pointer"
             onClick={() => setNewDataAvailable(false)}>
          New updates available! Content refreshed.
        </div>
      )}

      <StatsSection stats={stats} />
      <ProjectsSection projects={projects} categories={categories} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
};
