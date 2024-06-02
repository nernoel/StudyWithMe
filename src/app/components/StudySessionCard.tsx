import React from 'react';

interface CardProps {
  title: string;
  description: string;
  userEmail : string; // CHANGE TO AUTHOR FIRST NAME LATER
}

const StudySessionCard: React.FC<CardProps> = ({title, description, userEmail }) => {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-white shadow">
      {/* Active users in session */}
      {/*
      <div className="flex -space-x-3 rtl:space-x-reverse">
        <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/path/to/image1.jpg" alt="User 1" />
        <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/path/to/image2.jpg" alt="User 2" />
        <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="/path/to/image3.jpg" alt="User 3" />
        <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
      </div>
      */}
      <img src="/path/to/image.jpg" className="h-24 w-24" alt="optional image" />
      <div className="p-4">
        <p className="mb-1 text-sm text-primary-500 text-gray-900">{userEmail} <time>{''}</time></p>
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-gray-500">{description}</p>
        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">Category 1</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">Category 2</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-600">Category 3</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-gray-100">REQUEST TO JOIN</span>
        </div>
      </div>
    </div>
  );
}

export default StudySessionCard;
