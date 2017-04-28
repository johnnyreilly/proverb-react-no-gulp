import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";

import SayingsStore, { SayingsState } from "./Store";
import * as SayingActions from "../../shared/actions/sayingActions";
import Saying from "./Saying";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}>;

export default class Sayings extends React.Component<Props, SayingsState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = SayingsStore.getState();
  }

  componentWillMount() {
    this.eventSubscription = SayingsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  _onChange = () => {
    this.setState(SayingsStore.getState());
  }

  componentDidMount() {
    if (!this.state.isInitialised) {
      SayingActions.loadSayings();
    }
  }

  render() {
    const { isInitialised, sayings } = this.state;

    return (
      <div className="container">
        <h2>Sayings</h2>

        {isInitialised
          ? [...sayings.values()].map((saying, index) => <Saying key={index} saying={saying} />)
          : <Waiting />}
      </div>
    );
  }
}
