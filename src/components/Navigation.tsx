import { useState, FC } from 'react';
import { Menu, X, Mail, MessageCircle } from 'lucide-react';
import LogoButton from './Logo';
import { ContactModal } from './ContactModal';

interface NavigationProps {
  services: string[];
  email?: string;
}

export const Navigation: FC<NavigationProps> = ({ services, email = 'addon2011@gmail.com' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServiceModalOpen, setServiceModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

 const navItems = [
  { label: 'Home', id: 'stats' },       // Home now points to Stats section
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Testimonials', id: 'testimonials' },
];


  // When a service is selected, open medium modal
  const handleServiceConfirm = (service: string) => {
    setSelectedService(service);
    setServiceModalOpen(false);
    setContactModalOpen(true);
  };

  // Medium options with icons
  const contactOptions = [
    {
      label: 'WhatsApp',
      url: selectedService
        ? `https://wa.me/919445323935?text=${encodeURIComponent(
            `Hi, I would like to discuss the product ${selectedService}`
          )}`
        : 'https://wa.me/919445323935',
      icon: <MessageCircle className="w-5 h-5 mr-2 text-green-600" />,
    },
    {
      label: 'Mail',
      url: `mailto:${email}?subject=${encodeURIComponent(
        selectedService ? `Inquiry: ${selectedService}` : 'Inquiry'
      )}`,
      icon: <Mail className="w-5 h-5 mr-2 text-red-600" />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <LogoButton />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}

            {/* Get Quote button triggers service → medium flow */}
            <button
              onClick={() => setServiceModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-300">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-gray-700 hover:text-gray-900 font-medium py-2"
              >
                {item.label}
              </button>
            ))}

            {/* Mobile Get Quote button */}
            <button
              onClick={() => setServiceModalOpen(true)}
              className="px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors w-full"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}

      {/* Service Modal */}
      <ContactModal
        isOpen={isServiceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        options={services.map((service) => ({
          label: service,
          url: '#',
          onClick: () => handleServiceConfirm(service),
        }))}
        title="Select a Service"
      />

      {/* Medium Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setContactModalOpen(false)}
        options={contactOptions}
        title={`Contact about ${selectedService}`}
      />
    </nav>
  );
};
