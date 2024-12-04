// src/states/useSidebarState.js

import { useState } from 'react';

const useSidebarState = () => {
  const [expandedSections, setExpandedSections] = useState({
    main: false,
    information: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return { expandedSections, toggleSection };
};

export default useSidebarState; // Ensure this line is present
