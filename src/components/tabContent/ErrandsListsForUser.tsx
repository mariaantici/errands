import React from "react";
import ErrandsList from "@/components/tabContent/ErrandsList";

// ErrandsListsForUser component
const ErrandsListsForUser: React.FC = () => {
    // Render the ErrandsListsForUser
    return (
        <>
            <div className="flex flex-row flex-nowrap justify-center items-start min-h-full">
                <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none xxs:mb-4 lg:mb-0">
                    <h2 className="mb-5 font-pacifico text-lg text-green-600">Done</h2>
                    <ErrandsList status={true} />
                </div>
                <div className="divider divider-vertical h-36"></div>
                <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none xxs:mb-4 lg:mb-0">
                    <h2 className="mb-5 font-pacifico text-lg text-green-600">Undone</h2>
                    <ErrandsList status={false} />
                </div>
            </div>
        </>
    );
};

export default ErrandsListsForUser;
