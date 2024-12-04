// components/Employee/UpcomingHolidayBox.js
import React from 'react';

const UpcomingHolidayBox = ({ holidays }) => {
    if (!holidays || holidays.length === 0) return null;

    return (
        <div className="bg-yellow-200 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Holidays</h2>
            <ul className="space-y-3">
                {holidays.slice(0, 3).map((holiday, index) => (
                    <li key={index} className="bg-white rounded-md p-3 shadow-sm">
                        <p className="text-gray-700">
                            <strong>{holiday.name}</strong> is on {new Date(holiday.date).toLocaleDateString()}.
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingHolidayBox;
