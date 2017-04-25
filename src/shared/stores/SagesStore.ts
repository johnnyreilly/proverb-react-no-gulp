import { Dispatcher } from "flux";

import FluxStore from "./FluxStore";
import { SageActionTypes } from "../actions/sageActions";
import { Action } from "../domain/action";
import { Sage } from "../domain/dtos/sage";
import AppDispatcher from "../AppDispatcher";

export interface SagesState {
  sages: Map<number, Sage>;
  isInitialised: boolean;
}

class SagesStore extends FluxStore<SagesState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sages: new Map(),
      validations: new Map(),
      isInitialised: false
    }));
  }

  getState() {
    return this._state;
  }

  _updateSages = (updatedSages: Map<number, Sage>) => {
    this._state = Object.assign({}, this._state, { sages: updatedSages, isInitialised: true });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    const updateSages = this._updateSages;

    switch (action.type) {
      case SageActionTypes.LOADED_SAGES:
        const sages = action.payload as Sage[];
        updateSages(new Map([...sages.map(sage => [sage.id, sage] as [number, Sage])]));
        break;
    }
  }
}

const sagesStoreInstance = new SagesStore(AppDispatcher);
export default sagesStoreInstance;
