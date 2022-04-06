/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />
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
        var at;
        (function (at) {
            var view;
            (function (view) {
                var ccg005;
                (function (ccg005) {
                    var e;
                    (function (e) {
                        var screenModel;
                        (function (screenModel) {
                            var API = {
                                getGoOutInformation: "screen/com/ccg005/get-go-out-information",
                                delete: "ctx/office/goout/employee/information/delete",
                                saveOrUpdate: "ctx/office/goout/employee/information/save",
                            };
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.goOutDate = ko.observable(moment().utc().format("YYYY/MM/DD"));
                                    _this.goOutTime = ko.observable();
                                    _this.comebackTime = ko.observable();
                                    _this.goOutReason = ko.observable();
                                    _this.businessName = ko.observable();
                                    _this.sid = ko.observable();
                                    _this.disableBusinessName = ko.observable(true);
                                    _this.enableDeleteBtn = ko.observable(false);
                                    return _this;
                                }
                                ViewModel.prototype.created = function (props) {
                                    var vm = this;
                                    //binding data
                                    vm.sid(props.sid);
                                    vm.disableBusinessName(!(props.sid === __viewContext.user.employeeId));
                                    vm.businessName(props.businessName);
                                    vm.goOutDate(props.goOutDate);
                                    //call API
                                    vm.$blockui('grayout');
                                    vm.$ajax(API.getGoOutInformation, {
                                        sid: props.sid,
                                        date: moment(props.goOutDate),
                                    }).then(function (data) {
                                        //if data present -> bind data to UI
                                        if (data.goOutDate) {
                                            vm.enableDeleteBtn(true);
                                            vm.goOutReason(data.goOutReason);
                                            vm.goOutTime(data.goOutTime);
                                            vm.comebackTime(data.comebackTime);
                                        }
                                    }).always(function () {
                                        vm.$blockui('clear');
                                        $('#E5_1').focus();
                                    });
                                };
                                ViewModel.prototype.closeDialog = function () {
                                    var vm = this;
                                    vm.$window.close(false);
                                };
                                ViewModel.prototype.deleteGoOut = function () {
                                    var vm = this;
                                    vm.$dialog.confirm({ messageId: "Msg_18" }).then(function (result) {
                                        if (result === "yes") {
                                            var gouOutInfo = new GoOutEmployeeInformationDel({
                                                goOutDate: moment(vm.goOutDate()),
                                                sid: vm.sid(),
                                            });
                                            //call API
                                            vm.$blockui('grayout');
                                            vm.$ajax(API.delete, gouOutInfo)
                                                .then(function () {
                                                vm.createNew();
                                                vm.$blockui('clear');
                                                return vm.$dialog.info({ messageId: "Msg_16" });
                                            })
                                                .always(function () {
                                                vm.$blockui('clear');
                                                $('#E5_1').focus();
                                            });
                                        }
                                    });
                                };
                                ViewModel.prototype.createNew = function () {
                                    var vm = this;
                                    vm.enableDeleteBtn(false);
                                    vm.goOutReason("");
                                    vm.goOutTime(undefined);
                                    vm.comebackTime(undefined);
                                };
                                ViewModel.prototype.saveGoOut = function () {
                                    var vm = this;
                                    vm.$validate().then(function (valid) {
                                        //check validate
                                        if (valid) {
                                            //check that go out time must before comeback time
                                            if (vm.goOutTime() > vm.comebackTime()) {
                                                return vm.$dialog.error({ messageId: "Msg_2075" });
                                            }
                                            //if go out time is after now, notice user
                                            var afterToday = moment(vm.goOutDate()).isAfter(moment());
                                            var now = Number(moment().hours() * 60 + moment().minutes());
                                            if (afterToday) {
                                                return vm.$dialog.info({ messageId: "Msg_2074" }).then(function () { return vm.insertGoOut(); });
                                            }
                                            if (vm.goOutTime() > now) {
                                                return vm.$dialog.info({ messageId: "Msg_2074" }).then(function () { return vm.insertGoOut(); });
                                            }
                                            return vm.insertGoOut();
                                        }
                                    });
                                };
                                ViewModel.prototype.insertGoOut = function () {
                                    var vm = this;
                                    var gouOutInfo = new GoOutEmployeeInformation({
                                        goOutTime: vm.goOutTime(),
                                        goOutReason: vm.goOutReason(),
                                        goOutDate: moment(vm.goOutDate()),
                                        comebackTime: vm.comebackTime(),
                                        sid: vm.sid(),
                                    });
                                    //call API
                                    vm.$blockui('grayout');
                                    vm.$ajax(API.saveOrUpdate, gouOutInfo)
                                        .then(function () {
                                        vm.$blockui('clear');
                                        vm.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                            vm.$window.close(true);
                                        });
                                    })
                                        .always(function () {
                                        vm.$blockui('clear');
                                    });
                                };
                                ViewModel = __decorate([
                                    bean()
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            //社員の外出情報 Save or Update
                            var GoOutEmployeeInformation = /** @class */ (function () {
                                function GoOutEmployeeInformation(init) {
                                    $.extend(this, init);
                                }
                                return GoOutEmployeeInformation;
                            }());
                            //社員の外出情報 Delete
                            var GoOutEmployeeInformationDel = /** @class */ (function () {
                                function GoOutEmployeeInformationDel(init) {
                                    $.extend(this, init);
                                }
                                return GoOutEmployeeInformationDel;
                            }());
                        })(screenModel = e.screenModel || (e.screenModel = {}));
                    })(e = ccg005.e || (ccg005.e = {}));
                })(ccg005 = view.ccg005 || (view.ccg005 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg005.e.vm.js.map