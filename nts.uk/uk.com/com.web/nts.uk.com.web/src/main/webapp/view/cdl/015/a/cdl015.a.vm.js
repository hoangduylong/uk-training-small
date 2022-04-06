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
                var cdl015;
                (function (cdl015) {
                    var a;
                    (function (a) {
                        var API = {
                            START: 'screen/com/cdl015/start',
                            REGISTER: 'screen/com/cdl015/register',
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super.call(this) || this;
                                _this.selectedRuleCode = ko.observable(2);
                                var vm = _this;
                                vm.roundingRules = ko.observableArray([
                                    { code: 1, name: vm.$i18n('CDL015_11') },
                                    { code: 0, name: vm.$i18n('CDL015_12') }
                                ]);
                                vm.$ajax(API.START).done(function (result) {
                                    if (result.manageEmojiState) {
                                        vm.selectedRuleCode(result.manageEmojiState);
                                    }
                                    else {
                                        vm.selectedRuleCode(0);
                                    }
                                });
                                return _this;
                            }
                            ViewModel.prototype.mounted = function () {
                                setTimeout(function () {
                                    $('.switchbox-wrappers').focus();
                                }, 200);
                            };
                            ViewModel.prototype.register = function () {
                                var vm = this;
                                var param = {
                                    cid: __viewContext.user.companyId,
                                    manageEmojiState: vm.selectedRuleCode(),
                                    emojiStateSettings: [
                                        {
                                            emijiName: vm.$i18n('CDL015_5'),
                                            emojiType: 4
                                        },
                                        {
                                            emijiName: vm.$i18n('CDL015_6'),
                                            emojiType: 3
                                        },
                                        {
                                            emijiName: vm.$i18n('CDL015_7'),
                                            emojiType: 2
                                        },
                                        {
                                            emijiName: vm.$i18n('CDL015_8'),
                                            emojiType: 1
                                        },
                                        {
                                            emijiName: vm.$i18n('CDL015_9'),
                                            emojiType: 0
                                        },
                                    ]
                                };
                                vm.$ajax(API.REGISTER, param).done(function () {
                                    nts.uk.ui.dialog.info({ messageId: "Msg_15" })
                                        .then(function () {
                                        vm.closeDialog();
                                    });
                                });
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
                        a.ViewModel = ViewModel;
                    })(a = cdl015.a || (cdl015.a = {}));
                })(cdl015 = view.cdl015 || (view.cdl015 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl015.a.vm.js.map