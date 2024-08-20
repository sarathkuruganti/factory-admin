import React, { useEffect, useState } from 'react';

export function Account() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-t-4 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black to-black p-6">
          <h3 className="text-2xl font-bold text-white mb-2">Account Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="text-blue-500">
                <i className="fas fa-user fa-2x"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-600">Name</p>
                <p className="font-semibold">{userData.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-orange-500">
                <i className="fas fa-envelope fa-2x"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-600">Email</p>
                <p className="font-semibold">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-green-500">
                <i className="fas fa-phone fa-2x"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-600">Phone</p>
                <p className="font-semibold">{userData.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-red-500">
                <i className="fas fa-user-tag fa-2x"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-600">Role</p>
                <p className="font-semibold">{userData.userType}</p>
              </div>
            </div>
            <div className="flex items-center sm:col-span-2">
              <div className="text-purple-500">
                <i className="fas fa-map-marker-alt fa-2x"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-600">Address</p>
                <p className="font-semibold">{userData.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
