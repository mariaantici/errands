import ErrandsList from "./ErrandsList";

// Sample data for members
const members: { name: string }[] = [
    { name: 'Maria' },
    { name: 'Dragos' },
];

// ErrandsListForMembers component
const ErrandsListForMembers: React.FC = () => {
    // Render the ErrandsListForMembers
    return (
        <>
            <div className="flex justify-center gap-4 items-stretch">
                {members.map(({ name }, index) => (
                    <>
                        <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none" key={index}>
                            <h2 className="mb-5 font-pacifico text-lg text-green-600">{name}</h2>
                            <ErrandsList />
                        </div>
                        {index !== members.length - 1 && (
                            <div className="divider divider-vertical h-52"></div>
                        )}
                    </>
                ))}
            </div>
        </>
    );
};

export default ErrandsListForMembers;
