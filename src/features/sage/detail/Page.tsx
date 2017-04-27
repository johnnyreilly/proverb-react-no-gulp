import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";
import moment from "moment";

import SageStore, { SageState } from "../SageStore";
import * as SageActions from "../../../shared/actions/sageActions";
import Waiting from "../../../shared/components/Waiting";
import { Sage } from "../../../shared/domain/dtos/sage";
import DetailControls from "../../../shared/components/DetailControls";

type Props = RouteComponentProps<{
  id: string;
}>;

interface State {
  sage: Sage | undefined;
}

export default class SageDetail extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = this.getSageFromStore(props.match.params.id, SageStore.getState());
  }

  _onChange = () => {
    this.setState((prevState, props) => Object.assign(
      prevState,
      this.getSageFromStore(props.match.params.id, SageStore.getState())
    ));
  }

  getSageFromStore(id: string, state: SageState) {
    const idNum = parseInt(id);
    return state.sage && state.sage.id === idNum
      ? { sage: state.sage }
      : { sage: undefined };
  }

  componentWillMount() {
    this.eventSubscription = SageStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  componentDidMount() {
    if (!this.state.sage) {
      this.loadSage(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.loadSage(nextProps.match.params.id);
    }
  }

  loadSage(id: string) {
    SageActions.loadSage(parseInt(id));
  }

  render() {
    const { sage } = this.state;

    return (
      <div className="container">
        {sage
          ? <div>
            <div>
              <Link to={`/sage/edit/${this.props.match.params.id}`}><i className="fa fa-pencil fa-lg" /> Edit</Link>
            </div>

            <h2>Sage Details: {sage ? sage.name : null}</h2>

            <div className="form-horizontal">
              <DetailControls label="Name" value={sage.name} />

              <DetailControls label="Username" value={sage.userName} />

              <DetailControls label="Email" value={sage.email} />

              <DetailControls label="Date of Birth" value={moment(sage.dateOfBirth).format("ll")} />

              <DetailControls label="Sagacity" value={sage.sagacity} />
            </div>
          </div>

          : <Waiting />}
      </div>
    );
  }
}
