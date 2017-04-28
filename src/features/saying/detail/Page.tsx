import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";
import moment from "moment";

import SayingStore, { SayingState } from "../Store";
import * as SayingActions from "../../../shared/actions/sayingActions";
import Waiting from "../../../shared/components/Waiting";
import { SayingVM } from "../../../shared/domain/dtos/saying";
import DetailControls from "../../../shared/components/DetailControls";

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
    this.state = this.getSayingFromStore(props.match.params.id, SayingStore.getState());
  }

  _onChange = () => {
    this.setState((prevState, props) => Object.assign(
      prevState,
      this.getSayingFromStore(props.match.params.id, SayingStore.getState())
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

            <h2>Saying Details: {saying ? saying.name : null}</h2>

            <div className="form-horizontal">
              <DetailControls label="Name" value={saying.name} />

              <DetailControls label="Username" value={saying.userName} />

              <DetailControls label="Email" value={saying.email} />

              <DetailControls label="Date of Birth" value={moment(saying.dateOfBirth).format("ll")} />

              <DetailControls label="Sagacity" value={saying.sagacity} />
            </div>
          </div>

          : <Waiting />}
      </div>
    );
  }
}
