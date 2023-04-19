import { useState } from "react";
import ReactDatePicker from "./ReactDatePicker";

// DatePickerMobile component using ReactDatePicker
const DatePickerMobile: React.FC = () => {
    // State for managing selected date initialized with the current date
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    // Render DatePickerMobile
    return (
        <>
            <div className="md:hidden flex justify-center">
                <div className="flex items-baseline">
                    <h2 className="whitespace-nowrap mr-2">Select date:</h2>
                    <ReactDatePicker className="input mb-3 w-[108px]"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
            </div>
            <div className="text-center mt-3 mb-5">
                <h2 className="inline font-pacifico text-green-600 text-2xl">Errands </h2>
                <h2 className="inline font-pacifico text-xl">for {startDate && startDate.toLocaleString('en-US', { day: 'numeric', month: 'long' })}:</h2>
            </div>
        </>
    );
}

export default DatePickerMobile;