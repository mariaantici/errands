import React from 'react';
import { Formik, Form } from 'formik';

const ModalComponent: React.FC<{ header: string, description: string, initialValues: {}, validationSchema: {}, handleSubmit: (values: any, helpers: any) => void, children, buttonText?: string, isSubmitting?: boolean }> = ({ header, description, initialValues, validationSchema, handleSubmit, children, buttonText, isSubmitting }) => {
    return (
        <div className="modal">
            <label className="modal-overlay" />
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form className="modal-content flex flex-col gap-6 min-w-[340px] xs:min-w-[360px]">
                        <div className="text-left">
                            <h2 className="text-2xl font-pacifico mb-2">{header}</h2>
                            <p className="text-sm text-green-600 tracking-wide">{description}</p>
                        </div>
                        {children}
                        {buttonText &&
                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-success w-full rounded-3xl tracking-wider mt-[-16px]">
                                {buttonText}
                            </button>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ModalComponent;
