import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import FBEmitter from "fbemitter";

import SayingsStore, { SayingsState } from "./Store";
import { SagesState } from "../sages/Store";
import * as SayingActions from "../../shared/actions/sayingActions";
import * as SageActions from "../../shared/actions/sageActions";
import Saying from "./Saying";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{ selectedSageId: string | undefined }>;

interface State {
  sayingsState: SayingsState;
  sagesState: SagesState;
}

export default class Sayings extends React.Component<Props, State> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = SayingsStore.getState();
  }

  get selectedSageId() {
    const { selectedSageId } = this.props.match.params;
    return selectedSageId ? parseInt(selectedSageId) : undefined;
  }

  componentWillMount() {
    this.eventSubscription = SayingsStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  _onChange = () => {
    this.setState((prevState, _props) => Object.assign(prevState, SayingsStore.getState()));
  }

  componentDidMount() {
    if (!this.state.sayingsState.isInitialised) {
      SayingActions.loadSayings();
    }
    if (!this.state.sagesState.isInitialised) {
      SageActions.loadSages();
    }
  }

  _onSelectChange = (formEvent: React.FormEvent<any>) => {
    const { value } = formEvent.target as HTMLSelectElement;
    this.props.history.push(`/sayings/${ value }`);
  }

  render() {
    const selectedSageId = this.selectedSageId;
    const { sayingsState, sagesState } = this.state;
    const sayings = [...sayingsState.sayings.values()];
    const sayingsToDisplay = selectedSageId ? sayings.filter(saying => saying.sageId === selectedSageId) : sayings;

    return (
      <div className="container">
        <div className="row">
          <div className="pull-left">
            <Link to={`/saying/edit/add`}><i className="fa fa-plus fa-lg" /> Add</Link>
          </div>

          <div className="pull-right">
            <select value={selectedSageId} onChange={this._onSelectChange}>
              <option value={undefined} />
              {[...sagesState.sages.values()].map(sage =>
                <option key={sage.id} value={sage.id}>{sage.name}</option>)}
            </select>
          </div>
        </div>

        <h2>Sayings</h2>

        {sayingsState.isInitialised
          ? sayingsToDisplay.map((saying, index) =>
            <Saying key={index} saying={saying} />)
          : <Waiting />}
      </div>
    );
  }
}
