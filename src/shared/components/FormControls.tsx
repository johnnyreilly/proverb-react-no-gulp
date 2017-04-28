import * as React from "react";

interface Props {
    label: string;
    name: string;
    value: string;
    errors: Map<string, string>;
    onFieldChange: (event: React.FormEvent<any>) => void;
    type?: "text" | "date" | "number";
}

const FormControls: React.StatelessComponent<Props> = props => {
    const { label, name, value, onFieldChange, errors } = props;
    const hasError = errors.has(name);
    const error = hasError ? errors.get(name) : undefined;
    return (
        <div className={`form-group ${hasError ? "has-error" : ""}`}>
            <label className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-10">
                <input className="form-control" type={props.type || "text"} name={name} value={value} onChange={onFieldChange} />
            </div>
            {error
                ? <div className="col-md-offset-2 col-sm-10 text-danger">{error}</div>
                : null}
        </div>
    );
};

export default FormControls;
