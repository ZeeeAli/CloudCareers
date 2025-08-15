
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../../components/feature/Navigation';
import Button from '../../components/base/Button';
import LoadingSpinner from '../../components/base/LoadingSpinner';
import { jobService } from '../../services/jobService';
import { useAuthContext } from '../../contexts/AuthContext';
import type { Job } from '../../services/jobService';

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      if (!id) {
        navigate('/jobs');
        return;
      }

      try {
        setLoading(true);
        const jobData = await jobService.getJobById(id);

        if (jobData) {
          setJob(jobData);
        } else {
          navigate('/jobs');
        }
      } catch (error) {
        console.error('Error loading job:', error);
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id, navigate]);

  const handleApplyNow = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    if (!job || !job.companyWebsite) return;

    setApplying(true);

    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to company website
    window.open(job.companyWebsite, '_blank');

    setApplying(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Job Not Found</h2>
            <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Navigation />

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-line text-2xl text-blue-400"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
              <p className="text-gray-400">You need to be logged in to apply for this job.</p>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleLoginRedirect}
              >
                <i className="ri-login-box-line mr-2"></i>
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleSignupRedirect}
              >
                <i className="ri-user-add-line mr-2"></i>
                Create Account
              </Button>
            </div>
            
            <button
              onClick={closeLoginPrompt}
              className="mt-4 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/jobs')}
            className="text-sm"
          >
            <div className="w-4 h-4 flex items-center justify-center mr-2">
              <i className="ri-arrow-left-line"></i>
            </div>
            Back to Jobs
          </Button>
        </div>

        {/* Job Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                <img
                  src={job.logo}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <p className="text-xl text-gray-300 mb-3">{job.company}</p>
                <div className="flex items-center space-x-6 text-gray-400">
                  <span className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-map-pin-line"></i>
                    </div>
                    {job.location}
                  </span>
                  <span className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-briefcase-line"></i>
                    </div>
                    {job.type}
                  </span>
                  <span className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center mr-2">
                      <i className="ri-money-dollar-circle-line"></i>
                    </div>
                    {job.salary}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-400">Posted</span>
              <p className="text-white font-medium">
                {new Date(job.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-8">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Apply Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleApplyNow}
              disabled={applying}
              className="px-8"
            >
              {applying ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Redirecting...
                </>
              ) : (
                <>
                  <i className="ri-send-plane-line mr-2"></i>
                  {user ? 'Apply Now' : 'Login to Apply'}
                </>
              )}
            </Button>
            <button className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-heart-line text-xl"></i>
              </div>
            </button>
            <button className="text-gray-400 hover:text-blue-400 transition-colors duration-200 p-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-share-line text-xl"></i>
              </div>
            </button>
          </div>

          {/* Authentication Status */}
          {!user && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <i className="ri-information-line text-blue-400"></i>
                <p className="text-blue-300 text-sm">
                  <span className="font-medium">Not logged in?</span> Create an account or sign in to apply for this position and track your applications.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Job Description</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 text-blue-400">
                      <i className="ri-check-line"></i>
                    </div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Benefits & Perks</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5 text-green-400">
                      <i className="ri-gift-line"></i>
                    </div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Summary */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Job Summary</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-sm">Job Type</span>
                  <p className="text-white font-medium">{job.type}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Category</span>
                  <p className="text-white font-medium">{job.category}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Location</span>
                  <p className="text-white font-medium">{job.location}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Salary Range</span>
                  <p className="text-white font-medium">{job.salary}</p>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">About {job.company}</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-700">
                  <img
                    src={job.logo}
                    alt={`${job.company} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{job.company}</p>
                  <p className="text-gray-400 text-sm">Technology Company</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.open(job.companyWebsite, '_blank')}
              >
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <i className="ri-external-link-line"></i>
                </div>
                Visit Company Website
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
