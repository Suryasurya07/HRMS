// src/utils/holidayUtils.js

export const getUpcomingHoliday = () => {
    const holidays = [
        { date: new Date('2024-10-15'), name: 'Diwali' },
        { date: new Date('2024-11-01'), name: 'Thanksgiving' },
        { date: new Date('2024-12-25'), name: 'Christmas' },
    ];

    const today = new Date();
    const upcomingHolidays = holidays
        .filter(holiday => holiday.date > today)
        .sort((a, b) => a.date - b.date);

    return upcomingHolidays.length > 0 ? upcomingHolidays[0] : null;
};
