import { useState } from 'react';
import Navigation from '../../components/feature/Navigation';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  size: string;
  location: string;
  website: string;
  openJobs: number;
  tags: string[];
}

export default function Companies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');

  const companies: Company[] = [
    // ...existing companies...
    {
      id: '1',
      name: 'TechFlow Inc.',
      logo: 'https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20design%2C%20clean%20minimal%20corporate%20branding%2C%20blue%20and%20white%20colors%2C%20professional%20tech%20startup%20identity&width=100&height=100&seq=comp1&orientation=squarish',
      description: 'Leading provider of cloud-based software solutions for enterprises worldwide.',
      industry: 'Technology',
      size: '100-500',
      location: 'San Francisco, CA',
      website: 'https://techflow.com',
      openJobs: 12,
      tags: ['React', 'Node.js', 'AWS', 'Remote-First']
    },
    // ...other companies...
    {
      id: '2',
      name: 'DesignCraft Studio',
      logo: 'https://readdy.ai/api/search-image?query=creative%20design%20studio%20logo%2C%20artistic%20colorful%20branding%2C%20modern%20graphic%20design%20company%20identity%2C%20vibrant%20colors&width=100&height=100&seq=comp2&orientation=squarish',
      description: 'Award-winning design studio specializing in digital experiences and brand identity.',
      industry: 'Design',
      size: '50-100',
      location: 'New York, NY',
      website: 'https://designcraft.com',
      openJobs: 8,
      tags: ['Figma', 'Adobe Creative', 'UI/UX', 'Branding']
    },
    {
      id: '3',
      name: 'CloudScale Solutions',
      logo: 'https://readdy.ai/api/search-image?query=cloud%20computing%20company%20logo%2C%20professional%20enterprise%20software%20branding%2C%20modern%20tech%20corporation%20identity%2C%20blue%20and%20gray%20colors&width=100&height=100&seq=comp3&orientation=squarish',
      description: 'Enterprise cloud infrastructure and DevOps solutions for modern businesses.',
      industry: 'Technology',
      size: '200-1000',
      location: 'Austin, TX',
      website: 'https://cloudscale.com',
      openJobs: 15,
      tags: ['Docker', 'Kubernetes', 'AWS', 'DevOps']
    },
    {
      id: '4',
      name: 'DataInsight Analytics',
      logo: 'https://readdy.ai/api/search-image?query=data%20analytics%20company%20logo%2C%20modern%20business%20intelligence%20branding%2C%20professional%20corporate%20identity%2C%20green%20and%20blue%20colors&width=100&height=100&seq=comp4&orientation=squarish',
      description: 'Advanced data analytics and machine learning solutions for enterprise clients.',
      industry: 'Data & Analytics',
      size: '100-500',
      location: 'Seattle, WA',
      website: 'https://datainsight.com',
      openJobs: 10,
      tags: ['Python', 'Machine Learning', 'SQL', 'Tableau']
    },
    {
      id: '5',
      name: 'GrowthMark Digital',
      logo: 'https://readdy.ai/api/search-image?query=digital%20marketing%20agency%20logo%2C%20creative%20advertising%20company%20branding%2C%20modern%20marketing%20firm%20identity%2C%20orange%20and%20purple%20colors&width=100&height=100&seq=comp5&orientation=squarish',
      description: 'Full-service digital marketing agency helping brands grow their online presence.',
      industry: 'Marketing',
      size: '25-50',
      location: 'Los Angeles, CA',
      website: 'https://growthmark.com',
      openJobs: 6,
      tags: ['SEO', 'Social Media', 'Content Marketing', 'Analytics']
    },
    {
      id: '6',
      name: 'InnovateX Labs',
      logo: 'https://readdy.ai/api/search-image?query=innovation%20lab%20company%20logo%2C%20futuristic%20tech%20startup%20branding%2C%20modern%20research%20and%20development%20identity%2C%20purple%20and%20cyan%20colors&width=100&height=100&seq=comp6&orientation=squarish',
      description: 'R&D lab focused on emerging technologies and innovative product development.',
      industry: 'Technology',
      size: '50-100',
      location: 'Boston, MA',
      website: 'https://innovatex.com',
      openJobs: 9,
      tags: ['AI/ML', 'IoT', 'Blockchain', 'Research']
    }
  ];

  const industries = ['All Industries', 'Technology', 'Design', 'Data & Analytics', 'Marketing'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesIndustry = !selectedIndustry || selectedIndustry === 'All Industries' || company.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Remote Companies
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore innovative companies that embrace remote work and offer incredible opportunities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                      <i className="ri-search-line"></i>
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredCompanies.length} companies
            </div>
          </Card>
        </div>

        {/* Companies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              <Card className="h-full flex flex-col">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200">
                      {company.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{company.industry}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {company.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {company.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                  {company.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-600/20 text-gray-400 border border-gray-600/30">
                      +{company.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-map-pin-line"></i>
                    </div>
                    {company.location}
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-team-line"></i>
                    </div>
                    {company.size} employees
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-2">
                      <i className="ri-briefcase-line"></i>
                    </div>
                    {company.openJobs} open positions
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                  <Button variant="outline" size="sm">
                    View Jobs ({company.openJobs})
                  </Button>
                  <button
                    onClick={() => window.open(company.website, '_blank')}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-1"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-external-link-line"></i>
                    </div>
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-gray-500">
              <i className="ri-building-line text-4xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No companies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}