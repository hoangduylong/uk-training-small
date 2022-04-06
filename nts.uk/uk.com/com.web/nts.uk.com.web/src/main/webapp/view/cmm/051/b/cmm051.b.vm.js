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
                var cmm051;
                (function (cmm051) {
                    var b;
                    (function (b) {
                        var setShared = nts.uk.ui.windows.setShared;
                        var getShared = nts.uk.ui.windows.getShared;
                        var isNullOrUndefined = nts.uk.util.isNullOrUndefined;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super.call(this) || this;
                                _this.periodDate = ko.observable(null);
                                _this.startDate = ko.observable(null);
                                _this.endDate = ko.observable(null);
                                _this.isCreate = false;
                                var vm = _this;
                                vm.required = ko.observable(true);
                                var prams = getShared('dataToScreenB');
                                if (!isNullOrUndefined(prams)) {
                                    vm.isCreate = prams.isCreate;
                                    if (vm.isCreate) {
                                        vm.periodDate({
                                            startDate: vm.startDate(),
                                            endDate: vm.endDate()
                                        });
                                    }
                                }
                                return _this;
                            }
                            ViewModel.prototype.created = function () {
                            };
                            ViewModel.prototype.mounted = function () {
                                $("#daterangepicker").find(".ntsStartDatePicker").focus();
                            };
                            ViewModel.prototype.execution = function () {
                                var vm = this;
                                $(".nts-input").trigger("validate");
                                if (nts.uk.ui.errors.hasError()) {
                                    return;
                                }
                                setShared("dataToScreenA", {
                                    startDate: vm.periodDate().startDate.format("YYYY/MM/DD"),
                                    endDate: vm.periodDate().endDate.format("YYYY/MM/DD"),
                                });
                                nts.uk.ui.windows.close();
                            };
                            ViewModel.prototype.cancel_Dialog = function () {
                                nts.uk.ui.windows.close();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                    })(b = cmm051.b || (cmm051.b = {}));
                })(cmm051 = view.cmm051 || (view.cmm051 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm051.b.vm.js.map