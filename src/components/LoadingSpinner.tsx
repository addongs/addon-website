import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-gray-900 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading content...</p>
      </div>
    </div>
  );
};
