export const getConnectionUrl = () => __CONNECTION_URL__;

export function status(response: Response) {
    return response.status >= 200 && response.status < 300
        ? Promise.resolve(response)
        : Promise.reject(new Error(response.statusText));
}

export function json<T>(response: Response) {
    return response.json() as Promise<T>;
}

export function makeFormData(payload: Object) {
    const data = new FormData();
    data.append("json", JSON.stringify(payload));
    return data;
}

export const jsonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
