/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.ktg031.b {

  // URL API backend
  const API = {
    findProcessExecution: "at/function/processexec/getProcExecList",
    findAlarmSetting: "at/function/alarm/pattern/setting",
  };

  @bean()
  export class ScreenModel extends ko.ViewModel {
    columns: KnockoutObservableArray<any> = ko.observableArray([]);
    listSetting: KnockoutObservableArray<AlarmDisplaySettingDto> = ko.observableArray([]);
    currentRow: KnockoutObservable<any> = ko.observable(null);
    mapAlarmCodeName: any = {};

    created(params: any) {
      const vm = this;
      vm.columns([
        { key: 'rowNumber', hidden: true },
        { headerText: vm.$i18n('KTG031_21'), key: 'classification', width: 150 },
        { headerText: vm.$i18n('KTG031_22'), key: 'alarmProcessing', width: 280 },
        { headerText: vm.$i18n('KTG031_23'), key: 'isDisplay', width: 120 },
      ]);
      vm.getProcessExecution();
    }

    mounted() {
      $('#closebtn').focus();
    }

    private getProcessExecution() {
      const vm = this;
      vm.$blockui('grayout');
      vm.$ajax("at", API.findAlarmSetting)
        .then((res: AlarmPatternSettingDto[]) => {
          for (const alarm of res) {
            vm.mapAlarmCodeName[alarm.alarmPatternCD] = alarm.alarmPatternName;
          }
          return vm.$ajax("at", API.findProcessExecution);
        })
        .then((res: ProcessExecutionDto[]) => {
          const listAlarmSetting: AlarmDisplaySettingDto[] = _.map(res, (item, index) => {
            // トップページに表示（本人） and トップページに表示（管理者）
            let isDisplayMessage = '';
            const mailPrincipal = item.execSetting.alarmExtraction.displayOnTopPagePrincipal;
            const mailAdministrator = item.execSetting.alarmExtraction.displayOnTopPageAdministrator;
            const alarmCode = item.execSetting.alarmExtraction.alarmCode;
            if (mailPrincipal && mailAdministrator) {
              isDisplayMessage = vm.$i18n('KTG031_29');
            } else if (mailPrincipal) {
              isDisplayMessage = vm.$i18n('KTG031_30');
            } else if (mailAdministrator) {
              isDisplayMessage = vm.$i18n('KTG031_31');
            } else {
              isDisplayMessage = vm.$i18n('KTG031_32');
            }
            return new AlarmDisplaySettingDto({
              rowNumber: index,
              classification: vm.$i18n('KTG031_25'),
              alarmProcessing: `${item.execItemName}（${vm.mapAlarmCodeName[alarmCode]}）`,
              isDisplay: isDisplayMessage,
            });
          });
          const lastIndex = listAlarmSetting.length;
          listAlarmSetting.push(new AlarmDisplaySettingDto({
            rowNumber: lastIndex + 1,
            classification: vm.$i18n('KTG031_26'),
            alarmProcessing: vm.$i18n('KTG031_33'),
            isDisplay: vm.$i18n('KTG031_28'),
          }));
          listAlarmSetting.push(new AlarmDisplaySettingDto({
            rowNumber: lastIndex + 2,
            classification: vm.$i18n('KTG031_26'),
            alarmProcessing: vm.$i18n('KTG031_34'),
            isDisplay: vm.$i18n('KTG031_28'),
          }));
          listAlarmSetting.push(new AlarmDisplaySettingDto({
            rowNumber: lastIndex + 3,
            classification: vm.$i18n('KTG031_27'),
            alarmProcessing: vm.$i18n('KTG031_35'),
            isDisplay: vm.$i18n('KTG031_32'),
          }));
          console.log(listAlarmSetting);
          vm.listSetting(listAlarmSetting);
        })
        .always(() => vm.$blockui('clear'));
    }

    public closeDialog() {
      const vm = this;
      vm.$window.close();
    }
  }

  class AlarmDisplaySettingDto {
    rowNumber: number;
    classification: string;
    alarmProcessing: string;
    isDisplay: string;

    constructor(init?: Partial<AlarmDisplaySettingDto>) {
      $.extend(this, init);
    }
  }

  interface AlarmPatternSettingDto {
    alarmPatternCD: string;
    alarmPatternName: string;
    alarmPerSet: any;
    checkConList: any[];
  }

  interface ProcessExecutionDto {
    companyId: string;
    execItemCode: string;
    execItemName: string;
    execScope: any;
    execSetting: any;
    executionType: number;
    reExecCondition: any;
    cloudCreFlag: boolean;
  }
}
