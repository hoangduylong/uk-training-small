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
                var cmm048;
                (function (cmm048) {
                    var f;
                    (function (f) {
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.snapYet = ko.observable(false);
                                _this.avatarUri = ko.observable('');
                                return _this;
                            }
                            ViewModel.prototype.snap = function () {
                                var vm = this;
                                Webcam.snap(function (uri) {
                                    vm.avatarUri(uri);
                                    $('#avatar-zone').html('');
                                    $('#avatar-zone').append('<img src="' + uri + '"/>');
                                });
                                vm.snapYet(true);
                            };
                            ViewModel.prototype.snapAgain = function () {
                                var vm = this;
                                vm.snapYet(false);
                                Webcam.attach('#avatar-zone');
                            };
                            ViewModel.prototype.takeThis = function () {
                                var vm = this;
                                vm.$window.close(vm.avatarUri());
                            };
                            ViewModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        f.ViewModel = ViewModel;
                    })(f = cmm048.f || (cmm048.f = {}));
                })(cmm048 = view.cmm048 || (view.cmm048 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm048.f.vm.js.map