import { forwardRef } from "react";
import React from "react";
import DatePicker from "react-datepicker";

// Importing the styles for the react-datepicker
import "react-datepicker/dist/react-datepicker.css";

// Defining the props for the ReactDatePicker component
interface ReactDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholder?: string;
  minDate?: Date | null;
}

const DatepickerInput = ({ ...props }, ref: any) => (
  <input type="text" {...props} readOnly />
);

export const CustomDatepickerInput = forwardRef(DatepickerInput);

// ReactDatePicker component
const ReactDatePicker: React.FC<ReactDatePickerProps> = ({
  selected,
  onChange,
  className,
  placeholder,
  minDate = new Date(),
}) => {
  //Render ReactDatePicker
  return (
    <DatePicker
      className={className}
      placeholderText={placeholder}
      selected={selected}
      onChange={onChange}
      minDate={minDate}
      onFocus={(e) => (e.target.readOnly = true)}
      customInput={<CustomDatepickerInput />}
    />
  );
};

export default ReactDatePicker;
