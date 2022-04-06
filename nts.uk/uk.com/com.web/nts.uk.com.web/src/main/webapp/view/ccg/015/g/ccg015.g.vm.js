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
        var at;
        (function (at) {
            var view;
            (function (view) {
                var ccg015;
                (function (ccg015) {
                    var g;
                    (function (g) {
                        var screenModel;
                        (function (screenModel) {
                            var API = {
                                getSetting: 'screen/com/ccg008/get-setting',
                                save: 'screen/com/ccg008/save',
                            };
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.itemListCb = ko.observableArray([]);
                                    _this.reloadInterval = ko.observable('0');
                                    _this.cId = ko.observable('');
                                    return _this;
                                }
                                ViewModel.prototype.created = function () {
                                    var vm = this;
                                    vm.itemListCb = ko.observableArray([
                                        new ItemModel('0', 'なし'),
                                        new ItemModel('1', '1分'),
                                        new ItemModel('2', '5分'),
                                        new ItemModel('3', '10分'),
                                        new ItemModel('4', '20分'),
                                        new ItemModel('5', '30分'),
                                        new ItemModel('6', '40分'),
                                        new ItemModel('7', '50分'),
                                        new ItemModel('8', '60分')
                                    ]);
                                };
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    $('#combo-box').focus();
                                    vm
                                        .$blockui('grayout')
                                        .then(function () { return vm.$ajax('com', API.getSetting); })
                                        .then(function (setting) {
                                        if (setting && setting.reloadInterval) {
                                            vm.reloadInterval(setting.reloadInterval);
                                        }
                                    })
                                        .always(function () { return vm.$blockui('clear'); });
                                };
                                ViewModel.prototype.onClickDecision = function () {
                                    var vm = this;
                                    var command = new ToppageReloadSettingCommand(vm.cId(), parseInt(vm.reloadInterval()));
                                    vm.$ajax('com', API.save, command)
                                        .then(function () { return vm.$dialog.info({ messageId: 'Msg_15' }); })
                                        .then(function () { return vm.$window.close(); });
                                };
                                ViewModel.prototype.onClickCancel = function () {
                                    this.$window.close();
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            var ItemModel = /** @class */ (function () {
                                function ItemModel(code, name) {
                                    this.code = code;
                                    this.name = name;
                                }
                                return ItemModel;
                            }());
                            screenModel.ItemModel = ItemModel;
                            var ToppageReloadSettingCommand = /** @class */ (function () {
                                function ToppageReloadSettingCommand(cId, reloadInteval) {
                                    this.cId = cId;
                                    this.reloadInteval = reloadInteval;
                                }
                                return ToppageReloadSettingCommand;
                            }());
                            screenModel.ToppageReloadSettingCommand = ToppageReloadSettingCommand;
                        })(screenModel = g.screenModel || (g.screenModel = {}));
                    })(g = ccg015.g || (ccg015.g = {}));
                })(ccg015 = view.ccg015 || (view.ccg015 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg015.g.vm.js.map