import { Dispatcher } from "flux";

import FluxStore from "../../shared/stores/FluxStore";
import { SayingActionTypes } from "../../shared/actions/sayingActions";
import { Action } from "../../shared/domain/action";
import { SayingVM } from "../../shared/domain/dtos/saying";
import AppDispatcher from "../../shared/AppDispatcher";
import { ValidationMessages } from "../../shared/domain/saveResult";

export interface SayingState {
  saying: SayingVM | undefined;
  validations: Map<string, string>;
  savedId: number | undefined;
}

class SayingStore extends FluxStore<SayingState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      saying: undefined,
      validations: new Map(),
      savedId: undefined
    }));
  }

  getState() {
    return this._state;
  }

  _onDispatch(action: Action) {
    switch (action.type) {
      case SayingActionTypes.LOADED_SAYING:
        const saying = action.payload as SayingVM;
        this._updateStateAndEmit({ saying, savedId: undefined, validations: new Map() });
        break;

      case SayingActionTypes.REMOVED_SAYING:
        this._updateStateAndEmit({ saying: undefined, savedId: undefined, validations: new Map() });
        break;

      case SayingActionTypes.SAVE_SAYING:
        this._updateStateAndEmit({ validations: new Map(), savedId: undefined });
        break;

      case SayingActionTypes.SAVED_SAYING:
        const savedId = action.payload as number;
        this._updateStateAndEmit({ savedId, validations: new Map() });
        break;

      case SayingActionTypes.SAVE_SAYING_FAILED:
        const validations = action.payload as ValidationMessages;
        this._updateStateAndEmit({ validations: new Map([
          ...Object.keys(validations.errors).map(error => [error, validations.errors[error].join()] as [string, string])
        ]) });
        break;
    }
  }
}

const sayingStoreInstance = new SayingStore(AppDispatcher);
export default sayingStoreInstance;
