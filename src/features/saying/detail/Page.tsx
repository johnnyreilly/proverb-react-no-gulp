import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";

import SayingStore, { SayingState } from "../Store";
import * as SayingActions from "../../../shared/actions/sayingActions";
import Waiting from "../../../shared/components/Waiting";
import { SayingVM } from "../../../shared/domain/dtos/saying";

type Props = RouteComponentProps<{
  id: string;
}>;

interface State {
  saying: SayingVM | undefined;
}

export default class SayingDetail extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    const state = SayingStore.getState();
    this.state = this.getSayingFromStore(props.match.params.id, state.sayingState);
  }

  _onChange = () => {
    const state = SayingStore.getState();
    this.setState((prevState, props) => Object.assign(
      prevState,
      this.getSayingFromStore(props.match.params.id, state.sayingState)
    ));
  }

  getSayingFromStore(id: string, state: SayingState) {
    const idNum = parseInt(id);
    return state.saying && state.saying.id === idNum
      ? { saying: state.saying }
      : { saying: undefined };
  }

  componentWillMount() {
    this.eventSubscription = SayingStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  componentDidMount() {
    if (!this.state.saying) {
      this.loadSaying(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.loadSaying(nextProps.match.params.id);
    }
  }

  loadSaying(id: string) {
    SayingActions.loadSaying(parseInt(id));
  }

  render() {
    const { saying } = this.state;

    return (
      <div className="container">
        {saying
          ? <div>
            <div>
              <Link to={`/saying/edit/${this.props.match.params.id}`}><i className="fa fa-pencil fa-lg" /> Edit</Link>
            </div>

            <h2>Saying</h2>

            <div className="form-horizontal">
              <blockquote>
                <p>{saying.text}</p>
                <footer>{saying.sageName}</footer>
              </blockquote>
            </div>
          </div>

          : <Waiting />}
      </div>
    );
  }
}
