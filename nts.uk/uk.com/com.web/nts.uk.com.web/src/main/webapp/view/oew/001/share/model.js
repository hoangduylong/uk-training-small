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
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            /**
                             * 設備情報
                             */
                            var EquipmentInformationDto = /** @class */ (function () {
                                function EquipmentInformationDto(init) {
                                    $.extend(this, init);
                                }
                                return EquipmentInformationDto;
                            }());
                            model.EquipmentInformationDto = EquipmentInformationDto;
                            /**
                             * 設備分類
                             */
                            var EquipmentClassificationDto = /** @class */ (function () {
                                function EquipmentClassificationDto() {
                                }
                                return EquipmentClassificationDto;
                            }());
                            model.EquipmentClassificationDto = EquipmentClassificationDto;
                            /**
                             * 設備利用実績データ
                             */
                            var EquipmentDataDto = /** @class */ (function () {
                                function EquipmentDataDto(init) {
                                    $.extend(this, init);
                                }
                                return EquipmentDataDto;
                            }());
                            model.EquipmentDataDto = EquipmentDataDto;
                            /**
                             * 設備の実績入力フォーマット設定
                             */
                            var EquipmentPerformInputFormatSettingDto = /** @class */ (function () {
                                function EquipmentPerformInputFormatSettingDto() {
                                }
                                return EquipmentPerformInputFormatSettingDto;
                            }());
                            model.EquipmentPerformInputFormatSettingDto = EquipmentPerformInputFormatSettingDto;
                            /**
                             * 設備利用実績の項目設定
                             */
                            var EquipmentUsageRecordItemSettingDto = /** @class */ (function () {
                                function EquipmentUsageRecordItemSettingDto() {
                                }
                                return EquipmentUsageRecordItemSettingDto;
                            }());
                            model.EquipmentUsageRecordItemSettingDto = EquipmentUsageRecordItemSettingDto;
                            /**
                             * 実績データ
                             */
                            var ItemDataDto = /** @class */ (function () {
                                function ItemDataDto(init) {
                                    $.extend(this, init);
                                }
                                return ItemDataDto;
                            }());
                            model.ItemDataDto = ItemDataDto;
                            /**
                             * 項目表示
                             */
                            var ItemDisplayDto = /** @class */ (function () {
                                function ItemDisplayDto() {
                                }
                                return ItemDisplayDto;
                            }());
                            model.ItemDisplayDto = ItemDisplayDto;
                            /**
                             * 項目入力制御
                             */
                            var ItemInputControlDto = /** @class */ (function () {
                                function ItemInputControlDto() {
                                }
                                return ItemInputControlDto;
                            }());
                            model.ItemInputControlDto = ItemInputControlDto;
                            /**
                             * 項目の表示
                             */
                            var DisplayOfItemsDto = /** @class */ (function () {
                                function DisplayOfItemsDto() {
                                }
                                return DisplayOfItemsDto;
                            }());
                            model.DisplayOfItemsDto = DisplayOfItemsDto;
                            /**
                             * 社員
                             */
                            var EmployeeInfoDto = /** @class */ (function () {
                                function EmployeeInfoDto() {
                                }
                                return EmployeeInfoDto;
                            }());
                            model.EmployeeInfoDto = EmployeeInfoDto;
                            var OptionalItem = /** @class */ (function () {
                                function OptionalItem(init) {
                                    this.value = ko.observable(null);
                                    $.extend(this, init);
                                }
                                return OptionalItem;
                            }());
                            model.OptionalItem = OptionalItem;
                            var Oew001BData = /** @class */ (function () {
                                function Oew001BData(init) {
                                    this.optionalItems = ko.observableArray([]);
                                    $.extend(this, init);
                                }
                                return Oew001BData;
                            }());
                            model.Oew001BData = Oew001BData;
                        })(model = share.model || (share.model = {}));
                    })(share = oew001.share || (oew001.share = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var oew001;
                (function (oew001) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var constants;
                            (function (constants) {
                                constants.YYYY_MM_DD = "YYYY/MM/DD";
                                constants.SELECT_ALL_CODE = ' ';
                                // 固定値Ａ
                                constants.FIXED_VALUE_A = 9;
                                constants.MAXIMUM_COL_WIDTH = 450;
                                constants.MAXIMUM_GRID_WIDTH = 1200;
                                constants.NTS_GRID_CACHE_KEY = "".concat(window.location.href, "/A6");
                            })(constants = model.constants || (model.constants = {}));
                        })(model = share.model || (share.model = {}));
                    })(share = oew001.share || (oew001.share = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var oew001;
                (function (oew001) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var enums;
                            (function (enums) {
                                var ItemClassification;
                                (function (ItemClassification) {
                                    // 文字
                                    ItemClassification[ItemClassification["TEXT"] = 0] = "TEXT";
                                    // 数字
                                    ItemClassification[ItemClassification["NUMBER"] = 1] = "NUMBER";
                                    // 時間
                                    ItemClassification[ItemClassification["TIME"] = 2] = "TIME";
                                })(ItemClassification = enums.ItemClassification || (enums.ItemClassification = {}));
                                var PrintType;
                                (function (PrintType) {
                                    PrintType[PrintType["EXCEL"] = 0] = "EXCEL";
                                    PrintType[PrintType["CSV"] = 1] = "CSV";
                                })(PrintType = enums.PrintType || (enums.PrintType = {}));
                            })(enums = model.enums || (model.enums = {}));
                        })(model = share.model || (share.model = {}));
                    })(share = oew001.share || (oew001.share = {}));
                })(oew001 = view.oew001 || (view.oew001 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map