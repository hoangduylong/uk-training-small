var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var share;
                    (function (share) {
                        var model;
                        (function (model) {
                            var SAVE_BEFOR_DELETE_ATR;
                            (function (SAVE_BEFOR_DELETE_ATR) {
                                SAVE_BEFOR_DELETE_ATR[SAVE_BEFOR_DELETE_ATR["YES"] = 1] = "YES";
                                SAVE_BEFOR_DELETE_ATR[SAVE_BEFOR_DELETE_ATR["NO"] = 0] = "NO";
                            })(SAVE_BEFOR_DELETE_ATR = model.SAVE_BEFOR_DELETE_ATR || (model.SAVE_BEFOR_DELETE_ATR = {}));
                            var SYSTEM_TYPE;
                            (function (SYSTEM_TYPE) {
                                SYSTEM_TYPE[SYSTEM_TYPE["PERSON_SYS"] = 0] = "PERSON_SYS";
                                SYSTEM_TYPE[SYSTEM_TYPE["ATTENDANCE_SYS"] = 1] = "ATTENDANCE_SYS";
                                SYSTEM_TYPE[SYSTEM_TYPE["PAYROLL_SYS"] = 2] = "PAYROLL_SYS";
                                SYSTEM_TYPE[SYSTEM_TYPE["OFFICE_HELPER"] = 3] = "OFFICE_HELPER";
                            })(SYSTEM_TYPE = model.SYSTEM_TYPE || (model.SYSTEM_TYPE = {}));
                            var TIME_STORE;
                            (function (TIME_STORE) {
                                TIME_STORE[TIME_STORE["FULL_TIME"] = 0] = "FULL_TIME";
                                TIME_STORE[TIME_STORE["DAILY"] = 1] = "DAILY";
                                TIME_STORE[TIME_STORE["MONTHLY"] = 2] = "MONTHLY";
                                TIME_STORE[TIME_STORE["ANNUAL"] = 3] = "ANNUAL";
                            })(TIME_STORE = model.TIME_STORE || (model.TIME_STORE = {}));
                            var STORAGE_RANGE_SAVE;
                            (function (STORAGE_RANGE_SAVE) {
                                STORAGE_RANGE_SAVE[STORAGE_RANGE_SAVE["EARCH_EMP"] = 0] = "EARCH_EMP";
                                STORAGE_RANGE_SAVE[STORAGE_RANGE_SAVE["ALL_EMP"] = 1] = "ALL_EMP";
                            })(STORAGE_RANGE_SAVE = model.STORAGE_RANGE_SAVE || (model.STORAGE_RANGE_SAVE = {}));
                            var OPERATING_CONDITION;
                            (function (OPERATING_CONDITION) {
                                OPERATING_CONDITION[OPERATING_CONDITION["INPREPARATION"] = 0] = "INPREPARATION";
                                OPERATING_CONDITION[OPERATING_CONDITION["SAVING"] = 1] = "SAVING";
                                OPERATING_CONDITION[OPERATING_CONDITION["INPROGRESS"] = 2] = "INPROGRESS";
                                OPERATING_CONDITION[OPERATING_CONDITION["DELETING"] = 3] = "DELETING";
                                OPERATING_CONDITION[OPERATING_CONDITION["DONE"] = 4] = "DONE";
                                OPERATING_CONDITION[OPERATING_CONDITION["INTERRUPTION_END"] = 5] = "INTERRUPTION_END";
                                OPERATING_CONDITION[OPERATING_CONDITION["ABNORMAL_TERMINATION"] = 6] = "ABNORMAL_TERMINATION";
                            })(OPERATING_CONDITION = model.OPERATING_CONDITION || (model.OPERATING_CONDITION = {}));
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            model.ItemModel = ItemModel;
                            var ItemCategory = /** @class */ (function () {
                                function ItemCategory(schelperSystem, categoryId, categoryName, possibilitySystem, storedProcedureSpecified, timeStore, otherCompanyCls, attendanceSystem, recoveryStorageRange, paymentAvailability, storageRangeSaved) {
                                    this.schelperSystem = schelperSystem;
                                    this.categoryId = categoryId;
                                    this.categoryName = categoryName;
                                    this.possibilitySystem = possibilitySystem;
                                    this.storedProcedureSpecified = storedProcedureSpecified;
                                    this.timeStore = timeStore;
                                    this.otherCompanyCls = otherCompanyCls;
                                    this.attendanceSystem = attendanceSystem;
                                    this.recoveryStorageRange = recoveryStorageRange;
                                    this.paymentAvailability = paymentAvailability;
                                    this.storageRangeSaved = storageRangeSaved;
                                }
                                return ItemCategory;
                            }());
                            model.ItemCategory = ItemCategory;
                            var ItemDate = /** @class */ (function () {
                                function ItemDate(startDate, endDate, startYear, endYear) {
                                    this.startDate = startDate;
                                    this.endDate = endDate;
                                    this.startYear = startYear;
                                    this.endYear = endYear;
                                }
                                return ItemDate;
                            }());
                            model.ItemDate = ItemDate;
                        })(model = share.model || (share.model = {}));
                    })(share = cmf005.share || (cmf005.share = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=model.js.map