import AppDispatcher from "../AppDispatcher";
import { Saying } from "../domain/dtos/saying";
import * as sayingService from "../services/sayingService";
import { ValidationMessages } from "../domain/saveResult";

export const SayingActionTypes = {
  LOADING_SAYINGS: "SayingActionTypes.LOADING_SAYINGS",
  LOADED_SAYINGS: "SayingActionTypes.LOADED_SAYINGS",
  LOAD_SAYING: "SayingActionTypes.LOAD_SAYING",
  LOADED_SAYING: "SayingActionTypes.LOADED_SAYING",
  REMOVE_SAYING: "SayingActionTypes.REMOVE_SAYING",
  REMOVED_SAYING: "SayingActionTypes.REMOVED_SAYING",
  SAVE_SAYING: "SayingActionTypes.SAVE_SAYING",
  SAVED_SAYING: "SayingActionTypes.SAVED_SAYING",
  SAVE_SAYING_FAILED: "SayingActionTypes.SAVE_SAYING_FAILED"
};

export function loadSayings() {
  AppDispatcher.dispatch({ type: SayingActionTypes.LOADING_SAYINGS });
  sayingService.getAll();
}

export function loadSaying(id: number) {
  AppDispatcher.dispatch({ type: SayingActionTypes.LOAD_SAYING });
  sayingService.getById(id);
}

export function removeSaying(id: number) {
  AppDispatcher.dispatch({ type: SayingActionTypes.REMOVE_SAYING });
  return sayingService.remove(id);
}

export function saveSaying(saying: Saying) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.SAVE_SAYING,
    payload: saying
  });
  return sayingService.save(saying);
}

export const loadedSayings = (sayings: Saying[]) =>
  AppDispatcher.dispatch({ type: SayingActionTypes.LOADED_SAYINGS, payload: sayings });

export const loadedSaying = (saying: Saying) =>
  AppDispatcher.dispatch({ type: SayingActionTypes.LOADED_SAYING, payload: saying });

export const removedSaying = (sayingId: number) =>
  AppDispatcher.dispatch({ type: SayingActionTypes.REMOVED_SAYING, payload: sayingId });

export const savedSaying = (savedId: number) =>
  AppDispatcher.dispatch({ type: SayingActionTypes.SAVED_SAYING, payload: savedId });

export const saveFailed = (validationMessayings: ValidationMessages) =>
  AppDispatcher.dispatch({ type: SayingActionTypes.SAVE_SAYING_FAILED, payload: validationMessayings });
