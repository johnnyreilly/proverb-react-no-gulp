import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";

import SagesStore, { SagesState } from "./Store";
import * as SageActions from "../../shared/actions/sageActions";
import SageThumbnail from "./SageThumbnail";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}>;

export default class Sages extends React.Component<Props, SagesState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = SagesStore.getState();
  }

  componentWillMount() {
    this.eventSubscription = SagesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  _onChange = () => {
    this.setState((prevState, _props) => Object.assign(prevState, SagesStore.getState()));
  }

  componentDidMount() {
    if (!this.state.isInitialised) {
      SageActions.loadSages();
    }
  }

  render() {
    const { isInitialised, sages } = this.state;

    return (
      <div className="container">
        <h2>Sages</h2>

        {isInitialised
          ? [...sages.values()].map((sage, index) => <SageThumbnail key={index} sage={sage} />)
          : <Waiting />}
      </div>
    );
  }
}
