import * as React from "react";

interface Props {
    label: string;
    name: string;
    value: string | number;
    errors: Map<string, string>;
    onFieldChange: (event: React.FormEvent<any>) => void;
    type?: "text" | "date" | "number";
}

const FormControlSelect: React.StatelessComponent<Props> = props => {
    const { label, name, value, onFieldChange, errors } = props;
    const hasError = errors.has(name);
    const error = hasError ? errors.get(name) : undefined;
    return (
        <div className={`form-group ${hasError ? "has-error" : ""}`}>
            <label className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-10">
                <select className="form-control" name={name} value={value} onChange={onFieldChange}>
                    {props.children}
                </select>
            </div>
            {error
                ? <div className="col-md-offset-2 col-sm-10 text-danger">{error}</div>
                : null}
        </div>
    );
};

export default FormControlSelect;
