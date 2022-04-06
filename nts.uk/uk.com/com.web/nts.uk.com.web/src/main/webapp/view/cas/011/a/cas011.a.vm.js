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
                var cas011;
                (function (cas011) {
                    var a;
                    (function (a) {
                        var block = nts.uk.ui.block;
                        var errors = nts.uk.ui.errors;
                        var dialog = nts.uk.ui.dialog;
                        var resource = nts.uk.resource;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var isNullOrEmpty = nts.uk.util.isNullOrEmpty;
                        var format = nts.uk.text.format;
                        var API = {
                            getDtaInit: "screen/com/cas011/get-data-init",
                            getRoleSetByRoleSetCd: "screen/com/cas011/get-detail-role-set/{0}",
                            getCompanyIdOfLoginUser: "ctx/sys/auth/roleset/companyidofloginuser",
                            addRoleSet: "screen/sys/auth/cas011/addroleset",
                            updateRoleSet: "screen/sys/auth/cas011/updateroleset",
                            removeRoleSet: "screen/sys/auth/cas011/deleteroleset",
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel(params) {
                                var _this = _super.call(this) || this;
                                _this.langId = ko.observable('ja');
                                _this.listRoleSets = ko.observableArray([]);
                                _this.dataA41 = ko.observableArray([]);
                                _this.dataA51 = ko.observableArray([]);
                                _this.listWebMenus = ko.observableArray([]);
                                _this.listAllWebMenus = [];
                                _this.listCurrentRoleIds = [];
                                _this.currentRoleSet = ko.observable(new RoleSet({
                                    companyId: '',
                                    roleSetCd: '',
                                    roleSetName: '',
                                    personInfRoleId: '',
                                    employmentRoleId: '',
                                    webMenus: [],
                                    defaultRoleSet: false
                                }));
                                _this.selectedRoleSetCd = ko.observable('');
                                _this.enableCheckDefault = ko.observable(true);
                                _this.roleSetCount = ko.observable(0);
                                _this.defaultRoleSetCode = ko.observable(null);
                                _this.isSelectedWebMenu = function (_webMenuCode) {
                                    var vm = this, currentRoleSet = this.currentRoleSet();
                                    if (!_webMenuCode || !currentRoleSet
                                        || !currentRoleSet.webMenus() || currentRoleSet.webMenus().length === 0) {
                                        return false;
                                    }
                                    var index = _.findIndex(currentRoleSet.webMenus(), function (x) {
                                        return x.webMenuCode === _webMenuCode;
                                    });
                                    return (index > -1);
                                };
                                var vm = _this;
                                var currentRoleSet = vm.currentRoleSet();
                                // A2_003, A2_004, A2_005, A2_006
                                vm.gridColumns = ko.observableArray([
                                    { headerText: resource.getText('CAS011_9'), key: 'roleSetCd',
                                        headerCssClass: 'text-right', columnCssClass: 'text-center', formatter: _.escape, width: 50 },
                                    { headerText: resource.getText('CAS011_10'), key: 'roleSetName',
                                        headerCssClass: 'text-right', columnCssClass: 'text-center', formatter: _.escape, width: 230 },
                                    {
                                        headerText: resource.getText('CAS011_44'), key: 'check', width: 25,
                                        template: '{{if ${check} == 1 }}<div class="cssDiv"><i  class="icon icon icon-78 cssI"></i></div>{{/if}}'
                                    }
                                ]);
                                vm.swapColumns = ko.observableArray([
                                    { headerText: resource.getText('CAS011_9'), key: 'webMenuCode', width: 65 },
                                    { headerText: resource.getText('CAS011_34'), key: 'webMenuName', width: 135 }
                                ]);
                                vm.isNewMode = ko.observable(true);
                                var dfd = $.Deferred(), listRoleSets = vm.listRoleSets;
                                vm.$ajax('com', API.getCompanyIdOfLoginUser).done(function (companyId) {
                                    if (!companyId) {
                                        vm.backToTopPage();
                                        dfd.resolve();
                                    }
                                    else {
                                        // initial screen
                                        vm.initialScreen(dfd, '');
                                    }
                                }).fail(function (error) {
                                    vm.backToTopPage();
                                    dfd.resolve();
                                });
                                return _this;
                            }
                            ViewModel.prototype.getDetail = function (roleSetCd) {
                                var vm = this, dfd = $.Deferred();
                                errors.clearAll();
                                var listRoleSet = vm.listRoleSets();
                                block.invisible();
                                if (roleSetCd && listRoleSet && listRoleSet.length > 0) {
                                    var _path = format(API.getRoleSetByRoleSetCd, roleSetCd);
                                    vm.$ajax('com', _path).done(function (data) {
                                        if (!isNullOrUndefined(data)) {
                                            vm.enableCheckDefault(true);
                                            var roleSetDtos = data.roleSetDtos;
                                            var defaultRoleSet = data.defaultRoleSet;
                                            var linkWebMenuImportList = data.linkWebMenuImportList;
                                            var listWebMenuValue = [];
                                            var _roleSet = roleSetDtos;
                                            if (_roleSet && _roleSet.roleSetCd) {
                                                vm.settingUpdateMode(_roleSet.roleSetCd);
                                                if (!isNullOrUndefined(defaultRoleSet) && _roleSet.roleSetCd == defaultRoleSet.roleSetCd) {
                                                    _roleSet.defaultRoleSet = true;
                                                    _roleSet.check = 1;
                                                    vm.defaultRoleSetCode(defaultRoleSet.roleSetCd);
                                                }
                                                else {
                                                    _roleSet.defaultRoleSet = false;
                                                }
                                                vm.createCurrentRoleSet(_roleSet);
                                                if (linkWebMenuImportList && linkWebMenuImportList.length >= 0) {
                                                    var _loop_1 = function (i) {
                                                        var item = linkWebMenuImportList[i];
                                                        var code = item.webMenuCd;
                                                        var itemName = _.find(vm.listAllWebMenus, function (e) { return (e.webMenuCode == code); });
                                                        if (!isNullOrUndefined(itemName)) {
                                                            listWebMenuValue.push({
                                                                webMenuCode: code,
                                                                webMenuName: itemName.webMenuName
                                                            });
                                                        }
                                                    };
                                                    for (var i = 0; i < linkWebMenuImportList.length; i++) {
                                                        _loop_1(i);
                                                    }
                                                }
                                                vm.currentRoleSet().webMenus(listWebMenuValue);
                                            }
                                            else {
                                                vm.initialScreen(null, '');
                                            }
                                        }
                                    }).fail(function (error) {
                                        vm.backToTopPage();
                                        dfd.resolve();
                                    }).always(function () {
                                        block.clear();
                                    });
                                }
                                else {
                                    vm.settingCreateMode();
                                }
                            };
                            ViewModel.prototype.created = function (params) {
                                var vm = this;
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.selectedRoleSetCd.subscribe(function (roleSetCd) {
                                    vm.getDetail(roleSetCd);
                                });
                            };
                            ViewModel.prototype.initialScreen = function (deferred, roleSetCd) {
                                var vm = this, currentRoleSet = vm.currentRoleSet(), listRoleSets = vm.listRoleSets, dataA41 = [], dataA51 = [];
                                listRoleSets.removeAll();
                                errors.clearAll();
                                // initial screen
                                block.invisible();
                                vm.$ajax('com', API.getDtaInit).done(function (data) {
                                    if (data) {
                                        var itemList = data.roleDefaultDto.roleSetDtos;
                                        var listWebMenu = data.webMenuSimpleDtos;
                                        var defaultRoleSet = data.roleDefaultDto.defaultRoleSet;
                                        var employmentRole = data.rolesEmployment;
                                        var personRole = data.rolesPersonalInfo;
                                        if (!isNullOrUndefined(employmentRole)) {
                                            dataA41.push({ id: null, code: null, display: '' });
                                            for (var i = 0; i < employmentRole.length; i++) {
                                                var item = employmentRole[i];
                                                var display = item.roleCode + " " + item.name;
                                                dataA41.push({ id: item.roleId, code: item.roleCode, display: display });
                                            }
                                            vm.dataA41(dataA41);
                                        }
                                        if (!isNullOrUndefined(personRole)) {
                                            dataA51.push({ id: null, code: null, display: '' });
                                            for (var i = 0; i < personRole.length; i++) {
                                                var item = personRole[i];
                                                var display = item.roleCode + " " + item.name;
                                                dataA51.push({ id: item.roleId, code: item.roleCode, display: display });
                                            }
                                            vm.dataA51(dataA51);
                                        }
                                        if (listWebMenu && listWebMenu.length > 0) {
                                            vm.listAllWebMenus = listWebMenu;
                                        }
                                        if (itemList && itemList.length > 0) {
                                            if (!isNullOrUndefined(defaultRoleSet)) {
                                                vm.defaultRoleSetCode(defaultRoleSet.roleSetCd);
                                                for (var i = 0; i < itemList.length; i++) {
                                                    var item = itemList[i];
                                                    if (item.roleSetCd == defaultRoleSet.roleSetCd) {
                                                        item.defaultRoleSet = true;
                                                        item.check = 1;
                                                    }
                                                    else {
                                                        item.defaultRoleSet = false;
                                                    }
                                                }
                                            }
                                            vm.listRoleSets(itemList);
                                            vm.roleSetCount(itemList.length);
                                            var index = 0;
                                            if (roleSetCd) {
                                                index = _.findIndex(listRoleSets(), function (x) {
                                                    return x.roleSetCd == roleSetCd;
                                                });
                                                if (index === -1)
                                                    index = 0;
                                            }
                                            var _roleSet = listRoleSets()[index];
                                            //vm.createCurrentRoleSet(_roleSet);
                                            vm.settingUpdateMode(_roleSet.roleSetCd);
                                        }
                                        else { //in case number of RoleSet is zero
                                            vm.createMode();
                                        }
                                    }
                                    else {
                                        vm.createMode();
                                    }
                                    if (deferred) {
                                        deferred.resolve();
                                    }
                                }).fail(function (error) {
                                    dialog.alertError({ messageId: error.messageId }).then(function () {
                                        vm.backToTopPage();
                                    });
                                    deferred.reject();
                                }).always(function () {
                                    vm.roleSetCount(vm.listRoleSets().length);
                                    vm.setFocus();
                                    block.clear();
                                });
                            };
                            ViewModel.prototype.backToTopPage = function () {
                                nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                            };
                            ViewModel.prototype.saveRoleSet = function () {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                $('.nts-input').trigger("validate");
                                if (currentRoleSet.employmentRoleId() == null || currentRoleSet.employmentRoleId() == "") {
                                    $('#employmentRoleId').ntsError('set', { messageId: "Msg_218", messageParams: [resource.getText('CAS011_14')] });
                                    $('#employmentRoleId').focus();
                                }
                                if (currentRoleSet.personInfRoleId() == null || currentRoleSet.personInfRoleId() == "") {
                                    $('#personInfRoleId').ntsError('set', { messageId: "Msg_218", messageParams: [resource.getText('CAS011_18')] });
                                    $('#personInfRoleId').focus();
                                }
                                if (errors.hasError() === false) {
                                    block.invisible();
                                    if (vm.isNewMode()) {
                                        // create new role set
                                        vm.$ajax('com', API.addRoleSet, ko.toJS(currentRoleSet)).done(function (roleSetCd) {
                                            dialog.info({ messageId: "Msg_15" }).then(function () {
                                                vm.initialScreen(null, currentRoleSet.roleSetCd());
                                            });
                                        }).fail(function (error) {
                                            if (error.messageId == 'Msg_583') {
                                                dialog.alertError({ messageId: error.messageId, messageParams: ["メニュー"] });
                                            }
                                            else {
                                                if (error.messageId == 'Msg_3') {
                                                    $('#inpRoleSetCd').ntsError('set', error);
                                                    $('#inpRoleSetCd').focus();
                                                }
                                                dialog.alertError({ messageId: error.messageId });
                                            }
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                    else {
                                        // update
                                        if (vm.defaultRoleSetCode() == currentRoleSet.roleSetCd()) {
                                            if (currentRoleSet.defaultRoleSet() == false) {
                                                dialog.alertError({ messageId: "Msg_2200" }).then(function () {
                                                    $('#defaultRoleSet').focus();
                                                    block.clear();
                                                });
                                            }
                                            else {
                                                vm.update(currentRoleSet);
                                            }
                                        }
                                        else {
                                            vm.update(currentRoleSet);
                                        }
                                    }
                                }
                            };
                            ViewModel.prototype.update = function (currentRoleSet) {
                                var vm = this;
                                vm.$ajax('com', API.updateRoleSet, ko.toJS(currentRoleSet)).done(function (roleSetCd) {
                                    dialog.info({ messageId: "Msg_15" }).then(function () {
                                        if (currentRoleSet.defaultRoleSet() == true) {
                                            vm.defaultRoleSetCode(currentRoleSet.roleSetCd);
                                        }
                                        // refresh - initial screen
                                        vm.initialScreen(null, currentRoleSet.roleSetCd());
                                    });
                                }).fail(function (error) {
                                    if (error.messageId == 'Msg_583') {
                                        dialog.alertError({ messageId: error.messageId, messageParams: ["メニュー"] });
                                    }
                                    else {
                                        dialog.alertError({ messageId: error.messageId });
                                    }
                                }).always(function () {
                                    block.clear();
                                });
                            };
                            ViewModel.prototype.deleteRoleSet = function () {
                                var vm = this, listRoleSets = vm.listRoleSets, currentRoleSet = vm.currentRoleSet();
                                block.invisible();
                                dialog.confirmDanger({ messageId: "Msg_18" }).ifYes(function () {
                                    if (currentRoleSet.roleSetCd()) {
                                        var object = { roleSetCd: currentRoleSet.roleSetCd() };
                                        vm.$ajax('com', API.removeRoleSet, ko.toJS(object)).done(function () {
                                            dialog.info({ messageId: "Msg_16" });
                                            //select next Role Set
                                            var index = _.findIndex(listRoleSets(), function (x) {
                                                return x.roleSetCd == currentRoleSet.roleSetCd();
                                            });
                                            // remove the deleted item out of list
                                            if (index > -1) {
                                                vm.listRoleSets.splice(index, 1);
                                                if (index >= listRoleSets().length) {
                                                    index = listRoleSets().length - 1;
                                                }
                                                if (listRoleSets().length > 0) {
                                                    vm.settingUpdateMode(listRoleSets()[index].roleSetCd);
                                                }
                                                else {
                                                    vm.settingCreateMode();
                                                }
                                            }
                                        }).fail(function (error) {
                                            dialog.alertError({ messageId: error.messageId });
                                        }).always(function () {
                                            block.clear();
                                        });
                                    }
                                    else {
                                        block.clear();
                                    }
                                }).then(function () {
                                    block.clear();
                                });
                                ;
                            };
                            ViewModel.prototype.setFocus = function () {
                                var vm = this;
                                if (vm.isNewMode()) {
                                    $('#inpRoleSetCd').focus();
                                }
                                else {
                                    $('#inpRoleSetName').focus();
                                }
                                errors.clearAll();
                            };
                            ViewModel.prototype.settingCreateMode = function () {
                                block.invisible();
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                // clear selected role set
                                vm.createNewCurrentRoleSet();
                                vm.selectedRoleSetCd('');
                                // Set new mode
                                vm.isNewMode(true);
                                //focus
                                vm.setFocus();
                                block.clear();
                            };
                            ViewModel.prototype.createMode = function () {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                // clear selected role set
                                vm.createNewRoleSet();
                                vm.selectedRoleSetCd('');
                                // Set new mode
                                vm.isNewMode(true);
                                vm.enableCheckDefault(false);
                                //focus
                                vm.setFocus();
                            };
                            ViewModel.prototype.settingUpdateMode = function (selectedRoleSetCd) {
                                var vm = this;
                                vm.selectedRoleSetCd(selectedRoleSetCd);
                                if (selectedRoleSetCd) {
                                    //Setting update mode
                                    vm.isNewMode(false);
                                    //focus
                                    vm.setFocus();
                                }
                            };
                            ViewModel.prototype.createNewCurrentRoleSet = function () {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                if (currentRoleSet.roleSetCd() === '') {
                                    return;
                                }
                                if (!isNullOrEmpty(vm.dataA51()) && vm.dataA51().length > 2) {
                                    currentRoleSet.personInfRoleId(vm.dataA51()[1].id);
                                }
                                else {
                                    currentRoleSet.personInfRoleId(null);
                                }
                                if (!isNullOrEmpty(vm.dataA41()) && vm.dataA41().length > 2) {
                                    currentRoleSet.employmentRoleId(vm.dataA41()[1].id);
                                }
                                else {
                                    currentRoleSet.employmentRoleId(null);
                                }
                                currentRoleSet.roleSetCd(null);
                                currentRoleSet.roleSetName(null);
                                currentRoleSet.defaultRoleSet(false);
                                currentRoleSet.webMenus([]);
                                // build swap web menu
                                vm.buildSwapWebMenu();
                                vm.listCurrentRoleIds = [];
                            };
                            ViewModel.prototype.createNewRoleSet = function () {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                if (!isNullOrEmpty(vm.dataA51()) && vm.dataA51().length > 2) {
                                    currentRoleSet.personInfRoleId(vm.dataA51()[1].id);
                                }
                                else {
                                    currentRoleSet.personInfRoleId(null);
                                }
                                if (!isNullOrEmpty(vm.dataA41()) && vm.dataA41().length > 2) {
                                    currentRoleSet.employmentRoleId(vm.dataA41()[1].id);
                                }
                                else {
                                    currentRoleSet.employmentRoleId(null);
                                }
                                currentRoleSet.roleSetCd(null);
                                currentRoleSet.roleSetName(null);
                                currentRoleSet.defaultRoleSet(true);
                                currentRoleSet.webMenus([]);
                                // build swap web menu
                                vm.buildSwapWebMenu();
                                vm.listCurrentRoleIds = [];
                                block.clear();
                            };
                            ViewModel.prototype.createCurrentRoleSet = function (_roleSet) {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                if (currentRoleSet.roleSetCd() === _roleSet.roleSetCd) {
                                    return;
                                }
                                currentRoleSet.companyId(_roleSet.companyId);
                                currentRoleSet.roleSetCd(_roleSet.roleSetCd);
                                currentRoleSet.roleSetName(_roleSet.roleSetName);
                                currentRoleSet.personInfRoleId(_roleSet.personInfRoleId);
                                currentRoleSet.employmentRoleId(_roleSet.employmentRoleId);
                                currentRoleSet.defaultRoleSet(_roleSet.defaultRoleSet);
                                currentRoleSet.webMenus(_roleSet.webMenus || []);
                                vm.buildSwapWebMenu();
                            };
                            ViewModel.prototype.buildSwapWebMenu = function () {
                                var vm = this, currentRoleSet = vm.currentRoleSet();
                                vm.listWebMenus.removeAll();
                                if (vm.listAllWebMenus && vm.listAllWebMenus.length > 0) {
                                    vm.listWebMenus(vm.listAllWebMenus.filter(function (item1) { return !vm.isSelectedWebMenu(item1.webMenuCode); }));
                                    // get Web Menu Name for Web menu
                                    var listWebMenuRight = vm.listAllWebMenus.filter(function (item1) { return vm.isSelectedWebMenu(item1.webMenuCode); });
                                    //currentRoleSet.webMenus.removeAll();
                                    currentRoleSet.webMenus(listWebMenuRight);
                                }
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        /**
                         * The enum of ROLE TYPE
                         */
                        var ROLE_TYPE;
                        (function (ROLE_TYPE) {
                            ROLE_TYPE[ROLE_TYPE["EMPLOYMENT"] = 3] = "EMPLOYMENT";
                            ROLE_TYPE[ROLE_TYPE["SALARY"] = 4] = "SALARY";
                            ROLE_TYPE[ROLE_TYPE["HR"] = 5] = "HR";
                            ROLE_TYPE[ROLE_TYPE["OFFICE_HELPER"] = 6] = "OFFICE_HELPER";
                            ROLE_TYPE[ROLE_TYPE["MY_NUMBER"] = 7] = "MY_NUMBER";
                            ROLE_TYPE[ROLE_TYPE["PERSON_INF"] = 8] = "PERSON_INF";
                        })(ROLE_TYPE = a.ROLE_TYPE || (a.ROLE_TYPE = {}));
                        var WebMenu = /** @class */ (function () {
                            function WebMenu(param) {
                                this.webMenuCode = ko.observable('');
                                this.webMenuName = ko.observable('');
                                var vm = this;
                                vm.webMenuCode(param.webMenuCode || '');
                                vm.webMenuName(param.webMenuName || '');
                            }
                            return WebMenu;
                        }());
                        a.WebMenu = WebMenu;
                        var RoleSet = /** @class */ (function () {
                            function RoleSet(param) {
                                this.companyId = ko.observable(null);
                                this.roleSetCd = ko.observable(null);
                                this.roleSetName = ko.observable(null);
                                this.personInfRoleId = ko.observable(null);
                                this.employmentRoleId = ko.observable(null);
                                this.defaultRoleSet = ko.observable(false);
                                this.webMenus = ko.observableArray([]);
                                var vm = this;
                                vm.companyId(param.companyId);
                                vm.roleSetCd(param.roleSetCd || null);
                                vm.roleSetName(param.roleSetName || null);
                                vm.webMenus(param.webMenus || []);
                                vm.personInfRoleId(param.personInfRoleId || null);
                                vm.employmentRoleId(param.employmentRoleId || null);
                                vm.defaultRoleSet(param.defaultRoleSet);
                            }
                            return RoleSet;
                        }());
                        a.RoleSet = RoleSet;
                    })(a = cas011.a || (cas011.a = {}));
                })(cas011 = view.cas011 || (view.cas011 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas011.a.vm.js.map