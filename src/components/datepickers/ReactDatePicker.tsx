import React from 'react';
import DatePicker from 'react-datepicker';

// Importing the styles for the react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

// Defining the props for the ReactDatePicker component
interface ReactDatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    className?: string;
    placeholder?: string;
}

// ReactDatePicker component
const ReactDatePicker: React.FC<ReactDatePickerProps> = ({ selected, onChange, className, placeholder }) => {
    // Get the current date to disable all the days before the current day
    const currentDate = new Date();

    //Render ReactDatePicker
    return (
        <DatePicker
            className={className}
            placeholderText={placeholder}
            selected={selected}
            onChange={onChange}
            minDate={currentDate}
        />
    );
};

export default ReactDatePicker;
