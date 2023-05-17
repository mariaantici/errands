import React, { useState, useEffect, useContext } from "react";
import * as Yup from 'yup';
import { supabase } from "@/utils/supabaseClient";
import { getIdForEmail } from "@/services/database/users";
import { getListId, getMembersId } from "@/services/database/lists";
import { createRequest } from "@/services/database/member-requests";
import { Alert } from '@/components/common/Alert';
import UserIdContext from "@/contexts/UserIdContext";
import ActiveListContext from "@/contexts/ActiveListContext";
import ModalComponent from "@/components/common/Form/ModalComponent";
import InputField from '@/components/common/Form/InputField';

// Define the initial values
const initialValues = { email: '' }

// Define the form validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
});

// AddMemberModal component
const AddMemberModal: React.FC<{ isOpen?: boolean, setIsOpen: (open: boolean) => void }> = ({ isOpen = false, setIsOpen }) => {
    // Get the userId from the UserIdContext
    const userId = useContext(UserIdContext);

    // Get the active list from ActiveListContext
    const activeList = useContext(ActiveListContext);

    // State for managing fetched members for all the lists
    const [listId, setListId] = useState(null);

    // State for managing member ids for list
    const [membersIds, setMemberIds] = useState([]);

    // State to handle the alerts
    const [alert, setAlert] = useState(null);
    const [alertKey, setAlertKey] = useState(null);

    // Function to fetch the id of the activeList and fetch the members for the list id
    const fetchListIdAndMembers = async () => {
        try {
            const list_id = await getListId(userId, activeList);
            setListId(list_id);

            if (list_id) {
                try {
                    // Fetch members for list id
                    const membersIds = await getMembersId(list_id);
                    setMemberIds(membersIds);

                } catch (error) {
                    setAlert({ title: 'Error', message: error.message, type: 'error' });
                    setAlertKey(Date.now());
                }
            }

        } catch (error) {
            setAlert({ title: 'Error', message: error.message, type: 'error' });
            setAlertKey(Date.now());
        }
    }

    // Function to invite user using supabase email invite
    const unregisteredUserInvite = async (email: string) => {
        try {
            const response = await fetch('.output/pages/api/inviteUser.ts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            console.log('Unregistered user invited successfully', data);
        } catch (error) {
            console.error('Error inviting unregistered user', error.message);
        }
    }

    // Function to invite user using email OTP
    const registeredUserInvite = async (email: string) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({ email: email })

            if (error) {
                throw error;
            }

            console.log('Registered user invited successfully');
        } catch (error) {
            console.error('Error inviting registered user', error.message);
            throw error;
        }
    }

    // Function to send invite, called on form submit
    const sendInvite = async (values: { email: string }) => {
        try {
            const invitedUserId = await getIdForEmail(values.email);

            // If the user already has an account check for membership in the activeList and proceed accordingly
            if (invitedUserId) {
                // If there is more than one member in the list, check if the invited user is already a member of that list
                if (membersIds.length > 1) {
                    const invitedUserExists = membersIds.some(member => member.user_id === invitedUserId);

                    // If the invited user is not already a member send login invite
                    if (invitedUserExists === false) {
                        try {
                            await registeredUserInvite(values.email);
                            await createRequest(userId, values.email, activeList, listId);

                            setAlert({ title: 'Success', message: 'Invite has been sent', type: 'success' });
                            setAlertKey(Date.now());

                        } catch (error) {
                            setAlert({ title: 'Error', message: error.message, type: 'error' });
                            setAlertKey(Date.now());
                        }
                    } else {
                        // Alert the user that the invited user is already a member of the list
                        setAlert({ title: 'Error', message: `${values.email} is already a member of ${activeList}`, type: 'error' });
                        setAlertKey(Date.now());
                    }
                } else {
                    // Send login invite
                    try {
                        await registeredUserInvite(values.email);
                        await createRequest(userId, values.email, activeList, listId);

                        setAlert({ title: 'Success', message: 'Invite has been sent', type: 'success' });
                        setAlertKey(Date.now());

                    } catch (error) {
                        setAlert({ title: 'Error', message: error.message, type: 'error' });
                        setAlertKey(Date.now());
                    }
                }
            }
        } catch (error) {
            // If the user doesn't have an account send register invite
            try {
                await unregisteredUserInvite(values.email);

                await createRequest(userId, values.email, activeList, listId);

                setAlert({ title: 'Success', message: 'Invite has been sent', type: 'success' });
                setAlertKey(Date.now());

            } catch (error) {
                setAlert({ title: 'Error', message: error.message, type: 'error' });
                setAlertKey(Date.now());
            }
        } finally {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        setListId(null);
        setMemberIds([]);

        fetchListIdAndMembers();
    }, [userId, activeList])

    // Render AddMemberModal
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
            {isOpen && (
                <input
                    className="modal-state"
                    id="addMemberModal"
                    type="checkbox"
                    defaultChecked
                />
            )}
            <ModalComponent
                header="Share list with a friend"
                description="we'll send them an email invite"
                initialValues={initialValues}
                validationSchema={validationSchema}
                handleSubmit={sendInvite}
                key={isOpen.toString()}
            >
                <div>
                    <InputField
                        field="email"
                        fieldName="Email"
                        fieldPlaceholder="Enter your friend's email"
                    />
                    <div className="flex gap-3 mt-1">
                        <button type="submit" className="btn btn-outline-success btn-block rounded-3xl">Send Invite</button>
                        <button type="reset" className="btn btn-block rounded-3xl" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </ModalComponent>
        </>
    );
};

export default AddMemberModal;
