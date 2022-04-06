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
                var ktg031;
                (function (ktg031) {
                    var a;
                    (function (a) {
                        var API = {
                            findAlarmData: "sys/portal/toppageAlarm/findAlarmData",
                            changeToRead: 'sys/portal/toppageAlarm/changeAlarmToReaded',
                            changeToUnread: 'sys/portal/toppageAlarm/changeAlarmToUnread',
                            checkUpdateAutoExecError: 'screen/at/ktg/ktg031/check-update-auto-exec-error',
                        };
                        var Ktg031ComponentViewModel = /** @class */ (function (_super) {
                            __extends(Ktg031ComponentViewModel, _super);
                            function Ktg031ComponentViewModel() {
                                var _this = _super !== null && _super.apply(this, arguments) || this;
                                _this.isEmployee = ko.observable(false);
                                _this.selectedAlarmType = ko.observable(null);
                                _this.listAlarmType = ko.observableArray([]);
                                _this.listAlarm = ko.observableArray();
                                _this.widget = 'KTG031A';
                                return _this;
                            }
                            Ktg031ComponentViewModel.prototype.created = function (params) {
                                var vm = this;
                                vm.listAlarmType([
                                    { code: 0, name: vm.$i18n('Enum_ToppageAlarmDisplay_UNREAD') },
                                    { code: 1, name: vm.$i18n('Enum_ToppageAlarmDisplay_ALL') },
                                ]);
                                vm.selectedAlarmType.subscribe(function (value) { return vm.loadAlarmData(value); });
                                vm.selectedAlarmType(0);
                                vm.checkUpdateAutoExecError();
                                vm.isEmployee(__viewContext.user.role.isInCharge.attendance);
                            };
                            Ktg031ComponentViewModel.prototype.checkUpdateAutoExecError = function () {
                                var vm = this;
                                vm.$ajax('at', API.checkUpdateAutoExecError).always(function () { return vm.$blockui('clear'); });
                            };
                            Ktg031ComponentViewModel.prototype.loadAlarmData = function (displayType) {
                                var vm = this;
                                vm.$blockui('grayout');
                                vm.$ajax("".concat(API.findAlarmData, "/").concat(displayType))
                                    .then(function (res) { return vm.setListAlarm(res); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            Ktg031ComponentViewModel.prototype.changeToRead = function (companyId, sid, displayAtr, alarmClassification, patternCode, notificationId) {
                                var vm = this;
                                var command = new ToppageAlarmDataReadCommand({
                                    companyId: companyId,
                                    sid: sid,
                                    displayAtr: displayAtr,
                                    alarmClassification: alarmClassification,
                                    patternCode: patternCode,
                                    notificationId: notificationId
                                });
                                vm.$blockui('grayout');
                                vm.$ajax(API.changeToRead, command)
                                    .then(function (res) { return vm.$ajax("".concat(API.findAlarmData, "/").concat(vm.selectedAlarmType())); })
                                    .then(function (res) { return vm.setListAlarm(res, true); })
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            Ktg031ComponentViewModel.prototype.setListAlarm = function (res, stopReload) {
                                if (stopReload) {
                                    return;
                                }
                                var vm = this;
                                var alarmList = _.map(res, function (item) { return new AlarmDisplayDataDto(vm, item); });
                                var sortedList = _.orderBy(alarmList, ["order", "occurrenceDateTime", "patternCode", "notificationId", "displayAtr"]);
                                vm.listAlarm(sortedList);
                                // Render row backgournd color
                                vm.$nextTick(function () {
                                    vm.$grid = $('#ktg031-grid');
                                    $("#ktg031-grid tr:nth-child(even)").addClass("even");
                                    $("#ktg031-grid tr:nth-child(odd)").addClass("odd");
                                });
                            };
                            Ktg031ComponentViewModel.prototype.changeToUnread = function (companyId, sid, displayAtr, alarmClassification, patternCode, notificationId) {
                                var vm = this;
                                var command = new ToppageAlarmDataUnreadCommand({
                                    companyId: companyId,
                                    sid: sid,
                                    displayAtr: displayAtr,
                                    alarmClassification: alarmClassification,
                                    patternCode: patternCode,
                                    notificationId: notificationId,
                                });
                                vm.$blockui('grayout');
                                vm.$ajax(API.changeToUnread, command)
                                    .always(function () { return vm.$blockui('clear'); });
                            };
                            Ktg031ComponentViewModel.prototype.openDialogSetting = function () {
                                var vm = this;
                                vm.$window.modal('/view/ktg/031/b/index.xhtml');
                            };
                            Ktg031ComponentViewModel.prototype.onClickUrl = function (alarmClassification, displayAtr, subSids, url) {
                                var vm = this;
                                switch (alarmClassification) {
                                    case AlarmClassification.ALARM_LIST:
                                        var kal001BParam = new Kal001BParam({
                                            extractingFlg: false,
                                            isExtracting: false,
                                            listAlarmExtraValueWkReDto: [],
                                            processId: undefined,
                                            totalErAlRecord: 0,
                                            currentAlarmCode: undefined,
                                            employeeIds: [],
                                            isTopPage: true
                                        });
                                        if (displayAtr === DisplayAtr.PRINCIPAL) {
                                            kal001BParam.employeeIds = [__viewContext.user.employeeId];
                                        }
                                        else if (displayAtr === DisplayAtr.SUPERIOR) {
                                            kal001BParam.employeeIds = subSids;
                                        }
                                        nts.uk.ui.windows.setShared("extractedAlarmData", kal001BParam);
                                        vm.openDialogUrl(url);
                                        break;
                                    case AlarmClassification.AUTO_EXEC_BUSINESS_ERR:
                                    case AlarmClassification.AUTO_EXEC_OPERATION_ERR:
                                    case AlarmClassification.HEALTH_LIFE_MESSAGE:
                                        vm.openUrl(url);
                                        break;
                                    default:
                                        break;
                                }
                            };
                            Ktg031ComponentViewModel.prototype.openUrl = function (url) {
                                var vm = this;
                                if (url) {
                                    var origin_1 = window.location.origin;
                                    if (url.indexOf(origin_1) !== -1) {
                                        // UK system pages
                                        var comPath = 'nts.uk.com.web';
                                        var comPagePath = vm.getUKSystemPath(url, comPath);
                                        if (comPagePath) {
                                            vm.$jump.self("com", comPagePath);
                                            return;
                                        }
                                        var atPath = 'nts.uk.at.web';
                                        var atPagePath = vm.getUKSystemPath(url, atPath);
                                        if (atPagePath) {
                                            vm.$jump.self("at", atPagePath);
                                            return;
                                        }
                                    }
                                    else {
                                        // Other system pages
                                        window.open(url);
                                    }
                                }
                            };
                            Ktg031ComponentViewModel.prototype.openDialogUrl = function (url) {
                                var vm = this;
                                if (url) {
                                    var comPath = '/nts.uk.com.web';
                                    if (url.indexOf(comPath) !== -1) {
                                        vm.$window.modal("com", url.replace(comPath, ""));
                                        return;
                                    }
                                    var atPath = '/nts.uk.at.web';
                                    if (url.indexOf(atPath) !== -1) {
                                        vm.$window.modal("at", url.replace(atPath, ""));
                                        return;
                                    }
                                }
                            };
                            Ktg031ComponentViewModel.prototype.getUKSystemPath = function (url, path) {
                                var pathIndex = url.lastIndexOf(path);
                                if (pathIndex !== -1) {
                                    return url.substring(pathIndex + path.length, url.length);
                                }
                                return null;
                            };
                            Ktg031ComponentViewModel = __decorate([
                                component({
                                    name: 'ktg031-component',
                                    template: "\n      <div class=\"widget-title\">\n        <table style=\"width: 100%;\">\n        <colgroup>\n            <col width=\"auto\" />\n            <col width=\"110px\" />\n            <col width=\"30px\" />\n        </colgroup>\n        <thead>\n            <tr>\n              <th class=\"ktg031-fontsize\">\n                <div data-bind=\"ntsFormLabel: { required: false, text: $component.$i18n('KTG031_11') }\"></div>\n              </th>\n              <th class=\"flex valign-center\" style=\"text-align: left;\">\n                <div data-bind=\"ntsComboBox: {\n                  name: '#[KTG031_10]',\n                  width: 110,\n                  value: $component.selectedAlarmType,\n                  options: $component.listAlarmType,\n                  optionsValue: 'code',\n                  optionsText: 'name',\n                  visibleItemsCount: 5,\n                  required: true,\n                  selectFirstIfNull: true,\n                  columns: [\n                    { prop: 'name' }\n                  ]}\"></div>\n              </th>\n              <th>\n                <div data-bind=\"if: $component.isEmployee\">\n                  <i class=\"img-icon\" style=\"vertical-align: middle;\" data-bind=\"ntsIcon: {no: 5, width: 25, height: 25}, click: $component.openDialogSetting\"></i>\n                </div>\n              </th>\n            </tr>\n          </thead>\n        </table>\n      </div>\n      <div data-bind=\"widget-content: 100, default: 410\" id=\"ktg031-container\">\n        <div class=\"body\" style=\"height: calc(100% - 5px);\">\n          <div class=\"table-container\">\n            <table id=\"ktg031-grid\" style=\"width: 100%;\">\n              <colgroup>\n                <col width=\"80px\" />\n                <col width=\"auto\" />\n                <col width=\"1px\" />\n                <col width=\"auto\" />\n                <col width=\"30px\" />\n              </colgroup>\n              <tbody data-bind=\"foreach: $component.listAlarm\">\n                <tr style=\"height: 40px\">\n                  <td class=\"column-date border-before\">\n                    <span data-bind=\"text: dateMonth\"></span>\n                    <span data-bind=\"text: $component.$i18n('KTG031_13')\"></span>\n                  </td>\n                  <td>\n                    <span class=\"limited-label\" style=\"vertical-align: middle;\" data-bind=\"text: displayMessage\"></span>\n                  </td>\n                  <td class=\"border-after\"></td>\n                  <td class=\"column-action\">\n                    <button style=\"color: #79E68B; border: 1px solid;\" class=\"small\" data-bind=\"\n                      visible: isReaded,\n                      text: $component.$i18n('KTG031_41'),\n                      click: changeReadStatus\">\n                    </button>\n                    <button style=\"color: #79E68B; border: 1px solid;\" class=\"small\" data-bind=\"\n                      visible: !isReaded(),\n                      text: $component.$i18n('KTG031_42'),\n                      click: changeReadStatus\">\n                    </button>\n                  </td>\n                  <td class=\"column-action\">\n                    <i class=\"img-icon\" data-bind=\"ntsIcon: {no: 178, width: 20, height: 20}, click: function() { $component.onClickUrl(alarmClassification, displayAtr, subSids, linkUrl); }\"></i>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n      <style type=\"text/css\" rel=\"stylesheet\">\n        .column-action .img-icon {\n          vertical-align: middle;\n        }\n        .ktg031-fontsize div.form-label>span.text {\n          font-size: 1.2rem !important;\n        }\n        .border-before,\n        .border-after {\n          position: relative;\n        }\n        .border-before:before {\n          content: '';\n          position: absolute;\n          bottom: 5px;\n          left: 0;\n          width: 100%;\n          height: 30px;\n          border-right: 2px solid #C6C6D1;\n        }\n        .border-after:after {\n          content: '';\n          position: absolute;\n          bottom: 5px;\n          left: 0;\n          width: 100%;\n          height: 30px;\n          border-left: 2px solid #C6C6D1;\n        }\n        #ktg031-container {\n          width: 100%;\n          display: flex;\n          flex-direction: column;\n        }\n        #ktg031-container .ktg031-header-line {\n          width: 100%;\n          height: 5px;\n          background-color: #689f38;\n        }\n        #ktg031-container .body {\n          padding: 5px;\n          box-sizing: border-box;\n          width: 100%;\n          display: flex;\n          flex-direction: column;\n        }\n        #ktg031-container .body .body-top-row {\n          display: flex;\n          flex-direction: row;\n          align-items: center;\n        }\n        #ktg031-container .body .body-top-row .body-top-label {\n          width: 100%;\n          padding-left: 10px;\n          display: flex;\n          flex-direction: row;\n          align-items: center;\n          justify-content: space-between;\n        }\n        #ktg031-container .body .body-top-row .body-top-label .label {\n          font-size: 1.2rem;\n        }\n        #ktg031-container .body .body-top-row .body-top-label .img-icon:hover {\n          cursor: pointer;\n        }\n        #ktg031-container .body .table-container {\n          height: 100%;\n          margin-top: 5px;\n          overflow-y: auto;\n          border: 1px solid #C6C6D1;\n        }\n        #ktg031-container .body .table-container #ktg031-grid {\n          width: 100%;\n          table-layout: fixed;\n        }\n        #ktg031-container .body .table-container #ktg031-grid tr.even {}\n        #ktg031-container .body .table-container #ktg031-grid td {\n          padding: 3px;\n          box-sizing: border-box;\n          border-bottom: none !important;\n        }\n        #ktg031-container .body .table-container #ktg031-grid .column-date {\n          width: 80px;\n          text-align: right;\n          padding-right: 5px;\n        }\n        #ktg031-container .body .table-container #ktg031-grid .column-action {\n          width: 50px;\n          text-align: center;\n        }\n        #ktg031-container .body .table-container #ktg031-grid .img-icon:hover {\n          cursor: pointer;\n        }\n      </style>\n    "
                                })
                            ], Ktg031ComponentViewModel);
                            return Ktg031ComponentViewModel;
                        }(ko.ViewModel));
                        a.Ktg031ComponentViewModel = Ktg031ComponentViewModel;
                        var AlarmDisplayDataDto = /** @class */ (function () {
                            function AlarmDisplayDataDto(vm, init) {
                                $.extend(this, init);
                                var model = this;
                                var occurrenceDateTime = moment.utc(model.occurrenceDateTime);
                                model.dateMonth = occurrenceDateTime.format('M/D');
                                var isReaded = false;
                                if (model.alreadyDatetime) {
                                    var alreadyDatetime = moment.utc(model.alreadyDatetime);
                                    isReaded = occurrenceDateTime.isBefore(alreadyDatetime);
                                }
                                model.isReaded = ko.observable(isReaded);
                                model.isReaded.subscribe(function (value) {
                                    if (value) {
                                        vm.changeToRead(model.companyId, model.sid, model.displayAtr, model.alarmClassification, model.patternCode, model.notificationId);
                                    }
                                    else {
                                        vm.changeToUnread(model.companyId, model.sid, model.displayAtr, model.alarmClassification, model.patternCode, model.notificationId);
                                    }
                                });
                                /**
                                 * set order
                                 *
                                 * 1：アラームリスト
                                 * 2：更新処理自動実行業務エラー
                                 * 3：更新処理自動実行動作異常
                                 * 4：ヘルス×ライフメッセージ
                                 *
                                 * order 3/2/1/4  => 2/1/0/3
                                 */
                                switch (model.alarmClassification) {
                                    case 0:
                                        model.order = 2;
                                        break;
                                    case 1:
                                        model.order = 1;
                                        break;
                                    case 2:
                                        model.order = 0;
                                        break;
                                    case 3:
                                        model.order = 3;
                                        break;
                                    default:
                                        model.order = 4;
                                        break;
                                }
                            }
                            AlarmDisplayDataDto.prototype.changeReadStatus = function () {
                                this.isReaded(!this.isReaded());
                            };
                            return AlarmDisplayDataDto;
                        }());
                        var ToppageAlarmDataReadCommand = /** @class */ (function () {
                            function ToppageAlarmDataReadCommand(init) {
                                $.extend(this, init);
                            }
                            return ToppageAlarmDataReadCommand;
                        }());
                        var ToppageAlarmDataUnreadCommand = /** @class */ (function () {
                            function ToppageAlarmDataUnreadCommand(init) {
                                $.extend(this, init);
                            }
                            return ToppageAlarmDataUnreadCommand;
                        }());
                        var Kal001BParam = /** @class */ (function () {
                            function Kal001BParam(init) {
                                $.extend(this, init);
                            }
                            return Kal001BParam;
                        }());
                        var AlarmClassification;
                        (function (AlarmClassification) {
                            /** アラームリスト */
                            AlarmClassification[AlarmClassification["ALARM_LIST"] = 0] = "ALARM_LIST";
                            /** 更新処理自動実行業務エラー */
                            AlarmClassification[AlarmClassification["AUTO_EXEC_BUSINESS_ERR"] = 1] = "AUTO_EXEC_BUSINESS_ERR";
                            /** 更新処理自動実行動作異常 */
                            AlarmClassification[AlarmClassification["AUTO_EXEC_OPERATION_ERR"] = 2] = "AUTO_EXEC_OPERATION_ERR";
                            /** ヘルス×ライフメッセージ */
                            AlarmClassification[AlarmClassification["HEALTH_LIFE_MESSAGE"] = 3] = "HEALTH_LIFE_MESSAGE";
                        })(AlarmClassification || (AlarmClassification = {}));
                        var DisplayAtr;
                        (function (DisplayAtr) {
                            /** 本人 */
                            DisplayAtr[DisplayAtr["PRINCIPAL"] = 0] = "PRINCIPAL";
                            /** 上長 */
                            DisplayAtr[DisplayAtr["SUPERIOR"] = 1] = "SUPERIOR";
                            /** 担当者 */
                            DisplayAtr[DisplayAtr["PIC"] = 2] = "PIC";
                        })(DisplayAtr || (DisplayAtr = {}));
                    })(a = ktg031.a || (ktg031.a = {}));
                })(ktg031 = view.ktg031 || (view.ktg031 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ktg031.a.component.js.map