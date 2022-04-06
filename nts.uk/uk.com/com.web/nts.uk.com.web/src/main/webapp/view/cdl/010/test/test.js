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
///<reference path='../../../../lib/nittsu/viewcontext.d.ts' />
var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var at;
        (function (at) {
            var view;
            (function (view) {
                var cdl010;
                (function (cdl010) {
                    var test;
                    (function (test) {
                        var screenModel;
                        (function (screenModel) {
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.employeeId = ko.observable('');
                                    return _this;
                                }
                                ViewModel.prototype.mounted = function () {
                                    $('#employeeId').focus();
                                };
                                ViewModel.prototype.openDialog = function () {
                                    var vm = this;
                                    if (_.isEmpty(vm.employeeId())) {
                                        return;
                                    }
                                    var data = {
                                        employeeId: vm.employeeId(),
                                        referenceDate: new Date(),
                                    };
                                    vm.$window.modal('com', '/view/cdl/010/a/index.xhtml', data);
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                        })(screenModel = test.screenModel || (test.screenModel = {}));
                    })(test = cdl010.test || (cdl010.test = {}));
                })(cdl010 = view.cdl010 || (view.cdl010 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=test.js.map