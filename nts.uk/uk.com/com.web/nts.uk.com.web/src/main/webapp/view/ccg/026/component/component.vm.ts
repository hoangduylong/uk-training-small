module nts.uk.com.view.ccg026.component {
    import getText = nts.uk.resource.getText;

    export module viewmodel {
        export class ComponentModel {
            private componentId: string = nts.uk.util.randomId();
            roleId: KnockoutObservable<string> = ko.observable("");
            enable: KnockoutObservable<boolean>;
            listPermissions: KnockoutObservableArray<model.FunctionPermission> = ko.observableArray([]);
            
            private defaultSetting: model.ISetting = {
                classification: 1,
                maxRow: 10
            };
            private setting: model.ISetting;

            constructor(option: model.IOption) {
                let self = this;
                self.setting = $.extend({}, self.defaultSetting, option);
                self.enable = ko.observable(true);
                self.roleId("");
                self.roleId.subscribe((x) => {
                    // reset function avialability 
                    self.buildAvialabilityFunctionPermission().done(() => {
                    });
                });
            }

            /** functiton start page */
            startPage(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();

                // caculate height by row number
                var headerHeight: number = 23;
                var heigth: number = (self.setting.maxRow) * 28 + headerHeight;
                self.getListOfFunctionPermission().done(() => {
                    self.buildAvialabilityFunctionPermission().done(() => {
                        dfd.resolve();
                    }).fail(function(res: any) {
                        dfd.reject();
                    }).always(() => {
                        $("html").find("#table-permission-" + self.componentId).ntsFixedTable({ height: heigth });
                    });
                }).fail(function(res: any) {
                    dfd.reject();
                });
                return dfd.promise();
            }//end start page

            /**
             * Get List Of Function Permission
             */
            private getListOfFunctionPermission(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();

                service.getListOfDescriptionFunctionPermission(self.setting.classification)
                    .done((dataDescriptions: Array<model.IFunctionPermission>) => {
                        dataDescriptions = _.orderBy(dataDescriptions, ['assignAtr', 'displayOrder'], ['asc', 'asc']);
                        for (var i = 0, len = dataDescriptions.length; i < len; i++) {
                            self.listPermissions.push(new model.FunctionPermission
                                ({
                                    functionNo: dataDescriptions[i].functionNo,
                                    initialValue: dataDescriptions[i].initialValue,
                                    displayName: dataDescriptions[i].displayName,
                                    displayOrder: dataDescriptions[i].displayOrder,
                                    description: dataDescriptions[i].description,
                                    availability: (dataDescriptions[i].initialValue || false)
                                }));
                        }
                        dfd.resolve();
                    }).fail(function(res: any) {
                        self.listPermissions([]);
                        dfd.reject();
                        nts.uk.ui.dialog.alertError(res.message).then(function() { nts.uk.ui.block.clear(); });
                    });
                return dfd.promise();
            }

            /**
             * build list of FunctionPermission with avialability value
             */
            private buildAvialabilityFunctionPermission(): JQueryPromise<any> {
                let self = this;
                let dfd = $.Deferred();
                if (self.roleId()) {
                    service.getListOfAviabilityFunctionPermission(self.roleId(), self.setting.classification)
                        .done((dataAvailability: Array<model.IAvailabilityPermission>) => {
                            //process data
                            //filter get only function have availability permission
                            if (dataAvailability && dataAvailability.length > 0) {
                                dataAvailability = dataAvailability.filter(item => item.availability);
                                //setting check for ListOfFunctionPermission and show
                                for (var i = 0, len = self.listPermissions().length; i < len; i++) {
                                    var index = _.findIndex(dataAvailability, function(x: model.IAvailabilityPermission)
                                    { return x.functionNo == self.listPermissions()[i].functionNo });
                                    var isAvailability: boolean = (index > -1);
                                    self.listPermissions()[i].availability(isAvailability || false);
                                }
                            } else {
                                self.resetFunctionPermissioṇ();
                            }
                            self.listPermissions.valueHasMutated();
                            dfd.resolve();
                        }).fail(function(res: any) {
                            dfd.reject();
                            nts.uk.ui.dialog.alertError(res.message).then(function() { nts.uk.ui.block.clear(); });
                        });
                } else {
                    self.resetFunctionPermissioṇ();
                    self.listPermissions.valueHasMutated();
                    dfd.resolve();
                }
                return dfd.promise();
            }

            private resetFunctionPermissioṇ()  {
                let self = this;
                for (var i = 0, len = self.listPermissions().length; i < len; i++) {
                    self.listPermissions()[i].availability(self.listPermissions()[i].initialValue || false);
                }
            }
        }//end componentModel
    }//end viewmodel

    //module model
    export module model {

        //Model Input parameter
        export interface IOption {
            classification?: number;
            maxRow?: number;
            tabindex?: number;
        }

        //Class Input parameter
        export interface ISetting {
            maxRow: number;
            classification: number;
        }

        //Model Function Permission
        export interface IFunctionPermission {
            functionNo: number;
            initialValue: boolean;
            displayName: string;
            displayOrder: number;
            description: string;
            availability: boolean;
        }

        //Class Function Permission
        export class FunctionPermission {
            functionNo: number;
            initialValue: boolean;
            displayName: string;
            displayOrder: number;
            description: string;
            availability: KnockoutObservable<boolean> = ko.observable(false);
            constructor(param: IFunctionPermission) {
                let self = this;
                self.functionNo = param.functionNo;
                self.initialValue = param.initialValue || false;
                self.displayName = param.displayName;
                self.displayOrder = param.displayOrder;
                self.description = param.description;
                self.availability(param.availability || false);
            }

        }

        //Model Function Availability Permission
        export interface IAvailabilityPermission {
            functionNo: number;
            roleId: string;
            companyId: string;
            availability: boolean;
        }
    }//end module model
}//end module

