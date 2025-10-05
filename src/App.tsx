import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { createDataService } from './services/dataService';
import { DATA_REPO_CONFIG } from './config';
import { Service } from './types';

function App() {
  const [services, setServices] = useState<Service[]>([]);
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

        const servicesData = await dataService.getServices();
        setServices(servicesData);
      } catch (err) {
        console.error('Error loading services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading services...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        {/* Navigation receives service titles for WhatsApp modal */}
        <Navigation services={services.map((s) => s.title)} />

        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home services={services} />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
  