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
/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var ccg005;
                (function (ccg005) {
                    var b;
                    (function (b) {
                        var screenModel;
                        (function (screenModel) {
                            var API = {
                                getPermissionSettings: "screen/com/ccg005/get-permission-settings",
                                save: "ctx/office/reference/auth/save",
                            };
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.listDataMulti = ko.observableArray([]);
                                    _this.isEnable = ko.observable(true);
                                    _this.isEditable = ko.observable(false);
                                    _this.isRequired = ko.observable(false);
                                    _this.selectFirstIfNull = ko.observable(false);
                                    _this.selectedRole = ko.observable();
                                    _this.cId = ko.observable("");
                                    _this.lstRole = ko.observableArray([]);
                                    _this.listJobTitle = ko.observableArray([]);
                                    _this.listSpecifyAuthInquiry = ko.observableArray([]);
                                    _this.listJobDataSource = ko.observableArray([]);
                                    _this.columns = ko.observableArray([
                                        { headerText: _this.$i18n("CCG005_5"), key: "name", width: 130 },
                                        { headerText: 'code', key: "roleId", hidden: true },
                                    ]);
                                    return _this;
                                }
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    vm.callData();
                                    vm.selectedRole.subscribe(function (newValue) {
                                        if ($("#grid").data("igGrid")) {
                                            $("#grid").ntsGrid("destroy");
                                        }
                                        vm.initGrid(newValue);
                                    });
                                };
                                ViewModel.prototype.callData = function () {
                                    var vm = this;
                                    vm.$blockui("grayout");
                                    vm.$ajax(API.getPermissionSettings).then(function (data) {
                                        if (_.isEmpty(data.role)) {
                                            return vm.$dialog.error({ messageId: 'Msg_2078' }).then(function () { return vm.$window.close(); });
                                        }
                                        if (_.isEmpty(data.jobTitle)) {
                                            return vm.$dialog.error({ messageId: 'Msg_2079' }).then(function () { return vm.$window.close(); });
                                        }
                                        vm.lstRole(data.role);
                                        vm.listJobTitle(data.jobTitle);
                                        vm.listSpecifyAuthInquiry(data.specifyAuthInquiry);
                                        if (!vm.selectedRole()) {
                                            var selectedRoleId = data.role[0].roleId;
                                            vm.selectedRole(selectedRoleId);
                                            vm.initGrid(selectedRoleId);
                                        }
                                        vm.$blockui("clear");
                                    })
                                        .always(function () { return vm.$blockui("clear"); });
                                };
                                ViewModel.prototype.initGrid = function (selectedRole) {
                                    var vm = this;
                                    var currentAuth = _.find(vm.listSpecifyAuthInquiry(), (function (auth) { return auth.employmentRoleId === selectedRole; }));
                                    var jobGridDataSource = _.map(vm.listJobTitle(), function (job) {
                                        if (currentAuth) {
                                            return { jobTitleId: job.jobTitleId, flag: currentAuth.positionIdSeen.some(function (item) { return item === job.jobTitleId; }), jobTitleName: job.jobTitleName };
                                        }
                                        return { jobTitleId: job.jobTitleId, flag: false, jobTitleName: job.jobTitleName };
                                    });
                                    vm.listJobDataSource(jobGridDataSource);
                                    $("#grid").ntsGrid({
                                        width: "240px",
                                        height: "240px",
                                        dataSource: vm.listJobDataSource(),
                                        primaryKey: "jobTitleId",
                                        virtualization: true,
                                        rowVirtualization: true,
                                        virtualizationMode: "continuous",
                                        columns: [
                                            { headerText: "ID", key: "jobTitleId", dataType: "string", width: "50px", hidden: true },
                                            {
                                                headerText: vm.$i18n("CCG005_7"),
                                                key: "flag",
                                                dataType: "boolean",
                                                width: "65px",
                                                ntsControl: "Checkbox",
                                                columnCssClass: "center-align-for-ccg005-b"
                                            },
                                            {
                                                headerText: vm.$i18n("CCG005_6"),
                                                key: "jobTitleName",
                                                dataType: "string",
                                                width: "175px",
                                            }
                                        ],
                                        features: [{ name: "Sorting", type: "local" }],
                                        ntsControls: [
                                            {
                                                name: "Checkbox",
                                                options: { value: 1, text: "" },
                                                optionsValue: "value",
                                                optionsText: "text",
                                                controlType: "CheckBox",
                                                enable: true,
                                            }
                                        ]
                                    });
                                };
                                ViewModel.prototype.onClickCancel = function () {
                                    this.$window.close();
                                };
                                ViewModel.prototype.onClickSave = function () {
                                    var vm = this;
                                    vm.$validate().then(function (valid) {
                                        if (valid) {
                                            var currentPositionIdSeen = _.map(vm.listJobDataSource(), function (dataSource) { return dataSource.flag ? dataSource.jobTitleId : null; })
                                                .filter(function (item) { return item !== null; });
                                            var auth = new SpecifyAuthInquiryCommand({
                                                cid: __viewContext.user.companyId,
                                                employmentRoleId: vm.selectedRole(),
                                                positionIdSeen: currentPositionIdSeen
                                            });
                                            vm.$blockui("grayout");
                                            vm.$ajax(API.save, auth).then(function () {
                                                vm.callData();
                                                vm.$blockui("clear");
                                                return vm.$dialog.info({ messageId: "Msg_15" });
                                            })
                                                .always(function () { return vm.$blockui("clear"); });
                                        }
                                    });
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            var SpecifyAuthInquiryCommand = /** @class */ (function () {
                                function SpecifyAuthInquiryCommand(init) {
                                    $.extend(this, init);
                                }
                                return SpecifyAuthInquiryCommand;
                            }());
                        })(screenModel = b.screenModel || (b.screenModel = {}));
                    })(b = ccg005.b || (ccg005.b = {}));
                })(ccg005 = view.ccg005 || (view.ccg005 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg005.b.vm.js.map