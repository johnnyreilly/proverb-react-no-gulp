import * as React from "react";

const Loading: React.StatelessComponent<void> = _ => (
    <h4 className="text-primary">Loading....
        <i className="fa fa-circle-o-notch fa-spin fa-fw" />
    </h4>
);

export default Loading;
