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
                    var a;
                    (function (a) {
                        var API = {
                            // <<ScreenQuery>> 社員のお知らせの画面を表示する
                            getEmployeeNotification: 'sys/portal/notice/getEmployeeNotification',
                            // <<ScreenQuery>> 社員が宛先のお知らせの内容を取得する
                            getContentOfDestinationNotification: 'sys/portal/notice/getContentOfDestinationNotification',
                            // <<Command>> お知らせを閲覧する
                            viewMessageNotice: 'sys/portal/notice/viewMessageNotice',
                            // <<Command>> 個人の記念日を閲覧する
                            updateAnnivesaryNotice: 'ctx/bs/person/personal/anniversary/updateAnnivesaryNotice',
                            isDisplayNewNotice: 'sys/portal/notice/is-new-notice'
                        };
                        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
                        var ViewModel = /** @class */ (function (_super) {
                            __extends(ViewModel, _super);
                            function ViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.isStartScreen = true;
                                _this.formatType = 'YYYY/MM/DD';
                                _this.dateValue = ko.observable(new DatePeriod({
                                    startDate: moment.utc().format(_this.formatType),
                                    endDate: moment.utc().format(_this.formatType)
                                }));
                                _this.systemDate = ko.observable('');
                                // Map<お知らせメッセージ、作成者> (List)
                                _this.msgNotices = ko.observableArray([]);
                                // Map<個人の記念日情報、新記念日Flag> (List)
                                _this.anniversaries = ko.observableArray([]);
                                // ロール
                                _this.roleFlag = ko.observable(false);
                                _this.role = ko.observable(new Role());
                                _this.isShow = ko.observable(true);
                                _this.isEmployee = ko.computed(function () { return __viewContext.user.isEmployee; });
                                return _this;
                            }
                            ViewModel.prototype.created = function () {
                                var vm = this;
                                if (!vm.isEmployee()) {
                                    return;
                                }
                                vm.$ajax('com', API.getEmployeeNotification)
                                    .then(function (response) {
                                    if (response) {
                                        vm.systemDate(moment.utc(response.systemDate).locale('ja').format('YYYY/M/D(dd)'));
                                        _.map(response.anniversaryNotices, function (item) { return item.anniversaryNotice.anniversaryTitle = vm.convertTitleAnniversaries(item.anniversaryNotice); });
                                        vm.anniversaries(response.anniversaryNotices);
                                        var msgNotices = vm.listMsgNotice(response.msgNotices);
                                        vm.msgNotices(msgNotices);
                                        if (response.role) {
                                            vm.role(response.role);
                                            vm.roleFlag(response.role.employeeReferenceRange !== 3);
                                        }
                                    }
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('clearView'); });
                                vm.isShowNewMark();
                            };
                            ViewModel.prototype.mounted = function () {
                                var vm = this;
                                $('#A0-CCG003').ntsPopup({
                                    position: {
                                        my: 'right top',
                                        at: "right bottom",
                                        of: $('#header')
                                    },
                                    showOnStart: false,
                                    dismissible: false
                                });
                                $('#notice-msg').click(function () {
                                    if (vm.isShow()) {
                                        $('#A0-CCG003').ntsPopup('show');
                                    }
                                    else {
                                        vm.isShowNewMark();
                                        $('#A0-CCG003').ntsPopup('hide');
                                    }
                                    vm.isShow(!vm.isShow());
                                });
                                $('#top-title-ccg003').dblclick(function (e) { return e.preventDefault(); });
                                $('#top-title-ccg003').click(function () {
                                    $('#top-title-ccg003').css('border-bottom', 'none');
                                    var maxHeight = $('.ccg003-auto-overflow').css('max-height');
                                    if (maxHeight === '320px') {
                                        $('.ccg003-auto-overflow').css('max-height', '385px');
                                    }
                                    else {
                                        $('.ccg003-auto-overflow').css('max-height', '320px');
                                    }
                                    if (!_.isEmpty(vm.anniversaries()) || !_.isEmpty(vm.msgNotices())) {
                                        $('#A4-CCG003').css('border-bottom', 'unset');
                                    }
                                    else {
                                        $('#A4-CCG003').css('border-bottom', '1px groove');
                                    }
                                });
                            };
                            /**
                             * A4_3:絞込をクリックする
                             */
                            ViewModel.prototype.onClickFilter = function () {
                                var vm = this;
                                vm.$validate('#ccg003-A4_2').then(function (valid) {
                                    if (!valid) {
                                        nts.uk.ui.errors.show();
                                        return;
                                    }
                                    vm.$blockui('grayoutView');
                                    var startDate = moment.utc(vm.dateValue().startDate, vm.formatType);
                                    var endDate = moment.utc(vm.dateValue().endDate, vm.formatType);
                                    var baseDate = moment.utc(new Date(), vm.formatType);
                                    if (startDate.isAfter(baseDate) || endDate.isAfter(baseDate)) {
                                        vm.$dialog.error({ messageId: 'Msg_1833' });
                                        vm.$blockui('clearView');
                                        return;
                                    }
                                    vm.anniversaries([]);
                                    vm.msgNotices([]);
                                    var param = new DatePeriod({
                                        startDate: startDate.toISOString(),
                                        endDate: endDate.toISOString()
                                    });
                                    vm.$ajax('com', API.getContentOfDestinationNotification, param)
                                        .then(function (response) {
                                        if (response) {
                                            _.map(response.anniversaryNotices, function (item) { return item.anniversaryNotice.anniversaryTitle = vm.convertTitleAnniversaries(item.anniversaryNotice); });
                                            vm.anniversaries(response.anniversaryNotices);
                                            var msgNotices = vm.listMsgNotice(response.msgNotices);
                                            vm.msgNotices(msgNotices);
                                            if (!_.isEmpty(response.anniversaryNotices || !_.isEmpty(response.msgNotices))) {
                                                $('#A4-CCG003').css('border-bottom', 'unset');
                                            }
                                        }
                                    })
                                        .fail(function (error) { return vm.$dialog.error(error); })
                                        .always(function () { return vm.$blockui('clearView'); });
                                });
                            };
                            ViewModel.prototype.listMsgNotice = function (messages) {
                                var vm = this;
                                if (_.isEmpty(messages)) {
                                    return [];
                                }
                                return _.map(messages, function (item) {
                                    var msg = new MsgNotices();
                                    msg.creator = item.creator;
                                    msg.flag = item.flag;
                                    msg.message = item.message;
                                    msg.dateDisplay = item.message
                                        ? "".concat(moment.utc(item.message.startDate, 'YYYY/MM/DD').format('M/D'), " ").concat(vm.$i18n('CCG003_15'), " ").concat(moment.utc(item.message.endDate, 'YYYY/MM/DD').format('M/D'))
                                        : '';
                                    msg.messageDisplay = vm.replaceUrl(item.message.notificationMessage);
                                    return msg;
                                });
                            };
                            ViewModel.prototype.replaceUrl = function (text) {
                                return text.replace(urlRegex, function (url, b, c) {
                                    var url2 = (c == 'www.') ? 'http://' + url : url;
                                    return '<a style="color: blue !important;" href="' + url2 + '" target="_blank">' + url + '</a>';
                                });
                            };
                            /**
                             * A5、アコーディオンを広げて内容を表示する
                             */
                            ViewModel.prototype.onClickAnniversary = function (index) {
                                var vm = this;
                                if (_.isNil(vm.anniversaries()[index()])) {
                                    return;
                                }
                                if (!vm.anniversaries()[index()].flag) {
                                    return;
                                }
                                var anniversary = vm.anniversaries()[index()].anniversaryNotice.displayDate;
                                var command = {
                                    personalId: vm.anniversaries()[index()].anniversaryNotice.personalId,
                                    anniversary: moment.utc(anniversary, 'MM-DD').format('MMDD'),
                                    referDate: moment.utc(vm.dateValue().endDate).toISOString(),
                                };
                                vm.$blockui('grayoutView');
                                vm.$ajax('com', API.updateAnnivesaryNotice, command)
                                    .then(function () {
                                    var anniversaries = vm.anniversaries();
                                    anniversaries[index()].flag = false;
                                    vm.anniversaries(anniversaries);
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('clearView'); });
                            };
                            /**
                             * A6、アコーディオンを広げて内容を表示する
                             */
                            ViewModel.prototype.onClickMessageNotice = function (creator, inputDate, index) {
                                var vm = this;
                                if (!vm.msgNotices()[index()].flag) {
                                    return;
                                }
                                var command = {
                                    msgInfors: [{
                                            creatorId: creator,
                                            inputDate: inputDate
                                        }],
                                    sid: __viewContext.user.employeeId
                                };
                                vm.$blockui('grayoutView');
                                vm.$ajax('com', API.viewMessageNotice, command)
                                    .then(function () {
                                    var msgNotices = vm.msgNotices();
                                    msgNotices[index()].flag = false;
                                    vm.msgNotices(msgNotices);
                                })
                                    .fail(function (error) { return vm.$dialog.error(error); })
                                    .always(function () { return vm.$blockui('clearView'); });
                            };
                            /**
                             * A2:メッセージ入力のリンクをクリックする
                             */
                            ViewModel.prototype.openScreenB = function () {
                                var vm = this;
                                vm.$window.modal('com', '/view/ccg/003/b/index.xhtml', vm.role())
                                    .then(function () { return vm.onClickFilter(); });
                            };
                            /**
                             * 記念日のタイトル部分の表示について ver5
                             */
                            ViewModel.prototype.convertTitleAnniversaries = function (param) {
                                if (!param) {
                                    return '';
                                }
                                var vm = this;
                                var displayDate = '';
                                var startDate = moment.utc(vm.dateValue().startDate, 'YYYY/MM/DD');
                                var endDate = moment.utc(vm.dateValue().endDate, 'YYYY/MM/DD');
                                var systemDate = moment.utc(vm.systemDate(), 'YYYY/MM/DD');
                                var anniversaryDate = moment.utc("".concat(startDate.year(), "-").concat(param.displayDate), 'YYYY-MM-DD');
                                // 条件：期間が「システム日～システム日」の場合
                                if (startDate.isSame(systemDate) && endDate.isSame(systemDate)) {
                                    // 1	システム日.月日　≦　個人の記念日.記念日(月日)
                                    if (startDate.isSameOrBefore(anniversaryDate)) {
                                        //システム日.年月日 ≦	システム日.年+個人の記念日.記念日(月日) ≦	システム日.年月日＋日数前の通知
                                        if (systemDate.isSameOrBefore(anniversaryDate) && anniversaryDate.isSameOrBefore(systemDate.add(param.noticeDay, 'd'))) {
                                            //システム日.年＋個人の記念日.記念日(月日)
                                            displayDate = anniversaryDate.locale('ja').format('M/D(dd)');
                                        }
                                        else {
                                            //システム日.年+「-1年」+個人の記念日.記念日(月日)
                                            displayDate = anniversaryDate.subtract(1, 'y').locale('ja').format('M/D(dd)');
                                        }
                                    }
                                    else { // 2	システム日.月日　＞   個人の記念日.記念日(月日)
                                        // システム日.年+「1年」＋個人の記念日.記念日(月日)
                                        var anniversaryNextYear = moment.utc("".concat(systemDate.year() + 1, "-").concat(param.displayDate), 'YYYY-MM-DD');
                                        if (systemDate.isSameOrBefore(anniversaryNextYear) && anniversaryNextYear.isSameOrBefore(systemDate.add(param.noticeDay, 'd'))) {
                                            // システム日.年+「1年」＋個人の記念日.記念日(月日)
                                            displayDate = anniversaryNextYear.locale('ja').format('M/D(dd)');
                                        }
                                        else {
                                            // システム日.年+個人の記念日.記念日(月日)
                                            displayDate = anniversaryNextYear.subtract(1, 'y').locale('ja').format('M/D(dd)');
                                        }
                                    }
                                }
                                // 条件：期間開始日、終了日がどちらかまたは共に「システム日」ではない場合
                                // 1	期間開始日.年月日　≦　期間開始日.年＋個人の記念日.月日　≦　期間終了日.年月日
                                if (startDate.isSameOrBefore(anniversaryDate) && anniversaryDate.isSameOrBefore(endDate)) {
                                    displayDate = anniversaryDate.locale('ja').format('M/D(dd)');
                                }
                                // 2	期間開始日.年月日　≦　期間終了日.年＋個人の記念日.月日　≦　期間終了日.年月日
                                anniversaryDate = moment.utc("".concat(endDate.year, "-").concat(param.displayDate), 'YYYY-MM-DD');
                                if (startDate.isBefore(anniversaryDate) && anniversaryDate.isBefore(endDate)) {
                                    displayDate = anniversaryDate.locale('ja').format('M/D(dd)');
                                }
                                return "".concat(displayDate, " ").concat(param.anniversaryTitle);
                            };
                            /**
                             * A2_1:メッセージ追加のリンクをクリックする
                             */
                            ViewModel.prototype.openScreenCInNewMode = function () {
                                var vm = this;
                                vm.$window.modal('com', '/view/ccg/003/c/index.xhtml', {
                                    isNewMode: true,
                                    role: vm.role(),
                                    messageNotice: null
                                })
                                    .then(function (result) {
                                    if (result && !result.isClose) {
                                        vm.onClickFilter();
                                    }
                                });
                            };
                            ViewModel.prototype.closeWindow = function () {
                                var vm = this;
                                vm.isShow(!vm.isShow());
                                vm.isShowNewMark();
                                $('#A0-CCG003').ntsPopup('hide');
                            };
                            ViewModel.prototype.isShowNewMark = function () {
                                var vm = this;
                                vm.$ajax('com', API.isDisplayNewNotice)
                                    .then(function (response) {
                                    if (response) {
                                        $("#new-mark-msg").css({ display: "" });
                                    }
                                    else {
                                        $("#new-mark-msg").css({ display: "none" });
                                    }
                                })
                                    .fail(function () { return $("#new-mark-msg").css({ display: "none" }); });
                            };
                            ViewModel = __decorate([
                                component({
                                    name: 'ccg003-component',
                                    template: "<div>\n    <!-- A0 \u304A\u77E5\u3089\u305B\u8868\u793A -->\n    <div id=\"A0-CCG003\" class=\"panel panel-frame panel-ccg003\">\n      <div class=\"ccg003-top-content\">\n        <!-- A1 \u5BFE\u8C61\u65E5 -->\n        <div><span data-bind=\"text: systemDate\" style=\"color: black !important;\"></span></div>\n        <div class=\"ccg003-fw-right\">\n          <div data-bind=\"if: roleFlag\">\n            <!-- A2 \u30E1\u30C3\u30BB\u30FC\u30B8\u5165\u529B -->\n            <div data-bind=\"ntsFormLabel: { required: false, text: $i18n('CCG003_4') }\"></div>\n            <!-- A2_1 -->\n            <a class=\"ccg003-a2\" class=\"mr-5\" href=\"#\" data-bind=\"click: openScreenCInNewMode, text: $component.$i18n('CCG003_17')\"></a>\n            <!-- A2_2 -->\n            <a class=\"ccg003-a2\" class=\"mr-5\" href=\"#\" data-bind=\"click: openScreenB, text: $component.$i18n('CCG003_18')\"></a>\n          </div>\n          <div>\n            <!-- A3 \u2613\u30A2\u30A4\u30B3\u30F3 -->\n            <i id=\"A3-CCG003\" data-bind=\"ntsIcon: { no: 174, width: 25, height: 15 }, click: closeWindow\"></i>\n          </div>\n        </div>\n      </div>\n      <!-- A4 \u7D5E\u308A\u8FBC\u307F -->\n      <div id=\"A4-CCG003\" class=\"w-490 ccg003-no-radius\" data-bind=\"ntsAccordion: {}\">\n        <div id=\"top-title-ccg003\" class=\"bg-schedule-focus bg-accordion-1\">\n          <!-- \u30D8\u30C3\u30C0\u30C6\u30AD\u30B9\u30C8 -->\n          <h3 data-bind=\"text: $component.$i18n('CCG003_5')\" style=\"display: inline;\"></h3>\n        </div>\n        <div id=\"body-title-ccg003\" class=\"bg-accordion-1 no-border-radius pl-10\">\n\n          <table style=\"width: 100%;\">\n            <colgroup>\n                <col width=\"auto\" />\n                <col width=\"auto\" />\n                <col width=\"auto\" />\n            </colgroup>\n            <tbody>\n              <tr>\n                <td>\n                  <!-- A4_1 \u8868\u793A\u671F\u9593(\u30E9\u30D9\u30EB) -->\n                  <span class=\"auto-margin\" data-bind=\"text: $component.$i18n('CCG003_6')\"></span>\n                </td>\n                <td>\n                  <!-- A4_2 \u8868\u793A\u671F\u9593 -->\n                  <div id=\"ccg003-A4_2\" tabindex=\"1\" class=\"ml-10\" data-bind=\"ntsDateRangePicker: {\n                    required: true,\n                    enable: true,\n                    name: $i18n('CCG003_6'),\n                    showNextPrevious: false,\n                    value: dateValue,\n                    maxRange: 'oneMonth'}\"\n                  />\n                </td>\n                <td>\n                  <!-- A4_3 \u7D5E\u8FBC -->\n                  <button tabindex=\"2\" class=\"small pl-10 pr-10\" data-bind=\"click: onClickFilter, text: $component.$i18n('CCG003_7')\"></button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n      <div class=\"ccg003-auto-overflow\">\n        <div data-bind=\"foreach: anniversaries\">\n          <!-- A5 \u8A18\u5FF5\u65E5 -->\n          <div class=\"w-490 ccg003-no-radius\" data-bind=\"ntsAccordion: {}, click: $component.onClickAnniversary.bind($component, $index)\">\n            <div class=\"bg-schedule-focus\">\n              <!-- \u30D8\u30C3\u30C0\u30C6\u30AD\u30B9\u30C8 -->\n              <span class=\"limited-label-custom  mw-400\" data-bind=\"text: anniversaryNotice.anniversaryTitle\"></span>\n              <!-- A5_1 NEW\u30A2\u30A4\u30B3\u30F3 -->\n              <span data-bind=\"if: $component.anniversaries()[$index()].flag\">\n                <i data-bind=\"ntsIcon: { no: 175, width: 25, height: 15 }\"></i>\n              </span>\n            </div>\n            <div class=\"mr-data no-border-radius\">\n              <!-- A5_2 \u8A18\u5FF5\u65E5\u5185\u5BB9 -->\n              <div>\n                <span class=\"ccg003-data\" data-bind=\"text: anniversaryNotice.notificationMessage\"></span>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div data-bind=\"foreach: msgNotices\">\n          <!-- A6 \u30E1\u30C3\u30BB\u30FC\u30B8 -->\n          <div class=\"w-490 ccg003-no-radius\" data-bind=\"ntsAccordion: {activate: $component.onClickMessageNotice.bind($component, message.creatorID, message.inputDate, $index)}\">\n            <h3 class=\"bg-schedule-focus\">\n              <!-- \u30D8\u30C3\u30C0\u30C6\u30AD\u30B9\u30C8 -->\n              <span class=\"limited-label-custom  mw-400\" data-bind=\"text: message.notificationMessage\"></span>\n              <!-- A6_1 NEW\u30A2\u30A4\u30B3\u30F3 -->\n              <span data-bind=\"if: $component.msgNotices()[$index()].flag\">\n                <i data-bind=\"ntsIcon: { no: 175, width: 25, height: 15 }\"></i>\n              </span>\n            </h3>\n            <!-- A6_2 \u30E1\u30C3\u30BB\u30FC\u30B8\u5185\u5BB9 -->\n            <div class=\"mr-data no-border-radius\">\n              <div>\n                <span class=\"ccg003-data\" data-bind=\"html: messageDisplay\"></span>\n                <span class=\"ccg003-block-5\" data-bind=\"text: $component.$i18n('CCG003_8', [creator])\"></span>\n                <span class=\"ccg003-block-5\" data-bind=\"text: $component.$i18n('CCG003_9', [dateDisplay])\"></span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <style>\n    .ccg003-data {\n      white-space: pre-wrap;\n      word-break: break-all;\n      display: inline-block;\n      width: 430px;\n    }\n    #A0-CCG003 {\n      min-height: 150px;\n      z-index: 99 !important;\n    }\n    #A3-CCG003 {\n      cursor: pointer;\n    }\n    #body-title-ccg003 {\n      border-bottom: 0;\n    }\n    .ccg003-a2 {\n      color: #0D86D1 !important;\n      text-decoration: underline;\n      padding-left: 10px;\n      padding-right: 10px;\n    }\n    .w-490 {\n      width: 490px;\n    }\n    .ccg003-top-content {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n    }\n    .ccg003-fw-right {\n      display: flex;\n      float: right;\n      justify-content: end;\n    }\n    .panel-ccg003 {\n      position: absolute;\n      max-height: 460px;\n      background-color: #f2f8ee !important;\n      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;\n      width: 510px;\n      border-radius: 0px !important;\n    }\n    .bg-accordion-1 {\n      background-color: #e1eed7 !important;\n    }\n    .ccg003-no-radius > .ui-accordion-header {\n      margin: 0 0 0 0 !important;\n      border-radius: 0px !important;\n    }\n    .no-border-radius {\n      border-radius: 0px !important;\n    }\n    .pl-10 {\n      padding-left: 10px !important;\n    }\n    .pr-10 {\n      padding-right: 10px !important;\n    }\n    .auto-margin {\n      margin: auto;\n    }\n    .ml-10 {\n      margin-left: 10px;\n    }\n    .ml-90 {\n      margin-left: 90px;\n    }\n    .mw-400 {\n      max-width: 400px;\n    }\n    .mr-5 {\n      margin-right: 5px;\n    }\n    .ccg003-auto-overflow {\n      overflow-y: auto;\n      max-height: 385px;\n      -moz-transition: 0.5s;\n      -ms-transition: 0.5s;\n      -o-transition: 0.5s;\n      -webkit-transition: 0.5s;\n      transition: 0.5s;\n    }\n    .ccg003-block-5 {\n      display: block;\n      margin-top: 5px;\n    }\n    .limited-label-custom {\n      width: 99%;\n      display: inline-block;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n    .datepicker-container {\n      z-index: 999999999 !important;\n    }\n  </style>"
                                })
                            ], ViewModel);
                            return ViewModel;
                        }(ko.ViewModel));
                        a.ViewModel = ViewModel;
                        var DestinationNotification = /** @class */ (function () {
                            function DestinationNotification() {
                            }
                            return DestinationNotification;
                        }());
                        var DatePeriod = /** @class */ (function () {
                            function DatePeriod(init) {
                                $.extend(this, init);
                            }
                            return DatePeriod;
                        }());
                        var EmployeeNotification = /** @class */ (function () {
                            function EmployeeNotification() {
                            }
                            return EmployeeNotification;
                        }());
                        var MsgNotices = /** @class */ (function () {
                            function MsgNotices() {
                            }
                            return MsgNotices;
                        }());
                        var AnniversaryNotices = /** @class */ (function () {
                            function AnniversaryNotices() {
                            }
                            return AnniversaryNotices;
                        }());
                        var AnniversaryNoticeImport = /** @class */ (function () {
                            function AnniversaryNoticeImport() {
                            }
                            return AnniversaryNoticeImport;
                        }());
                        var Role = /** @class */ (function () {
                            function Role() {
                            }
                            return Role;
                        }());
                        var MessageNotice = /** @class */ (function () {
                            function MessageNotice() {
                            }
                            return MessageNotice;
                        }());
                    })(a = ccg003.a || (ccg003.a = {}));
                })(ccg003 = view.ccg003 || (view.ccg003 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg003.a.vm.js.map