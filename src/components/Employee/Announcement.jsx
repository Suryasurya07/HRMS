import React from 'react';

const Announcement = ({ announcements }) => {
  const announcementList = announcements.split('. '); // Split announcements by period for display

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Announcements</h2>
      <ul className="list-disc pl-5">
        {announcementList.map((announcement, index) => (
          <li key={index} className="text-gray-200 mb-1">
            {announcement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcement;
