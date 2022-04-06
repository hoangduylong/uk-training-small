var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg026;
                (function (ccg026) {
                    var component;
                    (function (component) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ComponentModel = /** @class */ (function () {
                                function ComponentModel(option) {
                                    this.componentId = nts.uk.util.randomId();
                                    this.roleId = ko.observable("");
                                    this.listPermissions = ko.observableArray([]);
                                    this.defaultSetting = {
                                        classification: 1,
                                        maxRow: 10
                                    };
                                    var self = this;
                                    self.setting = $.extend({}, self.defaultSetting, option);
                                    self.enable = ko.observable(true);
                                    self.roleId("");
                                    self.roleId.subscribe(function (x) {
                                        // reset function avialability 
                                        self.buildAvialabilityFunctionPermission().done(function () {
                                        });
                                    });
                                }
                                /** functiton start page */
                                ComponentModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    // caculate height by row number
                                    var headerHeight = 23;
                                    var heigth = (self.setting.maxRow) * 28 + headerHeight;
                                    self.getListOfFunctionPermission().done(function () {
                                        self.buildAvialabilityFunctionPermission().done(function () {
                                            dfd.resolve();
                                        }).fail(function (res) {
                                            dfd.reject();
                                        }).always(function () {
                                            $("html").find("#table-permission-" + self.componentId).ntsFixedTable({ height: heigth });
                                        });
                                    }).fail(function (res) {
                                        dfd.reject();
                                    });
                                    return dfd.promise();
                                }; //end start page
                                /**
                                 * Get List Of Function Permission
                                 */
                                ComponentModel.prototype.getListOfFunctionPermission = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    component.service.getListOfDescriptionFunctionPermission(self.setting.classification)
                                        .done(function (dataDescriptions) {
                                        dataDescriptions = _.orderBy(dataDescriptions, ['assignAtr', 'displayOrder'], ['asc', 'asc']);
                                        for (var i = 0, len = dataDescriptions.length; i < len; i++) {
                                            self.listPermissions.push(new model.FunctionPermission({
                                                functionNo: dataDescriptions[i].functionNo,
                                                initialValue: dataDescriptions[i].initialValue,
                                                displayName: dataDescriptions[i].displayName,
                                                displayOrder: dataDescriptions[i].displayOrder,
                                                description: dataDescriptions[i].description,
                                                availability: (dataDescriptions[i].initialValue || false)
                                            }));
                                        }
                                        dfd.resolve();
                                    }).fail(function (res) {
                                        self.listPermissions([]);
                                        dfd.reject();
                                        nts.uk.ui.dialog.alertError(res.message).then(function () { nts.uk.ui.block.clear(); });
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * build list of FunctionPermission with avialability value
                                 */
                                ComponentModel.prototype.buildAvialabilityFunctionPermission = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (self.roleId()) {
                                        component.service.getListOfAviabilityFunctionPermission(self.roleId(), self.setting.classification)
                                            .done(function (dataAvailability) {
                                            //process data
                                            //filter get only function have availability permission
                                            if (dataAvailability && dataAvailability.length > 0) {
                                                dataAvailability = dataAvailability.filter(function (item) { return item.availability; });
                                                //setting check for ListOfFunctionPermission and show
                                                for (var i = 0, len = self.listPermissions().length; i < len; i++) {
                                                    var index = _.findIndex(dataAvailability, function (x) { return x.functionNo == self.listPermissions()[i].functionNo; });
                                                    var isAvailability = (index > -1);
                                                    self.listPermissions()[i].availability(isAvailability || false);
                                                }
                                            }
                                            else {
                                                self.resetFunctionPermissioṇ();
                                            }
                                            self.listPermissions.valueHasMutated();
                                            dfd.resolve();
                                        }).fail(function (res) {
                                            dfd.reject();
                                            nts.uk.ui.dialog.alertError(res.message).then(function () { nts.uk.ui.block.clear(); });
                                        });
                                    }
                                    else {
                                        self.resetFunctionPermissioṇ();
                                        self.listPermissions.valueHasMutated();
                                        dfd.resolve();
                                    }
                                    return dfd.promise();
                                };
                                ComponentModel.prototype.resetFunctionPermissioṇ = function () {
                                    var self = this;
                                    for (var i = 0, len = self.listPermissions().length; i < len; i++) {
                                        self.listPermissions()[i].availability(self.listPermissions()[i].initialValue || false);
                                    }
                                };
                                return ComponentModel;
                            }()); //end componentModel
                            viewmodel.ComponentModel = ComponentModel;
                        })(viewmodel = component.viewmodel || (component.viewmodel = {})); //end viewmodel
                        //module model
                        var model;
                        (function (model) {
                            //Class Function Permission
                            var FunctionPermission = /** @class */ (function () {
                                function FunctionPermission(param) {
                                    this.availability = ko.observable(false);
                                    var self = this;
                                    self.functionNo = param.functionNo;
                                    self.initialValue = param.initialValue || false;
                                    self.displayName = param.displayName;
                                    self.displayOrder = param.displayOrder;
                                    self.description = param.description;
                                    self.availability(param.availability || false);
                                }
                                return FunctionPermission;
                            }());
                            model.FunctionPermission = FunctionPermission;
                        })(model = component.model || (component.model = {})); //end module model
                    })(component = ccg026.component || (ccg026.component = {}));
                })(ccg026 = view.ccg026 || (view.ccg026 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {})); //end module
//# sourceMappingURL=component.vm.js.map