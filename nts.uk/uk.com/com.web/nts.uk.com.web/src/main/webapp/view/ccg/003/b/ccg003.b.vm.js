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
                var ccg003;
                (function (ccg003) {
                    var b;
                    (function (b) {
                        var API = {
                            // <<ScreenQuery>> 社員が作成したお知らせの内容を取得する
                            getContentOfNotification: 'sys/portal/notice/getContentOfNotification'
                        };
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.dateValue = ko.observable(new DatePeriod({
                                    startDate: moment.utc().format('YYYY/MM/DD'),
                                    endDate: moment.utc().format('YYYY/MM/DD')
                                }));
                                _this.itemList = ko.observableArray([]);
                                _this.msgNotice = [];
                                _this.role = new Role();
                                return _this;
                            }
                            ViewModel.prototype.created = function (role) {
                                var vm = this;
                                vm.role = role;
                                vm.searchMessage(null);
                            };
                            ViewModel.prototype.mounted = function () {
                                $('#B20_1').focus();
                            };
                            ViewModel.prototype.searchMessage = function (param) {
                                var _this = this;
                                var vm = this;
                                vm.$blockui('show');
                                vm.$ajax('com', API.getContentOfNotification, param).then(function (response) {
                                    if (response) {
                                        vm.msgNotice = response;
                                        var itemList = _.map(response, function (msg) { return new ItemModel({
                                            creatorID: msg.creatorID,
                                            inputDate: msg.inputDate,
                                            ymDisplay: moment.utc(msg.startDate, 'YYYYMMDD').format('M/D').toString()
                                                + ' ' + vm.$i18n('CCG003_15').toString() + ' '
                                                + moment.utc(msg.endDate, 'YYYYMMDD').format('M/D').toString(),
                                            content: msg.notificationMessage
                                        }); });
                                        vm.itemList(itemList);
                                    }
                                })
                                    .fail(function (error) { return _this.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('hide'); });
                            };
                            /**
                             * B3:検索をクリックする
                             */
                            ViewModel.prototype.onClickSearch = function () {
                                var vm = this;
                                vm.$validate('#B2_2').then(function (valid) {
                                    if (!valid) {
                                        nts.uk.ui.errors.show();
                                        return;
                                    }
                                    ;
                                    var param = new DatePeriod({
                                        startDate: moment.utc(vm.dateValue().startDate).toISOString(),
                                        endDate: moment.utc(vm.dateValue().endDate).toISOString()
                                    });
                                    vm.searchMessage(param);
                                });
                            };
                            /**
                             * B20_1:新規をクリックする
                             */
                            ViewModel.prototype.openScreenCInNewMode = function () {
                                var vm = this;
                                vm.$window.modal('/view/ccg/003/c/index.xhtml', {
                                    isNewMode: true,
                                    role: vm.role,
                                    messageNotice: null
                                })
                                    .then(function (result) {
                                    if (result && !result.isClose) {
                                        vm.onClickSearch();
                                    }
                                });
                            };
                            /**
                             * B4_2:対象のリンクラベルをクリックする
                             */
                            ViewModel.prototype.onClickTargetLink = function (data) {
                                var vm = this;
                                vm.$window.modal('/view/ccg/003/c/index.xhtml', {
                                    isNewMode: false,
                                    role: vm.role,
                                    messageNotice: vm.findMessage(data)
                                })
                                    .then(function () {
                                    vm.onClickSearch();
                                });
                            };
                            ViewModel.prototype.findMessage = function (data) {
                                return _.find(this.msgNotice, function (m) { return m.creatorID === data.creatorID && m.inputDate === data.inputDate; });
                            };
                            ViewModel.prototype.closeDialog = function () {
                                this.$window.close();
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        b.ViewModel = ViewModel;
                        var Role = /** @class */ (function () {
                            function Role() {
                            }
                            return Role;
                        }());
                        var DatePeriod = /** @class */ (function () {
                            function DatePeriod(init) {
                                $.extend(this, init);
                            }
                            return DatePeriod;
                        }());
                        var ItemModel = /** @class */ (function () {
                            function ItemModel(init) {
                                $.extend(this, init);
                            }
                            return ItemModel;
                        }());
                        var MessageNotice = /** @class */ (function () {
                            function MessageNotice() {
                            }
                            return MessageNotice;
                        }());
                    })(b = ccg003.b || (ccg003.b = {}));
                })(ccg003 = view.ccg003 || (view.ccg003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg003.b.vm.js.map