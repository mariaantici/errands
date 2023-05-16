// ShowSelectedDate component using the date from DatePickerMobile or DatePicker
const ShowSelectedDate: React.FC<{ date: Date }> = ({ date }) => {
    // Render ShowSelectedDate
    return (
        <div className="text-center mt-3 mb-5">
            <h2 className="inline font-pacifico text-green-600 text-2xl">Errands </h2>
            <h2 className="inline font-pacifico text-xl">for {date && date.toLocaleString('en-US', { day: 'numeric', month: 'long' })}:</h2>
        </div>
    );
}

export default ShowSelectedDate;
