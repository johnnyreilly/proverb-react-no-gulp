import $ from "jquery";

import { getConnectionUrl, status, json } from "./connection";
import { getLogger, Logger } from "../utils/logger";
import { Saying } from "../domain/dtos/saying";
import { SaveResult } from "../domain/saveResult";
import { loadedSaying, loadedSayings, removedSaying, savedSaying, saveFailed } from "../actions/sayingActions";
import { signalRProxyInvokeFailed } from "../actions/dataActions";

const hubName = "sayingHub";

export class SayingHub {
    logger: Logger;
    connection: SignalR.Hub.Connection;
    proxy: SignalR.Hub.Proxy;

    constructor() {
        this.logger = getLogger(hubName);
        this.connection = getConnectionUrl();
        this.proxy = this.connection.createHubProxy(hubName);
        this.proxy.on("getAllCalled", (name, message) => this.logger.info(name + " " + message));
    }

    getAll() {
        performHubAction(() =>
            this.proxy.invoke("getAll").then(loadedSayings).fail(signalRProxyInvokeFailed));
    }

    getById(id: number) {
        performHubAction(() =>
            this.proxy.invoke("get", id).then(loadedSaying).fail(signalRProxyInvokeFailed));
    }

    remove(id: number) {
        performHubAction(() =>
            this.proxy.invoke("remove", id).then(removedSaying).fail(signalRProxyInvokeFailed));
    }

    save(saying: Saying) {
        performHubAction(() => this.proxy.invoke("save", saying)
            .then((saveResult: SaveResult) => {
                if (saveResult.isSaved) {
                    savedSaying(saveResult.savedId);
                }
                else {
                    saveFailed(saveResult.validations);
                }
            })
            .fail(signalRProxyInvokeFailed));
    }
}

export class SayingService {
    rootUrl: string;
    cache: Map<number, Saying>;

    constructor() {
        this.rootUrl = getConnectionUrl + "saying";
        this.cache = new Map();
    }

    getAll() {
        return fetch(this.rootUrl)
            .then(status)
            .then(response => json<Saying[]>(response));

            // .then((data: Saying[]) => data));
        //  this.$http.get<Saying[]>(this.rootUrl).then(response => {
        //     const sayings = response.data;
        //     this.log(sayings.length + " Sayings loaded");
        //     return sayings;
        // });
    }

    getById(id: number, forceRemote?: boolean) {
        let saying: Saying;
        if (!forceRemote) {
            saying = this.cache.get(id);
            if (saying) {
                this.log("Saying [id: " + saying.id + "] loaded from cache");
                return this.common.$q.when(saying);
            }
        }

        return this.$http.get<Saying>(this.rootUrl + "/" + id).then(response => {
            saying = response.data;
            this.cache.set(saying.id, saying);
            this.log("Saying [id: " + saying.id + "] loaded");
            return saying;
        });
    }

    remove(id: number) {
        return this.$http.delete<void>(this.rootUrl + "/" + id).then(response => {
            this.log("Saying [id: " + id + "] removed");

            return response.data;
        }, errorReason => this.common.$q.reject(errorReason.data));
    }

    save(saying: Saying) {
        return this.$http.post<number>(this.rootUrl, saying).then(response => {
            const sayingId = response.data || saying.id;

            this.log("Saying [id: " + sayingId + "] saved");

            return sayingId;
        }, errorReason => this.common.$q.reject(errorReason.data));
    }
}

export default new SayingService();
