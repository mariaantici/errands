// Sample data for errands
const errands: { name: string; status: boolean }[] = [
    { name: 'Trash', status: false },
    { name: 'Laundry', status: false },
    { name: 'Dishes', status: false },
    { name: 'Groceries', status: false },
    { name: 'Vacuum', status: false },
];

// ErrandsList component
const ErrandsList: React.FC = () => {
    // Render the ErrandsList
    return (
        <div>
            {errands.map(({ name, status }, index) => (
                <div className="block  my-1" key={index}>
                    <input type="checkbox" className="checkbox checkbox-bordered-success checkbox-md" />
                    <span className="text-md ml-2 tracking-tight">{name}</span>
                </div>
            ))}
        </div>
    );
};

export default ErrandsList;
