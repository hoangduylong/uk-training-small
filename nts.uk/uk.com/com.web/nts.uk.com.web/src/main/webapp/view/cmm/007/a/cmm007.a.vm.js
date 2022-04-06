var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm007;
                (function (cmm007) {
                    var a;
                    (function (a) {
                        var viewModelTabB = nts.uk.com.view.cmm007.b.viewmodel;
                        var viewModelTabC = nts.uk.com.view.cmm007.c.viewmodel;
                        var viewModelTabD = nts.uk.com.view.cmm007.d.viewmodel;
                        var viewModelTabE = nts.uk.com.view.cmm007.e.viewmodel;
                        var viewModelTabG = nts.uk.com.view.cmm007.g.viewmodel;
                        var viewModelTabI = nts.uk.com.view.cmm007.i;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.systemDefine = ko.observable(new viewModelTabB.ScreenModel());
                                    _self.temporaryAbsenceFr = ko.observable(new viewModelTabC.ScreenModel());
                                    _self.planYearHolidayFr = ko.observable(new viewModelTabD.ScreenModel());
                                    _self.overtimeWorkFr = ko.observable(new viewModelTabE.ScreenModel());
                                    _self.workdayoffFr = ko.observable(new viewModelTabG.ScreenModel());
                                    _self.workName = ko.observable(new viewModelTabI.ViewModel());
                                }
                                ScreenModel.prototype.start_page = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    $.when(_self.systemDefine().start_page(), _self.temporaryAbsenceFr().start_page(), _self.planYearHolidayFr().start_page(), _self.overtimeWorkFr().start_page(), _self.workdayoffFr().start_page(), _self.workName().mounted()).done(function () {
                                        dfd.resolve(_self);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * on select tab handle
                                 */
                                ScreenModel.prototype.onSelectTabB = function () {
                                    var _this = this;
                                    $('#com_company').focus();
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.FIRST,
                                        activate: function (event, info) {
                                            $('#com_company').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                * on select tab handle
                                */
                                ScreenModel.prototype.onSelectTabC = function () {
                                    var _this = this;
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.SECOND,
                                        activate: function (event, info) {
                                            $('#tempAbsenceNo7').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                * on select tab handle
                                */
                                ScreenModel.prototype.onSelectTabD = function () {
                                    var _this = this;
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.THIRD,
                                        activate: function (event, info) {
                                            $('#plan_year_hd_frame1').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                * on select tab handle
                                */
                                ScreenModel.prototype.onSelectTabE = function () {
                                    var _this = this;
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.FOURTH,
                                        activate: function (event, info) {
                                            $('#overtime_work_name1').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                * on select tab handle
                                */
                                ScreenModel.prototype.onSelectTabG = function () {
                                    var _this = this;
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.FIFTH,
                                        activate: function (event, info) {
                                            $('#work_day_off_name1').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                 * on select tab handle
                                 */
                                ScreenModel.prototype.onSelectTabI = function () {
                                    var _this = this;
                                    $("#sidebar").ntsSideBar("init", {
                                        active: SideBarTabIndex.SIX,
                                        activate: function (event, info) {
                                            $('#I2_2').focus();
                                            var _self = _this;
                                            _self.start_page().done(function () { return $(window).resize(); });
                                            _self.removeErrorMonitor();
                                        }
                                    });
                                };
                                /**
                                *   remove all alert error all tab
                                **/
                                ScreenModel.prototype.removeErrorMonitor = function () {
                                    $('.nts-input').ntsError('clear');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                        var SideBarTabIndex;
                        (function (SideBarTabIndex) {
                            SideBarTabIndex.FIRST = 0;
                            SideBarTabIndex.SECOND = 1;
                            SideBarTabIndex.THIRD = 2;
                            SideBarTabIndex.FOURTH = 3;
                            SideBarTabIndex.FIFTH = 4;
                            SideBarTabIndex.SIX = 5;
                        })(SideBarTabIndex || (SideBarTabIndex = {}));
                    })(a = cmm007.a || (cmm007.a = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.a.vm.js.map