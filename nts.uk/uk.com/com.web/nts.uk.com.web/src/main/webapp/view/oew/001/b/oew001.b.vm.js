/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
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
                var oew001;
                (function (oew001) {
                    var b;
                    (function (b) {
                        var model = oew001.share.model;
                        var API = {
                            getEmployeeInfo: "com/screen/oew001/getEmployeeInfo/{0}",
                            insert: "ctx/office/equipment/data/insert",
                            update: "ctx/office/equipment/data/update",
                            delete: "ctx/office/equipment/data/delete",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.data = ko.observable(null);
                                _this.employeeList = ko.observableArray([]);
                                return _this;
                            }
                            ScreenModel.prototype.created = function (param) {
                                var vm = this;
                                vm.data(new model.Oew001BData(param));
                                vm.data().employeeName = ko.observable(param.employeeName);
                                vm.data().useDate = ko.observable(param.useDate);
                                _.forEach(param.optionalItems, function (data) {
                                    if (param.isNewMode) {
                                        data.value = ko.observable("");
                                    }
                                    else if (data.itemCls === model.enums.ItemClassification.NUMBER && !!data.value) {
                                        data.value = ko.observable(Number(data.value));
                                    }
                                    else {
                                        data.value = ko.observable(_.isNil(data.value) ? "" : data.value);
                                    }
                                    data.helpContent = vm.buildHelpContent(data);
                                });
                                vm.data().optionalItems = ko.observableArray(param.optionalItems);
                                vm.data.valueHasMutated();
                                // Add constraint
                                _.each(vm.data().optionalItems(), function (data) { return __viewContext.primitiveValueConstraints[data.constraintName] = data.constraint; });
                                vm.data().useDate.subscribe(function (value) { return vm.validateUseDate(moment.utc(value, model.constants.YYYY_MM_DD)); });
                            };
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$blockui("grayout");
                                vm.getEmployeeInfo().then(function () {
                                    vm.data().employeeName(_.find(vm.employeeList(), { "employeeId": vm.data().sid }).businessName);
                                    vm.data.valueHasMutated();
                                })
                                    .always(function () {
                                    if (vm.data().isNewMode) {
                                        $("#B2_2").focus();
                                    }
                                    else {
                                        $(".B2_2_1")[0].focus();
                                    }
                                    vm.$blockui("clear");
                                });
                            };
                            ScreenModel.prototype.getEmployeeInfo = function () {
                                var vm = this;
                                return vm.$ajax(nts.uk.text.format(API.getEmployeeInfo, vm.data().sid)).then(function (result) { return vm.employeeList(result); });
                            };
                            /**
                             * Ｂ：利用実績の新規登録をする
                             */
                            ScreenModel.prototype.insert = function (param) {
                                var vm = this;
                                return vm.$ajax(API.insert, param)
                                    .then(function () {
                                    return vm.$dialog.info({ messageId: "Msg_15" }).then(function () { return vm.$window.close({
                                        isSaveSuccess: true
                                    }); });
                                }, function (err) {
                                    if (!!err.messageId) {
                                        return vm.$dialog.error({ messageId: err.messageId });
                                    }
                                    else if (!!err.errors) {
                                        return nts.uk.ui.dialog.bundledErrors(err);
                                    }
                                });
                            };
                            /**
                             * Ｂ：利用実績の更新をする
                             */
                            ScreenModel.prototype.update = function (param) {
                                var vm = this;
                                return vm.$ajax(API.update, param)
                                    .then(function () {
                                    return vm.$dialog.info({ messageId: "Msg_15" }).then(function () { return vm.$window.close({
                                        isSaveSuccess: true
                                    }); });
                                }, function (err) {
                                    if (!!err.messageId) {
                                        return vm.$dialog.error({ messageId: err.messageId }).then(function () { return vm.$window.close({
                                            isMsg2319: err.messageId === "Msg_2319"
                                        }); });
                                    }
                                    else if (!!err.errors) {
                                        return nts.uk.ui.dialog.bundledErrors(err);
                                    }
                                });
                            };
                            /**
                             * Ｂ：利用実績の削除をする
                             */
                            ScreenModel.prototype.delete = function (param) {
                                var vm = this;
                                return vm.$ajax(API.delete, param)
                                    .then(function () {
                                    return vm.$dialog.info({ messageId: "Msg_16" });
                                })
                                    .fail(function (err) {
                                    return vm.$dialog.error({ messageId: err.messageId });
                                });
                            };
                            ScreenModel.prototype.processSave = function () {
                                var vm = this;
                                vm.$validate().then(function (isValid) {
                                    if (!isValid) {
                                        return;
                                    }
                                    vm.$blockui("grayout");
                                    var input = vm.data();
                                    var itemDatas = _.map(input.optionalItems(), function (data) { return new model.ItemDataDto({
                                        itemNo: data.itemNo,
                                        itemClassification: data.itemCls,
                                        actualValue: data.value()
                                    }); });
                                    var param = new model.EquipmentDataDto({
                                        equipmentClassificationCode: input.equipmentClsCode,
                                        equipmentCode: input.equipmentInfoCode,
                                        inputDate: vm.data().isNewMode ? moment.utc().toISOString() : moment.utc(input.inputDate).toISOString(),
                                        useDate: moment.utc(input.useDate(), model.constants.YYYY_MM_DD).toISOString(),
                                        sid: input.sid,
                                        itemDatas: itemDatas
                                    });
                                    var call = vm.data().isNewMode ? vm.insert(param) : vm.update(param);
                                    call.always(function () { return vm.$blockui("clear"); });
                                });
                            };
                            ScreenModel.prototype.processDelete = function () {
                                var vm = this;
                                vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (result) {
                                    if (result === "yes") {
                                        vm.$blockui("grayout");
                                        var input = vm.data();
                                        var param = {
                                            equipmentCode: input.equipmentInfoCode,
                                            sid: vm.data().sid,
                                            inputDate: moment.utc(input.inputDate).toISOString(),
                                            useDate: moment.utc(input.useDate(), model.constants.YYYY_MM_DD).toISOString(),
                                        };
                                        vm.delete(param).then(function () { return vm.$window.close({
                                            isDeleteSuccess: true
                                        }); })
                                            .always(function () { return vm.$blockui("clear"); });
                                    }
                                });
                            };
                            ScreenModel.prototype.processCancel = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel.prototype.buildHelpContent = function (item) {
                                var vm = this;
                                var temp;
                                var maximum, minimum;
                                switch (item.itemCls) {
                                    case model.enums.ItemClassification.TEXT:
                                        temp = "".concat(vm.$i18n("OEW001_63"), "\u3000").concat(item.constraint.maxLength).concat(vm.$i18n("OEW001_64"), "\n").concat(vm.$i18n("OEW001_67")).concat(item.memo);
                                        break;
                                    case model.enums.ItemClassification.NUMBER:
                                        maximum = nts.uk.ntsNumber.formatNumber(Number(item.constraint.max), { formatId: 'Number_Separated' });
                                        minimum = nts.uk.ntsNumber.formatNumber(Number(item.constraint.min), { formatId: 'Number_Separated' });
                                        temp = "".concat(vm.$i18n("OEW001_65"), "\u3000").concat(minimum, "\u3000").concat(vm.$i18n("OEW001_66"), "\u3000").concat(maximum, "\n").concat(vm.$i18n("OEW001_67")).concat(item.memo);
                                        break;
                                    case model.enums.ItemClassification.TIME:
                                        maximum = String(item.constraint.max);
                                        minimum = String(item.constraint.min);
                                        temp = "".concat(vm.$i18n("OEW001_65"), "\u3000").concat(minimum, "\u3000").concat(vm.$i18n("OEW001_66"), "\u3000").concat(maximum, "\n").concat(vm.$i18n("OEW001_67")).concat(item.memo);
                                        break;
                                }
                                return temp;
                            };
                            ScreenModel.prototype.validateUseDate = function (date) {
                                var vm = this;
                                if (date.isBefore(vm.data().validStartDate) || date.isAfter(vm.data().validEndDate)) {
                                    vm.$dialog.error({ messageId: "Msg_2233" });
                                }
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        b.ScreenModel = ScreenModel;
                    })(b = oew001.b || (oew001.b = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=oew001.b.vm.js.map