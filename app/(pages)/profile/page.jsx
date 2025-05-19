"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import NavBar from '@/components/nav-bar';
import Loading from '@/components/Loading';
import { EditProfile } from '@/components/editProfile';
import FooterSection from '@/components/footer-section';

export default function UserProfile() {
  const user = useSelector(state => state.user.user);

  if (user === null) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loading />
      </div>
    );
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavBar />

      <div className="max-w-4xl mx-auto px-4 py-8 mt-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-300">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-indigo-100 dark:border-indigo-900 shadow-lg">
                  {user.imageUrl === null ? (
                    <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                      <span className="text-4xl font-bold text-gray-500 dark:text-gray-300">
                        {getInitials(user.name)}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={user.imageUrl}
                      alt={`${user.name}'s profile`}
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* User Information */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.name}
                </h1>

                <div className="space-y-3 mt-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium">Email:</div>
                    <div className="text-gray-700 dark:text-gray-300">{user.email}</div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium">Phone:</div>
                    <div className="text-gray-700 dark:text-gray-300">{user.phone}</div>
                  </div>
                </div>

                <div className="mt-6">
                 <EditProfile user={user} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional profile sections could go here */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Account Status</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                <span className="text-gray-700 dark:text-gray-300">May 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}