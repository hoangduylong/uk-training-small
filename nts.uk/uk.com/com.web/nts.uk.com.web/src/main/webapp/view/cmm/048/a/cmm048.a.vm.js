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
                var cmm048;
                (function (cmm048) {
                    var a;
                    (function (a) {
                        var API = {
                            find: "query/cmm048userinformation/find",
                            updateEmployeeContact: "ctx/bs/employee/data/management/contact/update",
                            updatePersonInformation: "ctx/bs/person/personal/information/update",
                            changeOwnLoginPassword: "ctx/sys/gateway/login/password/userpassword/changeOwn"
                        };
                        var ID_AVATAR_CHANGE = 'avatar-change';
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                //A
                                ////A4
                                _this.avatarFileId = ko.observable('');
                                ////A5
                                _this.businessName = ko.observable('');
                                ////A6
                                _this.empCode = ko.observable('');
                                _this.wkpDisplayName = ko.observable('');
                                _this.positionName = ko.observable('');
                                _this.hireDate = ko.observable('');
                                ////A7
                                _this.empContactPhone = ko.observable('');
                                _this.psContactPhone = ko.observable('');
                                _this.psContactEmergencyContact1Phone = ko.observable('');
                                _this.psContactEmergencyContact2Phone = ko.observable('');
                                _this.empContactSeatDialIn = ko.observable('');
                                _this.empContactSeatExtensionNum = ko.observable('');
                                _this.empContactMailAddr = ko.observable('');
                                _this.empContactMobileMailAddr = ko.observable('');
                                _this.psContactMailAddr = ko.observable('');
                                _this.psContactMobileMailAddr = ko.observable('');
                                ////A9
                                _this.ListOtherContact = ko.observableArray([]);
                                //B
                                _this.passChangeLog = ko.observable('');
                                _this.currentPassword = ko.observable('');
                                _this.newPassword = ko.observable('');
                                _this.confirmPassword = ko.observable('');
                                //// Password policy (B6)
                                _this.passPolicyLowestDigits = ko.observable('');
                                _this.passPolicyAlphabetDigit = ko.observable('');
                                _this.passPolicyNumberOfDigits = ko.observable('');
                                _this.passPolicySymbolCharacters = ko.observable('');
                                _this.passPolicyHistoryCount = ko.observable('');
                                _this.passPolicyValidityPeriod = ko.observable('');
                                //C 
                                _this.anniverNoticeDayOptions = ko.observableArray([
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_ZERO_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_ZERO_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_ONE_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_ONE_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_TWO_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_TWO_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_THREE_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_THREE_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_FOUR_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_FOUR_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_FIVE_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_FIVE_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_SIX_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_SIX_DAY') }),
                                    new ItemCbxModel({ code: REMIND_DATE.BEFORE_SEVEN_DAY, name: _this.$i18n('Enum_NoticeDay_BEFORE_SEVEN_DAY') })
                                ]);
                                _this.listAnniversary = ko.observableArray([]);
                                _this.monthDaysName = ko.observable(_this.$i18n('CMM048_58'));
                                //D
                                _this.language = ko.observable(0);
                                _this.languageOptions = ko.observableArray([
                                    new ItemCbxModel({ code: LANGUAGE.JAPANESE, name: _this.$i18n('Enum_Language_JAPANESE') }),
                                    new ItemCbxModel({ code: LANGUAGE.ENGLISH, name: _this.$i18n('Enum_Language_ENGLISH') }),
                                    new ItemCbxModel({ code: LANGUAGE.OTHER, name: _this.$i18n('Enum_Language_OTHER') })
                                ]);
                                //condition to show off
                                _this.isInCharge = ko.observable(false);
                                _this.cPhoneUseable = ko.observable(false);
                                _this.cPhoneUpdateable = ko.observable(false);
                                _this.psPhoneUseable = ko.observable(false);
                                _this.psPhoneUpdateable = ko.observable(false);
                                _this.emergencyNum1Useable = ko.observable(false);
                                _this.emergencyNum1Updateable = ko.observable(false);
                                _this.emergencyNum2Useable = ko.observable(false);
                                _this.emergencyNum2Updateable = ko.observable(false);
                                _this.dialInNumUseable = ko.observable(false);
                                _this.dialInNumUpdateable = ko.observable(false);
                                _this.extensionNumUseable = ko.observable(false);
                                _this.extensionNumUpdateable = ko.observable(false);
                                _this.cEmailAddrUseable = ko.observable(false);
                                _this.cEmailAddrUpdateable = ko.observable(false);
                                _this.psEmailAddrUseable = ko.observable(false);
                                _this.psEmailAddrUpdateable = ko.observable(false);
                                _this.cMobileEmailAddrUseable = ko.observable(false);
                                _this.cMobileEmailAddrUpdateable = ko.observable(false);
                                _this.psMobileEmailAddrUseable = ko.observable(false);
                                _this.psMobileEmailAddrUpdateable = ko.observable(false);
                                //general
                                _this.tabs = ko.observableArray([{
                                        id: 'tab-1',
                                        title: _this.generateTitleTab(_this.$i18n('CMM048_92'), 'setting'),
                                        content: '.tab-content-1',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true)
                                    },
                                    {
                                        id: 'tab-2',
                                        title: _this.generateTitleTab(_this.$i18n('CMM048_93'), 'security'),
                                        content: '.tab-content-2',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    },
                                    {
                                        id: 'tab-3',
                                        title: _this.generateTitleTab(_this.$i18n('CMM048_94'), 'notice'),
                                        content: '.tab-content-3',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    },
                                    {
                                        id: 'tab-4',
                                        title: _this.generateTitleTab(_this.$i18n('CMM048_95'), 'language'),
                                        content: '.tab-content-4',
                                        enable: ko.observable(true),
                                        visible: ko.observable(true),
                                    }]);
                                _this.selectedTab = ko.observable('tab-1');
                                //code
                                _this.companyId = ko.observable('');
                                _this.employeeId = ko.observable('');
                                _this.personId = ko.observable('');
                                //#113902
                                _this.isUseOfProfile = ko.observable(false);
                                _this.isUseOfPassword = ko.observable(false);
                                _this.isUseOfNotice = ko.observable(false);
                                _this.isUseOfLanguage = ko.observable(false);
                                //#113841
                                _this.passwordPolicyVisible = ko.observable(false);
                                _this.passPolicyLowestDigitsVisible = ko.observable(false);
                                _this.passPolicyDigitVisible = ko.observable(false);
                                _this.passPolicyAlphabetDigitVisible = ko.observable(false);
                                _this.passPolicyNumberOfDigitsVisible = ko.observable(false);
                                _this.passPolicySymbolCharactersVisible = ko.observable(true);
                                _this.passPolicyHistoryCountVisible = ko.observable(false);
                                _this.passPolicyValidityPeriodVisible = ko.observable(false);
                                return _this;
                            }
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                vm.init();
                            };
                            ViewModel.prototype.setDataTabA = function (data) {
                                var vm = this;
                                ////Handle avatar
                                vm.avatarFileId(data.userAvatar.fileId);
                                var businessName = data.person.personNameGroup.businessName;
                                var avatarFileId = data.userAvatar.fileId;
                                if (avatarFileId) {
                                    $("#".concat(ID_AVATAR_CHANGE))
                                        .append($("<img/>")
                                        .attr("alt", 'Avatar')
                                        .attr("class", 'avatar')
                                        .attr("id", 'A4_1')
                                        .attr("src", nts.uk.request.liveView(avatarFileId)));
                                }
                                else {
                                    $("#".concat(ID_AVATAR_CHANGE)).ready(function () {
                                        $("#".concat(ID_AVATAR_CHANGE)).append("<div class='avatar' id='A4_1_no_avatar'>".concat(businessName.replace(/\s/g, '').substring(0, 2), "</div>"));
                                    });
                                }
                                //set data
                                vm.businessName(businessName);
                                vm.empCode(data.employeeDataMngInfo.employeeCode);
                                vm.wkpDisplayName(data.wkpDisplayName);
                                vm.positionName(data.positionName);
                                vm.hireDate(data.hireDate);
                                vm.empContactPhone(data.employeeContact.cellPhoneNumber);
                                vm.psContactPhone(data.personalContact.phoneNumber);
                                vm.psContactEmergencyContact1Phone(data.personalContact.emergencyContact1.phoneNumber);
                                vm.psContactEmergencyContact2Phone(data.personalContact.emergencyContact2.phoneNumber);
                                vm.empContactSeatDialIn(data.employeeContact.seatDialIn);
                                vm.empContactSeatExtensionNum(data.employeeContact.seatExtensionNumber);
                                vm.empContactMailAddr(data.employeeContact.mailAddress);
                                vm.empContactMobileMailAddr(data.employeeContact.mobileMailAddress);
                                vm.psContactMailAddr(data.personalContact.mailAddress);
                                vm.psContactMobileMailAddr(data.personalContact.mobileEmailAddress);
                                //set list other contact
                                vm.setListOtherContact(data);
                            };
                            ViewModel.prototype.setListOtherContact = function (data) {
                                var vm = this;
                                var listOtherContactPs = data.personalContact.otherContacts;
                                var listOtherContactSetting = data.settingInformation.settingContactInformationDto.otherContacts;
                                var _loop_1 = function (i) {
                                    var otherContactSetting = _.find(listOtherContactSetting, function (contact) { return contact.no === i; });
                                    var otherContactPs = _.find(listOtherContactPs, function (contact) { return contact.otherContactNo === i; });
                                    vm.ListOtherContact.push(new OtherContactViewModel(i, vm.$i18n("CMM048_86", [otherContactSetting.contactName]), otherContactPs ? otherContactPs.address : '', otherContactSetting.contactUsageSetting === 1));
                                };
                                for (var i = 1; i < 6; i++) {
                                    _loop_1(i);
                                }
                            };
                            ViewModel.prototype.setDataTabB = function (data) {
                                var vm = this;
                                if (data.passwordChangeLog) {
                                    var today = moment().utc();
                                    var changePassDay = moment(data.passwordChangeLog.modifiedDate, 'YYYY/MM/DD HH:mm:ss').utc();
                                    var lastChangePass = moment.duration(today.diff(changePassDay)).humanize();
                                    if (!data.passwordPolicy.validityPeriod) {
                                        var cmm4897 = vm.$i18n('CMM048_97', [lastChangePass]);
                                        vm.passChangeLog(cmm4897);
                                    }
                                    else {
                                        var timeLeft = Math.round(data.passwordPolicy.validityPeriod - moment.duration(today.diff(changePassDay)).asDays());
                                        var cmm4899 = vm.$i18n('CMM048_99', [lastChangePass, String(timeLeft)]);
                                        vm.passChangeLog(cmm4899);
                                    }
                                }
                                else {
                                    vm.passChangeLog(vm.$i18n('CMM048_98'));
                                }
                                //validityPeriod
                                var lowestDigits = data.passwordPolicy.lowestDigits;
                                var alphabetDigit = data.passwordPolicy.alphabetDigit;
                                var numberOfDigits = data.passwordPolicy.numberOfDigits;
                                var symbolCharacters = data.passwordPolicy.symbolCharacters;
                                var historyCount = data.passwordPolicy.historyCount;
                                var validityPeriod = data.passwordPolicy.validityPeriod;
                                vm.passPolicyLowestDigits(vm.$i18n('CMM048_13', [String(lowestDigits)]));
                                vm.passPolicyAlphabetDigit(vm.$i18n('CMM048_15', [String(alphabetDigit)]));
                                vm.passPolicyNumberOfDigits(vm.$i18n('CMM048_16', [String(numberOfDigits)]));
                                vm.passPolicySymbolCharacters(vm.$i18n('CMM048_17', [String(symbolCharacters)]));
                                vm.passPolicyHistoryCount(vm.$i18n('CMM048_19', [String(historyCount)]));
                                vm.passPolicyValidityPeriod(vm.$i18n('CMM048_21', [String(validityPeriod)]));
                                //#113841
                                vm.passwordPolicyVisible(data.passwordPolicy.isUse);
                                vm.passPolicyLowestDigitsVisible(lowestDigits > 0);
                                vm.passPolicyDigitVisible((alphabetDigit > 0) || (numberOfDigits > 0) || (symbolCharacters > 0));
                                vm.passPolicyAlphabetDigitVisible(alphabetDigit > 0);
                                vm.passPolicyNumberOfDigitsVisible(numberOfDigits > 0);
                                vm.passPolicySymbolCharactersVisible(symbolCharacters > 0);
                                vm.passPolicyHistoryCountVisible(historyCount > 0);
                                vm.passPolicyValidityPeriodVisible(validityPeriod > 0);
                            };
                            ViewModel.prototype.setDataTabC = function (data) {
                                var vm = this;
                                if (data.anniversaryNotices.length !== 0) {
                                    var list_1 = [];
                                    _.map(data.anniversaryNotices, function (anniversary) {
                                        var newItem = new AnniversaryNotificationViewModel(anniversary.anniversary, anniversary.anniversaryTitle, anniversary.notificationMessage, anniversary.noticeDay);
                                        list_1.push(newItem);
                                    });
                                    vm.listAnniversary(list_1);
                                }
                                else {
                                    vm.listAnniversary.push(new AnniversaryNotificationViewModel("", "", "", 0));
                                }
                            };
                            ViewModel.prototype.setDataTabD = function (data) {
                                var vm = this;
                                vm.language(data.user.language);
                            };
                            ViewModel.prototype.setCondition = function (data) {
                                var vm = this;
                                vm.isInCharge(data.isInCharge);
                                vm.isUseOfProfile(data.settingInformation.useOfProfile === IS_USE.USE);
                                vm.isUseOfPassword(data.settingInformation.useOfPassword === IS_USE.USE);
                                vm.isUseOfNotice(data.settingInformation.useOfNotice === IS_USE.USE);
                                vm.isUseOfLanguage(data.settingInformation.useOfLanguage === IS_USE.USE);
                                var displaySetting = data.settingInformation.settingContactInformationDto;
                                vm.cPhoneUseable(displaySetting.companyMobilePhone.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.cPhoneUpdateable(displaySetting.companyMobilePhone.updatable === IS_USE.USE);
                                vm.psPhoneUseable(displaySetting.personalMobilePhone.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.psPhoneUpdateable(displaySetting.personalMobilePhone.updatable === IS_USE.USE);
                                vm.emergencyNum1Useable(displaySetting.emergencyNumber1.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.emergencyNum1Updateable(displaySetting.emergencyNumber1.updatable === IS_USE.USE);
                                vm.emergencyNum2Useable(displaySetting.emergencyNumber2.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.emergencyNum2Updateable(displaySetting.emergencyNumber2.updatable === IS_USE.USE);
                                vm.dialInNumUseable(displaySetting.dialInNumber.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.dialInNumUpdateable(displaySetting.dialInNumber.updatable === IS_USE.USE);
                                vm.extensionNumUseable(displaySetting.extensionNumber.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.extensionNumUpdateable(displaySetting.extensionNumber.updatable === IS_USE.USE);
                                vm.cEmailAddrUseable(displaySetting.companyEmailAddress.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.cEmailAddrUpdateable(displaySetting.companyEmailAddress.updatable === IS_USE.USE);
                                vm.psEmailAddrUseable(displaySetting.personalEmailAddress.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.psEmailAddrUpdateable(displaySetting.personalEmailAddress.updatable === IS_USE.USE);
                                vm.cMobileEmailAddrUseable(displaySetting.companyMobileEmailAddress.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.cMobileEmailAddrUpdateable(displaySetting.companyMobileEmailAddress.updatable === IS_USE.USE);
                                vm.psMobileEmailAddrUseable(displaySetting.personalMobileEmailAddress.contactUsageSetting !== CONTACT_USAGE.DO_NOT_USE);
                                vm.psMobileEmailAddrUpdateable(displaySetting.personalMobileEmailAddress.updatable === IS_USE.USE);
                                //Make tab visible
                                _.map(vm.tabs(), function (tab) {
                                    switch (tab.id) {
                                        case 'tab-1':
                                            tab.enable(vm.isUseOfProfile());
                                            tab.visible(vm.isUseOfProfile());
                                            break;
                                        case 'tab-2':
                                            tab.enable(vm.isUseOfPassword());
                                            tab.visible(vm.isUseOfPassword());
                                            break;
                                        case 'tab-3':
                                            tab.enable(vm.isUseOfNotice());
                                            tab.visible(vm.isUseOfNotice());
                                            break;
                                        case 'tab-4':
                                            tab.enable(vm.isUseOfLanguage());
                                            tab.visible(vm.isUseOfLanguage());
                                            break;
                                        default: break;
                                    }
                                });
                                if (vm.isUseOfProfile()) {
                                    vm.selectedTab('tab-1');
                                }
                                else if (vm.isUseOfPassword()) {
                                    vm.selectedTab('tab-2');
                                }
                                else if (vm.isUseOfNotice()) {
                                    vm.selectedTab('tab-3');
                                }
                                else {
                                    vm.selectedTab('tab-4');
                                }
                            };
                            ViewModel.prototype.init = function () {
                                var vm = this;
                                //make empty
                                vm.currentPassword("");
                                vm.newPassword("");
                                vm.confirmPassword("");
                                vm.listAnniversary([]);
                                vm.ListOtherContact([]);
                                //clear error
                                vm.$errors('clear');
                                //data binding
                                vm.$blockui('grayout');
                                vm.$ajax(API.find).then(function (data) {
                                    $('#master-content').css({ 'display': '' });
                                    //set code
                                    vm.companyId(data.employeeDataMngInfo.companyId);
                                    vm.employeeId(data.employeeDataMngInfo.employeeId);
                                    vm.personId(data.employeeDataMngInfo.personId);
                                    //set data for tab A
                                    vm.setDataTabA(data);
                                    //set data for tab B
                                    vm.setDataTabB(data);
                                    //set data for tab C
                                    vm.setDataTabC(data);
                                    //set data for tab D
                                    vm.setDataTabD(data);
                                    //condition to show off
                                    vm.setCondition(data);
                                })
                                    .fail(function (error) {
                                    vm.$blockui('clear');
                                    $('#master-content').css({ 'display': 'none' });
                                    if (error.messageId === "Msg_1775") {
                                        vm.$dialog.error(error).then(function () {
                                            vm.openDialogCmm049();
                                        });
                                    }
                                    else if (error.messageId === "Msg_1774") {
                                        vm.$dialog.error(error).then(function () {
                                            vm.$jump("/view/ccg/008/a/index.xhtml");
                                        });
                                    }
                                })
                                    .always(function () {
                                    vm.$blockui('clear');
                                });
                            };
                            ViewModel.prototype.generateTitleTab = function (rsCode, icon) {
                                return ("<span>\n          <img class=\"tab-icon\" src=\"./resource/".concat(icon, ".png\" />\n          <span>").concat(rsCode, "</span>\n        </span>"));
                            };
                            ViewModel.prototype.openDialogE = function () {
                                var vm = this;
                                vm.$window.modal("/view/cmm/048/e/index.xhtml", vm.avatarFileId()).then(function (fileId) {
                                    if (fileId) {
                                        vm.avatarFileId(fileId);
                                        $("#".concat(ID_AVATAR_CHANGE)).html("").ready(function () {
                                            $("#".concat(ID_AVATAR_CHANGE)).append($("<img/>")
                                                .attr("alt", 'Avatar')
                                                .attr("class", 'avatar')
                                                .attr("id", 'A4_1')
                                                .attr("src", nts.uk.request.liveView(vm.avatarFileId())));
                                        });
                                    }
                                });
                            };
                            ViewModel.prototype.openDialogCmm049 = function () {
                                var vm = this;
                                vm.$window.modal("/view/cmm/049/a/index.xhtml").then(function () {
                                    $("#".concat(ID_AVATAR_CHANGE)).html("");
                                    vm.init();
                                });
                            };
                            ViewModel.prototype.addNewAnniversary = function () {
                                var vm = this;
                                vm.listAnniversary.push(new AnniversaryNotificationViewModel("", "", "", 0));
                            };
                            ViewModel.prototype.removeAnniversary = function (anniversary, index) {
                                var vm = this;
                                $("#month-day-".concat(index)).ntsError('clear');
                                $("#anniversary-title-".concat(index)).ntsError('clear');
                                $("#notification-message-".concat(index)).ntsError('clear');
                                vm.listAnniversary.remove(anniversary);
                            };
                            ViewModel.prototype.getUserCommand = function () {
                                var vm = this;
                                return new UserCommand({
                                    currentPassword: vm.currentPassword(),
                                    newPassword: vm.newPassword(),
                                    confirmPassword: vm.confirmPassword(),
                                    language: vm.language()
                                });
                            };
                            ViewModel.prototype.getUserAvatarCommand = function () {
                                var vm = this;
                                return new UserAvatarCommand({
                                    personalId: vm.personId(),
                                    fileId: vm.avatarFileId()
                                });
                            };
                            ViewModel.prototype.getAnniversaryNoticeCommandList = function () {
                                var vm = this;
                                var list = [];
                                _.map(vm.listAnniversary(), function (item) {
                                    var anniversary = String(item.anniversaryDay());
                                    //handle monthDay
                                    if (Number(anniversary) < 1000) {
                                        anniversary = '0' + anniversary;
                                    }
                                    if (anniversary.length === 4) {
                                        list.push(new AnniversaryNoticeCommand({
                                            personalId: vm.personId(),
                                            noticeDay: item.anniversaryNoticeBefore(),
                                            anniversary: anniversary,
                                            anniversaryTitle: item.anniversaryName(),
                                            notificationMessage: item.anniversaryRemark(),
                                        }));
                                    }
                                });
                                return list;
                            };
                            ViewModel.prototype.getPersonalContactCommand = function () {
                                var vm = this;
                                var list = [];
                                _.map(vm.ListOtherContact(), function (contact) {
                                    list.push(new OtherContactCommand({
                                        otherContactNo: contact.contactNo,
                                        address: contact.contactAdress()
                                    }));
                                });
                                return new PersonalContactCommand({
                                    personalId: vm.personId(),
                                    mailAddress: vm.psContactMailAddr(),
                                    mobileEmailAddress: vm.psContactMobileMailAddr(),
                                    phoneNumber: vm.psContactPhone(),
                                    emergencyContact1: new EmergencyContactCommand({
                                        phoneNumber: vm.psContactEmergencyContact1Phone()
                                    }),
                                    emergencyContact2: new EmergencyContactCommand({
                                        phoneNumber: vm.psContactEmergencyContact2Phone()
                                    }),
                                    otherContacts: list,
                                });
                            };
                            ViewModel.prototype.getEmployeeContactCommand = function () {
                                var vm = this;
                                return new EmployeeContactCommand({
                                    employeeId: vm.employeeId(),
                                    mailAddress: vm.empContactMailAddr(),
                                    seatDialIn: vm.empContactSeatDialIn(),
                                    seatExtensionNumber: vm.empContactSeatExtensionNum(),
                                    mobileMailAddress: vm.empContactMobileMailAddr(),
                                    cellPhoneNumber: vm.empContactPhone(),
                                });
                            };
                            ViewModel.prototype.validateAnniversary = function (item, index) {
                                var vm = this;
                                var checkEmptyAnniver = false;
                                //「月・日・タイトル・内容」は１件以上が入力しました場合、他の件も入力しなければならない
                                if (Number(item.anniversaryDay()) !== 0 || (Number(item.anniversaryDay()) % 100 !== 0) || !(_.isEmpty(item.anniversaryName())) || !(_.isEmpty(item.anniversaryRemark()))) {
                                    if (Number(item.anniversaryDay()) % 100 === 0) {
                                        $("#month-day-".concat(index)).trigger('validate');
                                        checkEmptyAnniver = true;
                                    }
                                    if (_.isEmpty(item.anniversaryName())) {
                                        $("#anniversary-title-".concat(index)).ntsError('set', { messageId: "MsgB_1", messageParams: [vm.$i18n('CMM048_59')] });
                                        checkEmptyAnniver = true;
                                    }
                                    if (_.isEmpty(item.anniversaryRemark())) {
                                        $("#notification-message-".concat(index)).ntsError('set', { messageId: "MsgB_1", messageParams: [vm.$i18n('CMM048_74')] });
                                        checkEmptyAnniver = true;
                                    }
                                }
                                return checkEmptyAnniver;
                            };
                            ViewModel.prototype.getMonthDayJapanText = function (monthDay) {
                                var anniverDay = Number(monthDay);
                                var month = Math.floor(anniverDay / 100);
                                var day = anniverDay % 100;
                                return String(month + '月' + day + '日');
                            };
                            ViewModel.prototype.save = function () {
                                var vm = this;
                                vm.$validate().then(function (valid) {
                                    if (valid) {
                                        //fix bug #115144 start
                                        var handleDuplicateAnniver = _.groupBy(vm.listAnniversary(), function (item) { return item.anniversaryDay(); });
                                        var listAnniverError = [];
                                        for (var annivers in handleDuplicateAnniver) {
                                            if (handleDuplicateAnniver[annivers].length > 1) {
                                                listAnniverError.push(vm.getMonthDayJapanText(annivers));
                                            }
                                        }
                                        if (!_.isEmpty(listAnniverError)) {
                                            return vm.$dialog.error({ messageId: 'Msg_2156', messageParams: [listAnniverError.join('\n')] });
                                        }
                                        //fix bug #115144 end
                                        //fix bug #114058 start
                                        if (vm.isUseOfNotice()) {
                                            var checkEmptyAnniver_1 = false;
                                            _.map(vm.listAnniversary(), function (item, index) {
                                                var check = vm.validateAnniversary(item, index);
                                                if (check)
                                                    checkEmptyAnniver_1 = true;
                                            });
                                            if (checkEmptyAnniver_1)
                                                return;
                                        }
                                        //fix bug #114058 end
                                        var userChange = vm.getUserCommand();
                                        var avatar = vm.getUserAvatarCommand();
                                        var listAnniversary = vm.getAnniversaryNoticeCommandList();
                                        var personalContact = vm.getPersonalContactCommand();
                                        var employeeContact = vm.getEmployeeContactCommand();
                                        var personalCommand = new PersonalCommand({
                                            avatar: avatar,
                                            anniversaryNotices: listAnniversary,
                                            personalContact: personalContact,
                                            useOfProfile: vm.isUseOfProfile(),
                                            useOfNotice: vm.isUseOfNotice()
                                        });
                                        var contactCommand = new ContactCommand({
                                            employeeContact: employeeContact,
                                            useOfProfile: vm.isUseOfProfile()
                                        });
                                        var changeOwnLoginPasswordCommand = new ChangeOwnLoginPasswordCommand({
                                            currentPassword: vm.currentPassword(),
                                            newPassword: vm.newPassword(),
                                            confirmPassword: vm.confirmPassword(),
                                        });
                                        vm.$blockui('grayout');
                                        $.when(vm.$ajax(API.updateEmployeeContact, contactCommand), vm.$ajax(API.updatePersonInformation, personalCommand), vm.changeOwnLoginPassword(changeOwnLoginPasswordCommand)).then(function () {
                                            vm.$blockui('clear');
                                            vm.$dialog.info({ messageId: 'Msg_15' });
                                        }).fail(function (error) {
                                            vm.$blockui('clear');
                                            vm.$dialog.error(error);
                                        })
                                            .always(function () { return vm.$blockui('clear'); });
                                    }
                                });
                            };
                            ViewModel.prototype.changeOwnLoginPassword = function (command) {
                                var vm = this;
                                if (vm.isUseOfPassword() && (!nts.uk.text.isNullOrEmpty(command.newPassword) || !nts.uk.text.isNullOrEmpty(command.confirmPassword))) {
                                    return vm.$ajax(API.changeOwnLoginPassword, command);
                                }
                            };
                            ViewModel = __decorate([
                                bean()
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        a.ViewModel = ViewModel;
                        var LANGUAGE;
                        (function (LANGUAGE) {
                            /**
                           * 日本語
                           */
                            LANGUAGE[LANGUAGE["JAPANESE"] = 0] = "JAPANESE";
                            /**
                             * 英語
                             */
                            LANGUAGE[LANGUAGE["ENGLISH"] = 1] = "ENGLISH";
                            /**
                            * その他
                            */
                            LANGUAGE[LANGUAGE["OTHER"] = 2] = "OTHER";
                        })(LANGUAGE || (LANGUAGE = {}));
                        var REMIND_DATE;
                        (function (REMIND_DATE) {
                            //０：当日
                            REMIND_DATE[REMIND_DATE["BEFORE_ZERO_DAY"] = 0] = "BEFORE_ZERO_DAY";
                            //１：1日前
                            REMIND_DATE[REMIND_DATE["BEFORE_ONE_DAY"] = 1] = "BEFORE_ONE_DAY";
                            //２：2日前
                            REMIND_DATE[REMIND_DATE["BEFORE_TWO_DAY"] = 2] = "BEFORE_TWO_DAY";
                            //３：3日前
                            REMIND_DATE[REMIND_DATE["BEFORE_THREE_DAY"] = 3] = "BEFORE_THREE_DAY";
                            //４：4日前
                            REMIND_DATE[REMIND_DATE["BEFORE_FOUR_DAY"] = 4] = "BEFORE_FOUR_DAY";
                            //５：5日前
                            REMIND_DATE[REMIND_DATE["BEFORE_FIVE_DAY"] = 5] = "BEFORE_FIVE_DAY";
                            //６：6日前
                            REMIND_DATE[REMIND_DATE["BEFORE_SIX_DAY"] = 6] = "BEFORE_SIX_DAY";
                            //７：7日前
                            REMIND_DATE[REMIND_DATE["BEFORE_SEVEN_DAY"] = 7] = "BEFORE_SEVEN_DAY";
                        })(REMIND_DATE || (REMIND_DATE = {}));
                        var CONTACT_USAGE;
                        (function (CONTACT_USAGE) {
                            // 利用しない
                            CONTACT_USAGE[CONTACT_USAGE["DO_NOT_USE"] = 0] = "DO_NOT_USE";
                            // 利用する
                            CONTACT_USAGE[CONTACT_USAGE["USE"] = 1] = "USE";
                        })(CONTACT_USAGE || (CONTACT_USAGE = {}));
                        var IS_USE;
                        (function (IS_USE) {
                            IS_USE[IS_USE["NOT_USE"] = 0] = "NOT_USE";
                            IS_USE[IS_USE["USE"] = 1] = "USE";
                        })(IS_USE || (IS_USE = {}));
                        var DELETE_STATUS;
                        (function (DELETE_STATUS) {
                            /** 0 - 削除していない **/
                            DELETE_STATUS[DELETE_STATUS["NOTDELETED"] = 0] = "NOTDELETED";
                            /** 1 - 一時削除 **/
                            DELETE_STATUS[DELETE_STATUS["TEMPDELETED"] = 1] = "TEMPDELETED";
                            /** 2 - 完全削除 **/
                            DELETE_STATUS[DELETE_STATUS["PURGEDELETED"] = 2] = "PURGEDELETED";
                        })(DELETE_STATUS || (DELETE_STATUS = {}));
                        var BLOOD_TYPE;
                        (function (BLOOD_TYPE) {
                            /* O RH+ */
                            BLOOD_TYPE[BLOOD_TYPE["ORhPlus"] = 3] = "ORhPlus";
                            /* O RH- */
                            BLOOD_TYPE[BLOOD_TYPE["ORhSub"] = 7] = "ORhSub";
                            /* A RH+ */
                            BLOOD_TYPE[BLOOD_TYPE["ARhPlus"] = 1] = "ARhPlus";
                            /* A RH- */
                            BLOOD_TYPE[BLOOD_TYPE["ARhSub"] = 5] = "ARhSub";
                            /* B RH+ */
                            BLOOD_TYPE[BLOOD_TYPE["BRhPlus"] = 2] = "BRhPlus";
                            /* B RH- */
                            BLOOD_TYPE[BLOOD_TYPE["BRhSub"] = 6] = "BRhSub";
                            /* AB RH+ */
                            BLOOD_TYPE[BLOOD_TYPE["ABRhPlus"] = 4] = "ABRhPlus";
                            /* AB RH- */
                            BLOOD_TYPE[BLOOD_TYPE["ABRhSub"] = 8] = "ABRhSub";
                        })(BLOOD_TYPE || (BLOOD_TYPE = {}));
                        var GENDER;
                        (function (GENDER) {
                            /* 男 */
                            GENDER[GENDER["Male"] = 1] = "Male";
                            /* 女 */
                            GENDER[GENDER["Female"] = 2] = "Female";
                        })(GENDER || (GENDER = {}));
                        var DISABLED_SEGMENT;
                        (function (DISABLED_SEGMENT) {
                            DISABLED_SEGMENT[DISABLED_SEGMENT["FALSE"] = 0] = "FALSE";
                            DISABLED_SEGMENT[DISABLED_SEGMENT["TRUE"] = 1] = "TRUE"; // あり
                        })(DISABLED_SEGMENT || (DISABLED_SEGMENT = {}));
                        var PASSWORD_STATUS;
                        (function (PASSWORD_STATUS) {
                            /** 正式 */
                            PASSWORD_STATUS[PASSWORD_STATUS["Official"] = 0] = "Official";
                            /** 初期パスワード */
                            PASSWORD_STATUS[PASSWORD_STATUS["InitPasswor"] = 1] = "InitPasswor";
                            /** リセット */
                            PASSWORD_STATUS[PASSWORD_STATUS["Reset"] = 2] = "Reset";
                        })(PASSWORD_STATUS || (PASSWORD_STATUS = {}));
                        var EMAIL_CLASSIFICATION;
                        (function (EMAIL_CLASSIFICATION) {
                            /**
                           * 会社メールアドレス
                           */
                            EMAIL_CLASSIFICATION[EMAIL_CLASSIFICATION["COMPANY_EMAIL_ADDRESS"] = 0] = "COMPANY_EMAIL_ADDRESS";
                            /**
                             * 会社携帯メールアドレス
                             */
                            EMAIL_CLASSIFICATION[EMAIL_CLASSIFICATION["COMPANY_MOBILE_EMAIL_ADDRESS"] = 1] = "COMPANY_MOBILE_EMAIL_ADDRESS";
                            /**
                             * 個人メールアドレス
                             */
                            EMAIL_CLASSIFICATION[EMAIL_CLASSIFICATION["PERSONAL_EMAIL_ADDRESS"] = 2] = "PERSONAL_EMAIL_ADDRESS";
                            /**
                             * 個人携帯メールアドレス
                             */
                            EMAIL_CLASSIFICATION[EMAIL_CLASSIFICATION["PERSONAL_MOBILE_EMAIL_ADDRESS"] = 3] = "PERSONAL_MOBILE_EMAIL_ADDRESS";
                        })(EMAIL_CLASSIFICATION || (EMAIL_CLASSIFICATION = {}));
                        var ItemCbxModel = /** @class */ (function () {
                            function ItemCbxModel(init) {
                                $.extend(this, init);
                            }
                            return ItemCbxModel;
                        }());
                        var AnniversaryNotificationViewModel = /** @class */ (function () {
                            function AnniversaryNotificationViewModel(anniversaryDay, anniversaryName, anniversaryRemark, anniversaryNoticeBefore) {
                                this.anniversaryDay = ko.observable(anniversaryDay);
                                this.anniversaryName = ko.observable(anniversaryName);
                                this.anniversaryRemark = ko.observable(anniversaryRemark);
                                this.anniversaryNoticeBefore = ko.observable(anniversaryNoticeBefore);
                            }
                            return AnniversaryNotificationViewModel;
                        }());
                        var OtherContactViewModel = /** @class */ (function () {
                            function OtherContactViewModel(contactNo, contactName, contactAdress, contactUsage) {
                                this.contactNo = contactNo;
                                this.contactName = contactName;
                                this.contactAdress = ko.observable(contactAdress);
                                this.contactUsage = contactUsage;
                            }
                            return OtherContactViewModel;
                        }());
                        /**
                          * Command ユーザーのログインパスワードを変更する
                          */
                        var ChangeOwnLoginPasswordCommand = /** @class */ (function () {
                            function ChangeOwnLoginPasswordCommand(init) {
                                $.extend(this, init);
                            }
                            return ChangeOwnLoginPasswordCommand;
                        }());
                        /**
                         * Command アカウント情報を登録する
                         */
                        var ContactCommand = /** @class */ (function () {
                            function ContactCommand(init) {
                                $.extend(this, init);
                            }
                            return ContactCommand;
                        }());
                        /**
                         * Command アカウント情報を登録する
                         */
                        var PersonalCommand = /** @class */ (function () {
                            function PersonalCommand(init) {
                                $.extend(this, init);
                            }
                            return PersonalCommand;
                        }());
                        /**
                         * Command dto ユーザ
                         */
                        var UserCommand = /** @class */ (function () {
                            function UserCommand(init) {
                                $.extend(this, init);
                            }
                            return UserCommand;
                        }());
                        /**
                         * Command dto 個人の顔写真
                         */
                        var UserAvatarCommand = /** @class */ (function () {
                            function UserAvatarCommand(init) {
                                $.extend(this, init);
                            }
                            return UserAvatarCommand;
                        }());
                        /**
                         * Command dto 個人の記念日情報
                         */
                        var AnniversaryNoticeCommand = /** @class */ (function () {
                            function AnniversaryNoticeCommand(init) {
                                $.extend(this, init);
                            }
                            return AnniversaryNoticeCommand;
                        }());
                        /**
                         * Command dto 個人連絡先
                         */
                        var OtherContactCommand = /** @class */ (function () {
                            function OtherContactCommand(init) {
                                $.extend(this, init);
                            }
                            return OtherContactCommand;
                        }());
                        /**
                         * Command dto 社員連絡先
                         */
                        var EmployeeContactCommand = /** @class */ (function () {
                            function EmployeeContactCommand(init) {
                                $.extend(this, init);
                            }
                            return EmployeeContactCommand;
                        }());
                        /**
                         * Command dto 個人連絡先
                         */
                        var PersonalContactCommand = /** @class */ (function () {
                            function PersonalContactCommand(init) {
                                $.extend(this, init);
                            }
                            return PersonalContactCommand;
                        }());
                        /**
                       * Command dto 個人連絡先
                       */
                        var EmergencyContactCommand = /** @class */ (function () {
                            function EmergencyContactCommand(init) {
                                $.extend(this, init);
                            }
                            return EmergencyContactCommand;
                        }());
                    })(a = cmm048.a || (cmm048.a = {}));
                })(cmm048 = view.cmm048 || (view.cmm048 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm048.a.vm.js.map