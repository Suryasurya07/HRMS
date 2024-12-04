// src/components/Employee/BirthdayBox.jsx
import React from 'react';
import { FaBirthdayCake } from 'react-icons/fa';

const BirthdayBox = () => (
  <div className="flex flex-col items-center justify-center text-center text-gray-600">
    <FaBirthdayCake className="text-4xl text-purple-300 mb-2" />
    <p className="text-lg font-semibold">No Birthday Buddies Found</p>
  </div>
);

export default BirthdayBox;
