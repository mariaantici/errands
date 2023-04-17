import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBriefcase, faListCheck, faPlane } from '@fortawesome/free-solid-svg-icons';

// Define the props for the Tabs component
interface TabsProps {
    onTabChange: (tabKey: string) => void;
    activeTab: string;
}

// Tabs component
const Tabs: React.FC<TabsProps> = ({ onTabChange, activeTab }) => {
    // Function to handle click events on tabs
    const handleClick = (key: string) => {
        onTabChange(key);
    };

    // Array of tab objects with name, key, and icon properties
    const tabs = [
        { name: 'All', key: 'all', icon: faListCheck },
        { name: 'Household', key: 'household', icon: faHouse },
        { name: 'Trip', key: 'trip', icon: faPlane },
        { name: 'Workplace', key: 'workplace', icon: faBriefcase },
    ];

    // Render the Tabs
    return (
        <>
            <div className="tabs flex flex-nowrap mx-auto mt-2 mb-7">
                {tabs.map(({ name, key, icon }, index) => (
                    <div
                        key={index}
                        className={`tab sm:mx-4 ${key === activeTab ? 'border-b-2 border-green-600' : ''}`}
                        onClick={() => handleClick(key)}
                    >
                        <a className="text-md">
                            <FontAwesomeIcon
                                icon={icon}
                                className="inline mr-2 h-4 w-4 text-green-600"
                            />
                            {name}
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Tabs;
