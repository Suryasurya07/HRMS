
import React from 'react';
import { motion } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Logout = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-end">
          <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded" onClick={onClose}>
            No
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Logout;
