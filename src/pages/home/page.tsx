import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import { useAuth } from '../../hooks/useAuth';
import { jobService } from '../../services/jobService';
import type { Job } from '../../services/jobService';

export default function Home() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showSignup, setShowSignup] = useState(false);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Load featured jobs from Firebase
  useEffect(() => {
    const loadFeaturedJobs = async () => {
      try {
        const jobs = await jobService.getFeaturedJobs();
        setFeaturedJobs(jobs);
      } catch (error) {
        console.error('Error loading featured jobs:', error);
        // Fallback to empty array if Firebase fails
        setFeaturedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedJobs();
  }, []);

  const stats = [
    { label: 'Active Jobs', value: '2,500+', icon: 'ri-briefcase-line' },
    { label: 'Companies', value: '500+', icon: 'ri-building-line' },
    { label: 'Remote Workers', value: '50k+', icon: 'ri-team-line' },
    { label: 'Success Rate', value: '94%', icon: 'ri-trophy-line' }
  ];

  const handleViewDetails = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(signupData.email, signupData.password, signupData.name);
      console.log('User registered successfully');
      setShowSignup(false);
      setSignupData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show error message to user)
    }
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20professional%20remote%20work%20environment%20with%20laptops%2C%20home%20office%20setup%2C%20contemporary%20workspace%20design%2C%20clean%20minimalist%20background%20with%20subtle%20technology%20elements%2C%20soft%20lighting%2C%20productivity%20focused%20atmosphere%2C%20digital%20nomad%20lifestyle%20inspiration&width=1920&height=800&seq=hero1&orientation=landscape')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Find Your Perfect{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Remote Job
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                Connect with top companies offering remote opportunities. Work from anywhere,
                grow your career, and achieve the perfect work-life balance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/jobs')}
                  className="text-lg px-8 py-4"
                >
                  Explore Jobs
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                  onClick={() => navigate('/companies')}
                >
                  Browse Companies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-blue-400">
                  <i className={`${stat.icon} text-3xl`}></i>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Remote Jobs
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hand-picked opportunities from companies that embrace remote work culture
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400">{job.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">{job.salary}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(job.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/jobs')}
            >
              View All Jobs
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Remote Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have found their dream remote jobs through our platform
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowSignup(true)}
              className="text-lg px-8 py-4"
            >
              Join Our Community
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Pacifico, serif' }}>
                CloudCareers
              </h3>
              <p className="text-gray-400">
                The premier platform for remote job opportunities worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/jobs" className="hover:text-blue-400 transition-colors">Browse Jobs</a></li>
                <li><a href="/companies" className="hover:text-blue-400 transition-colors">Companies</a></li>
                <li><a href="/career-resources" className="hover:text-blue-400 transition-colors">Career Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                <li><a href="/blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 CloudCareers. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-200">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200 relative">
            {/* Close Button - Top Right */}
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg group"
              aria-label="Close modal"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {/* Fallback close icon using CSS if Remix icon doesn't load */}
                <div className="w-5 h-5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-1 bg-current transform rotate-45"></div>
                    <div className="w-5 h-1 bg-current transform -rotate-45 absolute"></div>
                  </div>
                </div>
              </div>
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Join Our Community</h2>
            </div>

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a password"
                />
              </div>

              {/* FIX: Remove 'type' prop from Button, use native button element */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg w-full mt-6 transition-all duration-200"
              >
                Create Account
              </button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-4">
              Already have an account?{' '}
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}