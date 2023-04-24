import { useState } from "react";
import ReactDatePicker from "@/components/datepickers/ReactDatePicker";

// DatePickerMobile component using ReactDatePicker
const DatePickerMobile: React.FC<{ selectedDate: Date | null; setSelectedDate: (date: Date | null) => void }> = ({
    selectedDate,
    setSelectedDate,
}) => {
    // Render DatePickerMobile
    return (
        <>
            <div className="md:hidden flex justify-center">
                <div className="flex items-baseline">
                    <h2 className="whitespace-nowrap mr-2">Select date:</h2>
                    <ReactDatePicker className="input mb-3 w-[108px]"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                    />
                </div>
            </div>
        </>
    );
}

export default DatePickerMobile;
