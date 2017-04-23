import React from "react";
import * as GreetingActions from "../../shared/actions/GreetingActions";

interface Props {
  key: number;
  targetOfGreeting: string;
}

class Greeting extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <p style={{ color: "pink" }}>
        Hello { this.props.targetOfGreeting }!

        <button className="btn btn-default btn-danger"
                onClick={ this._onClick }>
                Remove
        </button>
      </p>
    );
  }

  _onClick = (_event: React.MouseEvent<any>) => {
    GreetingActions.removeGreeting(this.props.targetOfGreeting);
  }
}

export default Greeting;
