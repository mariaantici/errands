import React, { useState, useEffect, useContext } from 'react';
import { getName } from '@/services/database/users';
import { fetchListId, fetchMembersId } from '@/services/database/lists';
import { createErrand } from '@/services/database/errands';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ErrandsUpdateContext from "@/contexts/ErrandsUpdateContext";
import ReactDatePicker from '@/components/datepickers/ReactDatePicker';
import { Alert } from '@/components/Alert';

// Validation schema for the form
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must have at least 2 characters')
        .required('Name is required'),
    date: Yup.mixed().required('Date is required').test('is-date', 'Invalid Date', (value) => {
        return value instanceof Date && !isNaN(value.getTime());
    })
});

// AddErrandModal component
const AddErrandModal: React.FC<{ modalId: string, recommendedName?: string }> = ({ modalId, recommendedName = "" }) => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const activeList = useContext(ActiveListContext);

    // Destructure the updateFlag and toggleUpdateFlag properties from the ErrandsUpdateContext
    const { updateFlag, toggleUpdateFlag } = useContext(ErrandsUpdateContext);

    // State for managing the selected list
    const [selectedlist, setSelectedList] = useState(activeList !== 'all' ? activeList : 'household')

    // State for managing the selected member
    const [selectedMember, setSelectedMember] = useState(userId);

    // State for managing fetched all names for all the list's members
    const [listsMemberNames, setListsMemberNames] = useState({});

    // State for managing modal visibility
    const [modalVisible, setModalVisible] = useState(false);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Convert a local date to a UTC date without timezone offset.
    function toUTCDate(date: Date): Date {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return new Date(Date.UTC(year, month, day));
    }

    // Initialize Formik for form validation and handling
    const formik = useFormik({
        initialValues: {
            name: recommendedName,
            date: null,
        },
        validationSchema,

        onSubmit: async (values) => {
            const { name, date } = values;
            const utcDate = toUTCDate(date);

            // Create a new errand
            try {
                await createErrand(selectedMember, selectedlist, name, utcDate);

                // Show success alert
                setAlert({ title: 'Success', message: 'Errand added successfully', type: 'success' });
                setAlertKey(Date.now());

                // Close the modal
                setModalVisible(false);

                // Toggle the updateFlag value after an errand has been added
                toggleUpdateFlag();

            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        },
    });

    // Function to reset the form
    const resetForm = () => {
        formik.resetForm({
            values: {
                name: recommendedName || "",
                date: null,
            },
        });
    };

    // This function fetches the member's names for all lists ('household', 'trip', 'workplace') associated with the given userId.
    const fetchListsMemberNames = async (userId: string) => {
        const lists = ['household', 'trip', 'workplace'];
        let listsMemberNames = {};

        // Iterate through the lists
        for (const list of lists) {
            try {
                // // Fetch list id for user
                const data = await fetchListId(userId, list);
                if (data.list_id) {
                    try {
                        // Fetch members for list id
                        const membersIds = await fetchMembersId(data.list_id);

                        // If there is more than one member in the list (the user), fetch the names of members
                        if (membersIds.length > 1) {
                            const names = await Promise.all(membersIds.map((member) => getName(member.user_id)));

                            // Save the names for the selected list
                            listsMemberNames[list] = names;
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            } catch (error) {
                throw error;
            }
        }
        return listsMemberNames;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the lists member names using the fetchListsMemberNames function
                const data = await fetchListsMemberNames(userId);

                // Update the state with the fetched data
                setListsMemberNames(data);
            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        };
        // Call the fetchData function
        fetchData();

    }, [userId]);

    // useEffect hook to update the 'list' state when the 'activeList' value changes
    useEffect(() => {
        setSelectedList(activeList !== 'all' ? activeList : 'household');
    }, [activeList]);

    // Render AddErrandModal
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
            <input
                className="modal-state"
                id={modalId}
                type="checkbox"
                checked={modalVisible}
                onChange={() => {
                    setModalVisible(!modalVisible);
                    resetForm();
                    setSelectedList(activeList !== 'all' ? activeList : 'household');
                    setSelectedMember(userId);
                }}
            />
            <div className="modal">
                <label className="modal-overlay" />
                <form onSubmit={formik.handleSubmit}>
                    <div className="modal-content flex flex-col gap-6 min-w-[340px] xs:min-w-[360px]">
                        <label htmlFor={modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </label>
                        <div className="text-left">
                            <h2 className="text-2xl font-pacifico mb-2">New Errand</h2>
                            <p className="text-sm text-green-600 tracking-wide">let's get down to business</p>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="name" className="tracking-wide">Name</label>
                            <input
                                id={modalId}
                                className="input"
                                placeholder="Name this errand like you mean it"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="name"
                            />
                            <div className="h-1 text-xs text-red-600">
                                {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
                            </div>
                        </div>
                        <div className="space-y-1 mb-2">
                            <label htmlFor="list" className="tracking-wide">Pick a list</label>
                            <select
                                id={modalId}
                                className="select"
                                value={selectedlist}
                                onChange={(e) => setSelectedList(e.target.value)}
                            >
                                <option>household</option>
                                <option>trip</option>
                                <option>workplace</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="date" className="tracking-wide">When</label>
                            <div>
                                <ReactDatePicker
                                    className="input"
                                    placeholder="Select a Date"
                                    selected={formik.values.date}
                                    onChange={(date) => formik.setFieldValue('date', date)}
                                />
                            </div>
                            <div className="h-1 text-xs text-red-600">
                                {formik.touched.date && formik.errors.date && <p>{String(formik.errors.date)}</p>}
                            </div>
                        </div>
                        {listsMemberNames[selectedlist] && (
                            <div className="space-y-1 mb-3">
                                <label htmlFor="member" className="tracking-wide">Assign to</label>
                                <select
                                    id={modalId}
                                    className="select"
                                    value={selectedMember}
                                    onChange={(e) => setSelectedMember(e.target.value)}
                                >
                                    {listsMemberNames[selectedlist]
                                        .sort((a, b) => (a.id === selectedMember ? -1 : b.id === selectedMember ? 1 : 0))
                                        .map(({ id, name }) => (
                                            <option key={id} value={id}>
                                                {name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <div className="flex gap-3 mt-1">
                            <button type="submit" className="btn btn-outline-success btn-block rounded-3xl">Add Errand</button>
                            <label htmlFor={modalId} className="btn btn-block rounded-3xl">Cancel</label>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddErrandModal;
