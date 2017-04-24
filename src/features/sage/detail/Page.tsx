import React from "react";
import { Link, RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";
import moment from "moment";

import SageStore from "../../../shared/stores/SageStore";
import * as SageActions from "../../../shared/actions/sageActions";
import Loading from "../../../shared/components/Loading";
import { Sage } from "../../../shared/domain/dtos/sage";

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
    return state.isInitialised && state.sages.has(idNum)
      ? { sage: state.sages.get(idNum) }
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
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Name</label>
                <div className="col-xs-12 col-sm-9">{sage.name}</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Username</label>
                <div className="col-xs-12 col-sm-9">{sage.username}</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Email</label>
                <div className="col-xs-12 col-sm-9">{sage.email}</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Date of Birth</label>
                <div className="col-xs-12 col-sm-9">{ moment(sage.dateOfBirth).format("ll") }</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Sagacity</label>
                <div className="col-xs-12 col-sm-9">{sage.sagacity}</div>
              </div>
            </div>
          </div>

          : <Loading />}
      </div>
    );
  }
}
