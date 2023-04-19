// List of sample errands
const recommendedErrands: string[] = ['Buy groceries', 'Do laundry', 'Wash dishes', 'Take out the trash', 'Vacuum the floor', 'Clean the bathroom', 'Make the bed', 'Cook a meal', 'Water the plants', 'Pay bills', 'Wash the car', 'Walk the dog', 'Change light bulbs', 'Dust the furniture', 'Clean the windows', 'Iron clothes', 'Mop the floor', 'Check the mail', 'Replace air filters', 'Wash bedding', 'Clean the refrigerator', 'Organize the pantry', 'Sweep the porch', 'Clean the oven', 'Trim the lawn', 'Rake leaves', 'Shovel snow', 'Clean the gutters', 'Wipe down countertops', 'Declutter a room']

// RecommendedErrands component
const RecommendedErrands: React.FC = () => {
    // Render RecommendedErrands
    return (
        <div className="card max-w-[95%] mx-auto bg-backgroundPrimary border-2 border-border rounded-3xl">
            <div className="mx-auto mt-7">
                <h2 className="font-pacifico text-2xl text-center">Recommended Errands</h2>
                <p className="mt-[-px] text-sm text-green-600 text-center tracking-wide">because grown-ups need reminders too</p>
            </div>
            <div className="mt-5 mb-7 mx-5 flex flex-wrap gap-3 justify-center">
                {recommendedErrands.map((errand, index) => (
                    <button key={index} className="btn btn-outline-success rounded-full text-content1">
                        {errand}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default RecommendedErrands;