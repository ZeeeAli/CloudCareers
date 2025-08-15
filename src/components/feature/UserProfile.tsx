import { useState } from 'react';
import type { User } from 'firebase/auth';
import type { UserProfile as UserProfileType } from '../../services/authService';
import Button from '../base/Button';

interface UserProfileProps {
  user: User;
  userProfile: UserProfileType | null;
  onSignOut: () => void;
}

export default function UserProfile({ user, userProfile, onSignOut }: UserProfileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Helper function to get display name
  const getDisplayName = () => {
    if (userProfile?.name) return userProfile.name;
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0]; // Use email prefix as fallback
    return 'User';
  };

  // Helper function to get display initial
  const getDisplayInitial = () => {
    const displayName = getDisplayName();
    if (displayName !== 'User') {
      return displayName.charAt(0).toUpperCase();
    }
    return user.email?.charAt(0).toUpperCase() || 'U';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    setIsDropdownOpen(false);
    onSignOut();
  };

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-sm">
          {getDisplayInitial()}
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-medium text-white">{getDisplayName()}</p>
          <p className="text-xs text-gray-400">{userProfile?.role || 'User'}</p>
        </div>
        <div className="w-4 h-4 flex items-center justify-center">
          <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-lg">
                {getDisplayInitial()}
              </div>
              <div>
                <p className="text-white font-medium">{getDisplayName()}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <p className="text-blue-400 text-xs font-medium capitalize">{userProfile?.role || 'User'}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <i className="ri-user-line text-lg"></i>
                <span>Profile</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <i className="ri-settings-line text-lg"></i>
                <span>Settings</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <i className="ri-heart-line text-lg"></i>
                <span>Saved Jobs</span>
              </div>
            </button>
          </div>

          {/* Sign Out Button */}
          <div className="px-4 py-2 border-t border-gray-700">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-red-400 border-red-500/30 hover:border-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleSignOut}
            >
              <i className="ri-logout-box-line mr-2"></i>
              Sign Out
            </Button>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
