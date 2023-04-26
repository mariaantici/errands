import { useState } from "react";
import { updateErrandStatus } from "@/services/database/errands";
import { Alert } from "../Alert";

// ErrandsList component
const ErrandsList: React.FC<{ errands: any[] }> = ({ errands }) => {
    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Function to update errand's status, called on checking or unchecking the checkbox
    async function updateErrand(errandId: string, statusValue: boolean) {
        try {
            await updateErrandStatus(errandId, statusValue);

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    };

    // Render the ErrandsList
    return (
        <div>
            {alert && (
                <Alert
                    key={alertKey}
                    title={alert.title}
                    message={alert.message}
                    type={alert.type}
                />
            )}
            {errands.length === 0 ? (
                <div className="flex justify-center items-center">
                    <p className="text-lg text-content3">No errands to be shown</p>
                </div>
            ) : (
                errands.map((errand, index) => {
                    return (
                        <div className="block my-1" key={index}>
                            <input type="checkbox" className="checkbox checkbox-bordered-success checkbox-md" defaultChecked={errand.status === true} onChange={() => updateErrand(errand.id, !errand.status)} />
                            <span className="text-md ml-2 tracking-tight">{errand.name}</span>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ErrandsList;
