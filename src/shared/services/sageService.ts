import { getConnectionUrl, status, json, makeFormData } from "./connection";
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
    return fetch(rootUrl, { method: "POST", body: makeFormData(sage) })
        .then(status)
        .then(response => json<number>(response))
        .then(savedSage)
        .catch(saveFailed);
}
