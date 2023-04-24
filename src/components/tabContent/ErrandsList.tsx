// Sample data for errands
const errands: { name: string; state: boolean }[] = [
    { name: 'Trash', state: false },
    { name: 'Laundry', state: true },
    { name: 'Dishes', state: false },
    { name: 'Groceries', state: true },
    { name: 'Vacuum', state: false },
];

// ErrandsList component
const ErrandsList: React.FC<{ status: boolean }> = ({ status }) => {
    // Render the ErrandsList
    return (
        <div>
            {errands.map(({ name, state }, index) => {
                // Render only the errands that match the status prop
                if (state === status) {
                    return (
                        <div className="block my-1" key={index}>
                            <input type="checkbox" className="checkbox checkbox-bordered-success checkbox-md" />
                            <span className="text-md ml-2 tracking-tight">{name}</span>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default ErrandsList;
