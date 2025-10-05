import React from 'react';

interface LogoButtonProps {
  onClick?: () => void;
  className?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg'; // add size prop
}

const LogoButton: React.FC<LogoButtonProps> = ({
  onClick,
  className = '',
  subtitle = 'Graphic Solution',
  size = 'md',
}) => {
  // size mapping
  const textSize = size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-6xl' : 'text-3xl';
  const subtitleSize = size === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <button
      onClick={onClick ?? (() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
      className={`flex flex-col items-center font-bold hover:opacity-90 transition-opacity relative bg-transparent border-none ${className}`}
    >
      <div className={`flex items-center gap-2 ${textSize} leading-none`}>
        <span
          className="text-green-500 relative"
          style={{
            textShadow: '2px 2px 4px rgba(34, 197, 94, 0.5)',
            WebkitTextStroke: '1px white',
          }}
        >
          ADD
        </span>
        <span
          className="text-orange-500 relative"
          style={{
            textShadow: '2px 2px 4px rgba(249, 115, 22, 0.5)',
            WebkitTextStroke: '1px white',
          }}
        >
          ON
        </span>
      </div>
      <span className={`text-black ${subtitleSize} -mt-1`}>{subtitle}</span>
    </button>
  );
};

export default LogoButton;
