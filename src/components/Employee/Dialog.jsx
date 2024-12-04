// components/Dialog.js
import React from 'react';
import { motion } from 'framer-motion';

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <motion.div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg z-10"
        variants={dialogVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Dialog;
