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
                var cdl010;
                (function (cdl010) {
                    var a;
                    (function (a) {
                        var screenModel;
                        (function (screenModel) {
                            var API = {
                                getContactInfomation: 'query/refercontactinfor/get'
                            };
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.detailData = ko.observable(new ContactInformationRefer());
                                    _this.otherContact = ko.observableArray([]);
                                    return _this;
                                }
                                ViewModel.prototype.created = function (param) {
                                    var vm = this;
                                    vm.$blockui('grayout');
                                    vm.$ajax('com', API.getContactInfomation, { employeeId: param.employeeId, startMode: param.startMode })
                                        .then(function (detailData) {
                                        if (detailData && detailData.contactInformation) {
                                            var companyEmailAddress = detailData.contactInformation.companyEmailAddress;
                                            var companyMobileEmailAddress = detailData.contactInformation.companyMobileEmailAddress;
                                            var personalEmailAddress = detailData.contactInformation.personalEmailAddress;
                                            var personalMobileEmailAddress = detailData.contactInformation.personalMobileEmailAddress;
                                            detailData.contactInformation.companyEmailAddress = _.isEmpty(companyEmailAddress)
                                                ? '' : "<a href=\"mailto:".concat(companyEmailAddress, "\"><span class=\"limited-label\">").concat(companyEmailAddress, "</span></a>");
                                            detailData.contactInformation.companyMobileEmailAddress = _.isEmpty(companyMobileEmailAddress)
                                                ? '' : "<a href=\"mailto:".concat(companyMobileEmailAddress, "\"><span class=\"limited-label\">").concat(companyMobileEmailAddress, "</span></a>");
                                            detailData.contactInformation.personalEmailAddress = _.isEmpty(personalEmailAddress)
                                                ? '' : "<a href=\"mailto:".concat(personalEmailAddress, "\"><span class=\"limited-label\">").concat(personalEmailAddress, "</span></a>");
                                            detailData.contactInformation.personalMobileEmailAddress = _.isEmpty(personalMobileEmailAddress)
                                                ? '' : "<a href=\"mailto:".concat(personalMobileEmailAddress, "\"><span class=\"limited-label\">").concat(personalMobileEmailAddress, "</span></a>");
                                            vm.otherContact(detailData.contactInformation.otherContactsInfomation);
                                        }
                                        vm.detailData(detailData);
                                    })
                                        .fail(function () { return vm.$blockui('clear'); })
                                        .always(function () {
                                        var contentHeight = $('#content-cdl010').height();
                                        nts.uk.ui.windows.getSelf().setHeight(contentHeight + 110);
                                        vm.$blockui('clear');
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
                            screenModel.ViewModel = ViewModel;
                            var ObjectParam = /** @class */ (function () {
                                function ObjectParam() {
                                }
                                return ObjectParam;
                            }());
                            /** ???????????????????????? */
                            var ContactInformationRefer = /** @class */ (function () {
                                function ContactInformationRefer(init) {
                                    /** ????????????????????? */
                                    this.businessName = '';
                                    /** ???????????????DTO */
                                    this.contactInformation = new ContactInformation();
                                    /** ????????? */
                                    this.employmentName = '';
                                    /** ????????? */
                                    this.workplaceName = '';
                                    /** ????????? */
                                    this.classificationName = '';
                                    /** ????????? */
                                    this.jobTitleName = '';
                                    $.extend(this, init);
                                }
                                return ContactInformationRefer;
                            }());
                            var ContactInformation = /** @class */ (function () {
                                function ContactInformation(init) {
                                    /** ??????????????????????????? */
                                    this.companyMobilePhoneNumber = '';
                                    /** ??????????????????????????? */
                                    this.personalMobilePhoneNumber = '';
                                    /** ?????????????????? */
                                    this.emergencyNumber1 = '';
                                    /** ?????????????????? */
                                    this.emergencyNumber2 = '';
                                    /** ???????????????????????? */
                                    this.seatDialIn = '';
                                    /** ?????????????????? */
                                    this.seatExtensionNumber = '';
                                    /** ?????????????????????????????? */
                                    this.companyEmailAddress = '';
                                    /** ???????????????????????????????????? */
                                    this.companyMobileEmailAddress = '';
                                    /** ?????????????????????????????? */
                                    this.personalEmailAddress = '';
                                    /** ???????????????????????????????????? */
                                    this.personalMobileEmailAddress = '';
                                    /** ???????????? + ????????????????????? */
                                    this.otherContactsInfomation = [];
                                    $.extend(this, init);
                                }
                                return ContactInformation;
                            }());
                            var OtherContact = /** @class */ (function () {
                                function OtherContact(init) {
                                    /** ???????????? */
                                    this.contactName = '';
                                    /** ????????????????????? */
                                    this.contactAddress = '';
                                    $.extend(this, init);
                                }
                                return OtherContact;
                            }());
                        })(screenModel = a.screenModel || (a.screenModel = {}));
                    })(a = cdl010.a || (cdl010.a = {}));
                })(cdl010 = view.cdl010 || (view.cdl010 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cdl010.vm.js.map