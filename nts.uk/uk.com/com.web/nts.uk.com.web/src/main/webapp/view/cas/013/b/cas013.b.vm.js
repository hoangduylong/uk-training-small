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
/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cas013;
                (function (cas013) {
                    var b;
                    (function (b) {
                        var block = nts.uk.ui.block;
                        var isNullOrEmpty = nts.uk.util.isNullOrEmpty;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var format = nts.uk.text.format;
                        var API = {
                            getCompanyIdOfLoginUser: "ctx/sys/auth/roleset/companyidofloginuser",
                            searchUser: "ctx/sys/auth/user/findByKey",
                            searchCompanyInfo: "ctx/sys/auth/grant/roleindividual/searchCompanyInfo",
                            getEmployeeList: "ctx/sys/auth/grant/roleindividual/getEmployeeList/{0}",
                            getCompanyList: "ctx/sys/auth/grant/roleindividual/getCompanyList"
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            // end KCP005
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                _this.companyId = ko.observable('');
                                _this.loginCid = ko.observable('');
                                //B1_2
                                _this.itemList = ko.observableArray([]);
                                _this.listCompany = ko.observableArray([]);
                                _this.employInfors = ko.observableArray([]);
                                _this.listEmployee = ko.observableArray([]);
                                _this.optionalColumnDatasource = ko.observableArray([]);
                                var vm = _this;
                                vm.companyCode = ko.observable('');
                                vm.companyName = ko.observable('');
                                //B1_2
                                vm.isEnable = ko.observable(true);
                                vm.isEditable = ko.observable(true);
                                vm.isRequired = ko.observable(true);
                                // KCP005
                                vm.baseDate = ko.observable(new Date());
                                vm.selectedCodeKCP = ko.observable('');
                                vm.multiSelectedCode = ko.observableArray();
                                vm.isShowAlreadySet = ko.observable(false);
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.isDialog = ko.observable(false);
                                vm.isShowNoSelectRow = ko.observable(false);
                                vm.isMultiSelect = ko.observable(false);
                                vm.isShowWorkPlaceName = ko.observable(false);
                                vm.isShowSelectAllButton = ko.observable(false);
                                vm.disableSelection = ko.observable(false);
                                vm.employeeList = ko.observableArray([]);
                                block.invisible();
                                vm.$ajax('com', API.getCompanyIdOfLoginUser).done(function (data) {
                                    if (isNullOrUndefined(data)) {
                                        vm.backToTopPage();
                                    }
                                    else {
                                        vm.loginCid(data);
                                    }
                                    vm.getListCompany();
                                }).fail(function (error) {
                                    vm.backToTopPage();
                                });
                                vm.KCP005_load();
                                return _this;
                            }
                            ViewModel.prototype.created = function () {
                                var vm = this;
                                vm.companyId.subscribe(function (cid) {
                                    if (cid) {
                                        vm.getListEmployee(cid);
                                    }
                                });
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.setFocus();
                            };
                            ViewModel.prototype.setFocus = function () {
                                $('#combo-box2').focus();
                            };
                            ViewModel.prototype.getListEmployee = function (cid) {
                                var vm = this, dfd = $.Deferred();
                                block.invisible();
                                var _path = format(API.getEmployeeList, cid);
                                vm.$ajax('com', _path).done(function (data) {
                                    if (!isNullOrEmpty(data)) {
                                        var emps = [];
                                        var job = [];
                                        for (var i = 0; i < data.length; i++) {
                                            var item = data[i];
                                            emps.push({
                                                id: item.employeeId,
                                                code: item.employeeCode,
                                                name: item.businessName,
                                                affiliationName: item.workplaceName
                                            });
                                            job.push({
                                                empId: item.employeeCode,
                                                content: item.jobTitleName
                                            });
                                        }
                                        vm.optionalColumnDatasource(job);
                                        vm.employInfors(emps);
                                        vm.listEmployee(data);
                                    }
                                    else {
                                        block.clear();
                                    }
                                }).always(function () {
                                    block.clear();
                                }).fail(function () {
                                    vm.backToTopPage();
                                    dfd.reject();
                                });
                                return dfd.promise();
                            };
                            ViewModel.prototype.getListCompany = function () {
                                var vm = this, cid = nts.uk.ui.windows.getShared("cid_from_a");
                                block.invisible();
                                vm.$ajax('com', API.getCompanyList).done(function (data) {
                                    var companys = [];
                                    if (!isNullOrUndefined(data)) {
                                        for (var i = 0; i < data.length; i++) {
                                            var item = data[i];
                                            companys.push(new ItemModel(item.companyCode, item.companyName, item.companyId));
                                        }
                                        vm.listCompany(companys);
                                        if (isNullOrUndefined(cid) || cid == "") {
                                            cid = vm.loginCid();
                                        }
                                        vm.companyId(cid);
                                    }
                                }).fail(function () {
                                    vm.backToTopPage();
                                }).always(function () {
                                });
                            };
                            ViewModel.prototype.KCP005_load = function () {
                                var vm = this;
                                vm.baseDate = ko.observable(new Date());
                                vm.isShowAlreadySet = ko.observable(false);
                                vm.alreadySettingPersonal = ko.observableArray([]);
                                vm.isDialog = ko.observable(false);
                                vm.isShowNoSelectRow = ko.observable(false);
                                vm.isMultiSelect = ko.observable(false);
                                vm.isShowWorkPlaceName = ko.observable(false);
                                vm.isShowSelectAllButton = ko.observable(false);
                                vm.disableSelection = ko.observable(false);
                                vm.listComponentOption = {
                                    isShowAlreadySet: false,
                                    isMultiSelect: false,
                                    listType: ListType.EMPLOYEE,
                                    employeeInputList: vm.employInfors,
                                    selectType: SelectType.SELECT_ALL,
                                    selectedCode: vm.multiSelectedCode,
                                    isDialog: false,
                                    alreadySettingList: vm.alreadySettingPersonal,
                                    isShowWorkPlaceName: true,
                                    isShowSelectAllButton: false,
                                    showOptionalColumn: true,
                                    optionalColumnName: nts.uk.resource.getText("CAS013_33"),
                                    optionalColumnDatasource: vm.optionalColumnDatasource,
                                    maxWidth: 520,
                                    maxRows: 15,
                                };
                                vm.multiSelectedCode.subscribe(function (e) {
                                    var employee = _.find(vm.listEmployee(), function (i) { return i.employeeCode == e.toString(); });
                                    var company = _.find(vm.listCompany(), function (i) { return i.id == vm.companyId(); });
                                    if (!isNullOrUndefined(employee)) {
                                        nts.uk.ui.windows.setShared("employeeInf", employee);
                                    }
                                    if (!isNullOrUndefined(company)) {
                                        nts.uk.ui.windows.setShared("cid", company);
                                    }
                                });
                                $('#kcp005').ntsListComponent(vm.listComponentOption);
                            };
                            ViewModel.prototype.backToTopPage = function () {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                            };
                            ViewModel.prototype.decision = function () {
                                var vm = this;
                                if (isNullOrEmpty(vm.multiSelectedCode())) {
                                    nts.uk.ui.dialog.alertError({
                                        messageId: "Msg_218",
                                        messageParams: [nts.uk.resource.getText("KCP005_1")]
                                    });
                                }
                                else {
                                    nts.uk.ui.windows.close();
                                }
                            };
                            ViewModel.prototype.cancel_Dialog = function () {
                                nts.uk.ui.windows.setShared("employeeInf", null);
                                nts.uk.ui.windows.setShared("cid", null);
                                nts.uk.ui.windows.close();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(code, name, id) {
                                this.code = code;
                                this.name = name;
                                this.id = id;
                            }
                            return ItemModel;
                        }());
                        var ListType = /** @class */ (function () {
                            function ListType() {
                            }
                            ListType.EMPLOYMENT = 1;
                            ListType.Classification = 2;
                            ListType.JOB_TITLE = 3;
                            ListType.EMPLOYEE = 4;
                            return ListType;
                        }());
                        b.ListType = ListType;
                        var SelectType = /** @class */ (function () {
                            function SelectType() {
                            }
                            SelectType.SELECT_BY_SELECTED_CODE = 1;
                            SelectType.SELECT_ALL = 2;
                            SelectType.SELECT_FIRST_ITEM = 3;
                            SelectType.NO_SELECT = 4;
                            return SelectType;
                        }());
                        b.SelectType = SelectType;
                    })(b = cas013.b || (cas013.b = {}));
                })(cas013 = view.cas013 || (view.cas013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas013.b.vm.js.map