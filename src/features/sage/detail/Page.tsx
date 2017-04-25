import React from "react";
import { Link, RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";
import moment from "moment";

import SageStore from "../SageStore";
import * as SageActions from "../../../shared/actions/sageActions";
import Loading from "../../../shared/components/Loading";
import { Sage } from "../../../shared/domain/dtos/sage";
import DetailControls from "../../../shared/components/DetailControls";

interface Props extends RouteComponentProps<{
  id: string;
}, {}> { }

interface State {
  sage: Sage;
}

export default class SageDetail extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = this.getSageFromStore(props.params.id);
  }

  _onChange = () => {
    this.setState((prevState, props) => Object.assign(
      prevState,
      this.getSageFromStore(props.params.id)
    ));
  }

  getSageFromStore(id: string) {
    const state = SageStore.getState();
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
      this.loadSage(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.params.id !== nextProps.params.id) {
      this.loadSage(nextProps.params.id);
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
              <Link to={`/sage/edit/${this.props.params.id}`}><i className="fa fa-pencil fa-lg" /> Edit</Link>
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

          : <Loading />}
      </div>
    );
  }
}
