﻿import { common } from "../common/common";
import { modalDialogServiceName, ModalDialogService } from "../common/modalDialog";
import { loggers } from "../common/logger";
import { datacontext } from "../services/datacontext";
import { sage } from "../services/repository.sage";
import { saying } from "../services/repository.saying";

export const sayingEditControllerName = "sayingEdit";

interface sayingEditRouteParams extends ng.ui.IStateParamsService {
    id: string;
}

interface sayingEditScope extends ng.IScope {
    form: ng.IFormController;
}

export class SayingEditController {

    errors: { [field: string]: string };
    log: loggers;
    sages: sage[];
    saying: saying;
    title: string;

    private _isSavingOrRemoving: boolean;

    static $inject = ["$location", "$stateParams", "$scope", modalDialogServiceName, "common", "datacontext"];
    constructor(
        private $location: ng.ILocationService,
        private $stateParams: sayingEditRouteParams,
        private $scope: sayingEditScope,
        private bsDialog: ModalDialogService,
        private common: common,
        private datacontext: datacontext
        ) {

        this.errors = {};
        this.log = common.logger.getLoggers(sayingEditControllerName);
        this.sages = [];
        this.saying = undefined;

        this._isSavingOrRemoving = false;

        this.activate();
    }

    // Prototype methods

    activate() {

        var id = parseInt(this.$stateParams.id, 10);
        var dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getAll().then(data => this.sages = data)];
        var title: string;

        if (id) {
            dataPromises.push(this.datacontext.saying.getById(id, true).then(saying => this.saying = saying));
            title = "Saying Edit";
        }
        else {
            title = "Saying Add";
        }

        this.common.activateController(dataPromises, sayingEditControllerName, title)
            .then(() => {
                this.log.info("Activated " + title + " View");
                this.title = title;

                if (id) {
                    // Set the saying's sage by looking it up in the sages already loaded
                    this.saying.sage = this.sages.find(s => s.id === this.saying.sageId);
                }
            });
    }

    remove() {

        this.bsDialog.deleteDialog("Do you want to remove this saying?")
            .then(() => {

                this._isSavingOrRemoving = true;

                this.common.waiter(this.datacontext.saying.remove(this.saying.id), sayingEditControllerName, "Removing saying")
                    .then(response => {

                        this.log.success("Removed saying");
                        this.$location.path("/sayings/").search("sageId", this.saying.sageId);
                    })
                    .catch(response => {
                        this.log.error("Failed to remove saying", response);
                    })
                    .finally(() => this._isSavingOrRemoving = false);
            });
    }

    save() {

        this.errors = {}; //Wipe server errors
        this._isSavingOrRemoving = true;

        // Prepare the saying to save - send the minimal payload of data across the wire
        var sayingToSave = angular.copy(this.saying);
        if (sayingToSave.sage) {
            sayingToSave.sageId = sayingToSave.sage.id;
        }
        else {
            sayingToSave.sageId = 0;
        }
        sayingToSave.sage = null;

        this.common.waiter(this.datacontext.saying.save(sayingToSave), sayingEditControllerName, "Saving saying")
            .then(sayingId => {

                this.log.success("Saved saying");
                this.$location.path("/sayings/").search("sageId", sayingToSave.sageId);
            })
            .catch(response => {

                if (response.errors) {

                    angular.forEach(response.errors, (errors, field) => {
                        var model: ng.INgModelController = this.$scope.form[field];
                        if (model) {
                            model.$setValidity("server", false);
                        }
                        else {
                            // No screen element to tie failure message to so pop a toast
                            this.log.error(errors);
                        }
                        this.errors[field] = errors.join(",");
                    });
                }
                else {
                    this.log.error("Failed to save saying", response);
                }
            })
            .finally(() => this._isSavingOrRemoving = false);
    }

    // Properties

    get hasChanges(): boolean {
        return this.$scope.form.$dirty;
    }

    get canSave(): boolean {
        return this.hasChanges && !this.isSavingOrRemoving && this.$scope.form.$valid;
    }

    get isSavingOrRemoving(): boolean {
        return this._isSavingOrRemoving;
    }
}
