import { create } from 'zustand';

// Zustand state management
const useHRStore = create((set) => {
  // Function to fetch employee data from JSON file
  const fetchEmployees = async () => {
    try {
      const response = await fetch('backend/employeeslist.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched Employees:', data); // Log the fetched data
      return Array.isArray(data) ? data : []; 
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      return []; // Return an empty array in case of error
    }
  };

  // Initialize store with fetched employees
  const initializeEmployees = async () => {
    const initialEmployees = await fetchEmployees();
    set({ 
      employees: initialEmployees,
      totalEmployees: initialEmployees.length // Set the total employee count directly
    });
  };

  // Initialize state when store is created
  initializeEmployees();

  return {
    employees: [], // Default empty array
    totalEmployees: 0, // Initialize totalEmployees to 0
    attendance: [],
    tasks: [
      { task: 'Complete project report', done: false },
      { task: 'Prepare salary slip', done: true },
      { task: 'Employee meeting', done: false },
    ],
    addEmployee: (employee) => set((state) => ({
      employees: [...state.employees, employee],
      totalEmployees: state.employees.length + 1 // Increment totalEmployees
    })),
    addTask: (task) => set((state) => ({
      tasks: [...state.tasks, { task, done: false }],
    })),
    toggleTask: (index) => set((state) => ({
      tasks: state.tasks.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    })),
    setAttendance: (attendance) => set(() => ({ attendance })),
  };
});

export default useHRStore;
