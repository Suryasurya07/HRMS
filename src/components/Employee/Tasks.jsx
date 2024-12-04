import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulating data fetching from a backend or API
    const fetchedTasks = [
      {
        id: 1,
        title: 'Complete Project Report',
        description: 'Finish the report for the upcoming project deadline.',
        status: 'In Progress',
        assignedTo: 'John Doe',
        dueDate: '2024-11-20',
      },
      {
        id: 2,
        title: 'Fix Bug in Dashboard',
        description: 'Resolve the bug in the user dashboard that causes layout issues.',
        status: 'Pending',
        assignedTo: 'Jane Smith',
        dueDate: '2024-11-22',
      },
      {
        id: 3,
        title: 'Implement Feature X',
        description: 'Work on implementing the new feature requested by the client.',
        status: 'Completed',
        assignedTo: 'Samuel Lee',
        dueDate: '2024-11-15',
      },
      {
        id: 4,
        title: 'Prepare for Meeting',
        description: 'Prepare presentation slides for the weekly team meeting.',
        status: 'In Progress',
        assignedTo: 'Emily Davis',
        dueDate: '2024-11-17',
      },
    ];

    setTasks(fetchedTasks);
  }, []);

  return (
    <div className=" min-h-screen text-white p-6">
      <h2 className="text-3xl font-semibold mb-6">Employee Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p className="text-sm mb-2">{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
