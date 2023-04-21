import React, { useState } from "react";
import { updateUser } from "@/services/database/users";

// InputName component
const InputName: React.FC<{ modalId: string }> = ({ modalId }) => {
    // State to handle the input value of the name field
    const [name, setName] = useState("");

    // Function to update the user's name, called on form submit
    const updateName = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(name);
            console.log("Name updated successfully");
        } catch (error) {
            console.error("Error updating name", error);
        }
    };

    // Render InputName
    return (
        <>
            <input className="modal-state" id={modalId} type="checkbox" />
            <div className="modal">
                <label className="modal-overlay"></label>
                <form onSubmit={updateName}>
                    <div className="modal-content flex flex-col gap-5 min-w-[340px] xs:min-w-[360px]">
                        <h2 className="font-pacifico text-2xl">Your name</h2>
                        <p className="mb-3 mt-[-10px] text-sm text-green-600 text-left tracking-wide">no need for a full name, even a nickname works</p>
                        <label htmlFor="name" className="tracking-wide">
                            Name
                        </label>
                        <input
                            className="input mb-7 mt-[-5px]"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)} // Update the name state when the input value changes
                        />
                        <button className="btn btn-outline-success min-w-[200px] mx-auto" type="submit">
                            Save Name
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InputName;
