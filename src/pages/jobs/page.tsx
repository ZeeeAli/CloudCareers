import { useState, useEffect, useMemo } from 'react';
import Navigation from '../../components/feature/Navigation';
import SearchAndFilter from '../../components/feature/SearchAndFilter';
import JobCard from '../../components/feature/JobCard';
import { SkeletonList } from '../../components/base/SkeletonLoader';
import Button from '../../components/base/Button';
import { jobService } from '../../services/jobService';
import type { Job } from '../../services/jobService';
import { seedDatabase } from '../../utils/seedData';

interface FilterState {
  location: string;
  type: string;
  category: string;
  salary: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    type: '',
    category: '',
    salary: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobsPerPage = 10;

  // Load jobs from Firebase
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await jobService.getAllJobs();
        setJobs(jobsData);
      } catch (error) {
        console.error('Error loading jobs:', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Filter and search jobs
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply other filters
    if (filters.location) {
      filtered = filtered.filter(job => job.location === filters.location);
    }
    if (filters.type) {
      filtered = filtered.filter(job => job.type === filters.type);
    }
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }
    if (filters.salary) {
      // Simple salary filtering logic
      filtered = filtered.filter(job => {
        const salary = job.salary.toLowerCase();
        if (filters.salary === '0-50k') return salary.includes('45k') || salary.includes('40k') || salary.includes('35k');
        if (filters.salary === '50k-80k') return salary.includes('55k') || salary.includes('60k') || salary.includes('70k') || salary.includes('75k');
        if (filters.salary === '80k-120k') return salary.includes('80k') || salary.includes('85k') || salary.includes('90k') || salary.includes('95k') || salary.includes('100k') || salary.includes('110k');
        if (filters.salary === '120k+') return salary.includes('120k') || salary.includes('125k') || salary.includes('130k') || salary.includes('140k') || salary.includes('150k');
        return true;
      });
    }

    return filtered;
  }, [jobs, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Dream Job</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover thousands of job opportunities with all the information you need. Its your future.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1);
          }}
          jobCount={filteredJobs.length}
        />

        {/* Jobs List */}
        <div className="mt-12">
          {loading ? (
            <SkeletonList count={6} />
          ) : (
            <>
              {/* Jobs Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentJobs.map((job, index) => (
                  <div
                    key={job.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <JobCard job={job} onViewDetails={handleViewDetails} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-arrow-left-line"></i>
                    </div>
                    Previous
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <div className="w-4 h-4 flex items-center justify-center ml-2">
                      <i className="ri-arrow-right-line"></i>
                    </div>
                  </Button>
                </div>
              )}

              {/* No Results */}
              {filteredJobs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-gray-500">
                    <i className="ri-search-line text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No jobs found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>

                  {/* Add Sample Jobs Button */}
                  <Button
                    variant="primary"
                    onClick={async () => {
                      try {
                        await seedDatabase();
                        // Reload jobs after seeding
                        const jobsData = await jobService.getAllJobs();
                        setJobs(jobsData);
                      } catch (error) {
                        console.error('Error seeding database:', error);
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-database-2-line"></i>
                    </div>
                    Add Sample Jobs
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                  <img
                    src={selectedJob.logo}
                    alt={`${selectedJob.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                  <p className="text-xl text-gray-300 mb-3">{selectedJob.company}</p>
                  <div className="flex items-center space-x-6 text-gray-400">
                    <span className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-2">
                        <i className="ri-map-pin-line"></i>
                      </div>
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-2">
                        <i className="ri-briefcase-line"></i>
                      </div>
                      {selectedJob.type}
                    </span>
                    <span className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center mr-2">
                        <i className="ri-money-dollar-circle-line"></i>
                      </div>
                      {selectedJob.salary}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-xl"></i>
                </div>
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {selectedJob.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Job Description</h3>
              <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
            </div>

            {/* Requirements */}
            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 text-blue-400">
                        <i className="ri-check-line"></i>
                      </div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Benefits & Perks</h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 text-green-400">
                        <i className="ri-gift-line"></i>
                      </div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-6 border-t border-gray-700">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  closeModal();
                  // Navigate to full job details page
                  window.location.href = `/job/${selectedJob.id}`;
                }}
                className="px-8"
              >
                View Full Details
              </Button>
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}