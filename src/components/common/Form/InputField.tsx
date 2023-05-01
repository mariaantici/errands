import { Field, ErrorMessage } from "formik";

const InputField: React.FC<{ field: string, fieldName: string, fieldPlaceholder: string }> = ({ field, fieldName, fieldPlaceholder }) => {
    return (
        <div className="space-y-1">
            <label htmlFor={field} className="tracking-wide">{fieldName}</label>
            <Field id={field} name={field} type={field} placeholder={fieldPlaceholder} className="input" />
            <div className="h-7 text-xs text-red-600">
                <ErrorMessage name={field} />
            </div>
        </div>
    );
}

export default InputField;
