import React, { useState } from 'react';
import { DatePicker } from 'react-rainbow-components';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
import LeaveRequestForm from '../../pages/HR/LeaveRequestForm'; // Assuming you have this component

const StyledDatePickerContainer = styled.div`
  .rainbow-datepicker {
    border: 2px solid #4caf50;
    border-radius: 15px;
    overflow: hidden;
  }

  .rainbow-datepicker_input {
    border-radius: 15px;
    font-size: 16px;
    padding: 12px;
    background-color: #f0f8ff;
    border: 1px solid #dcdcdc;
  }

  .rainbow-datepicker_calendar {
    background: linear-gradient(135deg, #4caf50, #81c784);
    color: white;
    border-radius: 15px;
  }

  .rainbow-datepicker_day--selected {
    background-color: #ff5722 !important;
    color: white !important;
    border-radius: 50% !important;
    box-shadow: 0 0 10px rgba(255, 87, 34, 0.8);
  }

  .rainbow-datepicker_day:hover {
    background-color: #ffe0b2 !important;
    border-radius: 50%;
  }
`;

const calendarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const DashboardCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleDateClick = (selectedDate) => {
    setDate(selectedDate);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  return (
    <motion.div
      className="p-4 rounded-2xl shadow-lg mb-6 bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      variants={calendarVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-lg font-semibold flex items-center border-b border-gray-400 mb-4">
        <CalendarIcon className="mr-2" /> Calendar
      </h2>

      {/* Styled DatePicker */}
      <StyledDatePickerContainer>
        <DatePicker
          value={date}
          onChange={handleDateClick}
          placeholder="Pick a date"
          formatStyle="medium"
          className="rainbow-m-around_medium"
        />
      </StyledDatePickerContainer>

      {/* Leave Request Form Overlay */}
      {isFormVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 sm:w-96 relative z-20">
            <h3 className="text-xl font-semibold mb-4">Leave Request</h3>

            <LeaveRequestForm
              selectedDate={date}
              onClose={closeForm}
            />

            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardCalendar;
