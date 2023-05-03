import React from 'react';
import { Formik, Form } from 'formik';

const FormComponent: React.FC<{ header: string, description: string, initialValues: {}, validationSchema: {}, handleSubmit: (values: any, helpers: any) => void, children, buttonText: string, isSubmitting?: boolean }> = ({ header, description, initialValues, validationSchema, handleSubmit, children, buttonText, isSubmitting }) => {
    return (
        <div className="card min-w-[340px] xs:min-w-[380px]">
            <div className="card-body">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form className="flex flex-col gap-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-pacifico mb-2">{header}</h2>
                                <p className="text-sm text-green-600 tracking-wide">{description}</p>
                            </div>
                            {children}
                            <button type="submit" disabled={isSubmitting} className="btn btn-outline-success w-full rounded-3xl tracking-wider mt-[-16px]">
                                {buttonText}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    );
}

export default FormComponent;
