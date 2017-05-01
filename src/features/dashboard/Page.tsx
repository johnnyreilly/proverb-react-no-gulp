import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import FBEmitter from "fbemitter";

import SagesStore, { SagesState } from "../sages/Store";
import * as SageActions from "../../shared/actions/sageActions";
import Waiting from "../../shared/components/Waiting";

type Props = RouteComponentProps<{}>;

export default class Sages extends React.Component<Props, SagesState> {
  eventSubscription: FBEmitter.EventSubscription;
  constructor(props: Props) {
    super(props);
    this.state = SagesStore.getState();
  }

  componentWillMount() {
    this.eventSubscription = SagesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    this.eventSubscription.remove();
  }

  _onChange = () => {
    this.setState((prevState, _props) => Object.assign(prevState, SagesStore.getState()));
  }

  componentDidMount() {
    if (!this.state.isInitialised) {
      SageActions.loadSages();
    }
  }

  render() {
    const { isInitialised, sages } = this.state;

    return (
      <div className="container">
        <div className="row">

          <div className="col-md-6">
            <div className="jumbotron">
              <div className="center-block text-center" style={{ maxWidth: "250px" }}>
                <h2>The Wisdom of Socrates Aruldas</h2>
                <img src="images/socrates-statue.jpg" className="img-rounded" />
                <h3>(and a few others...)</h3>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h2>Sages</h2>
            <table className="table table-condensed table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {isInitialised
                  ? [...sages.values()].map(sage => (
                    <tr>
                      <td><Link to={`/sayings/${sage.id}`}>{ sage.name }</Link></td>
                      <td>{ sage.userName }</td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <td colSpan={2}><Waiting /></td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
}
