import { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  jobCount: number;
}

interface FilterState {
  location: string;
  type: string;
  category: string;
  salary: string;
}

export default function SearchAndFilter({ onSearch, onFilterChange, jobCount }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    type: '',
    category: '',
    salary: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = { location: '', type: '', category: '', salary: '' };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="w-5 h-5 flex items-center justify-center text-gray-400">
              <i className="ri-search-line"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder="Search jobs, companies, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm backdrop-blur-md"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {/* FIX: Use native button element for submit */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Filter Toggle and Results Count */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 hover:text-white hover:border-blue-500/50 transition-all duration-200 backdrop-blur-md"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-filter-line"></i>
            </div>
            <span className="text-sm">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="text-sm text-gray-400">
          {jobCount} {jobCount === 1 ? 'job' : 'jobs'} found
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-8"
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Job Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-8"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-8"
              >
                <option value="">All Categories</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Product">Product</option>
                <option value="Data">Data</option>
                <option value="Content">Content</option>
              </select>
            </div>

            {/* Salary Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Salary Range</label>
              <select
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-8"
              >
                <option value="">Any Salary</option>
                <option value="0-50k">$0 - $50k</option>
                <option value="50k-80k">$50k - $80k</option>
                <option value="80k-120k">$80k - $120k</option>
                <option value="120k+">$120k+</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}