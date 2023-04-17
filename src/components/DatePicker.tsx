import React, { useState } from 'react';

// Define the months array
const months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

// DatePicker component
const DatePicker: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState(new Date().getDate() - 1);
    const [selectedYear] = useState(new Date().getFullYear());

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

    // Render the DatePicker
    return (
        <>
            <div className="overflow-auto">
                <div className="flex flex-nowrap mb-2 sm:justify-center">
                    {months.map((month, index) => (
                        <span
                            key={index}
                            className={`cursor-pointer px-2 text-md ${index === selectedMonth ? 'text-green-600 font-bold' : ''}`}
                            onClick={() => setSelectedMonth(index)}
                        >
                            {month.slice(0, 3).toUpperCase()}
                        </span>
                    ))}
                </div>
            </div>
            <div className="overflow-auto">
                <div className="flex flex-nowrap mb-2 sm:mb-5 lg:justify-around">
                    {renderDays().map((day, index) => (
                        <span
                            key={index}
                            className={`cursor-pointer px-2 text-sm ${index === selectedDay ? 'text-green-600 font-bold' : ''}`}
                            onClick={() => setSelectedDay(index)}
                        >
                            {day}
                        </span>
                    ))}
                </div>
            </div>
            <div className="text-center mt-3 mb-5">
                <h2 className="inline font-pacifico text-green-600 text-2xl">Errands </h2>
                <h2 className="inline font-pacifico text-xl">for {selectedDay + 1} of {(months[selectedMonth])}:</h2>
            </div>
        </>
    );
};

export default DatePicker;
