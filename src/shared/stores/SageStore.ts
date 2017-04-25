import { Dispatcher } from "flux";

import FluxStore from "./FluxStore";
import { SageActionTypes } from "../actions/sageActions";
import { Action } from "../domain/action";
import { Sage } from "../domain/dtos/sage";
import AppDispatcher from "../AppDispatcher";
import { ValidationMessages } from "../domain/saveResult";

export interface SageState {
  sage: Sage;
  validations: Map<string, string>;
}

class SageStore extends FluxStore<SageState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sage: undefined,
      validations: new Map()
    }));
  }

  getState() {
    return this._state;
  }

  _updateSage = (updatedSage: Sage) => {
    this._state = Object.assign({}, this._state, { sage: updatedSage });
    this.emitChange();
  }

  _updateValidations = (updatedValidations: Map<string, string>) => {
    this._state = Object.assign({}, this._state, { validations: updatedValidations });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    const updateSage = this._updateSage;
    const updateValidations = this._updateValidations;

    switch (action.type) {
      case SageActionTypes.LOADED_SAGE:
        const sage = action.payload as Sage;
        updateSage(sage);
        break;

      case SageActionTypes.REMOVED_SAGE:
        updateSage(null);
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
