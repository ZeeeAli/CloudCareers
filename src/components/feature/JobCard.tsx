
import { useNavigate } from 'react-router-dom';
import Card from '../base/Card';
import Button from '../base/Button';
import type { Job } from '../../services/jobService';

interface JobCardProps {
  job: Job;
  onViewDetails?: (job: Job) => void;
}

export default function JobCard({ job, onViewDetails }: JobCardProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Remote': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Full-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Part-time': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Contract': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Design': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Engineering': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Marketing': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Sales': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Product': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'Data': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Content': 'bg-violet-500/20 text-violet-400 border-violet-500/30'
    };
    return tagColors[tag] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(job);
    } else {
      navigate(`/job/${job.id}`);
    }
  };

  return (
    <Card className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiByeD0iOCIgZmlsbD0iIzM3NDE1MSIvPgo8dGV4dCB4PSIyNCIgeT0iMjkiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QzwvdGV4dD4KPC9zdmc+';
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
              {job.title}
            </h3>
            <p className="text-gray-400 text-sm">{job.company}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">
          {formatDate(job.postedDate)}
        </span>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          {job.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)} transition-all duration-200 hover:scale-105`}
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium rounded-full border bg-gray-600/20 text-gray-400 border-gray-600/30">
              +{job.tags.length - 4} more
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm line-clamp-2 mb-3">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-map-pin-line"></i>
              </div>
              {job.location}
            </span>
            <span className="flex items-center">
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              {job.salary}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center space-x-2">
          <button className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-heart-line"></i>
            </div>
          </button>
          <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-share-line"></i>
            </div>
          </button>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleViewDetails}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
