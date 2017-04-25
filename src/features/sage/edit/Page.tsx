import React from "react";
import { RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";

import SageStore from "../../../shared/stores/SageStore";
import * as SageActions from "../../../shared/actions/sageActions";
import Loading from "../../../shared/components/Loading";
import { Sage } from "../../../shared/domain/dtos/sage";
import { inputValue, dateValue } from "../../../shared/utils/componentHelpers";

interface Props extends RouteComponentProps<{
  id: string;
}, {}> { }

interface State {
  sage: Sage;
  validations: Map<string, string>;
  hasChanges: boolean;
}

export default class SageEdit extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = Object.assign(this.getSageAndValidationsFromStore(props.params.id), { hasChanges: false });
  }

  _onChange = () => {
    this.setState((prevState, props) => Object.assign(
      prevState,
      this.getSageAndValidationsFromStore(props.params.id)
    )); // TODO: Do something more sophisticated?
  }

  getSageAndValidationsFromStore(id: string) {
    const state = SageStore.getState();
    const idNum = parseInt(id);
    return state.isInitialised && state.sages.has(idNum)
      ? { sage: state.sages.get(idNum), validations: state.validations }
      : { sage: undefined, validations: new Map() };
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

  _onFieldChange = (event: React.FormEvent<any>) => {
    const eventTarget = event.target as HTMLInputElement;
    const fieldName = eventTarget.name;
    const fieldValue = eventTarget.value;
    this.setState((prevState, _props) => Object.assign(
      prevState,
      { hasChanges: true, sage: Object.assign(prevState.sage, { [fieldName]: fieldValue }) }
    ));
  }

  render() {
    const { sage, hasChanges } = this.state;

    return (
      <div className="container">
        {sage
          ? <form name="form" role="form">
            <div>
              <button className="btn btn-info"
                ng-click="vm.save()"
                ng-disabled="!vm.canSave">
                <i className="fa fa-save fa-lg" /> Save
                    </button>
              <button className="btn btn-danger"
                ng-click="vm.remove()"
                ng-disabled="!vm.canDelete">
                <i className="fa fa-trash fa-lg" /> Remove
                    </button>
              {hasChanges ? <i className="fa fa-asterisk fa-lg text-warning" /> : null}
            </div>

            <h2>Sage Edit: {sage ? sage.name : null}</h2>

            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Name</label>
                <div className="col-xs-12 col-sm-9">
                  <input className="form-control" type="text" name="name" value={ inputValue(sage.name) } onChange={this._onFieldChange} server-error="vm.errors" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Username</label>
                <div className="col-xs-12 col-sm-9">
                  <input className="form-control" type="text" name="username" value={ inputValue(sage.username) } onChange={this._onFieldChange} server-error="vm.errors" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Email</label>
                <div className="col-xs-12 col-sm-9">
                  <input className="form-control" type="text" name="email" value={ inputValue(sage.email) } onChange={this._onFieldChange} server-error="vm.errors" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Date of Birth</label>
                <div className="col-xs-12 col-sm-9">
                  <input className="form-control" type="date" name="dateOfBirth" value={ dateValue(sage.dateOfBirth) } onChange={this._onFieldChange} server-error="vm.errors" />
                  </div>
              </div>
              <div className="form-group">
                <label className="col-xs-12 col-sm-2">Sagacity</label>
                <div className="col-xs-12 col-sm-9">
                  <input className="form-control" type="number" name="sagacity" value={ inputValue(sage.sagacity) } onChange={this._onFieldChange} server-error="vm.errors" />
                </div>
              </div>
            </div>
          </form>

          : <Loading />}
      </div>
    );
  }
}
