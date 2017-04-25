import React from "react";
import { RouteComponentProps } from "react-router";
import FBEmitter from "fbemitter";

import SageStore from "../../../shared/stores/SageStore";
import * as SageActions from "../../../shared/actions/sageActions";
import Loading from "../../../shared/components/Loading";
import FormControls from "../../../shared/components/FormControls";
import { Sage } from "../../../shared/domain/dtos/sage";
import { inputValue, dateValue } from "../../../shared/utils/componentHelpers";

interface Props extends RouteComponentProps<{
  id: string;
}, {}> { }

interface State {
  sage: Sage;
  validations: Map<string, string>;
  hasChanges: boolean;
  isSavingOrRemoving: boolean;
}

export default class SageEdit extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = Object.assign(this.getSageAndValidationsFromStore(props.params.id), { hasChanges: false, isSavingOrRemoving: false });
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

  _onClickSave = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canSave) {
      SageActions.saveSage(this.state.sage);
    }
  }

  _onClickRemove = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canRemove) {
      SageActions.removeSage(this.state.sage.id);
    }
  }

  get canSave(): boolean {
    return this.state.hasChanges && !this.isSavingOrRemoving;
  }

  get canRemove(): boolean {
    return !this.isSavingOrRemoving;
  }

  get isSavingOrRemoving(): boolean {
    return this.state.isSavingOrRemoving;
  }

  render() {
    const { sage, hasChanges, validations } = this.state;

    return (
      <div className="container">
        {sage
          ? <form name="form" role="form">
            <div>
              <button className="btn btn-info" disabled={!this.canSave} onClick={this._onClickSave}>
                <i className="fa fa-save fa-lg" /> Save
              </button>

              <button className="btn btn-danger" disabled={!this.canRemove} ng-click="vm.remove()">
                <i className="fa fa-trash fa-lg" /> Remove
              </button>

              {hasChanges ? <i className="fa fa-asterisk fa-lg text-warning" /> : null}
            </div>

            <h2>Sage Edit: {sage ? sage.name : null}</h2>

            <div className="form-horizontal">
              <FormControls label="Name" name="name" value={inputValue(sage.name)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Username" name="userName" value={inputValue(sage.userName)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Email" name="email" value={inputValue(sage.email)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Date of Birth" name="dateOfBirth" type="date" value={dateValue(sage.dateOfBirth)} onFieldChange={this._onFieldChange} errors={validations} />

              <FormControls label="Sagacity" name="sagacity" value={inputValue(sage.sagacity)} onFieldChange={this._onFieldChange} errors={validations} />
            </div>
          </form>

          : <Loading />}
      </div>
    );
  }
}
