import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: Array<{ label: string; url: string; onClick?: () => void; icon?: React.ReactNode }>;
  title?: string;
}

export const ContactModal: FC<ContactModalProps> = ({
  isOpen,
  onClose,
  options,
  title = 'Select an Option',
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          style={{ minHeight: '100vh' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-auto"
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">{title}</h3>
            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => {
                    if (option.onClick) option.onClick();
                    else window.open(option.url, '_blank');
                    onClose();
                  }}
                  className="flex items-center px-4 py-2 bg-green-50 text-gray-900 rounded-lg hover:bg-green-100 transition-colors"
                >
                  {option.icon && <span>{option.icon}</span>}
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium w-full"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
    