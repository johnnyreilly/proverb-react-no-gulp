import { getConnectionUrl, status, json, makeFormData } from "./connection";
import { Saying } from "../domain/dtos/saying";
import { loadedSaying, loadedSayings, removedSaying, savedSaying, saveFailed } from "../actions/sayingActions";

const rootUrl = getConnectionUrl + "saying";

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
    return fetch(rootUrl, { method: "POST", body: makeFormData(saying) })
        .then(status)
        .then(response => json<number>(response))
        .then(savedSaying)
        .catch(saveFailed);
}
