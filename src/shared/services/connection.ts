export const getConnectionUrl = () => __CONNECTION_URL__;

export function status(response: Response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

export function json<T>(response: Response) {
    return response.json() as Promise<T>;
}