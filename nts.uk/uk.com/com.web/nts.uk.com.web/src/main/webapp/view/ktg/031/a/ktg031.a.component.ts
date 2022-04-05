/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ktg031.a {

  const API = {
    findAlarmData: "sys/portal/toppageAlarm/findAlarmData",
    changeToRead: 'sys/portal/toppageAlarm/changeAlarmToReaded',
    changeToUnread: 'sys/portal/toppageAlarm/changeAlarmToUnread',
    checkUpdateAutoExecError: 'screen/at/ktg/ktg031/check-update-auto-exec-error',
  }

  @component({
    name: 'ktg031-component',
    template: `
      <div class="widget-title">
        <table style="width: 100%;">
        <colgroup>
            <col width="auto" />
            <col width="110px" />
            <col width="30px" />
        </colgroup>
        <thead>
            <tr>
              <th class="ktg031-fontsize">
                <div data-bind="ntsFormLabel: { required: false, text: $component.$i18n('KTG031_11') }"></div>
              </th>
              <th class="flex valign-center" style="text-align: left;">
                <div data-bind="ntsComboBox: {
                  name: '#[KTG031_10]',
                  width: 110,
                  value: $component.selectedAlarmType,
                  options: $component.listAlarmType,
                  optionsValue: 'code',
                  optionsText: 'name',
                  visibleItemsCount: 5,
                  required: true,
                  selectFirstIfNull: true,
                  columns: [
                    { prop: 'name' }
                  ]}"></div>
              </th>
              <th>
                <div data-bind="if: $component.isEmployee">
                  <i class="img-icon" style="vertical-align: middle;" data-bind="ntsIcon: {no: 5, width: 25, height: 25}, click: $component.openDialogSetting"></i>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div data-bind="widget-content: 100, default: 410" id="ktg031-container">
        <div class="body" style="height: calc(100% - 5px);">
          <div class="table-container">
            <table id="ktg031-grid" style="width: 100%;">
              <colgroup>
                <col width="80px" />
                <col width="auto" />
                <col width="1px" />
                <col width="auto" />
                <col width="30px" />
              </colgroup>
              <tbody data-bind="foreach: $component.listAlarm">
                <tr style="height: 40px">
                  <td class="column-date border-before">
                    <span data-bind="text: dateMonth"></span>
                    <span data-bind="text: $component.$i18n('KTG031_13')"></span>
                  </td>
                  <td>
                    <span class="limited-label" style="vertical-align: middle;" data-bind="text: displayMessage"></span>
                  </td>
                  <td class="border-after"></td>
                  <td class="column-action">
                    <button style="color: #79E68B; border: 1px solid;" class="small" data-bind="
                      visible: isReaded,
                      text: $component.$i18n('KTG031_41'),
                      click: changeReadStatus">
                    </button>
                    <button style="color: #79E68B; border: 1px solid;" class="small" data-bind="
                      visible: !isReaded(),
                      text: $component.$i18n('KTG031_42'),
                      click: changeReadStatus">
                    </button>
                  </td>
                  <td class="column-action">
                    <i class="img-icon" data-bind="ntsIcon: {no: 178, width: 20, height: 20}, click: function() { $component.onClickUrl(alarmClassification, displayAtr, subSids, linkUrl); }"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style type="text/css" rel="stylesheet">
        .column-action .img-icon {
          vertical-align: middle;
        }
        .ktg031-fontsize div.form-label>span.text {
          font-size: 1.2rem !important;
        }
        .border-before,
        .border-after {
          position: relative;
        }
        .border-before:before {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 30px;
          border-right: 2px solid #C6C6D1;
        }
        .border-after:after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 30px;
          border-left: 2px solid #C6C6D1;
        }
        #ktg031-container {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        #ktg031-container .ktg031-header-line {
          width: 100%;
          height: 5px;
          background-color: #689f38;
        }
        #ktg031-container .body {
          padding: 5px;
          box-sizing: border-box;
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        #ktg031-container .body .body-top-row {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        #ktg031-container .body .body-top-row .body-top-label {
          width: 100%;
          padding-left: 10px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        #ktg031-container .body .body-top-row .body-top-label .label {
          font-size: 1.2rem;
        }
        #ktg031-container .body .body-top-row .body-top-label .img-icon:hover {
          cursor: pointer;
        }
        #ktg031-container .body .table-container {
          height: 100%;
          margin-top: 5px;
          overflow-y: auto;
          border: 1px solid #C6C6D1;
        }
        #ktg031-container .body .table-container #ktg031-grid {
          width: 100%;
          table-layout: fixed;
        }
        #ktg031-container .body .table-container #ktg031-grid tr.even {}
        #ktg031-container .body .table-container #ktg031-grid td {
          padding: 3px;
          box-sizing: border-box;
          border-bottom: none !important;
        }
        #ktg031-container .body .table-container #ktg031-grid .column-date {
          width: 80px;
          text-align: right;
          padding-right: 5px;
        }
        #ktg031-container .body .table-container #ktg031-grid .column-action {
          width: 50px;
          text-align: center;
        }
        #ktg031-container .body .table-container #ktg031-grid .img-icon:hover {
          cursor: pointer;
        }
      </style>
    `
  })
  export class Ktg031ComponentViewModel extends ko.ViewModel {
    isEmployee: KnockoutObservable<boolean> = ko.observable(false);
    selectedAlarmType: KnockoutObservable<number> = ko.observable(null);
    listAlarmType: KnockoutObservableArray<{ code: number, name: string }> = ko.observableArray([]);
    listAlarm: KnockoutObservableArray<AlarmDisplayDataDto> = ko.observableArray();
    $grid: JQuery;
    widget: string = 'KTG031A';
    created(params: any) {
      const vm = this;
      vm.listAlarmType([
        { code: 0, name: vm.$i18n('Enum_ToppageAlarmDisplay_UNREAD') },
        { code: 1, name: vm.$i18n('Enum_ToppageAlarmDisplay_ALL') },
      ]);
      vm.selectedAlarmType.subscribe(value => vm.loadAlarmData(value));
      vm.selectedAlarmType(0);
      vm.checkUpdateAutoExecError();
      vm.isEmployee(__viewContext.user.role.isInCharge.attendance);
    }

    checkUpdateAutoExecError() {
      const vm = this;
      vm.$ajax('at', API.checkUpdateAutoExecError).always(() => vm.$blockui('clear'));
    }

    loadAlarmData(displayType: number) {
      const vm = this;
      vm.$blockui('grayout');
      vm.$ajax(`${API.findAlarmData}/${displayType}`)
        .then((res: any[]) => vm.setListAlarm(res))
        .always(() => vm.$blockui('clear'));
    }

    changeToRead(companyId: string, sid: string, displayAtr: number, alarmClassification: number, patternCode: string, notificationId: string) {
      const vm = this;
      const command = new ToppageAlarmDataReadCommand({
        companyId: companyId,
        sid: sid,
        displayAtr: displayAtr,
        alarmClassification: alarmClassification,
        patternCode: patternCode,
        notificationId: notificationId
      });
      vm.$blockui('grayout');
      vm.$ajax(API.changeToRead, command)
        .then((res) => vm.$ajax(`${API.findAlarmData}/${vm.selectedAlarmType()}`))
        .then((res: any[]) => vm.setListAlarm(res, true))
        .always(() => vm.$blockui('clear'));
    }

    setListAlarm(res: any[], stopReload?: boolean) {

      if (stopReload) {
        return;
      }

      const vm = this;

      const alarmList = _.map(res, (item) => new AlarmDisplayDataDto(vm, item));
      
      const sortedList = _.orderBy(alarmList, ["order", "occurrenceDateTime", "patternCode", "notificationId", "displayAtr"]);

      vm.listAlarm(sortedList);
      // Render row backgournd color
      vm.$nextTick(() => {
        vm.$grid = $('#ktg031-grid');
        $("#ktg031-grid tr:nth-child(even)").addClass("even");
        $("#ktg031-grid tr:nth-child(odd)").addClass("odd");
      });
    }

    changeToUnread(companyId: string, sid: string, displayAtr: number, alarmClassification: number, patternCode: string, notificationId: string) {
      const vm = this;
      const command = new ToppageAlarmDataUnreadCommand({
        companyId: companyId,
        sid: sid,
        displayAtr: displayAtr,
        alarmClassification: alarmClassification,
        patternCode: patternCode,
        notificationId: notificationId,
      });
      vm.$blockui('grayout');
      vm.$ajax(API.changeToUnread, command)
        .always(() => vm.$blockui('clear'));
    }

    openDialogSetting() {
      const vm = this;
      vm.$window.modal('/view/ktg/031/b/index.xhtml');
    }

    onClickUrl (alarmClassification: number, displayAtr: number, subSids: string[], url: string) {

      const vm = this;

      switch (alarmClassification) {

        case AlarmClassification.ALARM_LIST:
          let kal001BParam = new Kal001BParam({
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
          } else if (displayAtr === DisplayAtr.SUPERIOR) {
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
    }

    openUrl (url: string): JQueryPromise<any> {
      const vm = this;
      if (url) {
        const origin: string = window.location.origin;
        if (url.indexOf(origin) !== -1) {
          // UK system pages
          const comPath = 'nts.uk.com.web';
          const comPagePath = vm.getUKSystemPath(url, comPath);
          if (comPagePath) {
            vm.$jump.self("com", comPagePath);
            return;
          }

          const atPath = 'nts.uk.at.web';
          const atPagePath = vm.getUKSystemPath(url, atPath);
          if (atPagePath) {
            vm.$jump.self("at", atPagePath);
            return;
          }
        } else {
          // Other system pages
          window.open(url);
        }
      }
    }

    openDialogUrl (url: string): JQueryPromise<any> {
      const vm = this;
      if (url) {
        const comPath = '/nts.uk.com.web';
          if (url.indexOf(comPath) !== -1) {
            vm.$window.modal("com", url.replace(comPath, ""));
            return;
          }

        const atPath = '/nts.uk.at.web';
        if (url.indexOf(atPath) !== -1) {
          vm.$window.modal("at", url.replace(atPath, ""));
          return;
        }
      }
    }

    private getUKSystemPath(url: string, path: string): string {
      const pathIndex = url.lastIndexOf(path);
      if (pathIndex !== -1) {
        return url.substring(pathIndex + path.length, url.length);
      }
      return null;
    }

  }

  class AlarmDisplayDataDto {
    alarmClassification: number;
    occurrenceDateTime: string;
    displayMessage: string;
    companyId: string;
    sid: string;
    displayAtr: number;
    subSids: string[];
    patternCode: string;
    notificationId: string;
    linkUrl: string;
    alreadyDatetime: string;
    // Client info
    dateMonth: string;
    isReaded: KnockoutObservable<boolean>;
    order: number;

    constructor(vm: Ktg031ComponentViewModel, init?: Partial<AlarmDisplayDataDto>) {
      $.extend(this, init);
      const model = this;
      const occurrenceDateTime = moment.utc(model.occurrenceDateTime);
      model.dateMonth = occurrenceDateTime.format('M/D');
      let isReaded = false;
      if (model.alreadyDatetime) {
        const alreadyDatetime = moment.utc(model.alreadyDatetime);
        isReaded = occurrenceDateTime.isBefore(alreadyDatetime);
      }
      model.isReaded = ko.observable(isReaded);
      model.isReaded.subscribe((value) => {
        if (value) {
          vm.changeToRead(model.companyId, model.sid, model.displayAtr, model.alarmClassification, model.patternCode, model.notificationId);
        } else {
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
      switch(model.alarmClassification) {
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

    changeReadStatus() {
      this.isReaded(!this.isReaded())
    }
  }

  class ToppageAlarmDataReadCommand {
    companyId: string;
    sid: string;
    displayAtr: number;
    alarmClassification: number;
    patternCode: string;
    notificationId: string;

    constructor(init?: Partial<ToppageAlarmDataReadCommand>) {
      $.extend(this, init);
    }
  }

  class ToppageAlarmDataUnreadCommand {
    companyId: string;
    sid: string;
    displayAtr: number;
    alarmClassification: number;
    patternCode: string;
    notificationId: string;

    constructor(init?: Partial<ToppageAlarmDataUnreadCommand>) {
      $.extend(this, init);
    }
  }

  class Kal001BParam {

      extractingFlg: boolean; //処理中フラグ
      isExtracting: boolean; //処理中区分	
      listAlarmExtraValueWkReDto: any[]; //アラーム抽出結果	
      processId: any; //プロセスID	
      totalErAlRecord: number; //アラーム抽出結果の件数	
      currentAlarmCode: any; //アラームコード	
      employeeIds: string[]; //List＜社員ID＞
      isTopPage: boolean; //Toppage区分

    constructor(init?: Partial<Kal001BParam>) {
      $.extend(this, init);
    } 

  }

  enum AlarmClassification {
    /** アラームリスト */
    ALARM_LIST = 0,
	
    /** 更新処理自動実行業務エラー */
    AUTO_EXEC_BUSINESS_ERR = 1,
    
    /** 更新処理自動実行動作異常 */
    AUTO_EXEC_OPERATION_ERR = 2,
    
    /** ヘルス×ライフメッセージ */
    HEALTH_LIFE_MESSAGE = 3
  }

  enum DisplayAtr {
	/** 本人 */
	PRINCIPAL = 0,
	
	/** 上長 */
	SUPERIOR = 1,
	
	/** 担当者 */
	PIC =2
  }
}