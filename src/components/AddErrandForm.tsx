import React from 'react';

// AddErrandForm component
const AddErrandForm: React.FC<{ modalId: string }> = ({ modalId }) => {
    // Render AddErrandForm
    return (
        <>
            <input className="modal-state" id={modalId} type="checkbox" />
            <div className="modal">
                <label className="modal-overlay"></label>
                <div className="modal-content flex flex-col gap-5 min-w-[340px] xs:min-w-[360px]">
                    <label htmlFor={modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </label>
                    <h2 className="font-pacifico text-2xl">New Errand</h2>
                    <p className="mb-3 mt-[-10px] text-sm text-green-600 text-left tracking-wide">it's time to get that shit done</p>

                    <label htmlFor="name" className="tracking-wide">Name</label>
                    <input className="input mb-2 mt-[-8px]" placeholder="Name this errand like you mean it" />

                    <label htmlFor="name" className="tracking-wide">Who</label>
                    <select className="select mb-2 mt-[-8px]">
                        <option>Maria</option>
                        <option>Dragos</option>
                        <option>Sara</option>
                        <option>John</option>
                    </select>

                    <label htmlFor="name" className="tracking-wide">When</label>
                    <select className="select mb-5 mt-[-8px]">
                        <option>Select Date</option>
                    </select>

                    <div className="flex gap-3">
                        <label htmlFor={modalId} className="btn btn-outline-success btn-block">Add Errand</label>
                        <label htmlFor={modalId} className="btn btn-block">Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddErrandForm;
