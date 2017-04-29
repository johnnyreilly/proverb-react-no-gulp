import * as React from "react";

interface Props {
    label: string;
    name: string;
    value: string | number;
    errors: Map<string, string>;
    onFieldChange: (event: React.FormEvent<any>) => void;
    type?: "text" | "date" | "number" | "select" | "textarea";
}

const FormControls: React.StatelessComponent<Props> = props => {
    const { label, name, value, onFieldChange, errors } = props;
    const hasError = errors.has(name);
    const error = hasError ? errors.get(name) : undefined;
    const type = props.type || "text";

    return (
        <div className={`form-group ${hasError ? "has-error" : ""}`}>
            <label className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-10">
                {type === "select"
                    ? <select className="form-control" name={name} value={value} onChange={onFieldChange}>
                        {props.children}
                    </select>
                    : type === "textarea"
                        ? <textarea className="form-control" rows={5} name={name} value={value} onChange={onFieldChange} />
                        : <input className="form-control" type={type} name={name} value={value} onChange={onFieldChange} />}
            </div>
            {error
                ? <div className="col-md-offset-2 col-sm-10 text-danger">{error}</div>
                : null}
        </div>
    );
};

export default FormControls;
