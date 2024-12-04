import { useState, useEffect } from 'react';
import axios from 'axios';

const useClockRecords = () => {
    const [clockRecords, setClockRecords] = useState([]);

    // Fetch clock records from JSON file
    useEffect(() => {
        const fetchClockRecords = async () => {
            try {
                const response = await axios.get('/data/clockRecords.json');
                setClockRecords(response.data);
            } catch (error) {
                console.error('Error fetching clock records:', error);
            }
        };
        fetchClockRecords();
    }, []);

    // Add new clock record
    const addClockRecord = async (record) => {
        const newRecords = [...clockRecords, record];
        setClockRecords(newRecords);
        try {
            await axios.post('/data/clockRecords.json', newRecords); // Adjust API call based on your backend
        } catch (error) {
            console.error('Error updating clock records:', error);
        }
    };

    return { clockRecords, addClockRecord };
};

export default useClockRecords;
