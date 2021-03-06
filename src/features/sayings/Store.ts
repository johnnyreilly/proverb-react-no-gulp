import { Dispatcher } from "flux";

import SagesStore from "../sages/Store";
import FluxStore from "../../shared/stores/FluxStore";
import { SayingActionTypes } from "../../shared/actions/sayingActions";
import { SageActionTypes } from "../../shared/actions/sageActions";
import { Action } from "../../shared/domain/action";
import { SayingVM } from "../../shared/domain/dtos/saying";
import AppDispatcher from "../../shared/AppDispatcher";

export interface SayingsState {
  sayings: Map<number, SayingVM>;
  isInitialised: boolean;
}

class SayingsStore extends FluxStore<SayingsState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sayings: new Map(),
      isInitialised: false
    }));
  }

  getState() {
    const sagesState = SagesStore.getState();

    return {
      sayingsState: this._state,
      sagesState
    };
  }

  _updateSayings = (updatedSayings: Map<number, SayingVM>) => {
    this._state = Object.assign({}, this._state, { sayings: updatedSayings, isInitialised: true });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    const updateSayings = this._updateSayings;

    switch (action.type) {
      case SayingActionTypes.LOADED_SAYINGS:
        const sayings = action.payload as SayingVM[];
        updateSayings(new Map([...sayings.map(saying => [saying.id, saying] as [number, SayingVM])]));
        break;

      case SageActionTypes.LOADED_SAGES:
        AppDispatcher.waitFor([SagesStore.dispatchToken]);
        this.emitChange();
        break;
    }
  }
}

const sayingsStoreInstance = new SayingsStore(AppDispatcher);
export default sayingsStoreInstance;
