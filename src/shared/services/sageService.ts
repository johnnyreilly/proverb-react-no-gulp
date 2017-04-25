import { getConnectionUrl, status, json, jsonHeaders } from "./connection";
import { SaveResult } from "../domain/saveResult";
import { Sage } from "../domain/dtos/sage";
import { loadedSage, loadedSages, removedSage, savedSage, saveFailed } from "../actions/sageActions";

const rootUrl = getConnectionUrl() + "sage";

export function getAll() {
    return fetch(rootUrl)
        .then(status)
        .then(response => json<Sage[]>(response))
        .then(loadedSages);
}

export function getById(id: number) {
    return fetch(`${rootUrl}/${id}`)
        .then(status)
        .then(response => json<Sage>(response))
        .then(loadedSage);
}

export function remove(id: number) {
    return fetch(`${rootUrl}/${id}`, { method: "DELETE" })
        .then(status)
        .then(_ => removedSage(id));
}

export function save(sage: Sage) {
    return fetch(rootUrl, { headers: jsonHeaders, method: "POST", body: JSON.stringify(sage) })
        .then(status)
        .then(response => json<SaveResult>(response))
        .then(saveResult => {
            if (saveResult.isSaved) {
                savedSage(saveResult.savedId);
            } else {
                saveFailed(saveResult.validations);
            }
        })
        .catch(saveFailed); // TODO: this wouldn't actually receive validations; probably should be separate action
}
