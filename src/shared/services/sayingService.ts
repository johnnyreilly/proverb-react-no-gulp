import { getConnectionUrl, status, json, jsonHeaders } from "./connection";
import { SaveResult } from "../domain/saveResult";
import { Saying } from "../domain/dtos/saying";
import { loadedSaying, loadedSayings, removedSaying, savedSaying, saveFailed } from "../actions/sayingActions";

const rootUrl = getConnectionUrl() + "saying";

export function getAll() {
    return fetch(rootUrl)
        .then(status)
        .then(response => json<Saying[]>(response))
        .then(loadedSayings);
}

export function getById(id: number) {
    return fetch(`${rootUrl}/${id}`)
        .then(status)
        .then(response => json<Saying>(response))
        .then(loadedSaying);
}

export function remove(id: number) {
    return fetch(`${rootUrl}/${id}`, { method: "DELETE" })
        .then(status)
        .then(_ => removedSaying(id));
}

export function save(saying: Saying) {
    return fetch(rootUrl, { headers: jsonHeaders, method: "POST", body: JSON.stringify(saying) })
        .then(status)
        .then(response => json<SaveResult>(response))
        .then(saveResult => {
            if (saveResult.isSaved) {
                savedSaying(saveResult.savedId);
            } else {
                saveFailed(saveResult.validations);
            }
        })
        .catch(saveFailed); // TODO: this wouldn't actually receive validations; probably should be separate action
}
