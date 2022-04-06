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
                var cas014;
                (function (cas014) {
                    var a;
                    (function (a) {
                        var paths = {
                            getAllData: "ctx/sys/auth/grant/rolesetjob/start",
                            registerData: "ctx/sys/auth/grant/rolesetjob/register"
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super.call(this) || this;
                                var self = _this;
                                self.date = ko.observable(new Date().toISOString());
                                self.roleSetList = ko.observableArray([]);
                                self.jobTitleList = ko.observableArray([]);
                                self.roleSetJobTitle = ko.observable(new RoleSetJobTitle(false, self.jobTitleList(), self.roleSetList()));
                                $("#A4").ntsFixedTable({ height: 405 });
                                return _this;
                            }
                            ScreenModel.prototype.created = function () {
                                var vm = this;
                                vm.startPage();
                            };
                            ScreenModel.prototype.startPage = function () {
                                var self = this, dfd = $.Deferred();
                                self.$blockui("show");
                                self.roleSetList.removeAll();
                                self.jobTitleList.removeAll();
                                self.$ajax("com", paths.getAllData, { refDate: new Date(self.date()).toISOString() }).done(function (data) {
                                    if (data) {
                                        var _rsList = _.map(data.listRoleSetDto, function (rs) {
                                            return new RoleSet(rs.code, rs.name);
                                        });
                                        self.roleSetList(_rsList);
                                        var _jtList = _.map(data.listJobTitleDto, function (jt) {
                                            return new JobTitle(jt.id, jt.code, jt.name);
                                        });
                                        self.jobTitleList(_jtList);
                                        self.roleSetJobTitle(new RoleSetJobTitle(false, self.jobTitleList(), self.roleSetList()));
                                        if (data.roleSetGrantedJobTitleDto) {
                                            self.roleSetJobTitle().applyToConcurrentPerson(data.roleSetGrantedJobTitleDto.applyToConcurrentPerson);
                                            var details = self.roleSetJobTitle().details();
                                            _.each(details, function (d) {
                                                _.each(data.roleSetGrantedJobTitleDto.details, function (dd) {
                                                    if (d.jobTitleId == dd.jobTitleId) {
                                                        d.roleSetCd(dd.roleSetCd);
                                                    }
                                                });
                                            });
                                            self.roleSetJobTitle().details(details);
                                        }
                                    }
                                    else {
                                        nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                    }
                                    if (!_.isEmpty($("#A4 .ui-igcombo-wrapper")))
                                        $("#A4 .ui-igcombo-wrapper")[0].focus();
                                    dfd.resolve();
                                }).fail(function (error) {
                                    self.$dialog.error(error).then(function () {
                                        if (error.messageId == "Msg_713" || error.messageId == "Msg_712" || error.messageId == "Msg_1103") {
                                            nts.uk.request.jump("/view/ccg/008/a/index.xhtml");
                                        }
                                    });
                                    dfd.reject();
                                }).always(function () {
                                    self.$blockui("hide");
                                });
                                return dfd.promise();
                            };
                            ScreenModel.prototype.findBtnClick = function () {
                                var vm = this;
                                $("#A3_4").trigger("validate");
                                if (!nts.uk.ui.errors.hasError()) {
                                    vm.startPage();
                                }
                            };
                            ScreenModel.prototype.register = function () {
                                var self = this, data = ko.toJS(self.roleSetJobTitle), regDetails = [];
                                data.details.forEach(function (d, index) {
                                    if (_.isEmpty(d.roleSetCd)) {
                                        $("#a4m3_" + index).ntsError("set", { messageId: "Msg_2190", messageParams: [d.jobTitle.code, d.jobTitle.name] });
                                    }
                                    else {
                                        regDetails.push({ roleSetCd: d.roleSetCd, jobTitleId: d.jobTitleId });
                                    }
                                });
                                if (nts.uk.ui.errors.hasError()) {
                                    return;
                                }
                                var command = {
                                    applyToConcurrentPerson: data.applyToConcurrentPerson,
                                    details: regDetails
                                };
                                self.$blockui("show");
                                self.$ajax("com", paths.registerData, command).done(function () {
                                    self.$dialog.info({ messageId: "Msg_15" }).then(function () {
                                        if (!_.isEmpty($("#A4 .ui-igcombo-wrapper")))
                                            $("#A4 .ui-igcombo-wrapper")[0].focus();
                                    });
                                }).fail(function (error) {
                                    self.$dialog.error(error);
                                }).always(function () {
                                    self.$blockui("hide");
                                });
                            };
                            ScreenModel.prototype.openSpecialSettingDialog = function () {
                                var vm = this;
                                vm.$window.modal("/view/cas/014/b/index.xhtml");
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        var RoleSet = /** @class */ (function () {
                            function RoleSet(code, name) {
                                this.code = code;
                                this.name = name;
                            }
                            return RoleSet;
                        }());
                        a.RoleSet = RoleSet;
                        var JobTitle = /** @class */ (function () {
                            function JobTitle(id, code, name) {
                                this.id = id;
                                this.code = code;
                                this.name = name;
                            }
                            return JobTitle;
                        }());
                        a.JobTitle = JobTitle;
                        var RoleSetJobTitleDetail = /** @class */ (function () {
                            function RoleSetJobTitleDetail(jobTitle, roleSetList) {
                                this.roleSetCd = ko.observable(null);
                                this.jobTitleId = jobTitle.id;
                                this.jobTitle = jobTitle;
                                this.roleSetList = roleSetList;
                            }
                            return RoleSetJobTitleDetail;
                        }());
                        a.RoleSetJobTitleDetail = RoleSetJobTitleDetail;
                        var RoleSetJobTitle = /** @class */ (function () {
                            function RoleSetJobTitle(applyToConcurrentPerson, jobTitleList, roleSetList) {
                                var _this = this;
                                this.applyToConcurrentPerson = ko.observable(applyToConcurrentPerson);
                                this.details = ko.observableArray([]);
                                _.each(jobTitleList, function (j) { return _this.details.push(new RoleSetJobTitleDetail(j, roleSetList)); });
                            }
                            return RoleSetJobTitle;
                        }());
                        a.RoleSetJobTitle = RoleSetJobTitle;
                    })(a = cas014.a || (cas014.a = {}));
                })(cas014 = view.cas014 || (view.cas014 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cas014.a.vm.js.map