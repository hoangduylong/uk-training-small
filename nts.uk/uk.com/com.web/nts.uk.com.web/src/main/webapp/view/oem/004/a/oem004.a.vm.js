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
        var com;
        (function (com) {
            var view;
            (function (view) {
                var oem004;
                (function (oem004) {
                    var a;
                    (function (a) {
                        var API = {
                            getEquipmentList: 'query/equipment/classificationmaster/getAll',
                            insetEquipment: 'ctx/office/equipment/classificationmaster/insert',
                            updateEquipment: 'ctx/office/equipment/classificationmaster/update',
                            deleteEquipment: 'com/screen/oem004/delete',
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.tableColumns = ko.observableArray([
                                    { headerText: _this.$i18n('KDL047_6'), prop: 'code', width: 100 },
                                    { headerText: _this.$i18n('KDL047_7'), prop: 'name', width: 250 }
                                ]);
                                _this.equipmentList = ko.observableArray([]);
                                _this.selectedCode = ko.observable(null);
                                _this.code = ko.observable('');
                                _this.name = ko.observable('');
                                _this.isNewMode = ko.observable(true);
                                return _this;
                            }
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$nextTick(function () {
                                    vm.selectedCode.subscribe(function (val) {
                                        vm.displaySelectedItem();
                                        if (val) {
                                            vm.isNewMode(false);
                                        }
                                    });
                                });
                                vm.startScreen();
                            };
                            ViewModel.prototype.startScreen = function () {
                                var vm = this;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.getEquipmentList(); })
                                    .then(function () {
                                    if (_.isEmpty(vm.equipmentList())) {
                                        $('#equipment-code').focus();
                                        vm.isNewMode(true);
                                        return;
                                    }
                                    vm.selectedCode(vm.equipmentList()[0].code);
                                    vm.displaySelectedItem();
                                    vm.isNewMode(false);
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ViewModel.prototype.displaySelectedItem = function () {
                                var vm = this;
                                vm.$errors('clear');
                                var selectedItem = _.find(vm.equipmentList(), function (item) { return item.code === vm.selectedCode(); });
                                if (!selectedItem) {
                                    vm.code('');
                                    vm.name('');
                                    $('#equipment-code').focus();
                                    return;
                                }
                                ;
                                vm.code(selectedItem.code);
                                vm.name(selectedItem.name);
                                $('#equipment-name').focus();
                            };
                            /**
                             * 設備分類一覧を取得する
                             */
                            ViewModel.prototype.getEquipmentList = function () {
                                var vm = this, dfd = $.Deferred();
                                vm
                                    .$ajax('com', API.getEquipmentList)
                                    .then(function (response) {
                                    var dataList = _.orderBy(response, ['code'], ['asc']);
                                    vm.equipmentList(dataList);
                                    dfd.resolve();
                                })
                                    .fail(function () { return dfd.reject(); });
                                return dfd.promise();
                            };
                            ViewModel.prototype.changeToNewMode = function () {
                                var vm = this;
                                vm.isNewMode(true);
                                vm.selectedCode(null);
                            };
                            ViewModel.prototype.clickRegister = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (!valid)
                                        return;
                                    if (vm.isNewMode())
                                        vm.createEquipmentCls();
                                    if (!vm.isNewMode())
                                        vm.updateEquipmentCls();
                                });
                            };
                            /**
                             * 設備分類を新規登録する
                             */
                            ViewModel.prototype.createEquipmentCls = function () {
                                var vm = this;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$ajax('com', API.insetEquipment, { code: vm.code(), name: vm.name() }); })
                                    .then(function () { return vm.$dialog.info({ messageId: 'Msg_15' }); })
                                    .then(function () { return vm.getEquipmentList(); })
                                    .then(function () {
                                    vm.selectedCode(vm.code());
                                    vm.displaySelectedItem();
                                    vm.isNewMode(false);
                                })
                                    .fail(function (err) { return vm.$dialog.error(err)
                                    .then(function () {
                                    $('#equipment-code').focus();
                                    $('#equipment-code').ntsError('set', err);
                                }); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            /**
                             * 更新モードの場合
                             */
                            ViewModel.prototype.updateEquipmentCls = function () {
                                var vm = this;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$ajax('com', API.updateEquipment, { code: vm.code(), name: vm.name() }); })
                                    .then(function () { return vm.$dialog.info({ messageId: 'Msg_15' }); })
                                    .then(function () { return vm.getEquipmentList(); })
                                    .then(function () {
                                    vm.selectedCode(vm.code());
                                    vm.displaySelectedItem();
                                })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ViewModel.prototype.clickDelete = function () {
                                var vm = this;
                                var index = -1;
                                vm
                                    .$blockui('grayout')
                                    .then(function () { return vm.$dialog.confirm({ messageId: "Msg_18" }); })
                                    .then(function (result) {
                                    if (result !== 'yes')
                                        return;
                                    index = _.findIndex(vm.equipmentList(), function (item) { return item.code === vm.selectedCode(); });
                                    return vm.$ajax('com', API.deleteEquipment, vm.code())
                                        .then(function () { return vm.$dialog.info({ messageId: 'Msg_16' }); });
                                })
                                    .then(function () { return vm.getEquipmentList(); })
                                    .then(function () { return vm.setSelectedAfterDelete(index); })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ViewModel.prototype.setSelectedAfterDelete = function (index) {
                                var vm = this;
                                var dataLength = vm.equipmentList().length;
                                if (dataLength === 0) {
                                    vm.isNewMode(true);
                                    vm.selectedCode(null);
                                    return;
                                }
                                if (index >= dataLength)
                                    index = dataLength - 1;
                                var selected = vm.equipmentList()[index];
                                if (selected) {
                                    vm.selectedCode(selected.code);
                                }
                            };
                            ViewModel.prototype.clickExport = function () {
                                var vm = this;
                                vm.$blockui('grayout');
                                var program = nts.uk.ui._viewModel.kiban.programName().split(" ");
                                var domainType = "OEM004設備分類の登録";
                                if (program.length > 1) {
                                    program.shift();
                                    domainType = domainType + program.join(" ");
                                }
                                nts.uk.request
                                    .exportFile('/masterlist/report/print', {
                                    domainId: 'EquipmentClassification',
                                    domainType: domainType,
                                    languageId: __viewContext.user.selectedLanguage.basicLanguageId,
                                    reportType: 0,
                                })
                                    .fail(function (err) { return vm.$dialog.alert({ messageId: err.messageId }); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        a.ViewModel = ViewModel;
                        var EquipmentClassification = /** @class */ (function () {
                            function EquipmentClassification(init) {
                                $.extend(this, init);
                            }
                            return EquipmentClassification;
                        }());
                    })(a = oem004.a || (oem004.a = {}));
                })(oem004 = view.oem004 || (view.oem004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oem004.a.vm.js.map