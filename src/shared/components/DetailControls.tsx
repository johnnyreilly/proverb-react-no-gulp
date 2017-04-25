import * as React from "react";

interface Props {
    label: string;
    value: string | number;
}

const DetailControls: React.StatelessComponent<Props> = props => {
    const { label, value } = props;
    return (
        <div className="form-group">
            <div className="col-sm-2"><strong>{label}</strong></div>
            <div className="col-sm-10">{value}</div>
        </div>
    );
};

export default DetailControls;
