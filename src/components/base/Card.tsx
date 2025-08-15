
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <div className={`
      backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-xl p-6
      shadow-lg shadow-gray-900/20
      ${hover ? 'transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
