import React from "react";
import { RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";

import SageStore, { SageState } from "../../shared/stores/sageStore";
import * as SageActions from "../../shared/actions/sageActions";
import SageThumbnail from "./SageThumbnail";
import Loading from "../../shared/components/Loading";

interface Props extends RouteComponentProps<{
}, {}> { }

export default class Sages extends React.Component<Props, SageState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = SageStore.getState();
  }

  componentWillMount() {
    this.eventSubscription = SageStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  _onChange = () => {
    this.setState(SageStore.getState());
  }

  componentDidMount() {
    if (!this.state.isInitialised) {
      SageActions.loadSages();
    }
  }

  render() {
    const { isInitialised, sages } = this.state;

    const content = isInitialised
      ? [...sages.values()].map((sage, index) => <SageThumbnail key={index} sage={sage} />)
      : <Loading/>;

    return (
      <div className="container">
        <h2>Sages</h2>

        { content }
      </div>
    );
  }
}
