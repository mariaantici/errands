import React from "react";
import AddErrandForm from "@/components/tabContent/addErrands/AddErrandForm";

// List of sample errands
const recommendedErrands: { list: string, errands: string[] }[] = [
    {
        list: 'household',
        errands: ['Buy groceries', 'Do laundry', 'Wash dishes', 'Take out trash', 'Vacuum floor', 'Clean bathroom', 'Make bed', 'Cook meal', 'Water plants', 'Pay bills', 'Wash car', 'Walk dog', 'Change bulbs', 'Dust furniture', 'Clean windows', 'Iron clothes', 'Mop floor', 'Replace filters', 'Wash bedding', 'Clean the refrigerator', 'Organize the pantry', 'Declutter a room', 'Clean the oven', 'Trim the lawn'],
    },
    {
        list: 'trip',
        errands: ['Book accommodations', 'Research attractions', 'Arrange transport', 'Pack luggage', 'Charge devices', 'Check forecast', 'Confirm reservations', 'Organize travel documents', 'Get travel insurance', 'Check in online', 'Get vaccinations', 'Plan itinerary', 'Download maps', 'Set out-of-office time', 'Inform neighbors', 'Arrange pet care', 'Secure home', 'Buy essentials', 'Exchange currency', 'Get roaming services'],
    },
    {
        list: 'workplace',
        errands: ['Attend meetings', 'Schedule meeting', 'Answer emails', 'Organize workspace', 'Submit PTO', 'Prepare presentation', 'Sign documents', 'Update calendar', 'Coordinate team', 'Back up files', 'Research industry trends', 'Order supplies', 'Set appointments', 'Plan birthday celebration', 'Check inventory', 'Attend training', 'Submit timesheets', 'Review policies', 'Performance reviews', 'Organize events'],
    },
];


// RecommendedErrands component
const RecommendedErrands: React.FC<{ list: string }> = ({ list }) => {
    // Unique identifier for the modal
    const modalId = "addRecommendedErrandModal";

    // Get the errands for the selected list
    const selectedListErrands = list === "all"
        ? recommendedErrands.reduce((acc, item) => {
            return acc.concat(item.errands.slice(0, 7));
        }, [])
        : (recommendedErrands.find(item => item.list === list)?.errands || []);

    // Render RecommendedErrands
    return (
        <div className="card max-w-[95%] mx-auto bg-backgroundPrimary border-2 border-border rounded-3xl">
            <div className="mx-auto mt-7">
                <h2 className="font-pacifico text-2xl text-center">Recommended Errands</h2>
                <p className="mt-[-px] text-sm text-green-600 text-center tracking-wide">because grown-ups need reminders too</p>
            </div>
            <div className="mt-5 mb-7 mx-5 flex flex-wrap gap-3 justify-center">
                {selectedListErrands.map((errand, index) => {
                    const uniqueModalId = `${modalId}-${index}`;
                    return (
                        <React.Fragment key={index}>
                            <label htmlFor={uniqueModalId} className="btn btn-outline-success rounded-full text-content1">
                                {errand}
                            </label>
                            < AddErrandForm modalId={uniqueModalId} recommendedName={errand} />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default RecommendedErrands;
