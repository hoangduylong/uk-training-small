var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas014;
                (function (cas014) {
                    var b;
                    (function (b) {
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var paths = {
                            initScreen: "screen/com/cas014/get-data-init",
                            getRoleSetGrantedToEmployee: "screen/com/cas014/get-role-set-grandted-person/",
                            getEmpInfo: "ctx/sys/auth/grant/rolesetperson/getempinfo/",
                            registerData: "ctx/sys/auth/grant/rolesetperson/register",
                            deleteData: "ctx/sys/auth/grant/rolesetperson/delete"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super.call(this) || this;
                                _this.backFromCDL009 = false;
                                var self = _this;
                                self.screenMode = ko.observable(ScreenMode.NEW);
                                self.dateValue = ko.observable({});
                                self.roleSetList = ko.observableArray([]);
                                self.roleSetPersonList = ko.observableArray([]);
                                self.selectedEmployeeId = ko.observable(null);
                                self.selectedEmployeeCode = ko.observable(null);
                                self.selectedEmployeeName = ko.observable(null);
                                self.selectedEmployeeCode.subscribe(function (data) {
                                    if (!isNullOrUndefined(data)) {
                                        var item = _.find(ko.toJS(self.roleSetPersonList), function (x) { return x.code == data; });
                                        if (item) {
                                            self.backFromCDL009 = false;
                                            self.getEmployeeInfo(item.id);
                                            self.selectedEmployeeName(item.name);
                                            self.screenMode(ScreenMode.UPDATE);
                                            $("#B4_2").focus();
                                        }
                                        else {
                                            self.screenMode(ScreenMode.NEW);
                                            $("#B3_2").focus();
                                            if (!self.backFromCDL009) {
                                                self.selectedEmployeeId(null);
                                                self.selectedEmployeeName(null);
                                                self.selectedRoleCode(null);
                                                self.dateValue({});
                                                self.openDialogCDL009();
                                            }
                                            else {
                                                self.backFromCDL009 = false;
                                            }
                                        }
                                    }
                                });
                                self.selectedRoleCode = ko.observable(null);
                                self.grantedRoleColSource = ko.observableArray([]);
                                self.listComponentOption = {
                                    isShowAlreadySet: false,
                                    isMultiSelect: false,
                                    listType: 4,
                                    employeeInputList: self.roleSetPersonList,
                                    selectType: 4,
                                    selectedCode: self.selectedEmployeeCode,
                                    isDialog: true,
                                    isShowNoSelectRow: false,
                                    isShowWorkPlaceName: false,
                                    isShowSelectAllButton: false,
                                    disableSelection: false,
                                    showOptionalColumn: true,
                                    optionalColumnName: self.$i18n("CAS014_58"),
                                    optionalColumnDatasource: self.grantedRoleColSource,
                                    maxRows: 15,
                                    tabindex: 4
                                };
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                $('#component-items-list').ntsListComponent(vm.listComponentOption);
                                vm.startPage();
                            };
                            ScreenModel.prototype.startPage = function (employeeId) {
                                var self = this, dfd = $.Deferred();
                                self.$blockui("show");
                                self.$ajax("com", paths.initScreen).done(function (data) {
                                    if (data) {
                                        var _rsList_1 = _.map(data.roleSetList, function (rs) {
                                            return new RoleSet(rs.roleSetCd, rs.roleSetName);
                                        });
                                        self.roleSetList(_.sortBy(_rsList_1, ['code']));
                                        self.roleSetPersonList(_.sortBy(data.employeeInfoExportList, ["scd"]).map(function (e) { return ({
                                            id: e.sid,
                                            code: e.scd,
                                            name: e.bussinessName
                                        }); }));
                                        self.grantedRoleColSource(data.grantedPersonList.map(function (i) {
                                            var tmp = _.find(_rsList_1, function (r) { return r.code == i.roleSetCd; });
                                            var tmp2 = _.find(data.employeeInfoExportList, function (e) { return e.sid == i.employeeID; });
                                            return {
                                                empId: tmp2 ? tmp2.scd : "",
                                                content: tmp ? tmp.name : ""
                                            };
                                        }));
                                        _.defer(function () {
                                            if (_.isEmpty(self.roleSetPersonList())) {
                                                //    self.selectedEmployeeCode() == null ? self.selectedEmployeeCode.valueHasMutated() : self.selectedEmployeeCode(null);
                                                $("#B3_2").focus();
                                            }
                                            else {
                                                if (employeeId) {
                                                    var emp = _.find(ko.toJS(self.roleSetPersonList), function (x) { return x.id == employeeId; });
                                                    if (emp) {
                                                        emp.code == self.selectedEmployeeCode() ? self.selectedEmployeeCode.valueHasMutated() : self.selectedEmployeeCode(emp.code);
                                                    }
                                                    else {
                                                        self.selectedEmployeeCode() == self.roleSetPersonList()[0].code ? self.selectedEmployeeCode.valueHasMutated() : self.selectedEmployeeCode(self.roleSetPersonList()[0].code);
                                                    }
                                                }
                                                else {
                                                    self.selectedEmployeeCode() == self.roleSetPersonList()[0].code ? self.selectedEmployeeCode.valueHasMutated() : self.selectedEmployeeCode(self.roleSetPersonList()[0].code);
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                    }
                                    dfd.resolve();
                                }).fail(function (error) {
                                    self.$dialog.error(error).then(function () {
                                        if (error.messageId == "Msg_713") {
                                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                        }
                                    });
                                    dfd.reject();
                                }).always(function () {
                                    self.$blockui("hide");
                                });
                                return dfd.promise();
                            };
                            ScreenModel.prototype.getEmployeeInfo = function (empId) {
                                var self = this;
                                self.$ajax("com", paths.getRoleSetGrantedToEmployee + empId).done(function (data) {
                                    if (data) {
                                        self.selectedEmployeeId(data.employeeID);
                                        self.selectedRoleCode(data.roleSetCd);
                                        self.dateValue({
                                            startDate: data.startDate,
                                            endDate: data.endDate
                                        });
                                    }
                                }).fail(function (error) {
                                    self.$dialog.error(error);
                                });
                            };
                            ScreenModel.prototype.createNewRoleSetPerson = function () {
                                var self = this;
                                nts.uk.ui.errors.clearAll();
                                self.screenMode(ScreenMode.NEW);
                                //  self.backFromCDL009 = false;
                                self.selectedEmployeeCode(null);
                                self.selectedEmployeeName(null);
                                self.selectedRoleCode(null);
                                self.dateValue({});
                                self.openDialogCDL009();
                            };
                            ScreenModel.prototype.registerRoleSetPerson = function () {
                                var self = this;
                                $(".ntsDateRange_Component").trigger("validate");
                                if (!nts.uk.ui.errors.hasError()) {
                                    var command_1 = {
                                        roleSetCd: self.selectedRoleCode(),
                                        employeeId: self.selectedEmployeeId(),
                                        startDate: new Date(self.dateValue().startDate).toISOString(),
                                        endDate: new Date(self.dateValue().endDate).toISOString(),
                                        mode: self.screenMode()
                                    };
                                    self.$blockui("show");
                                    self.$ajax("com", paths.registerData, command_1).done(function () {
                                        self.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            self.startPage(command_1.employeeId);
                                        });
                                    }).fail(function (error) {
                                        self.$dialog.error(error);
                                    }).always(function () {
                                        self.$blockui("hide");
                                    });
                                }
                            };
                            ScreenModel.prototype.deleteRoleSetPerson = function () {
                                var self = this;
                                var command = {
                                    employeeId: self.selectedEmployeeId()
                                };
                                self.$dialog.confirm({ messageId: "Msg_18" }).then(function (value) {
                                    if (value == "yes") {
                                        // call service remove
                                        self.$blockui("show");
                                        var indexItemDelete_1 = _.findIndex(ko.toJS(self.roleSetPersonList), function (item) { return item.id == command.employeeId; });
                                        self.$ajax("com", paths.deleteData, command).done(function () {
                                            self.$dialog.info({ messageId: "Msg_16" }).then(function () {
                                                self.startPage().then(function () {
                                                    if (self.roleSetPersonList().length == 0) {
                                                        self.backFromCDL009 = true;
                                                        self.selectedEmployeeId(null);
                                                        self.selectedEmployeeName(null);
                                                        self.selectedRoleCode(null);
                                                        self.dateValue({});
                                                        self.createNewRoleSetPerson();
                                                    }
                                                    else {
                                                        self.selectedEmployeeCode(self.roleSetPersonList()[Math.min(indexItemDelete_1, self.roleSetPersonList().length - 1)].code);
                                                    }
                                                });
                                            });
                                        }).fail(function (error) {
                                            self.$dialog.error(error);
                                        }).always(function () {
                                            self.$blockui("hide");
                                        });
                                    }
                                });
                            };
                            ScreenModel.prototype.openDialogCDL009 = function () {
                                var self = this;
                                nts.uk.ui.windows.setShared('CDL009Params', {
                                    isMultiSelect: false,
                                    baseDate: moment(new Date()).toDate(),
                                    target: TargetClassification.DEPARTMENT
                                }, true);
                                nts.uk.ui.windows.sub.modal("/view/cdl/009/a/index.xhtml").onClosed(function () {
                                    self.backFromCDL009 = true;
                                    var isCancel = nts.uk.ui.windows.getShared('CDL009Cancel');
                                    if (isCancel) {
                                        return;
                                    }
                                    var output = nts.uk.ui.windows.getShared('CDL009Output');
                                    self.$blockui("show");
                                    self.$ajax("com", paths.getEmpInfo + output).done(function (data) {
                                        self.selectedEmployeeId(output);
                                        self.selectedEmployeeCode(data.employeeCode);
                                        self.selectedEmployeeName(data.personalName);
                                    }).fail(function (error) {
                                        self.$dialog.error(error);
                                    }).always(function () {
                                        self.$blockui("hide");
                                        $("#B3_2").focus();
                                    });
                                });
                            };
                            ScreenModel.prototype.closeDialog = function () {
                                nts.uk.ui.windows.close();
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        var RoleSet = /** @class */ (function () {
                            function RoleSet(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return RoleSet;
                        }());
                        b.RoleSet = RoleSet;
                        var RoleSetPerson = /** @class */ (function () {
                            function RoleSetPerson(roleSetCd, employeeId, employeeCd, employeeName, start, end) {
                                this.roleSetCd = roleSetCd;
                                this.employeeId = employeeId;
                                this.employeeCd = employeeCd;
                                this.employeeName = employeeName;
                                this.startDate = start;
                                this.endDate = end;
                                this.displayDateRange = (start && end) ? this.startDate.slice(0, 10).replace(/-/g, "/") + ' ' + nts.uk.resource.getText('CAS014_38') + ' ' + this.endDate.slice(0, 10).replace(/-/g, "/") : '';
                            }
                            return RoleSetPerson;
                        }());
                        b.RoleSetPerson = RoleSetPerson;
                        var TargetClassification = /** @class */ (function () {
                            function TargetClassification() {
                            }
                            TargetClassification.WORKPLACE = 1;
                            TargetClassification.DEPARTMENT = 2;
                            return TargetClassification;
                        }());
                        b.TargetClassification = TargetClassification;
                        var ScreenMode = /** @class */ (function () {
                            function ScreenMode() {
                            }
                            ScreenMode.NEW = 0;
                            ScreenMode.UPDATE = 1;
                            return ScreenMode;
                        }());
                        b.ScreenMode = ScreenMode;
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return ItemModel;
                        }());
                    })(b = cas014.b || (cas014.b = {}));
                })(cas014 = view.cas014 || (view.cas014 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas014.b.vm.js.map