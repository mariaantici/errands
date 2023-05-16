import React, { useState } from 'react';

// Define the months array
const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// DatePicker component
const DatePicker: React.FC<{ selectedDate: Date | null; setSelectedDate: (date: Date | null) => void }> = ({
    selectedDate,
    setSelectedDate,
}) => {
    const [selectedMonth, setSelectedMonth] = useState(selectedDate ? selectedDate.getMonth() : new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(selectedDate ? selectedDate.getDate() - 1 : new Date().getDate() - 1);
    const [selectedYear, setSelectedYear] = useState(selectedDate ? selectedDate.getFullYear() : new Date().getFullYear());

    // Function to calculate days in a given month and year
    const daysInMonth = (month: number, year: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Function to render days in the selected month
    const renderDays = (): number[] => {
        const days: number[] = [];
        for (let i = 1; i <= daysInMonth(selectedMonth, selectedYear); i++) {
            days.push(i);
        }
        return days;
    };

    // Function to handle month changes
    const handleMonthChange = (index: number) => {
        setSelectedMonth(index);
        setSelectedDate(new Date(selectedYear, index, selectedDay + 1));
    };

    // Function to handle day changes
    const handleDayChange = (index: number) => {
        setSelectedDay(index);
        setSelectedDate(new Date(selectedYear, selectedMonth, index + 1));
    };

    // Render the DatePicker
    return (
        <div className="hidden md:block px-8">
            <div className="overflow-auto">
                <div className="flex flex-nowrap mb-2 justify-center">
                    {months.map((month, index) => (
                        <span
                            key={index}
                            className={`cursor-pointer px-2 text-md ${index === selectedMonth ? 'text-green-600 font-bold' : ''}`}
                            onClick={() => handleMonthChange(index)}
                        >
                            {month.slice(0, 3).toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="overflow-auto">
                <div className="flex flex-nowrap mb-5 justify-around">
                    {renderDays().map((day, index) => (
                        <span
                            key={index}
                            className={`cursor-pointer px-2 text-sm ${index === selectedDay ? 'text-green-600 font-bold' : ''}`}
                            onClick={() => handleDayChange(index)}
                        >
                            {day}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DatePicker;
