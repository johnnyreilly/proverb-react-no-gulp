import { Dispatcher } from "flux";

import FluxStore from "../../shared/stores/FluxStore";
import { SageActionTypes } from "../../shared/actions/sageActions";
import { Action } from "../../shared/domain/action";
import { SageVM } from "../../shared/domain/dtos/sage";
import AppDispatcher from "../../shared/AppDispatcher";
import { ValidationMessages } from "../../shared/domain/saveResult";

export interface SageState {
  sage: SageVM | undefined;
  validations: Map<string, string>;
  savedId: number | undefined;
}

class SageStore extends FluxStore<SageState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sage: undefined,
      validations: new Map(),
      savedId: undefined
    }));
  }

  getState() {
    return this._state;
  }

  _onDispatch(action: Action) {
    switch (action.type) {
      case SageActionTypes.LOADED_SAGE:
        const sage = action.payload as SageVM;
        this._updateStateAndEmit({ sage, savedId: undefined, validations: new Map() });
        break;

      case SageActionTypes.REMOVED_SAGE:
        this._updateStateAndEmit({ sage: undefined, savedId: undefined, validations: new Map() });
        break;

      case SageActionTypes.SAVE_SAGE:
        this._updateStateAndEmit({ validations: new Map(), savedId: undefined });
        break;

      case SageActionTypes.SAVED_SAGE:
        const savedId = action.payload as number;
        this._updateStateAndEmit({ savedId, validations: new Map() });
        break;

      case SageActionTypes.SAVE_SAGE_FAILED:
        const validations = action.payload as ValidationMessages;
        this._updateStateAndEmit({ validations: new Map([
          ...Object.keys(validations.errors).map(error => [error, validations.errors[error].join()] as [string, string])
        ]) });
        break;
    }
  }
}

const sageStoreInstance = new SageStore(AppDispatcher);
export default sageStoreInstance;
