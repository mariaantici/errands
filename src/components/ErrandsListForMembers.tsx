import React from "react";
import ErrandsList from "./ErrandsList";

// Sample data for members
const members: { name: string }[] = [
    { name: 'Maria' },
    { name: 'Dragos' },
    { name: 'Sara' },
    { name: 'John' },
];

// ErrandsListForMembers component
const ErrandsListForMembers: React.FC = () => {
    // Render the ErrandsListForMembers
    return (
        <>
            <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center items-stretch">
                {members.map(({ name }, index) => (
                    <React.Fragment key={index}>
                        <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none xs:mb-4 lg:mb-0">
                            <h2 className="mb-5 font-pacifico text-lg text-green-600">{name}</h2>
                            <ErrandsList />
                        </div>
                        {index !== members.length - 1 && (
                            <React.Fragment>
                                <div className="divider divider-vertical h-0 lg:h-52 w-0 lg:w-full mx-0 lg:mx-4"></div>
                                <div className="xs:hidden divider divider-horizontal w-40 mt-4 mb-4"></div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

export default ErrandsListForMembers;
