import AppDispatcher from "../AppDispatcher";
import { SageVM } from "../domain/dtos/sage";
import * as sageService from "../services/sageService";
import { ValidationMessages } from "../domain/saveResult";

export const SageActionTypes = {
  LOADING_SAGES: "SageActionTypes.LOADING_SAGES",
  LOADED_SAGES: "SageActionTypes.LOADED_SAGES",
  LOAD_SAGE: "SageActionTypes.LOAD_SAGE",
  LOADED_SAGE: "SageActionTypes.LOADED_SAGE",
  REMOVE_SAGE: "SageActionTypes.REMOVE_SAGE",
  REMOVED_SAGE: "SageActionTypes.REMOVED_SAGE",
  SAVE_SAGE: "SageActionTypes.SAVE_SAGE",
  SAVED_SAGE: "SageActionTypes.SAVED_SAGE",
  SAVE_SAGE_FAILED: "SageActionTypes.SAVE_SAGE_FAILED"
};

export function loadSages() {
  AppDispatcher.dispatch({ type: SageActionTypes.LOADING_SAGES });
  sageService.getAll();
}

export function loadSage(id: number) {
  AppDispatcher.dispatch({ type: SageActionTypes.LOAD_SAGE });
  sageService.getById(id);
}

export function removeSage(id: number) {
  AppDispatcher.dispatch({ type: SageActionTypes.REMOVE_SAGE });
  return sageService.remove(id);
}

export function saveSage(sage: SageVM) {
  AppDispatcher.dispatch({
    type: SageActionTypes.SAVE_SAGE,
    payload: sage
  });
  return sageService.save(sage);
}

export const loadedSages = (sages: SageVM[]) =>
  AppDispatcher.dispatch({ type: SageActionTypes.LOADED_SAGES, payload: sages });

export const loadedSage = (sage: SageVM) =>
  AppDispatcher.dispatch({ type: SageActionTypes.LOADED_SAGE, payload: sage });

export const removedSage = (sageId: number) =>
  AppDispatcher.dispatch({ type: SageActionTypes.REMOVED_SAGE, payload: sageId });

export const savedSage = (savedId: number) =>
  AppDispatcher.dispatch({ type: SageActionTypes.SAVED_SAGE, payload: savedId });

export const saveFailed = (validationMessages: ValidationMessages) =>
  AppDispatcher.dispatch({ type: SageActionTypes.SAVE_SAGE_FAILED, payload: validationMessages });
