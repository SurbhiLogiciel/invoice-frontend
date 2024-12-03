import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../../utils/http';

export type DropdownColor = 'success' | 'danger';

const SettingsIcon: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { userId } = useParams<{ userId: string }>();

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutUser = async () => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      const response = await apiClient.post('/logout',);

      if (response.status === 200) {
        console.log('User logged out successfully');
        localStorage.removeItem('token');
        window.location.href = '/login'; 
      }
    } catch (error) {
      console.error('Failed to logout user', error);
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === 'Logout') {
      handleLogoutUser(); 
    } else {
      alert(`${option} clicked`);
    }
    setDropdownOpen(false); 
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleToggleDropdown}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        aria-label="Settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-12 h-12 text-white"
        >
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm8.5-3.5c0 .43-.06.84-.15 1.24l1.71 1.33a1 1 0 0 1 .22 1.41l-1.62 2.81a1 1 0 0 1-1.28.37l-2.02-.81a7.5 7.5 0 0 1-1.07.62l-.31 2.14a1 1 0 0 1-1 .85h-3.5a1 1 0 0 1-1-.85l-.31-2.14a7.5 7.5 0 0 1-1.07-.62l-2.02.81a1 1 0 0 1-1.28-.37l-1.62-2.81a1 1 0 0 1 .22-1.41l1.71-1.33c-.09-.4-.15-.81-.15-1.24s.06-.84.15-1.24L3.96 9.93a1 1 0 0 1-.22-1.41l1.62-2.81a1 1 0 0 1 1.28-.37l2.02.81a7.5 7.5 0 0 1 1.07-.62l.31-2.14a1 1 0 0 1 1-.85h3.5a1 1 0 0 1 1 .85l.31 2.14a7.5 7.5 0 0 1 1.07.62l2.02-.81a1 1 0 0 1 1.28.37l1.62 2.81a1 1 0 0 1-.22 1.41l-1.71 1.33c.09.4.15.81.15 1.24z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-white border rounded shadow-lg">
          <ul>
            <li
              onClick={() => handleOptionClick('Settings')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Settings
            </li>
            <li
              onClick={() => handleOptionClick('Profile')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Profile
            </li>
            <li
              onClick={() => handleOptionClick('Logout')}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsIcon;
