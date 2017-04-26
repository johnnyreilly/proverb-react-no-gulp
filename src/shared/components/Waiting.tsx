import * as React from "react";

const Waiting: React.StatelessComponent<{ caption?: string}> = props => (
    <h4 className="text-primary">{ props.caption || "Loading..." }
        <i className="fa fa-circle-o-notch fa-spin fa-fw" />
    </h4>
);

export default Waiting;
