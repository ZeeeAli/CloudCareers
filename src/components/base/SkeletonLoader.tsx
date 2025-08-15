
interface SkeletonLoaderProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`backdrop-blur-md bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-700 rounded-lg"></div>
            <div>
              <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="h-3 bg-gray-700 rounded w-16"></div>
        </div>
        <div className="h-5 bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="flex space-x-2 mb-4">
          <div className="h-6 bg-gray-700 rounded-full w-16"></div>
          <div className="h-6 bg-gray-700 rounded-full w-20"></div>
          <div className="h-6 bg-gray-700 rounded-full w-14"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
