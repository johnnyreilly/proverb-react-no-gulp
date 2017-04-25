import { Dispatcher } from "flux";

import FluxStore from "./FluxStore";
import { SageActionTypes } from "../actions/sageActions";
import { Action } from "../domain/action";
import { Sage } from "../domain/dtos/sage";
import AppDispatcher from "../AppDispatcher";
import { ValidationMessages } from "../domain/saveResult";

export interface SageState {
  sages: Map<number, Sage>;
  validations: Map<string, string>;
  isInitialised: boolean;
}

class SageStore extends FluxStore<SageState> {
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

  _updateValidations = (updatedValidations: Map<string, string>) => {
    this._state = Object.assign({}, this._state, { validations: updatedValidations });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    const state = this._state;
    const updateSages = this._updateSages;
    const updateValidations = this._updateValidations;

    switch (action.type) {
      case SageActionTypes.LOADED_SAGES:
        const sages = action.payload as Sage[];
        updateSages(new Map([...sages.map(sage => [sage.id, sage] as [number, Sage])]));
        break;

      case SageActionTypes.LOADED_SAGE:
        const sage = action.payload as Sage;
        updateSages(state.sages.set(sage.id, sage));
        break;

      case SageActionTypes.REMOVED_SAGE:
        const sageId = action.payload as number;
        state.sages.delete(sageId);
        updateSages(state.sages);
        break;

      case SageActionTypes.SAVE_SAGE_FAILED:
        const validations = action.payload as ValidationMessages;
        updateValidations(new Map([
          ...Object.keys(validations.errors).map(error => [error, validations.errors[error].join()] as [string, string])
        ]));
        break;

      case SageActionTypes.CLEAR_VALIDATIONS:
        updateValidations(new Map());
        break;
    }
  }
}

const sageStoreInstance = new SageStore(AppDispatcher);
export default sageStoreInstance;
