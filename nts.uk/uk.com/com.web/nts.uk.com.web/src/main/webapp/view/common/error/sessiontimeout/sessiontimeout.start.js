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
var common;
(function (common) {
    var error;
    (function (error) {
        var system;
        (function (system) {
            var ScreenModel = /** @class */ (function (_super) {
                __extends(ScreenModel, _super);
                function ScreenModel() {
                    var _this = _super.call(this) || this;
                    var vm = _this;
                    vm.$window.header(false);
                    return _this;
                }
                ScreenModel.prototype.contractEntered = function () {
                    var contract = {
                        tenantCode: $("#tenantCode").val(),
                        tenantPassword: $("#tenantPass").val(),
                        issueUrl: location.href,
                        requestUrl: this.getParam("requestUrl", location.href)
                    };
                    this.contractAuthentication(contract);
                };
                ScreenModel.prototype.gotoLogin = function () {
                    nts.uk.characteristics
                        .restore("loginMode")
                        .done(function (mode) {
                        var rgc = nts.uk.ui.windows.rgc();
                        if (mode) {
                            rgc.nts.uk.request.login.jumpToUsedSSOLoginPage();
                        }
                        else {
                            rgc.nts.uk.request.login.jumpToUsedLoginPage();
                        }
                    });
                };
                ScreenModel = __decorate([
                    bean()
                ], ScreenModel);
                return ScreenModel;
            }(ko.ViewModel));
            system.ScreenModel = ScreenModel;
        })(system = error.system || (error.system = {}));
    })(error = common.error || (common.error = {}));
})(common || (common = {}));
//# sourceMappingURL=sessiontimeout.start.js.map