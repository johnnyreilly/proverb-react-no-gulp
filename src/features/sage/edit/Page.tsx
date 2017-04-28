import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";

import SageStore, { SageState } from "../Store";
import * as SageActions from "../../../shared/actions/sageActions";
import Waiting from "../../../shared/components/Waiting";
import FormControls from "../../../shared/components/FormControls";
import { Sage } from "../../../shared/domain/dtos/sage";
import { inputValue, dateValue } from "../../../shared/utils/componentHelpers";

type Props = RouteComponentProps<{
  id: string;
}>;

interface State {
  sage: Sage;
  validations: Map<string, string>;
  hasChanges: boolean;
  isSavingOrRemoving: "Saving..." | "Removing...";
}

export default class SageEdit extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = Object.assign(
      this.getSageAndValidationsFromStore(props.match.params.id, SageStore.getState()),
      { hasChanges: false, isSavingOrRemoving: undefined });
  }

  _onChange = () => {
    const state = SageStore.getState();
    if (state.savedId) {
      this.props.history.push(`/sage/detail/${this.props.match.params.id}`);
    } else {
      this.setState((prevState, props) => Object.assign(
        prevState,
        this.getSageAndValidationsFromStore(props.match.params.id, state),
        { isSavingOrRemoving: undefined }
      )); // TODO: Do something more sophisticated?
    }
  }

  getSageAndValidationsFromStore(id: string, storeState: SageState) {
    const idNum = parseInt(id);
    return storeState.sage && storeState.sage.id === idNum
      ? { sage: storeState.sage, validations: storeState.validations }
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
      this.setState((prevState, _props) => Object.assign(
        prevState,
        { isSavingOrRemoving: "Saving..." }
      ));
    }
  }

  _onClickRemove = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canRemove) {
      SageActions.removeSage(this.state.sage.id);
      this.setState((prevState, _props) => Object.assign(
        prevState,
        { isSavingOrRemoving: "Removing..." }
      ));
    }
  }

  get canSave(): boolean {
    return this.state.hasChanges && !this.isSavingOrRemoving;
  }

  get canRemove(): boolean {
    return !this.isSavingOrRemoving;
  }

  get isSavingOrRemoving(): boolean {
    return !!this.state.isSavingOrRemoving;
  }

  render() {
    const { sage, hasChanges, validations, isSavingOrRemoving } = this.state;

    return (
      <div className="container">
        {sage
          ? <form name="form" role="form">
            <div>
              {isSavingOrRemoving ? <Waiting caption={isSavingOrRemoving} /> : null}

              <button className="btn btn-info" disabled={!this.canSave} onClick={this._onClickSave}>
                <i className="fa fa-save fa-lg" /> Save
              </button>

              <button className="btn btn-danger" disabled={!this.canRemove} onClick={this._onClickRemove}>
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

              <FormControls label="Sagacity" name="sagacity" type="number" value={inputValue(sage.sagacity)} onFieldChange={this._onFieldChange} errors={validations} />
            </div>
          </form>

          : <Waiting />}
      </div>
    );
  }
}
