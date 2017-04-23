import { Dispatcher } from "flux";
import FluxStore from "./FluxStore";
import { SageActionTypes } from "../actions/sageActions";
import { Action } from "../domain/action";
import { Sage } from "../domain/dtos/sage";
import AppDispatcher from "../AppDispatcher";

export interface SageState {
  sages: Map<number, Sage>;
  isInitialised: boolean;
}

class SageStore extends FluxStore<SageState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sages: new Map(),
      isInitialised: false
    }));
  }

  getState() {
    return this._state;
  }

  _updateState = (updatedSages: Map<number, Sage>) => {
    this._state = Object.assign({}, this._state, { sages: updatedSages, isInitialised: true });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    const state = this._state;
    const updateState = this._updateState;

    switch (action.type) {
      case SageActionTypes.LOADED_SAGES:
        const sages = action.payload as Sage[];
        updateState(new Map([...sages.map(sage => [sage.id, sage] as [number, Sage])]));
        break;
      case SageActionTypes.LOADED_SAGE:
        const sage = action.payload as Sage;
        updateState(state.sages.set(sage.id, sage));
        break;
      case SageActionTypes.REMOVED_SAGE:
        const sageId = action.payload as number;
        state.sages.delete(sageId);
        updateState(state.sages);
        break;
    }
  }
}

const sageStoreInstance = new SageStore(AppDispatcher);
export default sageStoreInstance;
