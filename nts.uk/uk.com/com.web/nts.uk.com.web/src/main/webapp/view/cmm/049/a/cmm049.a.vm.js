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
                var cmm049;
                (function (cmm049) {
                    var a;
                    (function (a) {
                        var API = {
                            findByCid: "query/cmm049userinformationsetting/get",
                            insertOrUpdate: "sys/env/userinformationusermethod/insertorupdate",
                        };
                        var ScreenModel = /** @class */ (function (_super) {
                            __extends(ScreenModel, _super);
                            function ScreenModel() {
                                var _this = _super.call(this) || this;
                                _this.profileCheckList = ko.observableArray([]);
                                _this.profileSelectedId = ko.observable(2); //#114200
                                _this.passwordCheckList = ko.observableArray([]);
                                _this.passwordSelectedId = ko.observable(2); //#114200
                                _this.noticeCheckList = ko.observableArray([]);
                                _this.noticeSelectedId = ko.observable(2); //#114200
                                _this.speechCheckList = ko.observableArray([]);
                                _this.speechSelectedId = ko.observable(2); //#113760
                                // A4
                                _this.contactName1 = ko.observable("");
                                _this.contactName2 = ko.observable("");
                                _this.contactName3 = ko.observable("");
                                _this.contactName4 = ko.observable("");
                                _this.contactName5 = ko.observable("");
                                _this.companyMobilePhoneDisplay = ko.observable();
                                _this.companyMobilePhoneUpdatable = ko.observable();
                                _this.personalMobilePhoneDisplay = ko.observable();
                                _this.personalMobilePhoneUpdatable = ko.observable();
                                _this.emergencyNumber1Display = ko.observable();
                                _this.emergencyNumber1Updatable = ko.observable();
                                _this.emergencyNumber2Display = ko.observable();
                                _this.emergencyNumber2Updatable = ko.observable();
                                _this.dialInNumberDisplay = ko.observable();
                                _this.dialInNumberUpdatable = ko.observable();
                                _this.extensionNumberDisplay = ko.observable();
                                _this.extensionNumberUpdatable = ko.observable();
                                _this.companyEmailAddressDisplay = ko.observable();
                                _this.companyEmailAddressUpdatable = ko.observable();
                                _this.companyMobileEmailAddressDisplay = ko.observable();
                                _this.companyMobileEmailAddressUpdatable = ko.observable();
                                _this.personalEmailAddressDisplay = ko.observable();
                                _this.personalEmailAddressUpdatable = ko.observable();
                                _this.personalMobileEmailAddressDisplay = ko.observable();
                                _this.personalMobileEmailAddressUpdatable = ko.observable();
                                _this.otherContact1Display = ko.observable();
                                _this.otherContact1ContactName = ko.observable("");
                                _this.otherContact2Display = ko.observable();
                                _this.otherContact2ContactName = ko.observable("");
                                _this.otherContact3Display = ko.observable();
                                _this.otherContact3ContactName = ko.observable("");
                                _this.otherContact4Display = ko.observable();
                                _this.otherContact4ContactName = ko.observable("");
                                _this.otherContact5Display = ko.observable();
                                _this.otherContact5ContactName = ko.observable("");
                                _this.mailFunctionDtos = ko.observableArray([]);
                                _this.userInformationUseMethodDto = ko.observable();
                                _this.otherContact1 = ko.observable("");
                                _this.otherContact2 = ko.observable("");
                                _this.otherContact3 = ko.observable("");
                                _this.otherContact4 = ko.observable("");
                                _this.otherContact5 = ko.observable("");
                                _this.selectedEmailAddress = ko.observable(0);
                                //fix bug 112907
                                _this.otherContact1Required = ko.observable(false);
                                _this.otherContact2Required = ko.observable(false);
                                _this.otherContact3Required = ko.observable(false);
                                _this.otherContact4Required = ko.observable(false);
                                _this.otherContact5Required = ko.observable(false);
                                /**
                                 * Key: emailClassification, value: listfunctionId
                                 */
                                _this.emailData = {};
                                /**
                                 * Giá trị emailClassification đang được chọn
                                 */
                                _this.selectedEmailClassification = null;
                                /**
                                 * Các functionId được check theo key emailClassification
                                 */
                                _this.mailFunctionDataSource = [];
                                _this.emailColumns = [
                                    {
                                        headerText: "",
                                        prop: "index",
                                        width: 160,
                                        hidden: true,
                                    },
                                    {
                                        headerText: _this.$i18n("CMM049_66"),
                                        prop: "emailAddress",
                                        width: 180,
                                    },
                                ];
                                _this.emailDataSource = ko.observableArray([
                                    new EmailModel({ index: 0, emailAddress: _this.$i18n("CMM049_49") }),
                                    new EmailModel({ index: 1, emailAddress: _this.$i18n("CMM049_50") }),
                                    new EmailModel({ index: 2, emailAddress: _this.$i18n("CMM049_51") }),
                                    new EmailModel({ index: 3, emailAddress: _this.$i18n("CMM049_52") }),
                                ]);
                                var vm = _this;
                                vm.tabs = ko.observableArray([
                                    {
                                        id: "tab-1",
                                        title: vm.$i18n("CMM049_24"),
                                        content: "#A4",
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    },
                                    {
                                        id: "tab-2",
                                        title: vm.$i18n("CMM049_25"),
                                        content: "#A5",
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    },
                                    {
                                        id: "tab-3",
                                        title: vm.$i18n("CMM049_26"),
                                        content: "#A6",
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    },
                                    {
                                        id: "tab-4",
                                        title: vm.$i18n("CMM049_27"),
                                        content: "#A7",
                                        enable: ko.observable(false),
                                        visible: ko.observable(false), //#113760
                                    },
                                    {
                                        id: "tab-5",
                                        title: vm.$i18n("CMM049_28"),
                                        content: "#A8",
                                        enable: ko.observable(false),
                                        visible: ko.observable(false),
                                    },
                                ]);
                                vm.selectedTab = ko.observable("tab-1");
                                // tab 1 - profile function
                                vm.profileCheckList = ko.observableArray([
                                    new CheckboxModel({
                                        id: 1,
                                        name: vm.$i18n("CMM049_31"),
                                    }),
                                    new CheckboxModel({
                                        id: 2,
                                        name: vm.$i18n("CMM049_32"),
                                    }),
                                ]);
                                // tab 2 - password
                                vm.passwordCheckList = ko.observableArray([
                                    new CheckboxModel({
                                        id: 1,
                                        name: vm.$i18n("CMM049_31"),
                                    }),
                                    new CheckboxModel({
                                        id: 2,
                                        name: vm.$i18n("CMM049_32"),
                                    }),
                                ]);
                                // tab 3 - notice
                                vm.noticeCheckList = ko.observableArray([
                                    new CheckboxModel({
                                        id: 1,
                                        name: vm.$i18n("CMM049_31"),
                                    }),
                                    new CheckboxModel({
                                        id: 2,
                                        name: vm.$i18n("CMM049_32"),
                                    }),
                                ]);
                                // tab 4 - speech
                                vm.speechCheckList = ko.observableArray([
                                    new CheckboxModel({
                                        id: 1,
                                        name: vm.$i18n("CMM049_31"),
                                    }),
                                    new CheckboxModel({
                                        id: 2,
                                        name: vm.$i18n("CMM049_32"),
                                    }),
                                ]);
                                return _this;
                            }
                            ScreenModel.prototype.mounted = function () {
                                var vm = this;
                                vm.$grid = $("#A8_4");
                                /**
                                 * メールアドレスを選択する時
                                 */
                                vm.selectedEmailAddress.subscribe(function (newValue) {
                                    /**
                                     * Lọc toàn bộ các functionId được check theo emailClassification
                                     */
                                    vm.emailData[vm.selectedEmailClassification] = _.chain(vm.mailFunctionDataSource)
                                        .filter(function (item) { return item.isChecked; })
                                        .map(function (item) { return item.functionId; })
                                        .value();
                                    if (vm.$grid.data("igGrid")) {
                                        vm.$grid.ntsGrid("destroy");
                                    }
                                    vm.initGrid(newValue, vm.mailFunctionDtos());
                                });
                                /**
                                 * ユーザ情報の設定を起動する
                                 */
                                vm.getData();
                                //fix bug #112907
                                vm.profileSelectedId.subscribe(function (newVal) {
                                    if (newVal === 2) {
                                        $('#A4_4_33').ntsError('clear');
                                        $('#A4_4_36').ntsError('clear');
                                        $('#A4_4_39').ntsError('clear');
                                        $('#A4_4_42').ntsError('clear');
                                        $('#A4_4_45').ntsError('clear');
                                    }
                                });
                                vm.otherContact1Display.subscribe(function (newValue) {
                                    if (!newValue) {
                                        $('#A4_4_33').ntsError('clear');
                                    }
                                });
                                vm.otherContact2Display.subscribe(function (newValue) {
                                    if (!newValue) {
                                        $('#A4_4_36').ntsError('clear');
                                    }
                                });
                                vm.otherContact3Display.subscribe(function (newValue) {
                                    if (!newValue) {
                                        $('#A4_4_39').ntsError('clear');
                                    }
                                });
                                vm.otherContact4Display.subscribe(function (newValue) {
                                    if (!newValue) {
                                        $('#A4_4_42').ntsError('clear');
                                    }
                                });
                                vm.otherContact5Display.subscribe(function (newValue) {
                                    if (!newValue) {
                                        $('#A4_4_45').ntsError('clear');
                                    }
                                });
                            };
                            ScreenModel.prototype.setCheckboxLine1 = function (response) {
                                var vm = this;
                                var companyMobilePhone = response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyMobilePhone.contactUsageSetting;
                                switch (companyMobilePhone) {
                                    case 0: {
                                        vm.companyMobilePhoneDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.companyMobilePhoneDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.companyMobilePhoneDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.companyMobilePhoneUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyMobilePhone.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine2 = function (response) {
                                var vm = this;
                                var personalMobilePhone = response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalMobilePhone.contactUsageSetting;
                                switch (personalMobilePhone) {
                                    case 0: {
                                        vm.personalMobilePhoneDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.personalMobilePhoneDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.personalMobilePhoneDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.personalMobilePhoneUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalMobilePhone.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine3 = function (response) {
                                var vm = this;
                                var emergencyNumber1 = response.userInformationUseMethodDto.settingContactInformationDto
                                    .emergencyNumber1.contactUsageSetting;
                                switch (emergencyNumber1) {
                                    case 0: {
                                        vm.emergencyNumber1Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.emergencyNumber1Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.emergencyNumber1Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.emergencyNumber1Updatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .emergencyNumber1.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine4 = function (response) {
                                var vm = this;
                                var emergencyNumber2 = response.userInformationUseMethodDto.settingContactInformationDto
                                    .emergencyNumber2.contactUsageSetting;
                                switch (emergencyNumber2) {
                                    case 0: {
                                        vm.emergencyNumber2Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.emergencyNumber2Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.emergencyNumber2Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.emergencyNumber2Updatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .emergencyNumber2.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine5 = function (response) {
                                var vm = this;
                                var dialInNumber = response.userInformationUseMethodDto.settingContactInformationDto
                                    .dialInNumber.contactUsageSetting;
                                switch (dialInNumber) {
                                    case 0: {
                                        vm.dialInNumberDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.dialInNumberDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.dialInNumberDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.dialInNumberUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .dialInNumber.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine6 = function (response) {
                                var vm = this;
                                var extensionNumber = response.userInformationUseMethodDto.settingContactInformationDto
                                    .extensionNumber.contactUsageSetting;
                                switch (extensionNumber) {
                                    case 0: {
                                        vm.extensionNumberDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.extensionNumberDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.extensionNumberDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.extensionNumberUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .extensionNumber.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine7 = function (response) {
                                var vm = this;
                                var companyEmailAddress = response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyEmailAddress.contactUsageSetting;
                                switch (companyEmailAddress) {
                                    case 0: {
                                        vm.companyEmailAddressDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.companyEmailAddressDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.companyEmailAddressDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.companyEmailAddressUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyEmailAddress.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine8 = function (response) {
                                var vm = this;
                                var companyMobileEmailAddress = response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyMobileEmailAddress.contactUsageSetting;
                                switch (companyMobileEmailAddress) {
                                    case 0: {
                                        vm.companyMobileEmailAddressDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.companyMobileEmailAddressDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.companyMobileEmailAddressDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.companyMobileEmailAddressUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .companyMobileEmailAddress.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine9 = function (response) {
                                var vm = this;
                                var personalEmailAddress = response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalEmailAddress.contactUsageSetting;
                                switch (personalEmailAddress) {
                                    case 0: {
                                        vm.personalEmailAddressDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.personalEmailAddressDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.personalEmailAddressDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.personalEmailAddressUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalEmailAddress.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine10 = function (response) {
                                var vm = this;
                                var personalMobileEmailAddress = response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalMobileEmailAddress.contactUsageSetting;
                                switch (personalMobileEmailAddress) {
                                    case 0: {
                                        vm.personalMobileEmailAddressDisplay(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.personalMobileEmailAddressDisplay(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.personalMobileEmailAddressDisplay(true);
                                        break;
                                    }
                                    default: break;
                                }
                                vm.personalMobileEmailAddressUpdatable(response.userInformationUseMethodDto.settingContactInformationDto
                                    .personalMobileEmailAddress.updatable === 1);
                            };
                            ScreenModel.prototype.setCheckboxLine11 = function (response) {
                                var vm = this;
                                var otherContact1 = vm.getOtherContact(1, response);
                                switch (otherContact1.contactUsageSetting) {
                                    case 0: {
                                        vm.otherContact1Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.otherContact1Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.otherContact1Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                            };
                            ScreenModel.prototype.setCheckboxLine12 = function (response) {
                                var vm = this;
                                var otherContact2 = vm.getOtherContact(2, response);
                                switch (otherContact2.contactUsageSetting) {
                                    case 0: {
                                        vm.otherContact2Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.otherContact2Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.otherContact2Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                            };
                            ScreenModel.prototype.setCheckboxLine13 = function (response) {
                                var vm = this;
                                var otherContact3 = vm.getOtherContact(3, response);
                                switch (otherContact3.contactUsageSetting) {
                                    case 0: {
                                        vm.otherContact3Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.otherContact3Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.otherContact3Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                            };
                            ScreenModel.prototype.setCheckboxLine14 = function (response) {
                                var vm = this;
                                var otherContact4 = vm.getOtherContact(4, response);
                                switch (otherContact4.contactUsageSetting) {
                                    case 0: {
                                        vm.otherContact4Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.otherContact4Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.otherContact4Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                            };
                            ScreenModel.prototype.setCheckboxLine15 = function (response) {
                                var vm = this;
                                var otherContact5 = vm.getOtherContact(5, response);
                                switch (otherContact5.contactUsageSetting) {
                                    case 0: {
                                        vm.otherContact5Display(false);
                                        break;
                                    }
                                    case 1: {
                                        vm.otherContact5Display(true);
                                        break;
                                    }
                                    case 2: {
                                        vm.otherContact5Display(true);
                                        break;
                                    }
                                    default: break;
                                }
                            };
                            ScreenModel.prototype.setButtonGroup = function (response) {
                                var vm = this;
                                vm.profileSelectedId(response.userInformationUseMethodDto.useOfProfile === 1 ? 1 : 2);
                                vm.passwordSelectedId(response.userInformationUseMethodDto.useOfPassword === 1 ? 1 : 2);
                                vm.noticeSelectedId(response.userInformationUseMethodDto.useOfNotice === 1 ? 1 : 2);
                                vm.speechSelectedId(2); //#113760
                            };
                            ScreenModel.prototype.setContactNameInput = function (response) {
                                var vm = this;
                                vm.contactName1(vm.getOtherContact(1, response).contactName);
                                vm.contactName2(vm.getOtherContact(2, response).contactName);
                                vm.contactName3(vm.getOtherContact(3, response).contactName);
                                vm.contactName4(vm.getOtherContact(4, response).contactName);
                                vm.contactName5(vm.getOtherContact(5, response).contactName);
                            };
                            ScreenModel.prototype.getData = function () {
                                var vm = this;
                                vm.$blockui("grayout")
                                    .then(function () { return vm.$ajax(API.findByCid); })
                                    .then(function (response) {
                                    vm.mailFunctionDtos(response.mailFunctionDtos);
                                    vm.userInformationUseMethodDto(response.userInformationUseMethodDto);
                                    // binding button group (tab-1-2-3-4)
                                    vm.setButtonGroup(response);
                                    // binding contact name input (tab-1)
                                    vm.setContactNameInput(response);
                                    // binding data (tab-1)
                                    // line 1
                                    vm.setCheckboxLine1(response);
                                    // line 2
                                    vm.setCheckboxLine2(response);
                                    // line 3
                                    vm.setCheckboxLine3(response);
                                    // line 4
                                    vm.setCheckboxLine4(response);
                                    // line 5
                                    vm.setCheckboxLine5(response);
                                    // line 6
                                    vm.setCheckboxLine6(response);
                                    // line 7
                                    vm.setCheckboxLine7(response);
                                    // line 8
                                    vm.setCheckboxLine8(response);
                                    // line 9
                                    vm.setCheckboxLine9(response);
                                    // line 10
                                    vm.setCheckboxLine10(response);
                                    // line 11
                                    vm.setCheckboxLine11(response);
                                    // line 12
                                    vm.setCheckboxLine12(response);
                                    // line 13
                                    vm.setCheckboxLine13(response);
                                    // line 14
                                    vm.setCheckboxLine14(response);
                                    // line 15
                                    vm.setCheckboxLine15(response);
                                    /**
                                     * Gán key (emailClassification) và value (List functionIds) cho emailData
                                     */
                                    _.forEach(response.userInformationUseMethodDto.emailDestinationFunctionDtos, function (email) {
                                        return (vm.emailData[email.emailClassification] = email.functionIds);
                                    });
                                    vm.initGrid(vm.selectedEmailAddress(), vm.mailFunctionDtos());
                                })
                                    .always(function () { return vm.$blockui("clear"); });
                            };
                            ScreenModel.prototype.getOtherContact = function (no, response) {
                                return _.find(response.userInformationUseMethodDto.settingContactInformationDto.otherContacts, function (item) { return item.no === no; });
                            };
                            /**
                             * Create Table target email
                             * @param emailClassification // email đang được chọn
                             * @param mailFunctionList // List mailFunction (dữ liệu bảng bên phải)
                             */
                            ScreenModel.prototype.initGrid = function (emailClassification, mailFunctionList) {
                                var vm = this;
                                /**
                                 * Tìm List functionId theo key emailClassification
                                 */
                                var selectedFundtionIds = vm.emailData[emailClassification];
                                /**
                                 * Lưu giá trị emailClassification đang được chọn
                                 */
                                vm.selectedEmailClassification = emailClassification;
                                /**
                                 * Lưu những functionId được check
                                 */
                                vm.mailFunctionDataSource = _.map(mailFunctionList, function (item) {
                                    var model = new MailFunctionModel(item);
                                    model.isChecked = selectedFundtionIds.indexOf(item.functionId) !== -1;
                                    return model;
                                });
                                vm.$grid
                                    .ntsGrid({
                                    primaryKey: "functionId",
                                    height: "270px",
                                    dataSource: vm.mailFunctionDataSource,
                                    rowVirtualization: true,
                                    virtualization: true,
                                    virtualizationMode: "continuous",
                                    columns: [
                                        {
                                            headerText: "",
                                            key: "functionId",
                                            dataType: "number",
                                            hidden: true,
                                        },
                                        {
                                            headerText: "",
                                            key: "isChecked",
                                            dataType: "boolean",
                                            width: "35px",
                                            ntsControl: "Checkbox",
                                            showHeaderCheckbox: true,
                                        },
                                        {
                                            headerText: vm.$i18n("CMM049_21"),
                                            key: "functionName",
                                            dataType: "string",
                                            width: "300x",
                                        },
                                    ],
                                    features: [
                                        {
                                            name: "Selection",
                                            mode: "row",
                                            multipleSelection: true,
                                            activation: true,
                                        },
                                    ],
                                    ntsFeatures: [],
                                    ntsControls: [
                                        {
                                            name: "Checkbox",
                                            options: { value: 1, text: "" },
                                            optionsValue: "value",
                                            optionsText: "text",
                                            controlType: "CheckBox",
                                            enable: true,
                                        },
                                    ],
                                });
                                var checkbox = $(vm.$el).find('#A8_4_isChecked input[type="checkbox"]');
                                var isCheckall = vm.mailFunctionDataSource.filter(function (_a) {
                                    var isChecked = _a.isChecked;
                                    return !isChecked;
                                }).length === 0;
                                if (checkbox.length) {
                                    checkbox.prop('checked', isCheckall);
                                }
                            };
                            /**
                             * ユーザ情報へ戻る
                             */
                            ScreenModel.prototype.closeDialog = function () {
                                var vm = this;
                                vm.$window.close();
                            };
                            ScreenModel.prototype.getUserInformationUseMethodDto = function (otherContactDtos) {
                                var vm = this;
                                return new UserInformationUseMethodDto({
                                    useOfProfile: vm.profileSelectedId() === 1 ? 1 : 0,
                                    useOfPassword: vm.passwordSelectedId() === 1 ? 1 : 0,
                                    useOfNotice: vm.noticeSelectedId() === 1 ? 1 : 0,
                                    useOfLanguage: vm.speechSelectedId() === 1 ? 1 : 0,
                                    companyId: vm.userInformationUseMethodDto().companyId,
                                    settingContactInformationDto: new SettingContactInformationDto({
                                        companyEmailAddress: new ContactSettingDto({
                                            contactUsageSetting: vm.companyEmailAddressDisplay() ? 1 : 0,
                                            updatable: vm.companyEmailAddressUpdatable() ? 1 : 0,
                                        }),
                                        companyMobileEmailAddress: new ContactSettingDto({
                                            contactUsageSetting: vm.companyMobileEmailAddressDisplay() ? 1 : 0,
                                            updatable: vm.companyMobileEmailAddressUpdatable() ? 1 : 0,
                                        }),
                                        companyMobilePhone: new ContactSettingDto({
                                            contactUsageSetting: vm.companyMobilePhoneDisplay() ? 1 : 0,
                                            updatable: vm.companyMobilePhoneUpdatable() ? 1 : 0,
                                        }),
                                        dialInNumber: new ContactSettingDto({
                                            contactUsageSetting: vm.dialInNumberDisplay() ? 1 : 0,
                                            updatable: vm.dialInNumberUpdatable() ? 1 : 0,
                                        }),
                                        emergencyNumber1: new ContactSettingDto({
                                            contactUsageSetting: vm.emergencyNumber1Display() ? 1 : 0,
                                            updatable: vm.emergencyNumber1Updatable() ? 1 : 0,
                                        }),
                                        emergencyNumber2: new ContactSettingDto({
                                            contactUsageSetting: vm.emergencyNumber2Display() ? 1 : 0,
                                            updatable: vm.emergencyNumber2Updatable() ? 1 : 0,
                                        }),
                                        extensionNumber: new ContactSettingDto({
                                            contactUsageSetting: vm.extensionNumberDisplay() ? 1 : 0,
                                            updatable: vm.extensionNumberUpdatable() ? 1 : 0,
                                        }),
                                        personalEmailAddress: new ContactSettingDto({
                                            contactUsageSetting: vm.personalEmailAddressDisplay() ? 1 : 0,
                                            updatable: vm.personalEmailAddressUpdatable() ? 1 : 0,
                                        }),
                                        personalMobileEmailAddress: new ContactSettingDto({
                                            contactUsageSetting: vm.personalMobileEmailAddressDisplay() ? 1 : 0,
                                            updatable: vm.personalMobileEmailAddressUpdatable() ? 1 : 0,
                                        }),
                                        personalMobilePhone: new ContactSettingDto({
                                            contactUsageSetting: vm.personalMobilePhoneDisplay() ? 1 : 0,
                                            updatable: vm.personalMobilePhoneUpdatable() ? 1 : 0,
                                        }),
                                        otherContacts: otherContactDtos,
                                    }),
                                    emailDestinationFunctionDtos: [
                                        new EmailDestinationFunctionDto({
                                            emailClassification: 0,
                                            functionIds: vm.emailData[0]
                                        }),
                                        new EmailDestinationFunctionDto({
                                            emailClassification: 1,
                                            functionIds: vm.emailData[1]
                                        }),
                                        new EmailDestinationFunctionDto({
                                            emailClassification: 2,
                                            functionIds: vm.emailData[2]
                                        }),
                                        new EmailDestinationFunctionDto({
                                            emailClassification: 3,
                                            functionIds: vm.emailData[3]
                                        }),
                                    ],
                                });
                            };
                            ScreenModel.prototype.getOtherContactDtos = function () {
                                var vm = this;
                                return [
                                    new OtherContactDto({
                                        no: 1,
                                        contactName: vm.contactName1(),
                                        contactUsageSetting: vm.otherContact1Display() ? 1 : 0,
                                    }),
                                    new OtherContactDto({
                                        no: 2,
                                        contactName: vm.contactName2(),
                                        contactUsageSetting: vm.otherContact2Display() ? 1 : 0,
                                    }),
                                    new OtherContactDto({
                                        no: 3,
                                        contactName: vm.contactName3(),
                                        contactUsageSetting: vm.otherContact3Display() ? 1 : 0,
                                    }),
                                    new OtherContactDto({
                                        no: 4,
                                        contactName: vm.contactName4(),
                                        contactUsageSetting: vm.otherContact4Display() ? 1 : 0,
                                    }),
                                    new OtherContactDto({
                                        no: 5,
                                        contactName: vm.contactName5(),
                                        contactUsageSetting: vm.otherContact5Display() ? 1 : 0,
                                    }),
                                ];
                            };
                            /**
                             * 新規登録する
                             * 変更登録する
                             */
                            ScreenModel.prototype.register = function () {
                                var _this = this;
                                var vm = this;
                                //fix bug #112907
                                vm.otherContact1Required(vm.otherContact1Display());
                                vm.otherContact2Required(vm.otherContact2Display());
                                vm.otherContact3Required(vm.otherContact3Display());
                                vm.otherContact4Required(vm.otherContact4Display());
                                vm.otherContact5Required(vm.otherContact5Display());
                                if (vm.profileSelectedId() === 2) {
                                    vm.otherContact1Required(false);
                                    vm.otherContact2Required(false);
                                    vm.otherContact3Required(false);
                                    vm.otherContact4Required(false);
                                    vm.otherContact5Required(false);
                                }
                                //fix bug #112907 end
                                // check error
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        vm.emailData[vm.selectedEmailClassification] = _.chain(vm.mailFunctionDataSource)
                                            .filter(function (item) { return item.isChecked; })
                                            .map(function (item) { return item.functionId; })
                                            .value();
                                        var userInformationUseMethodDto = vm.getUserInformationUseMethodDto(vm.getOtherContactDtos());
                                        var command = new UserInformationUseMethodSaveCommand({
                                            userInformationUseMethodDto: userInformationUseMethodDto,
                                        });
                                        vm.$blockui("grayout");
                                        vm.$ajax(API.insertOrUpdate, command)
                                            .then(function () {
                                            return vm.$dialog.info({ messageId: 'Msg_15' });
                                        })
                                            .always(function () {
                                            vm.$blockui("clear");
                                            _this.closeDialog();
                                        });
                                    }
                                });
                            };
                            ScreenModel = __decorate([
                                bean()
                            ], ScreenModel);
                            return ScreenModel;
                        }(ko.ViewModel));
                        a.ScreenModel = ScreenModel;
                        var CheckboxModel = /** @class */ (function () {
                            function CheckboxModel(init) {
                                $.extend(this, init);
                            }
                            return CheckboxModel;
                        }());
                        a.CheckboxModel = CheckboxModel;
                        var EmailModel = /** @class */ (function () {
                            function EmailModel(init) {
                                $.extend(this, init);
                            }
                            return EmailModel;
                        }());
                        a.EmailModel = EmailModel;
                        var UserInformationSettingDto = /** @class */ (function () {
                            function UserInformationSettingDto(init) {
                                $.extend(this, init);
                            }
                            return UserInformationSettingDto;
                        }());
                        a.UserInformationSettingDto = UserInformationSettingDto;
                        var UserInformationUseMethodDto = /** @class */ (function () {
                            function UserInformationUseMethodDto(init) {
                                $.extend(this, init);
                            }
                            return UserInformationUseMethodDto;
                        }());
                        a.UserInformationUseMethodDto = UserInformationUseMethodDto;
                        var MailFunctionModel = /** @class */ (function () {
                            function MailFunctionModel(init) {
                                $.extend(this, init);
                            }
                            return MailFunctionModel;
                        }());
                        a.MailFunctionModel = MailFunctionModel;
                        var EmailDestinationFunctionDto = /** @class */ (function () {
                            function EmailDestinationFunctionDto(init) {
                                $.extend(this, init);
                            }
                            return EmailDestinationFunctionDto;
                        }());
                        a.EmailDestinationFunctionDto = EmailDestinationFunctionDto;
                        var SettingContactInformationDto = /** @class */ (function () {
                            function SettingContactInformationDto(init) {
                                $.extend(this, init);
                            }
                            return SettingContactInformationDto;
                        }());
                        a.SettingContactInformationDto = SettingContactInformationDto;
                        var ContactSettingDto = /** @class */ (function () {
                            function ContactSettingDto(init) {
                                $.extend(this, init);
                            }
                            return ContactSettingDto;
                        }());
                        a.ContactSettingDto = ContactSettingDto;
                        var OtherContactDto = /** @class */ (function () {
                            function OtherContactDto(init) {
                                $.extend(this, init);
                            }
                            return OtherContactDto;
                        }());
                        a.OtherContactDto = OtherContactDto;
                        var MailFunctionData = /** @class */ (function () {
                            function MailFunctionData(init) {
                                $.extend(this, init);
                            }
                            return MailFunctionData;
                        }());
                        a.MailFunctionData = MailFunctionData;
                        var UserInformationUseMethodSaveCommand = /** @class */ (function () {
                            function UserInformationUseMethodSaveCommand(init) {
                                $.extend(this, init);
                            }
                            return UserInformationUseMethodSaveCommand;
                        }());
                        a.UserInformationUseMethodSaveCommand = UserInformationUseMethodSaveCommand;
                    })(a = cmm049.a || (cmm049.a = {}));
                })(cmm049 = view.cmm049 || (view.cmm049 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm049.a.vm.js.map