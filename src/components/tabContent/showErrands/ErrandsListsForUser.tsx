import React, { useState, useEffect, useContext } from "react";
import UserIdContext from "@/contexts/UserIdContext";
import ErrandsUpdateContext from "@/contexts/ErrandsUpdateContext";
import { Alert } from "@/components/Alert";
import { getErrands } from "@/services/database/errands"
import ErrandsList from "@/components/tabContent/showErrands/ErrandsList";

// ErrandsListsForUser component
const ErrandsListsForUser: React.FC<{ list: string, date: Date }> = ({ list, date }) => {
    // Get the userId from the UserIdContext using useContext
    const userId = useContext(UserIdContext);

    // Destructure the updateFlag and toggleUpdateFlag properties from the ErrandsUpdateContext
    const { updateFlag, toggleUpdateFlag } = useContext(ErrandsUpdateContext);


    // State to handle fetched errands data
    const [errandsData, setErrandsData] = useState([]);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Convert a local date to match the supabase date type.
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;

    // Function to filter retrieved errands based on the list value
    const filterErrandsByList = (errands: any[], list: string) => {
        if (!errands || !Array.isArray(errands)) {
            return [];
        }
        return errands.filter((errand) => errand.list_name === list);
    };

    useEffect(() => {
        // Fetch errands for user
        async function fetchErrands() {
            try {
                const errands = await getErrands(userId, formattedDate);
                setErrandsData(errands);
            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        };
        if (userId) {
            fetchErrands();
        }
    }, [userId, formattedDate, updateFlag]);

    // Filter errands
    const filteredErrands = filterErrandsByList(errandsData, list);

    // Render the ErrandsListsForUser
    return (
        <>
            {alert && (
                <Alert
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            {errandsData.length === 0 || (list !== "all" && filteredErrands.length === 0) ? (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-content3">No errands to be shown</p>
                </div>
            ) : (
                <div className="flex flex-row flex-nowrap justify-center items-start min-h-full">
                    <>
                        <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none xxs:mb-4 lg:mb-0">
                            <h2 className="font-pacifico text-lg text-green-600">done</h2>
                            <ErrandsList errands={list === "all" ? errandsData.filter((errand) => errand.status === true) : filteredErrands.filter((errand) => errand.status === true)} />
                        </div>
                        <div className="divider divider-vertical h-36"></div>
                    </>
                    <div className="card items-center justify-center bg-opacity-0 border-0 shadow-none xxs:mb-4 lg:mb-0">
                        <h2 className="font-pacifico text-lg text-green-600">undone</h2>
                        <ErrandsList errands={list === "all" ? errandsData.filter((errand) => errand.status === false) : filteredErrands.filter((errand) => errand.status === false)} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ErrandsListsForUser;
