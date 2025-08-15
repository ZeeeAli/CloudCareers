
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../base/Button';
import { useAuthContext } from '../../contexts/AuthContext';
import UserProfile from './UserProfile';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuthContext();
  const navigate = useNavigate();

  // Helper function to get display name (same logic as UserProfile)
  const getDisplayName = () => {
    if (userProfile?.name) return userProfile.name;
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0]; // Use email prefix as fallback
    return 'User';
  };

  // Helper function to get display initial
  const getDisplayInitial = () => {
    const displayName = getDisplayName();
    if (displayName !== 'User') {
      return displayName.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent" style={{ fontFamily: 'Pacifico, serif' }}>
                  CloudCareers
                </h1>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/jobs" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Jobs
              </a>
              <a href="/companies" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                Companies
              </a>
              <a href="/about" className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                About
              </a>
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <UserProfile user={user} userProfile={userProfile} onSignOut={handleSignOut} />
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-300 border-gray-600 hover:border-blue-400 hover:text-blue-400"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSignup}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white hover:bg-gray-700 px-2 py-2 rounded-md transition-colors duration-200"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/jobs" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Jobs
            </a>
            <a href="/companies" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Companies
            </a>
            <a href="/about" className="text-gray-300 hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              About
            </a>
            <div className="pt-4 pb-2 flex flex-col space-y-2">
              {user ? (
                <div className="px-3 py-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
                      {getDisplayInitial()}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{getDisplayName()}</p>
                      <p className="text-gray-400 text-xs">{userProfile?.role || 'User'}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-gray-300 border-gray-600 hover:border-red-400 hover:text-red-400"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-gray-300 border-gray-600 hover:border-blue-400 hover:text-blue-400"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleSignup}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
