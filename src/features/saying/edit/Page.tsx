import React from "react";
import { RouteComponentProps } from "react-router-dom";
import FBEmitter from "fbemitter";

import SayingStore, { SayingState } from "../Store";
import * as SayingActions from "../../../shared/actions/sayingActions";
import Waiting from "../../../shared/components/Waiting";
import FormControlSelect from "../../../shared/components/FormControlSelect";
import { SayingVM } from "../../../shared/domain/dtos/saying";
import { SageVM } from "../../../shared/domain/dtos/sage";

type Props = RouteComponentProps<{
  id: string;
}>;

interface State {
  saying: SayingVM | undefined;
  sages: Map<number, SageVM>;
  validations: Map<string, string>;
  hasChanges: boolean;
  isSavingOrRemoving: "Saving..." | "Removing..." | undefined;
}

export default class SayingEdit extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    const state = SayingStore.getState();
    this.state = Object.assign(
      this.getSayingAndValidationsFromStore(props.match.params.id, state.sayingState),
      { hasChanges: false, isSavingOrRemoving: undefined, sages: state.sagesState.sages });
  }

  _onChange = () => {
    const state = SayingStore.getState();
    if (state.sayingState.savedId) {
      this.props.history.push(`/saying/detail/${this.props.match.params.id}`);
    } else {
      this.setState((prevState, props) => Object.assign(
        prevState,
        this.getSayingAndValidationsFromStore(props.match.params.id, state.sayingState),
        { isSavingOrRemoving: undefined, sages: state.sagesState.sages }
      )); // TODO: Do something more sophisticated?
    }
  }

  getSayingAndValidationsFromStore(id: string, storeState: SayingState) {
    const idNum = parseInt(id);
    return storeState.saying && storeState.saying.id === idNum
      ? { saying: storeState.saying, validations: storeState.validations }
      : { saying: undefined, validations: new Map() };
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

  _onFieldChange = (event: React.FormEvent<any>) => {
    const eventTarget = event.target as HTMLInputElement;
    const fieldName = eventTarget.name;
    const fieldValue = eventTarget.value;
    this.setState((prevState, _props) => Object.assign(
      prevState,
      { hasChanges: true, saying: Object.assign(prevState.saying, { [fieldName]: fieldValue }) }
    ));
  }

  _onClickSave = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canSave) {
      SayingActions.saveSaying(this.state.saying!);
      this.setState((prevState, _props) => Object.assign(
        prevState,
        { isSavingOrRemoving: "Saving..." }
      ));
    }
  }

  _onClickRemove = (event: React.FormEvent<any>) => {
    event.preventDefault();

    if (this.canRemove) {
      SayingActions.removeSaying(this.state.saying!.id);
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
    const { saying, hasChanges, validations, isSavingOrRemoving, sages } = this.state;

    return (
      <div className="container">
        {saying
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

            <h2>Saying Edit</h2>

            <div className="form-horizontal">
              <FormControlSelect label="Sage" name="sage" value={saying.sageId} onFieldChange={this._onFieldChange} errors={validations}>
                  { [...sages.values()].map(sage =>
                <option key={sage.id} value={sage.id}>{sage.name}</option>)}
              </FormControlSelect>
            </div>
          </form>

          : <Waiting />}
      </div>
    );
  }
}



