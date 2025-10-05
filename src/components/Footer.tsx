import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 text-center sm:text-left">
          {/* Brand Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-green-500">ADD</span>
              <span className="text-orange-500">ON</span>
            </h1>
            <p className="text-gray-700 font-medium">Graphic Solution</p>
            <p className="text-blue-600 font-bold text-lg mt-1">Signs & Print</p>
            <p className="text-gray-600 mt-2 tracking-wide text-sm">
              ADVERTISING • DESIGNING • PRINTING
            </p>
          </div>



          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-700 break-words">
              <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0 text-orange-500" />
                <a
                  href="https://maps.app.goo.gl/UosupiY7G9Qsez6P6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline break-all"
                >
                  No.538/A, Mahatma Gandhi Street, K K Nagar, (Opp. to NGGO Nagar), Chengalpattu-603001
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="flex flex-wrap justify-center sm:justify-start gap-1">
                  <a href="tel:+919445323935" className="hover:underline">
                    9445 32 3935
                  </a>
                  |
                  <a href="tel:+919344774744" className="hover:underline">
                    9344 77 4744
                  </a>
                </div>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-orange-500" />
                <a href="mailto:addon2011@gmail.com" className="hover:underline">
                  addon2011@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-8 mt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} ADD ON. Free to view and share.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-white" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
