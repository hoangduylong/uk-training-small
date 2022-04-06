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
                var ccg005;
                (function (ccg005) {
                    var a;
                    (function (a) {
                        var screenModel;
                        (function (screenModel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var API = {
                                getDisplayAttendanceData: 'screen/com/ccg005/get-display-attendance-data',
                                getDisplayInfoAfterSelect: 'screen/com/ccg005/get-information-after-select',
                                getAttendanceInformation: 'screen/com/ccg005/get-attendance-information',
                                searchForEmployee: 'screen/com/ccg005/get-employee-search',
                                saveFavorite: 'ctx/office/favorite/save',
                                registerComment: 'ctx/office/comment/register',
                                deleteComment: 'ctx/office/comment/delete',
                                saveStatus: 'ctx/office/status/save'
                            };
                            var ID_AVATAR_CHANGE = 'ccg005-avatar-change';
                            var ViewModel = /** @class */ (function (_super) {
                                __extends(ViewModel, _super);
                                function ViewModel() {
                                    var _this = _super !== null && _super.apply(this, arguments) || this;
                                    _this.widget = 'CCG_005';
                                    _this.selectedDate = ko.observable('');
                                    _this.legendOptions = {
                                        items: [
                                            { cssClass: { className: 'bg-white-ccg005', colorPropertyName: 'background-color' }, labelText: _this.$i18n('CCG005_26') },
                                            { cssClass: { className: 'bg-green-ccg005', colorPropertyName: 'background-color' }, labelText: _this.$i18n('CCG005_22') },
                                            { cssClass: { className: 'bg-yellow-ccg005', colorPropertyName: 'background-color' }, labelText: _this.$i18n('CCG005_39') },
                                            { cssClass: { className: 'bg-gray-ccg005', colorPropertyName: 'background-color' }, labelText: _this.$i18n('CCG005_40') } // A2_1.4
                                        ]
                                    };
                                    _this.contentSelections = ko.observableArray([
                                        { code: 0, name: _this.$i18n('CCG005_37') },
                                        { code: 1, name: _this.$i18n('CCG005_38') }
                                    ]);
                                    _this.contentSelected = ko.observable(0);
                                    _this.commentDisplay = ko.computed(function () { return _this.contentSelected() === 0; });
                                    _this.goOutDisplay = ko.computed(function () { return _this.contentSelected() === 1; });
                                    _this.favoriteInputDate = ko.observable(null);
                                    _this.searchValue = ko.observable('');
                                    _this.workplaceNameFromCDL008 = ko.observable('');
                                    // Pagination
                                    _this.currentPage = ko.observable(1);
                                    _this.perPage = ko.observable(1);
                                    _this.totalElement = ko.observable(0);
                                    _this.totalRow = ko.computed(function () {
                                        return _this.perPage() * _this.currentPage() > _this.totalElement()
                                            ? _this.totalElement() - _this.perPage() * (_this.currentPage() - 1)
                                            : _this.perPage();
                                    });
                                    _this.startPage = ko.computed(function () { return _this.perPage() * (_this.currentPage() - 1) + 1; });
                                    _this.endPage = ko.computed(function () { return _this.startPage() + _this.totalRow() - 1; });
                                    _this.paginationText = ko.computed(function () {
                                        return ((_this.totalElement() === 0) ? '0-0/0' : ("".concat(_this.startPage(), "-").concat(_this.endPage(), "/").concat(_this.totalElement())));
                                    });
                                    // End pagination
                                    _this.activityStatus = ko.observable();
                                    _this.activatedStatus = ko.observable();
                                    _this.activityStatusIcon = ko.computed(function () { return _this.initActivityStatus(_this.activityStatus()); });
                                    _this.businessName = ko.observable('');
                                    _this.originalComment = ko.observable('');
                                    _this.comment = ko.observable('');
                                    _this.commentDate = ko.observable('');
                                    _this.avatarPath = ko.observable('');
                                    _this.visibleNotPresent = ko.computed(function () { return _this.activatedStatus() === StatusClassfication.NOT_PRESENT; });
                                    _this.visiblePresent = ko.computed(function () { return _this.activatedStatus() === StatusClassfication.PRESENT; });
                                    _this.visibleGoOut = ko.computed(function () { return _this.activatedStatus() === StatusClassfication.GO_OUT; });
                                    _this.visibleGoHome = ko.computed(function () { return _this.activatedStatus() === StatusClassfication.GO_HOME; });
                                    _this.visibleHoliday = ko.computed(function () { return _this.activatedStatus() === StatusClassfication.HOLIDAY; });
                                    _this.favoriteSpecifyData = ko.observableArray([]);
                                    _this.emojiUsage = ko.observable(false);
                                    _this.isBaseDate = ko.observable(true);
                                    _this.isSameOrBeforeBaseDate = ko.observable(true);
                                    _this.isAfter = ko.observable(false);
                                    _this.inCharge = ko.observable(true);
                                    _this.workplaceFromCDL008 = ko.observableArray([]);
                                    _this.employeeIdList = ko.observableArray([]);
                                    _this.personalIdList = ko.observableArray([]);
                                    _this.attendanceInformationDtos = ko.observableArray([]);
                                    _this.attendanceInformationDtosDisplay = ko.observableArray([]);
                                    // attendanceInformationDtosDisplayClone: KnockoutObservableArray<AttendanceInformationViewModel> = ko.observableArray([]);
                                    _this.listPersonalInfo = ko.observableArray([]);
                                    //data for screen E
                                    _this.goOutParams = ko.observable();
                                    _this.sIdUpdateStatus = ko.observable('');
                                    _this.indexUpdateItem = ko.observable();
                                    //Application name
                                    _this.applicationNameInfo = ko.observableArray([]);
                                    _this.applicationNameDisplay = ko.observableArray([]);
                                    _this.applicationNameDisplayBySid = ko.observableArray([]);
                                    _this.loginSid = __viewContext.user.employeeId;
                                    //current selected index of loop
                                    _this.currentIndex = ko.observable(-1);
                                    return _this;
                                }
                                ViewModel.prototype.mounted = function () {
                                    var vm = this;
                                    var reloadAvatar;
                                    $('#ccg005-legends').click(function () {
                                        $('.nts-legendbutton-panel').css('padding', '5px 10px');
                                        $('.legend-item-symbol').first().css('border', '1px groove').height(16).width(16);
                                        $('.legend-item').css('margin-bottom', '5px');
                                    });
                                    vm.selectedDate(moment().format('YYYYMMDD'));
                                    vm.toStartScreen();
                                    vm.initResizeable(vm);
                                    vm.initPopupArea();
                                    vm.initPopupStatus();
                                    vm.initChangeFavorite();
                                    vm.initFocusA1_4();
                                    vm.initChangeSelectedDate();
                                    vm.perPage.subscribe(function (val) {
                                        vm.resetPagination();
                                        vm.getAttendanceData(); // #116839
                                        // if(val > vm.attendanceInformationDtosDisplayClone().length) {
                                        //   vm.getAttendanceData(); 
                                        // }
                                        // vm.attendanceInformationDtosDisplay(_.slice(vm.attendanceInformationDtosDisplayClone(), vm.startPage() - 1, vm.endPage()));
                                    });
                                    vm.attendanceInformationDtosDisplay.subscribe(function () {
                                        clearTimeout(reloadAvatar);
                                        reloadAvatar = setTimeout(function () { vm.bindingLoopData(); }, 1);
                                    });
                                    ko.bindingHandlers.ntsIcon.init($('.ccg005-status-img-A1_7'), function () { return ({ no: vm.activityStatusIcon(), width: 20, height: 20 }); });
                                    //focus
                                    $("#ccg005-selected-date").focus();
                                };
                                ViewModel.prototype.toStartScreen = function () {
                                    var vm = this;
                                    //set characteristic
                                    vm.restoreCharacteristic().then(function (inputDate) {
                                        vm.$blockui('show');
                                        vm.$ajax('com', API.getDisplayAttendanceData).then(function (response) {
                                            vm.emojiUsage(!!response.emojiUsage);
                                            // A1_2 表示初期の在席データDTO.自分のビジネスネーム
                                            vm.businessName(response.bussinessName);
                                            vm.favoriteSpecifyData(response.favoriteSpecifyDto);
                                            vm.inCharge(response.inCharge);
                                            if (response && response.attendanceInformationDtos) {
                                                vm.updateLoginData(response.attendanceInformationDtos);
                                                if (_.isEmpty(vm.favoriteSpecifyData())) {
                                                    vm.createdDefaultFavorite();
                                                }
                                            }
                                            vm.currentPage(1);
                                            //get application name info
                                            vm.applicationNameInfo(response.applicationNameDtos);
                                            //set characteristic
                                            if (inputDate) {
                                                vm.favoriteInputDate(inputDate);
                                            }
                                            else {
                                                vm.favoriteInputDate(vm.favoriteSpecifyData()[0].inputDate);
                                            }
                                        }).always(function () { return vm.$blockui('clear'); });
                                    });
                                };
                                /**
                                 * 日付を更新する時
                                 */
                                ViewModel.prototype.initChangeSelectedDate = function () {
                                    var vm = this;
                                    vm.selectedDate.subscribe(function () {
                                        //fix bug #115338 
                                        if (nts.uk.ui.errors.getErrorByElement($("#ccg005-selected-date")).length != 0) {
                                            return;
                                        }
                                        var selectedDate = moment(vm.selectedDate()).startOf("day");
                                        var baseDate = moment().startOf("day");
                                        vm.isSameOrBeforeBaseDate(selectedDate.isSameOrBefore(baseDate));
                                        vm.isAfter(selectedDate.isAfter(baseDate));
                                        vm.isBaseDate(selectedDate.isSame(baseDate));
                                        // パラメータ「在席情報を取得」
                                        vm.dataToDisplay();
                                    });
                                };
                                /**
                                 * お気に入りを選択する時
                                 */
                                ViewModel.prototype.initChangeFavorite = function () {
                                    var vm = this;
                                    vm.favoriteInputDate.subscribe(function (newVal) {
                                        if (newVal) {
                                            vm.saveCharacteristic(newVal);
                                            vm.subscribeFavorite();
                                        }
                                    });
                                };
                                ViewModel.prototype.initEmojiType = function (emojiType) {
                                    switch (emojiType) {
                                        case EmojiType.WEARY: return Emoji.WEARY;
                                        case EmojiType.SAD: return Emoji.SAD;
                                        case EmojiType.AVERAGE: return Emoji.AVERAGE;
                                        case EmojiType.GOOD: return Emoji.GOOD;
                                        case EmojiType.HAPPY: return Emoji.HAPPY;
                                        default: return Emoji.AVERAGE;
                                    }
                                };
                                ViewModel.prototype.initActivityStatus = function (status) {
                                    switch (status) {
                                        case StatusClassfication.NOT_PRESENT: return StatusClassficationIcon.NOT_PRESENT;
                                        case StatusClassfication.PRESENT: return StatusClassficationIcon.PRESENT;
                                        case StatusClassfication.GO_OUT: return StatusClassficationIcon.GO_OUT;
                                        case StatusClassfication.GO_HOME: return StatusClassficationIcon.GO_HOME;
                                        case StatusClassfication.HOLIDAY: return StatusClassficationIcon.HOLIDAY;
                                        default: return StatusClassficationIcon.GO_OUT;
                                    }
                                };
                                ViewModel.prototype.initResizeable = function (vm) {
                                    $('.widget-container .widget-content.ui-resizable')
                                        .on('wg.resize', function () {
                                        vm.onResizeable(vm);
                                    });
                                };
                                /**
                                 * Popup A3_2
                                 */
                                ViewModel.prototype.initPopupArea = function () {
                                    var vm = this;
                                    $('#ccg005-star-popup').ntsPopup({
                                        position: {
                                            my: 'left top',
                                            at: 'left-100 bottom',
                                            of: $('#ccg005-star-img')
                                        },
                                        showOnStart: false,
                                        dismissible: true
                                    });
                                    $('#ccg005-star-img').click(function () { return $('#ccg005-star-popup').ntsPopup('toggle'); });
                                };
                                /**
                                 * Popup A4_4
                                 */
                                ViewModel.prototype.initPopupA4_4InList = function (index, sid) {
                                    var vm = this;
                                    var element = $(".A4-4-application-icon-".concat(sid));
                                    $('#ccg005-A4-4-popup').ntsPopup({
                                        position: {
                                            my: 'left top',
                                            at: 'right bottom',
                                            of: element
                                        },
                                        showOnStart: false,
                                        dismissible: true
                                    });
                                    $('#ccg005-A4-4-popup').ntsPopup('toggle');
                                    var appName = _.find(vm.applicationNameDisplay(), (function (item) { return item.sid === sid; }));
                                    if (appName) {
                                        vm.applicationNameDisplayBySid(appName.appName);
                                    }
                                    //update currentIndex
                                    vm.currentIndex(index());
                                };
                                ViewModel.prototype.initFocusA1_4 = function () {
                                    var vm = this;
                                    var isDelAble = false;
                                    $('.ccg005-clearbtn').hover(function () {
                                        isDelAble = true;
                                    }, function () {
                                        isDelAble = false;
                                    });
                                    $('#CCG005-A1_4')
                                        .focusin(function () { return $('.ccg005-clearbtn').css('display', 'inline'); })
                                        .focusout(function () {
                                        $('.ccg005-clearbtn').css('display', 'none');
                                        if (isDelAble) {
                                            vm.deleteComment();
                                        }
                                    });
                                };
                                /**
                                 * Popup A1_7
                                 */
                                ViewModel.prototype.initPopupStatus = function () {
                                    var vm = this;
                                    $('#ccg005-status-popup').ntsPopup({
                                        position: {},
                                        showOnStart: false,
                                        dismissible: true
                                    });
                                    $('.ccg005-status-img-A1_7').click(function () {
                                        vm.currentIndex(-1);
                                        vm.sIdUpdateStatus(vm.loginSid);
                                        if (!vm.isBaseDate()) {
                                            return;
                                        }
                                        vm.goOutParams(new GoOutParam({
                                            sid: vm.loginSid,
                                            businessName: vm.businessName(),
                                            goOutDate: moment().format("YYYY/MM/DD")
                                        }));
                                        vm.activatedStatus(vm.activityStatus());
                                        $('#ccg005-status-popup').ntsPopup({
                                            position: { my: 'right top', at: 'left top', of: $('.ccg005-status-img-A1_7') },
                                            showOnStart: false,
                                            dismissible: true
                                        });
                                        $('#ccg005-status-popup').ntsPopup('toggle');
                                        vm.indexUpdateItem(-1);
                                    });
                                };
                                /**
                                 * Popup A4_7
                                 */
                                ViewModel.prototype.initPopupInList = function (index, sid, businessName) {
                                    var vm = this;
                                    var element = $('.ccg005-status-img')[index()];
                                    vm.indexUpdateItem(index());
                                    vm.sIdUpdateStatus(sid);
                                    if (!vm.isBaseDate()) {
                                        return;
                                    }
                                    $('#ccg005-status-popup').ntsPopup({
                                        position: { my: 'left top', at: 'right top', of: element },
                                        showOnStart: false,
                                        dismissible: true
                                    });
                                    $('#ccg005-status-popup').ntsPopup('toggle');
                                    //reset goOutParams to screen E
                                    vm.goOutParams(new GoOutParam({
                                        sid: sid,
                                        businessName: businessName,
                                        goOutDate: moment().format("YYYY/MM/DD")
                                    }));
                                    //update current status
                                    vm.activatedStatus(vm.attendanceInformationDtosDisplay()[index()].status);
                                    //set current index
                                    vm.currentIndex(index());
                                };
                                ViewModel.prototype.subscribeFavorite = function () {
                                    var vm = this;
                                    var selectedFavorite = _.find(vm.favoriteSpecifyData(), function (item) { return item.inputDate === vm.favoriteInputDate(); });
                                    if (!selectedFavorite) {
                                        if (_.isEmpty(vm.favoriteSpecifyData())) {
                                            vm.createdDefaultFavorite();
                                        }
                                        else {
                                            vm.favoriteInputDate(vm.favoriteSpecifyData()[0].inputDate);
                                        }
                                        return;
                                    }
                                    var param = new DisplayInfoAfterSelectParam({
                                        baseDate: vm.selectedDate(),
                                        emojiUsage: vm.emojiUsage(),
                                        wkspIds: selectedFavorite ? selectedFavorite.workplaceId : []
                                    });
                                    vm.$blockui('show');
                                    vm.clearDataDisplay();
                                    vm.$ajax('com', API.getDisplayInfoAfterSelect, param).then(function (res) {
                                        vm.dataToDisplay(res);
                                    })
                                        .always(function () { return vm.$blockui('clear'); });
                                };
                                //handle loop by jquery
                                ViewModel.prototype.bindingLoopData = function () {
                                    var vm = this;
                                    _.forEach(vm.attendanceInformationDtosDisplay(), function (item, index) {
                                        //handle avatar
                                        if (_.isEmpty($("#ccg005-avatar-change-".concat(item.sid)).children())) {
                                            if (item.avatarDto && item.avatarDto.fileId) {
                                                $("#ccg005-avatar-change-".concat(item.sid))
                                                    .append($("<img/>")
                                                    .attr("id", 'CCG005_A1_1_small')
                                                    .attr("src", nts.uk.request.liveView(item.avatarDto.fileId)));
                                            }
                                            else {
                                                $("#ccg005-avatar-change-".concat(item.sid)).ready(function () {
                                                    $("#ccg005-avatar-change-".concat(item.sid)).append("<div id='CCG005_no_avatar_small'>\n                  <p style=\"text-align: center; margin: 0 auto; font-size: 12px\">\n                    ".concat(item.businessName.replace(/\s/g, '').substring(0, 2), "\n                  </p>\n                </div>"));
                                                });
                                            }
                                        }
                                        //handle status icon
                                        var element = $('.ccg005-status-img')[index];
                                        ko.bindingHandlers.ntsIcon.init(element, function () { return ({ no: vm.initActivityStatus(item.status), width: 20, height: 20 }); });
                                    });
                                };
                                //handle attendance data for all employee in loop
                                ViewModel.prototype.getAttendanceInformationDtosDisplay = function (res) {
                                    var vm = this;
                                    var listModel = _.map(res, (function (item) {
                                        var businessName = "";
                                        var personalInfo = _.find(vm.listPersonalInfo(), (function (emp) { return emp.employeeId === item.sid; }));
                                        if (personalInfo) {
                                            businessName = personalInfo.businessName;
                                        }
                                        var emojiVisitable = item.emojiDto.emojiType !== null;
                                        return new AttendanceInformationViewModel({
                                            applicationDtos: item.applicationDtos,
                                            sid: item.sid,
                                            attendanceDetailDto: vm.getAttendanceDetailViewModel(item.attendanceDetailDto),
                                            avatarDto: item.avatarDto,
                                            activityStatusIconNo: vm.initActivityStatus(item.activityStatusDto),
                                            status: item.activityStatusDto,
                                            comment: item.commentDto.comment,
                                            goOutDto: vm.getGoOutViewModel(item.goOutDto),
                                            emojiIconNo: vm.initEmojiType(item.emojiDto.emojiType),
                                            emojiVisitable: emojiVisitable,
                                            businessName: businessName,
                                            displayAppIcon: (item.applicationDtos.length > 0),
                                            backgroundColor: vm.getBackgroundColorClass(item.activityStatusDto)
                                        });
                                    }));
                                    return listModel;
                                };
                                //handle check-in check-out display
                                ViewModel.prototype.getAttendanceDetailViewModel = function (attendanceDetailDto) {
                                    var vm = this;
                                    //set color for text
                                    var workColorClass = vm.getClassNameColor(attendanceDetailDto.workColor);
                                    var checkOutColorClass = vm.getClassNameColor(attendanceDetailDto.checkOutColor);
                                    var checkInColorClass = vm.getClassNameColor(attendanceDetailDto.checkInColor);
                                    //handle ' - '
                                    var checkOutTime = attendanceDetailDto.checkOutTime === "" ? "" : ('- ' + attendanceDetailDto.checkOutTime);
                                    return new AttendanceDetailViewModel({
                                        workName: attendanceDetailDto.workName,
                                        workColorClass: workColorClass,
                                        checkOutTime: checkOutTime,
                                        checkOutColorClass: checkOutColorClass,
                                        checkInTime: attendanceDetailDto.checkInTime,
                                        checkInColorClass: checkInColorClass,
                                        workDivision: attendanceDetailDto.workDivision,
                                    });
                                };
                                //handle go-out display
                                ViewModel.prototype.getGoOutViewModel = function (goOutDto) {
                                    var vm = this;
                                    var period = "";
                                    if (goOutDto.goOutTime && goOutDto.comebackTime) {
                                        period = vm.covertNumberToTime(goOutDto.goOutTime) + " - " + vm.covertNumberToTime(goOutDto.comebackTime);
                                    }
                                    return new GoOutEmployeeInformationViewModel({
                                        goOutReason: goOutDto.goOutReason,
                                        goOutPeriod: period
                                    });
                                };
                                //convert time(minutes) to H:mm
                                ViewModel.prototype.covertNumberToTime = function (time) {
                                    return moment.utc(moment.duration(time, "m").asMilliseconds()).format("H:mm");
                                };
                                //handle color for workName, checkIn, checkOut
                                ViewModel.prototype.getClassNameColor = function (color) {
                                    switch (color) {
                                        case DisplayColor.SCHEDULED:
                                            return "display-color-scheduled"; //Color = green
                                        case DisplayColor.ALARM:
                                            return "display-color-alarm"; //Color = red
                                        default:
                                            return "display-color-achievement"; //Color = default
                                    }
                                };
                                //handle background color by activity status
                                ViewModel.prototype.getBackgroundColorClass = function (status) {
                                    var vm = this;
                                    //fix bug #115227
                                    if (!vm.isBaseDate()) {
                                        return "background-color-default";
                                    }
                                    switch (status) {
                                        case StatusClassfication.PRESENT:
                                            return "background-color-present"; //グリーン（#DDFFDD）
                                        case StatusClassfication.GO_OUT:
                                            return "background-color-go-out"; //黄色（#FFE1E1）
                                        case StatusClassfication.HOLIDAY:
                                            return "background-color-holiday"; //グレー（#F2F2F2）
                                        case StatusClassfication.NOT_PRESENT:
                                        case StatusClassfication.GO_HOME:
                                        default:
                                            return "background-color-default"; //白 (none)
                                    }
                                };
                                ViewModel.prototype.onResizeable = function (vm) {
                                    var lineHeight = 47;
                                    var paddingInContent = 10;
                                    var subHeight = $('#ccg005-content').height()
                                        - $('.grade-header-center').height()
                                        - $('.grade-header-bottom').height()
                                        - $('.grade-bottom').height()
                                        - paddingInContent;
                                    if (subHeight >= lineHeight) {
                                        vm.perPage(_.floor(subHeight / lineHeight));
                                    }
                                    $('.grade-body-bottom').height(subHeight);
                                };
                                ViewModel.prototype.nextPage = function () {
                                    var vm = this;
                                    if (vm.currentPage() * vm.perPage() < vm.totalElement()) {
                                        vm.currentPage(vm.currentPage() + 1);
                                        vm.getAttendanceData(); // #116839
                                    }
                                };
                                ViewModel.prototype.previousPage = function () {
                                    var vm = this;
                                    if (vm.currentPage() > 1) {
                                        vm.currentPage(vm.currentPage() - 1);
                                        vm.getAttendanceData(); // #116839
                                    }
                                };
                                ViewModel.prototype.resetPagination = function () {
                                    var vm = this;
                                    vm.currentPage(1);
                                    vm.totalElement(vm.listPersonalInfo().length);
                                };
                                ViewModel.prototype.openScreenCCG005B = function () {
                                    var vm = this;
                                    vm.$window.modal('/view/ccg/005/b/index.xhtml');
                                };
                                /**
                                 * A3_2.1をクリックする（お気に入りダイアログを起動する）
                                 */
                                ViewModel.prototype.openScreenCCG005D = function () {
                                    var vm = this;
                                    $('#ccg005-star-popup').ntsPopup('hide');
                                    vm.$window.modal('/view/ccg/005/d/index.xhtml').then(function (data) {
                                        if (data === undefined) {
                                            vm.createdDefaultFavorite();
                                        }
                                        else {
                                            vm.favoriteSpecifyData(data);
                                        }
                                        vm.subscribeFavorite();
                                    });
                                };
                                /**
                                 * A1_7.3をクリックする　OR　外出アイコンをクリックする（外出入力ダイアログを起動する）
                                 */
                                ViewModel.prototype.openScreenCCG005E = function () {
                                    var vm = this;
                                    $('#ccg005-status-popup').ntsPopup('hide');
                                    vm.$window.modal('/view/ccg/005/e/index.xhtml', vm.goOutParams()).then(function (x) {
                                        if (x) {
                                            vm.registerAttendanceStatus(2, 191);
                                            vm.contentSelected(1);
                                        }
                                        vm.dataToDisplay();
                                    });
                                };
                                /**
                                 * A1_7 or A4_7  をクリックする
                                 */
                                ViewModel.prototype.openFutureScreenCCG005E = function (isLoginUser, sid, businessName) {
                                    var vm = this;
                                    if (isLoginUser) {
                                        vm.goOutParams(new GoOutParam({
                                            sid: __viewContext.user.employeeId,
                                            businessName: vm.businessName(),
                                            goOutDate: moment(vm.selectedDate()).format("YYYY/MM/DD")
                                        }));
                                    }
                                    else {
                                        vm.goOutParams(new GoOutParam({
                                            sid: sid,
                                            businessName: businessName,
                                            goOutDate: moment(vm.selectedDate()).format("YYYY/MM/DD")
                                        }));
                                    }
                                    vm.$window.modal('/view/ccg/005/e/index.xhtml', vm.goOutParams()).then(function (x) {
                                        if (x) {
                                            vm.registerAttendanceStatus(2, 191);
                                        }
                                    });
                                };
                                /**
                                 * 顔写真をクリックする（CDL010を起動する）
                                 */
                                ViewModel.prototype.onClickAvatar = function (sid) {
                                    var vm = this;
                                    var data = {
                                        employeeId: !!sid ? sid : vm.loginSid,
                                        referenceDate: new Date(),
                                        startMode: 0
                                    };
                                    vm.$window.modal('com', '/view/cdl/010/a/index.xhtml', data);
                                };
                                ViewModel.prototype.resetLastestData = function () {
                                    var vm = this;
                                    //reset search value
                                    vm.workplaceNameFromCDL008('');
                                    vm.searchValue('');
                                    //reset pagination
                                    vm.currentPage(1);
                                    vm.subscribeFavorite();
                                };
                                ViewModel.prototype.updateLoginData = function (atds) {
                                    var vm = this;
                                    // 条件：在席情報DTO.社員ID＝ログイン社員ID
                                    var atdInfo = _.find(atds, function (item) { return item.sid === vm.loginSid; });
                                    if (!atdInfo) {
                                        return;
                                    }
                                    // A1_1 表示初期の在席データDTO.在席情報DTO.個人の顔写真.顔写真ファイルID
                                    $("#".concat(ID_AVATAR_CHANGE)).empty();
                                    if (atdInfo.avatarDto && atdInfo.avatarDto.fileId) {
                                        $("#".concat(ID_AVATAR_CHANGE))
                                            .append($("<img/>")
                                            .attr("id", 'CCG005_A1_1')
                                            .attr("src", nts.uk.request.liveView(atdInfo.avatarDto.fileId)));
                                    }
                                    else {
                                        $("#".concat(ID_AVATAR_CHANGE)).ready(function () {
                                            if ($("#".concat(ID_AVATAR_CHANGE)).empty()) {
                                                $("#".concat(ID_AVATAR_CHANGE)).append("<div id='CCG005_no_avatar'>\n                  <p style=\"text-align: center; margin: 0 auto; font-size: 15px\">\n                    ".concat(vm.businessName().replace(/\s/g, '').substring(0, 2), "\n                  </p>\n                </div>"));
                                            }
                                        });
                                    }
                                    // 表示初期の在席データDTO.在席情報DTO.在席のステータス
                                    vm.activityStatus(atdInfo.activityStatusDto);
                                    // A1_3 表示初期の在席データDTO.在席情報DTO.社員の外出情報.感情種類
                                    if (atdInfo.emojiDto && atdInfo.emojiDto.emojiType !== null) {
                                        ko.bindingHandlers.ntsIcon
                                            .init($('.ccg005-currentEmoji')[0], function () { return ({ no: vm.initEmojiType(atdInfo.emojiDto.emojiType), width: 20, height: 30 }); });
                                    }
                                    //binding activity
                                    var element = $('.ccg005-status-img-A1_7');
                                    ko.bindingHandlers.ntsIcon.init(element, function () { return ({ no: vm.initActivityStatus(atdInfo.activityStatusDto), width: 20, height: 20 }); });
                                    // A1_4
                                    if (atdInfo.commentDto) {
                                        vm.originalComment(atdInfo.commentDto.comment);
                                        vm.comment(atdInfo.commentDto.comment);
                                        vm.commentDate(atdInfo.commentDto.date);
                                    }
                                };
                                ViewModel.prototype.createdDefaultFavorite = function () {
                                    var vm = this;
                                    var inputDate = moment.utc().toISOString();
                                    var favoriteSpecify = new FavoriteSpecifyData({
                                        favoriteName: vm.$i18n('CCG005_27'),
                                        creatorId: vm.loginSid,
                                        inputDate: inputDate,
                                        targetSelection: 1,
                                        workplaceId: [],
                                        order: 0,
                                        wkspNames: []
                                    });
                                    vm.favoriteSpecifyData([favoriteSpecify]);
                                };
                                /**
                                 * コメントを登録する
                                 */
                                ViewModel.prototype.registerComment = function () {
                                    var vm = this;
                                    var command = {
                                        comment: vm.comment(),
                                        date: moment.utc().toISOString(),
                                        sid: vm.loginSid
                                    };
                                    vm.$blockui('show');
                                    vm.$ajax('com', API.registerComment, command)
                                        .then(function () {
                                        vm.$dialog.info({ messageId: 'Msg_15' });
                                        $('#CCG005-A1_4').blur();
                                    })
                                        .always(function () { return vm.$blockui('clear'); });
                                };
                                /**
                                 * コメントを削除する
                                 */
                                ViewModel.prototype.deleteComment = function () {
                                    var vm = this;
                                    if (_.isEmpty(vm.comment())) {
                                        return;
                                    }
                                    vm.comment('');
                                    var command = {
                                        date: moment.utc(vm.commentDate()).toISOString(),
                                        sid: vm.loginSid
                                    };
                                    vm.$blockui('show');
                                    vm.$ajax('com', API.deleteComment, command)
                                        .always(function () { return vm.$blockui('clear'); });
                                };
                                /**
                                 * A3_2.3職場選択ボタンをクリックする　（職場：CDL008へ）
                                 */
                                ViewModel.prototype.openCDL008 = function () {
                                    var vm = this;
                                    var inputCDL008 = {
                                        startMode: StartMode.WORKPLACE,
                                        isMultiple: true,
                                        showNoSelection: false,
                                        selectedCodes: vm.workplaceFromCDL008(),
                                        isShowBaseDate: true,
                                        baseDate: moment.utc().toISOString(),
                                        selectedSystemType: SystemType.EMPLOYMENT,
                                        isrestrictionOfReferenceRange: false
                                    };
                                    $('#ccg005-star-popup').ntsPopup('hide');
                                    setShared('inputCDL008', inputCDL008);
                                    vm.$window.modal('/view/cdl/008/a/index.xhtml').then(function () {
                                        if (getShared('CDL008Cancel')) {
                                            setShared('CDL008Cancel', null);
                                            return;
                                        }
                                        var workplaceInfor = getShared('workplaceInfor');
                                        vm.workplaceNameFromCDL008(_.map(workplaceInfor, function (wkp) { return wkp.displayName; }).join('、'));
                                        // 職場を選択する時
                                        vm.workplaceFromCDL008(getShared('outputCDL008'));
                                        var param = new DisplayInfoAfterSelectParam({
                                            baseDate: vm.selectedDate(),
                                            emojiUsage: vm.emojiUsage(),
                                            wkspIds: vm.workplaceFromCDL008()
                                        });
                                        vm.$blockui('show');
                                        vm.clearDataDisplay();
                                        vm.$ajax('com', API.getDisplayInfoAfterSelect, param).then(function (res) {
                                            vm.dataToDisplay(res);
                                        }).always(function () { return vm.$blockui('clear'); });
                                    });
                                };
                                /**
                                 * 検索する時
                                 */
                                ViewModel.prototype.onSearchEmployee = function () {
                                    var vm = this;
                                    var reloadAvatar;
                                    if (vm.searchValue().trim().length > 0) {
                                        var param = {
                                            keyWorks: vm.searchValue(),
                                            baseDate: vm.selectedDate(),
                                            emojiUsage: vm.emojiUsage()
                                        };
                                        $('#ccg005-star-popup').ntsPopup('hide');
                                        vm.$blockui('show');
                                        vm.$ajax('com', API.searchForEmployee, param)
                                            .then(function (res) {
                                            vm.dataToDisplay(res);
                                        })
                                            .always(function () { return vm.$blockui('clear'); });
                                    }
                                };
                                ViewModel.prototype.clearDataDisplay = function () {
                                    var vm = this;
                                    vm.totalElement(0);
                                    vm.attendanceInformationDtos([]);
                                    vm.attendanceInformationDtosDisplay([]);
                                    // vm.attendanceInformationDtosDisplayClone([]);
                                };
                                ViewModel.prototype.dataToDisplay = function (res) {
                                    var vm = this;
                                    vm.onResizeable(vm);
                                    if (!res) {
                                        res = { listPersonalInfo: vm.listPersonalInfo() };
                                    }
                                    vm.totalElement(res.listPersonalInfo.length);
                                    vm.getAttendanceData(res.listPersonalInfo);
                                };
                                ViewModel.prototype.getAttendanceData = function (listPersonalInfo) {
                                    var vm = this;
                                    if (!listPersonalInfo) {
                                        listPersonalInfo = vm.listPersonalInfo();
                                    }
                                    var availEmp = _.slice(listPersonalInfo, vm.startPage() - 1, vm.endPage()); // #116839
                                    var empIds = _.map(availEmp, function (person) {
                                        return {
                                            sid: person.employeeId,
                                            pid: person.personalId
                                        };
                                    });
                                    var param = {
                                        empIds: empIds,
                                        baseDate: vm.selectedDate(),
                                        emojiUsage: vm.emojiUsage()
                                    };
                                    vm.$blockui('show');
                                    vm.$ajax('com', API.getAttendanceInformation, param).then(function (response) {
                                        vm.updateLoginData(response);
                                        response = _.filter(response, function (item) { return item.sid !== vm.loginSid; });
                                        vm.attendanceInformationDtos(response);
                                        vm.listPersonalInfo(listPersonalInfo);
                                        //set data view model to set data on screen
                                        var display = vm.getAttendanceInformationDtosDisplay(response);
                                        if (display.length > vm.perPage()) {
                                            vm.attendanceInformationDtosDisplay(_.slice(display, 0, vm.perPage()));
                                        }
                                        else {
                                            vm.attendanceInformationDtosDisplay(display);
                                        }
                                        // vm.attendanceInformationDtosDisplayClone(display);
                                        //handle application display
                                        var data = response;
                                        var appNames = vm.applicationNameInfo();
                                        var appModel = _.map(data, (function (attendanceInfo) {
                                            var applicationDtos = attendanceInfo.applicationDtos;
                                            var appName1 = _.map(applicationDtos, (function (appDto) {
                                                var app = _.find(appNames, (function (appName) { return (appDto.appType === appName.appType && appDto.otherType === appName.otherType); }));
                                                if (app) {
                                                    return app.appName;
                                                }
                                                return undefined;
                                            }));
                                            return new ApplicationNameViewModel({
                                                sid: attendanceInfo.sid,
                                                appName: _.filter(appName1, (function (item) { return item !== undefined; }))
                                            });
                                        }));
                                        vm.applicationNameDisplay(appModel);
                                        vm.onResizeable(vm);
                                    })
                                        .always(function () { return vm.$blockui('hide'); });
                                };
                                /**
                                 * 在席のステータスを登録する
                                 */
                                ViewModel.prototype.registerAttendanceStatus = function (selectedStatus, activityStatusIcon) {
                                    var vm = this;
                                    var params = {
                                        activity: selectedStatus,
                                        sid: vm.sIdUpdateStatus(),
                                        date: moment(moment(new Date()).format("YYYY/MM/DD"))
                                    };
                                    vm.$ajax(API.saveStatus, params).then(function () {
                                        $('#ccg005-status-popup').ntsPopup('hide');
                                        if (selectedStatus !== StatusClassfication.GO_OUT) {
                                            if (vm.indexUpdateItem() > -1) {
                                                //This case for now
                                                var element = $('.ccg005-status-img')[vm.indexUpdateItem()];
                                                ko.bindingHandlers.ntsIcon.init(element, function () { return ({ no: activityStatusIcon, width: 20, height: 20 }); });
                                            }
                                            else {
                                                ko.bindingHandlers.ntsIcon.init($('.ccg005-status-img-A1_7'), function () { return ({ no: activityStatusIcon, width: 20, height: 20 }); });
                                            }
                                        }
                                    });
                                    if (selectedStatus !== StatusClassfication.GO_OUT) {
                                        //update view model
                                        if (vm.currentIndex() !== -1) {
                                            //This case for now
                                            vm.attendanceInformationDtosDisplay()[vm.currentIndex()].status = selectedStatus;
                                            var newBgClass = vm.getBackgroundColorClass(selectedStatus);
                                            $('.ccg005-tr-background')[vm.currentIndex()].id = newBgClass;
                                            //This case for change page or resize
                                            var updateSid_1 = vm.attendanceInformationDtosDisplay()[vm.currentIndex()].sid;
                                            _.map(vm.attendanceInformationDtosDisplay(), function (item) {
                                                if (item.sid === updateSid_1) {
                                                    item.status = selectedStatus;
                                                    item.backgroundColor = vm.getBackgroundColorClass(selectedStatus);
                                                }
                                            });
                                            ko.applyBindings(vm, $('.ccg005-tr-background')[vm.currentIndex()]);
                                        }
                                        else {
                                            vm.activityStatus(selectedStatus);
                                        }
                                    }
                                };
                                ViewModel.prototype.saveCharacteristic = function (inputDateTime) {
                                    nts.uk.characteristics.save("ccg005Favorite"
                                        + "_companyId_" + __viewContext.user.companyId
                                        + "_userId_" + __viewContext.user.employeeId, inputDateTime);
                                };
                                ViewModel.prototype.restoreCharacteristic = function () {
                                    return nts.uk.characteristics.restore("ccg005Favorite"
                                        + "_companyId_" + __viewContext.user.companyId
                                        + "_userId_" + __viewContext.user.employeeId);
                                };
                                ViewModel = __decorate([
                                    component({
                                        name: 'ccg005-component',
                                        template: "\n    <div class=\"widget-title\">\n      <table style=\"width: 100%;\">\n        <colgroup>\n          <col width=\"auto\" />\n          <col width=\"70px\" />\n          <col width=\"40px\" />\n        </colgroup>\n        <thead>\n          <tr>\n            <th class=\"ccg005-fs-biger\">\n              <!-- A0 -->\n              <div data-bind=\"ntsFormLabel: { required: false, text: $component.$i18n('CCG005_1') }\"></div>\n            </th>\n            <th>\n              <!-- A2_1 -->\n              <button tabindex=11 id=\"ccg005-legends\" style=\"margin-left: 5px;\"\n                data-bind=\"visible: $component.isBaseDate, ntsLegendButton: legendOptions\"></button>\n            </th>\n            <th>\n              <!-- A1_5 -->\n              <i tabindex=3 style=\"position: relative; right: 0; top: 5px;\" data-bind=\"visible: $component.inCharge, ntsIcon: {no: 5, width: 25, height: 25}, click: $component.openScreenCCG005B\"></i>\n            </th>\n          </tr>\n        </thead>\n      </table>\n    </div>\n    <div data-bind=\"widget-content: 200, default: 430\" id=\"ccg005-watching\">\n    <div id=\"ccg005-content\" style=\"padding-bottom: 0px;\">\n      <div style=\"height: 100%; position: relative;\">\n        <div class=\"grade-header-center\" style=\"padding-bottom: 5px;\">\n          <table>\n            <colgroup>\n              <col width=\"40px\"/>\n              <col width=\"370px\"/>\n              <col width=\"auto\"/>\n            </colgroup>\n            <tr>\n              <td class=\"ccg005-bottom-unset\">\n                <!-- A1_1 -->\n                <div id=\"ccg005-avatar-change\" tabindex=1\n                  data-bind=\"click: $component.onClickAvatar.bind($component, loginSid)\"></div>\n              </td>\n              <td class=\"ccg005-bottom-unset\" style=\"padding-left: 5px; width: 370px;\">\n                <!-- A1_2 -->\n                <span class=\"ccg005-bold\" data-bind=\"text: $component.businessName()\"></span>\n                <div class=\"ccg005-flex none-enter-icon\">\n                  <!-- A1_3 -->\n                  <i class=\"ccg005-currentEmoji\"></i>\n                  <div style=\"position: relative; height: 30px;\" class=\"CCG005-A1_4-border\">\n                    <!-- A1_4 -->\n                    <input \n                      tabindex=2 \n                      id=\"CCG005-A1_4\"\n                      style=\"border: none !important; padding-right: 30px; background: none !important;\" \n                      data-bind=\"ntsTextEditor: {\n                          enterkey: $component.registerComment,\n                          name: '#[CCG005_37]',\n                          value: $component.comment,\n                          constraint: 'DailyContactComment',\n                          enable: $component.isBaseDate,\n                          option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({\n                            textmode: 'text',\n                            width: '250px',\n                            placeholder: $component.$i18n('CCG005_35')\n                          }))\n                        }, visible: $component.isSameOrBeforeBaseDate\" />\n                    <i class=\"ccg005-clearbtn\" style=\"position: absolute; right: 5px; display: none;\"\n                      data-bind=\"click: $component.deleteComment(), ntsIcon: {no: 198, width: 20, height: 28}\"></i>\n                  </div>\n                </div>\n              </td>\n              <td class=\"ccg005-bottom-unset\">\n                <!-- A1_7 -->\n                <i tabindex=5 class=\"ccg005-status-img-A1_7\"\n                  data-bind=\"ntsIcon: { no: $component.activityStatusIcon(), width: 20, height: 20 }, visible: $component.isBaseDate\"></i>\n                <i\n                  data-bind=\"click: $component.openFutureScreenCCG005E.bind($component, true, '', '') ,ntsIcon: { no: 191, width: 20, height: 20 }, visible: $component.isAfter\"></i>\n              </td>\n            </tr>\n          </table>\n        </div>\n        <div id=\"A2_3\" class=\"grade-header-bottom ccg005-flex\" style=\"position: relative;\">\n          <!-- A2_3 -->\n          <div tabindex=6 id=\"ccg005-selected-date\" data-bind=\"ntsDatePicker: {\n                name: '#[CCG005_36]',\n                value: selectedDate,\n                required: true,\n                dateFormat: 'YYYY/MM/DD',\n                fiscalMonthsMode: true,\n                showJumpButtons: true\n              }\" style=\"display: inline-flex;\"></div>\n          <div style=\"right: 0; position: absolute; display: flex; align-items: center;\">\n            <!-- A3_2 -->\n            <i tabindex=9 id=\"ccg005-star-img\" style=\"margin-right: 5px;\"\n              data-bind=\"ntsIcon: {no: 184, width: 20, height: 20}\"></i>\n            <!-- A3_1 -->\n            <div tabindex=10 data-bind=\"ntsComboBox: {\n                  width: '160px',\n                  options: favoriteSpecifyData,\n                  editable: true,\n                  visibleItemsCount: 5,\n                  value: favoriteInputDate,\n                  selectFirstIfNull: false,\n                  optionsValue: 'inputDate',\n                  optionsText: 'favoriteName',\n                  required: true,\n                  columns: [\n                    { prop: 'favoriteName' }\n                  ]}\"></div>\n          </div>\n        </div>\n        <!-- A5 -->\n        <div class=\"grade-body-bottom\" style=\"min-height: 55px; height: 55px\">\n          <table style=\"width: 100%; border-collapse: separate; border-spacing: 0 5px\">\n            <tbody data-bind=\"foreach: attendanceInformationDtosDisplay\">\n              <tr style=\"height: 42px;\" class=\"ccg005-tr-background\" data-bind=\"attr:{ id: backgroundColor }\">\n                <td style=\"padding-right: 5px; width: 30px; background-color: white;\"\n                  class=\"ccg005-apply-binding-avatar ccg005-bottom-unset\">\n                  <!-- A4_1 -->\n                  <div tabindex=12\n                    data-bind=\"attr:{ id: 'ccg005-avatar-change-'+sid }, click: $component.onClickAvatar.bind($component, sid)\" />\n                </td>\n                <td class=\"ccg005-w100 ccg005-pl-5 ccg005-border-groove ccg005-right-unset\">\n                  <!-- A4_8 -->\n                  <div style=\"height: 20px\">\n                    <label class=\"limited-label ccg005-w100\" style=\"display: inline-block;\"\n                      data-bind=\"text: businessName\" />\n                  </div>\n                  <!-- A4_5 -->\n                  <div style=\"height: 20px;\">\n                    <i tabindex=13 data-bind=\"ntsIcon: {no: emojiIconNo, width: 20, height: 15}, visible: emojiVisitable\"></i>\n                  </div>\n                </td>\n                <td class=\"ccg005-w100 ccg005-pl-5 ccg005-border-groove ccg005-right-unset ccg005-left-unset\">\n                  <div class=\"ccg005-w100\" style=\"position: relative; height: 20px\">\n                    <!-- A4_2 -->\n                    <label\n                      data-bind=\"text: attendanceDetailDto.workName, attr:{ class: 'limited-label '+ attendanceDetailDto.workColorClass }\"\n                      style=\"max-width: 85px; width: auto !important;\" />\n                    <!-- A4_4 -->\n                    <i tabindex=14 style=\"position: absolute; top: 3px; right: 0;\"\n                      data-bind=\"visible: displayAppIcon, click: $component.initPopupA4_4InList.bind($component, $index, sid), attr:{ class: 'A4-4-application-icon-'+sid }, ntsIcon: {no: 190, width: 13, height: 13}\"></i>\n                  </div>\n                  <div style=\"height: 20px; position: relative;\">\n                    <!-- A4_3 -->\n                    <span style=\"white-space: nowrap; position: absolute; bottom: 2px;\">\n                      <label id=\"check-in-out\"\n                        data-bind=\"text: attendanceDetailDto.checkInTime, attr:{ class: attendanceDetailDto.checkInColorClass }\" />\n                      <label id=\"check-in-out\"\n                        data-bind=\"text: attendanceDetailDto.checkOutTime, attr:{ class: attendanceDetailDto.checkOutColorClass }\" />\n                    </span>\n                  </div>\n                </td>\n                <td class=\"ccg005-pl-5 ccg005-border-groove ccg005-right-unset ccg005-left-unset\">\n                  <!-- A4_7 -->\n                  <span class=\"ccg005-flex\">\n                    <i tabindex=15 class=\"ccg005-status-img\"\n                      data-bind=\"click: $component.initPopupInList.bind($component, $index, sid, businessName), ntsIcon: {no: activityStatusIconNo, width: 20, height: 20}, visible: $component.isBaseDate\"></i>\n                    <i\n                      data-bind=\"click: $component.openFutureScreenCCG005E.bind($component, false, sid, businessName) ,ntsIcon: { no: 191, width: 20, height: 20 }, visible: $component.isAfter\"></i>\n                  </span>\n                </td>\n                <td class=\"ccg005-pl-5 ccg005-border-groove ccg005-left-unset\">\n                  <!-- A4_6 time -->\n                  <p style=\"max-width: 125px; line-height: 20px;\"\n                    data-bind=\"text: goOutDto.goOutPeriod, visible: $component.goOutDisplay()\" />\n                  <!-- A4_6 text go out reason -->\n                  <p style=\"max-width: 125px; line-height: 20px;\" class=\"limited-label ccg005-block\"\n                    data-bind=\"text: goOutDto.goOutReason, visible: $component.goOutDisplay()\" />\n                  <!-- A4_6 text comment -->\n                  <p style=\"max-width: 125px; line-height: 20px;\" class=\"limited-label ccg005-block\"\n                    data-bind=\"text: comment, visible: $component.commentDisplay()\" />\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"grade-bottom ccg005-flex\"\n          style=\"width: 100%; align-items: center; position: absolute; margin-top: 5px; bottom: 0;\">\n          <table style=\"width: 100%;\">\n            <tr style=\" background: white;\">\n              <td class=\"ccg005-bottom-unset\">\n                <div class=\"ccg005-pagination ccg005-flex\">\n                  <!-- A5_1 -->\n                  <i tabindex=16 class=\"ccg005-pagination-btn\"\n                    data-bind=\"ntsIcon: {no: 193, width: 15, height: 20}, click: $component.previousPage\"></i>\n                  <!-- A5_2 -->\n                  <span style=\"white-space: nowrap; width: auto; text-align: center;\"\n                    data-bind=\"text: $component.paginationText()\"></span>\n                  <!-- A5_3 -->\n                  <i tabindex=17 class=\"ccg005-pagination-btn\"\n                    data-bind=\"ntsIcon: {no: 192, width: 15, height: 20}, click: $component.nextPage\"></i>\n                </div>\n              </td>\n              <td class=\"ccg005-bottom-unset\" style=\"width: 100%\">\n                <div class=\"ccg005-switch-btn\" style=\"float: right;\">\n                  <!-- A5_4 -->\n                  <div tabindex=18 class=\"cf ccg005-switch\" data-bind=\"ntsSwitchButton: {\n                        options: contentSelections,\n                        optionsValue: 'code',\n                        optionsText: 'name',\n                        value: contentSelected }\"></div>\n                </div>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </div>\n\n      <!-- A3_2 Popup -->\n      <div id=\"ccg005-star-popup\" style=\"width: 212px;\">\n        <!-- A3_2.1 -->\n        <table>\n          <tr style=\"height: 25px\">\n            <td class=\"ccg005-bottom-unset\" style=\"text-align: right;\">\n              <a style=\"color: blue; text-decoration: underline; cursor: pointer;\"\n                data-bind=\"i18n: 'CCG005_34', click: $component.openScreenCCG005D\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"ccg005-bottom-unset\">\n              <!-- A3_2.2 -->\n              <input data-bind=\"ntsTextEditor: {\n                    value: searchValue,\n                    enterkey: $component.onSearchEmployee,\n                    option: ko.mapping.fromJS(new nts.uk.ui.option.TextEditorOption({\n                      textmode: 'text',\n                      width: '190px',\n                      placeholder: $component.$i18n('CCG005_45')\n                    }))\n                  }\"></input>\n            </td>\n          </tr>\n          <tr>\n            <td class=\"ccg005-bottom-unset\">\n              <!-- A3_2.3 -->\n              <button data-bind=\"i18n: 'CCG005_32', click: $component.openCDL008\"></button>\n              <!-- A3_2.4 -->\n              <label class=\"limited-label\" style=\"max-width: 125px;\"\n                data-bind=\"text: $component.workplaceNameFromCDL008\"></label>\n            </td>\n          </tr>\n        </table>\n      </div>\n      <!-- A4_4 popup -->\n      <div id=\"ccg005-A4-4-popup\">\n        <div data-bind=\"foreach: $component.applicationNameDisplayBySid\">\n          <p data-bind=\"text: $data\" />\n        </div>\n      </div>\n    </div>\n  </div>\n  <!-- A1_7 & A4_7 Popup -->\n  <div id=\"ccg005-status-popup\">\n    <table>\n      <tr style=\"height: 30px\" data-bind=\"click: $component.registerAttendanceStatus.bind($component, 0, 196)\">\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"visible: $component.visibleNotPresent(), ntsIcon: {no: 78, width: 15, height: 25}\"></i>\n        </td>\n        <!-- A1_7.1 -->\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"ntsIcon: {no: 196, width: 20, height: 20}\"></i>\n        </td>\n        <td class=\"ccg005-bottom-unset\" data-bind=\"i18n: 'CCG005_43'\"></td>\n      </tr>\n      <tr style=\"height: 30px\" data-bind=\"click: $component.registerAttendanceStatus.bind($component, 1, 195)\">\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"visible: $component.visiblePresent(), ntsIcon: {no: 78, width: 15, height: 25}\"></i>\n        </td>\n        <!-- A1_7.2 -->\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"ntsIcon: {no: 195, width: 20, height: 20}\"></i>\n        </td>\n        <td class=\"ccg005-bottom-unset\" data-bind=\"i18n: 'CCG005_22'\"></td>\n      </tr>\n      <tr style=\"height: 30px\" data-bind=\"click: $component.openScreenCCG005E\">\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"visible: $component.visibleGoOut(), ntsIcon: {no: 78, width: 15, height: 25}\"></i>\n        </td>\n        <!-- A1_7.3 -->\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"ntsIcon: {no: 191, width: 20, height: 20}\"></i>\n        </td>\n        <td class=\"ccg005-bottom-unset\" data-bind=\"i18n: 'CCG005_39'\"></td>\n      </tr>\n      <tr style=\"height: 30px\" data-bind=\"click: $component.registerAttendanceStatus.bind($component,3, 196)\">\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"visible: $component.visibleGoHome(), ntsIcon: {no: 78, width: 15, height: 25}\"></i>\n        </td>\n        <!-- A1_7.4 -->\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"ntsIcon: {no: 196, width: 20, height: 20}\"></i>\n        </td>\n        <td class=\"ccg005-bottom-unset\" data-bind=\"i18n: 'CCG005_44'\"></td>\n      </tr>\n      <tr style=\"height: 30px\" data-bind=\"click: $component.registerAttendanceStatus.bind($component, 4, 197)\">\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"visible: $component.visibleHoliday(), ntsIcon: {no: 78, width: 15, height: 25}\"></i>\n        </td>\n        <!-- A1_7.5 -->\n        <td class=\"ccg005-bottom-unset\">\n          <i data-bind=\"ntsIcon: {no: 197, width: 20, height: 20}\"></i>\n        </td>\n        <td class=\"ccg005-bottom-unset\" data-bind=\"i18n: 'CCG005_40'\"></td>\n      </tr>\n    </table>\n  </div>\n  <!--------------------------------------- CSS --------------------------------------->\n  <style>\n    .ccg005-block {\n      display: block;\n    }\n    .ccg005-fs-biger div.form-label>span.text {\n      font-size: 1.2rem;\n    }\n    .widget-container > #ccg005-watching > #ccg005-content table tr td {\n      border-width: 1px !important;\n    } \n\n    .ccg005-border-groove {\n      border: 1px groove !important;\n    }\n\n    .ccg005-right-unset {\n      border-right: none !important;\n    }\n\n    .ccg005-left-unset {\n      border-left: none !important;\n    }\n\n    .ccg005-bottom-unset {\n      border-bottom: none !important;\n    }\n\n    .ccg005-w100 {\n      width: 100px;\n    }\n\n    .ccg005-bold {\n      font-weight: bold;\n    }\n\n    .ccg005-bold span {\n      font-size: 1rem !important;\n      font-weight: bolder !important;\n    }\n\n    .ccg005-1rem span {\n      font-size: 1rem !important;\n    }\n\n    .ccg005-pl-5 {\n      padding-left: 5px;\n    }\n\n    .ccg005-flex {\n      display: flex;\n    }\n\n    .grade-header-top {\n      display: flex;\n      margin-top: 5px;\n    }\n\n    .grade-header-top span {\n      width: 390px;\n    }\n\n    .bg-white-ccg005 {\n      background-color: #FFFFFF;\n    }\n\n    .bg-green-ccg005 {\n      background-color: #DDFFDD\n    }\n\n    .bg-yellow-ccg005 {\n      background-color: #FFE1E1\n    }\n\n    .bg-gray-ccg005 {\n      background-color: #F2F2F2\n    }\n\n    #ccg005-content {\n      width: 100%;\n      overflow: hidden;\n    }\n\n    #ccg005-status-popup table tr,\n    #ccg005-content i, #ccg005-content img {\n      cursor: pointer;\n    }\n\n    #ccg005-status-popup table tr td {\n      padding-right: 5px;\n    }\n\n    #CCG005_A1_1 {\n      max-height: 40px;\n      max-width: 40px;\n      min-height: 40px;\n      min-width: 40px;\n      border-radius: 50%;\n    }\n\n    #CCG005_A1_1_small {\n      max-height: 30px;\n      max-width: 30px;\n      min-height: 30px;\n      min-width: 30px;\n      border-radius: 50%;\n    }\n\n    #CCG005_no_avatar {\n      display: flex;\n      align-items: center;\n      background-color: #eeeeee;\n      color: blue;\n      border: 1px solid #333688;\n      border-radius: 50%;\n      width: 40px;\n      height: 40px;\n    }\n\n    #CCG005_no_avatar_small {\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n      background-color: #eeeeee;\n      color: blue;\n      border: 1px solid #333688;\n      border-radius: 50%;\n      width: 30px;\n      height: 30px;\n    }\n\n    .ccg005-switch > .nts-switch-button {\n      width: 80px;\n    }\n\n    #check-in-out {\n      font-size: 80%;\n    }\n\n    .display-color-scheduled {\n      color: #00CC00;\n    }\n\n    .display-color-alarm {\n      color: red;\n    }\n\n    .pd-left-35 {\n      padding-left: 35px;\n    }\n\n    #background-color-present {\n      background-color: #DDFFDD;\n    }\n\n    #background-color-go-out {\n      background-color: #FFE1E1;\n    }\n\n    #background-color-holiday {\n      background-color: #F2F2F2;\n    }\n\n    #A2_3 .ntsDatePickerButton { height: 30px !important; }\n\n  </style>"
                                    })
                                ], ViewModel);
                                return ViewModel;
                            }(ko.ViewModel));
                            screenModel.ViewModel = ViewModel;
                            var StartMode;
                            (function (StartMode) {
                                StartMode[StartMode["WORKPLACE"] = 0] = "WORKPLACE";
                                StartMode[StartMode["DEPARTMENT"] = 1] = "DEPARTMENT";
                            })(StartMode || (StartMode = {}));
                            var SystemType;
                            (function (SystemType) {
                                SystemType[SystemType["PERSONAL_INFORMATION"] = 1] = "PERSONAL_INFORMATION";
                                SystemType[SystemType["EMPLOYMENT"] = 2] = "EMPLOYMENT";
                                SystemType[SystemType["SALARY"] = 3] = "SALARY";
                                SystemType[SystemType["HUMAN_RESOURCES"] = 4] = "HUMAN_RESOURCES";
                                SystemType[SystemType["ADMINISTRATOR"] = 5] = "ADMINISTRATOR";
                            })(SystemType || (SystemType = {}));
                            var EmojiType;
                            (function (EmojiType) {
                                EmojiType[EmojiType["WEARY"] = 0] = "WEARY";
                                EmojiType[EmojiType["SAD"] = 1] = "SAD";
                                EmojiType[EmojiType["AVERAGE"] = 2] = "AVERAGE";
                                EmojiType[EmojiType["GOOD"] = 3] = "GOOD";
                                EmojiType[EmojiType["HAPPY"] = 4] = "HAPPY"; // いい感じ: アイコン#185
                            })(EmojiType || (EmojiType = {}));
                            var Emoji;
                            (function (Emoji) {
                                Emoji[Emoji["WEARY"] = 189] = "WEARY";
                                Emoji[Emoji["SAD"] = 188] = "SAD";
                                Emoji[Emoji["AVERAGE"] = 187] = "AVERAGE";
                                Emoji[Emoji["GOOD"] = 186] = "GOOD";
                                Emoji[Emoji["HAPPY"] = 185] = "HAPPY"; // いい感じ: アイコン#185
                            })(Emoji || (Emoji = {}));
                            var StatusClassfication;
                            (function (StatusClassfication) {
                                StatusClassfication[StatusClassfication["NOT_PRESENT"] = 0] = "NOT_PRESENT";
                                StatusClassfication[StatusClassfication["PRESENT"] = 1] = "PRESENT";
                                StatusClassfication[StatusClassfication["GO_OUT"] = 2] = "GO_OUT";
                                StatusClassfication[StatusClassfication["GO_HOME"] = 3] = "GO_HOME";
                                StatusClassfication[StatusClassfication["HOLIDAY"] = 4] = "HOLIDAY"; // 休み: アイコン#197
                            })(StatusClassfication || (StatusClassfication = {}));
                            var StatusClassficationIcon;
                            (function (StatusClassficationIcon) {
                                StatusClassficationIcon[StatusClassficationIcon["NOT_PRESENT"] = 196] = "NOT_PRESENT";
                                StatusClassficationIcon[StatusClassficationIcon["PRESENT"] = 195] = "PRESENT";
                                StatusClassficationIcon[StatusClassficationIcon["GO_OUT"] = 191] = "GO_OUT";
                                StatusClassficationIcon[StatusClassficationIcon["GO_HOME"] = 196] = "GO_HOME";
                                StatusClassficationIcon[StatusClassficationIcon["HOLIDAY"] = 197] = "HOLIDAY"; // 休み: アイコン#197
                            })(StatusClassficationIcon || (StatusClassficationIcon = {}));
                            // 表示色区分
                            var DisplayColor;
                            (function (DisplayColor) {
                                DisplayColor[DisplayColor["ACHIEVEMENT"] = 0] = "ACHIEVEMENT";
                                DisplayColor[DisplayColor["SCHEDULED"] = 1] = "SCHEDULED";
                                DisplayColor[DisplayColor["ALARM"] = 2] = "ALARM"; // アラーム色
                            })(DisplayColor || (DisplayColor = {}));
                            var FavoriteSpecifyData = /** @class */ (function () {
                                function FavoriteSpecifyData(init) {
                                    $.extend(this, init);
                                }
                                return FavoriteSpecifyData;
                            }());
                            var DisplayInfoAfterSelectParam = /** @class */ (function () {
                                function DisplayInfoAfterSelectParam(init) {
                                    $.extend(this, init);
                                }
                                return DisplayInfoAfterSelectParam;
                            }());
                            var GoOutParam = /** @class */ (function () {
                                function GoOutParam(init) {
                                    $.extend(this, init);
                                }
                                return GoOutParam;
                            }());
                            var AttendanceInformationViewModel = /** @class */ (function () {
                                function AttendanceInformationViewModel(init) {
                                    $.extend(this, init);
                                }
                                return AttendanceInformationViewModel;
                            }());
                            var ActivityStatusParam = /** @class */ (function () {
                                function ActivityStatusParam(init) {
                                    $.extend(this, init);
                                }
                                return ActivityStatusParam;
                            }());
                            var GoOutEmployeeInformationViewModel = /** @class */ (function () {
                                function GoOutEmployeeInformationViewModel(init) {
                                    $.extend(this, init);
                                }
                                return GoOutEmployeeInformationViewModel;
                            }());
                            var AttendanceDetailViewModel = /** @class */ (function () {
                                function AttendanceDetailViewModel(init) {
                                    $.extend(this, init);
                                }
                                return AttendanceDetailViewModel;
                            }());
                            var ApplicationNameViewModel = /** @class */ (function () {
                                function ApplicationNameViewModel(init) {
                                    $.extend(this, init);
                                }
                                return ApplicationNameViewModel;
                            }());
                        })(screenModel = a.screenModel || (a.screenModel = {}));
                    })(a = ccg005.a || (ccg005.a = {}));
                })(ccg005 = view.ccg005 || (view.ccg005 = {}));
            })(view = at.view || (at.view = {}));
        })(at = uk.at || (uk.at = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg005.a.vm.js.map