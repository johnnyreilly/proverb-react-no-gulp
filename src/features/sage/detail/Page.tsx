import React from "react";
import { RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";

import SageStore from "../../../shared/stores/sageStore";
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
    this.state = { sage: this.getSage(props.params.id) };
  }

  componentWillMount() {
    this.eventSubscription = SageStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  getSage(id: string) {
    const state = SageStore.getState();
    const idNum = parseInt(id);
    return state.isInitialised && state.sages.has(idNum)
      ? state.sages.get(idNum)
      : undefined;
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
    const { sage } = this.state;

    return (
      <div className="container">
        <h2>SageDetail</h2>

        {sage
          ? <div>
            <div>
              <a ng-click="vm.gotoEdit()"><i className="fa fa-pencil fa-lg" /> Edit</a>
            </div>
            <h2>Sage Details</h2>
            <div className="widget-content form-horizontal">
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Name</label>
                <div className="col-xs-12 col-sm-9">{ sage.name }</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Username</label>
                <div className="col-xs-12 col-sm-9">{ sage.username }</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Email</label>
                <div className="col-xs-12 col-sm-9">{ sage.email }</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Date of Birth</label>
                <div className="col-xs-12 col-sm-9">{ sage.dateOfBirth }</div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Sagacity</label>
                <div className="col-xs-12 col-sm-9">{ sage.sagacity }</div>
              </div>
            </div>
          </div>

          : <Loading />}
      </div>
    );
  }
}
