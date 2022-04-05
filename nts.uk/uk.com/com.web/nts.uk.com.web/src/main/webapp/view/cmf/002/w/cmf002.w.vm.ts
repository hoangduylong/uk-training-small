/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.cmf002.w {
  const getTextResource = nts.uk.resource.getText;

  @bean()
  export class CMF002WViewModel extends ko.ViewModel {
    isNew: boolean = true;
    conditionSetCode: string = null;
    // W1
    listPeriodSetting: KnockoutObservableArray<any> = ko.observableArray([
      { code: 1, name: getTextResource("CMF002_275") },
      { code: 0, name: getTextResource("CMF002_276") },
    ]);
    selectedPeriodSetting: KnockoutObservable<any> = ko.observable(null);
    // W2
    listClosureDayAtr: KnockoutObservableArray<any> = ko.observableArray([]);
    selectedClosureDayAtr: KnockoutObservable<any> = ko.observable(null);
    // W3
    listStartDateSegment: KnockoutObservableArray<any> = ko.observableArray([
      { code: StartDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_542') },
      { code: StartDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_543') },
      { code: StartDateClassificationCode.DEADLINE_PROCESSING, name: getTextResource('CMF002_544') },
      { code: StartDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
      { code: StartDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
    ]);
    selectedStartDateSegment: KnockoutObservable<any> = ko.observable(null);
    // W4
    isStartDateAdjustment: KnockoutObservable<boolean> = ko.observable(null);
    isStartDateMonthAdjustment: KnockoutObservable<boolean> = ko.observable(null);
    startDateAdjustment: KnockoutObservable<any> = ko.observable(null);
    startDateSpecified: KnockoutObservable<any> = ko.observable(null);
    // W5
    listEndDateSegment: KnockoutObservableArray<any> = ko.observableArray([
      { code: EndDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_542') },
      { code: EndDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_543') },
      { code: EndDateClassificationCode.DEADLINE_PROCESSING, name: getTextResource('CMF002_544') },
      { code: EndDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
      { code: EndDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
    ]);
    selectedEndDateSegment: KnockoutObservable<any> = ko.observable(null);
    // W6
    isEndDateAdjustment: KnockoutObservable<boolean> = ko.observable(null);
    isEndDateMonthAdjustment: KnockoutObservable<boolean> = ko.observable(null);
    endDateAdjustment: KnockoutObservable<any> = ko.observable(null);
    endDateSpecified: KnockoutObservable<any> = ko.observable(null);
    // W7
    listBaseDateSegment: KnockoutObservableArray<any> = ko.observableArray([
      { code: BaseDateClassificationCode.DEADLINE_START, name: getTextResource('CMF002_547') },
      { code: BaseDateClassificationCode.DEADLINE_END, name: getTextResource('CMF002_548') },
      { code: BaseDateClassificationCode.SYSTEM_DATE, name: getTextResource('CMF002_545') },
      { code: BaseDateClassificationCode.OUTPUT_PERIOD_START, name: getTextResource('CMF002_549') },
      { code: BaseDateClassificationCode.OUTPUT_PERIOD_END, name: getTextResource('CMF002_550') },
      { code: BaseDateClassificationCode.DATE_SPECIFICATION, name: getTextResource('CMF002_546') },
    ]);
    selectedBaseDateSegment: KnockoutObservable<any> = ko.observable(null);
    // W8
    baseDateSpecified: KnockoutObservable<any> = ko.observable(null);
    isBaseDateSpecifiedEnable: KnockoutObservable<boolean> = ko.observable(false);

    mounted() {
      const vm = this;
      const params = nts.uk.ui.windows.getShared('CMF002_W_PARAMS');
      vm.conditionSetCode = params.conditionSetCode;
      vm.selectedPeriodSetting(1);
      // ※W3_2「開始日区分ドロップダウンリスト」が「05 日付指定」の場合、開始日調整を開始日指定する項目に変更。
      vm.selectedStartDateSegment.subscribe((value) => {
        vm.startDateAdjustment(null);
        vm.startDateSpecified(null);
        vm.isStartDateAdjustment(value === StartDateClassificationCode.DATE_SPECIFICATION);
        vm.isStartDateMonthAdjustment(value === StartDateClassificationCode.DEADLINE_PROCESSING);
      });
      // ※W5_2「開始日区分ドロップダウンリスト」が「05 日付指定」の場合、開始日調整を開始日指定する項目に変更。
      vm.selectedEndDateSegment.subscribe((value) => {
        vm.endDateAdjustment(null);
        vm.endDateSpecified(null);
        vm.isEndDateAdjustment(value === EndDateClassificationCode.DATE_SPECIFICATION);
        vm.isEndDateMonthAdjustment(value === EndDateClassificationCode.DEADLINE_PROCESSING);
      });
      // W7_2で06を選択している場合
      vm.selectedBaseDateSegment.subscribe((value) => {
        vm.baseDateSpecified(null);
        vm.isBaseDateSpecifiedEnable(value === BaseDateClassificationCode.DATE_SPECIFICATION);
      });

      vm.$blockui('grayout');
      // ドメインモデル「就業締め日」を取得する
      service.findAllClosureHistory()
        // 全ての取得した締め日名称をJ10_2「締め日区分ドロップダウンリスト」に表示する
        .then((response: ClosureHistoryFindDto[]) => vm.setListClosureHistory(response))
        // ドメインモデル「出力条件設定」を取得する
        .then(() => service.findOutputPeriodSetting(vm.conditionSetCode))
        //「出力期間設定」の情報を画面に表示する
        .then((response: any) => vm.setOutputPeriodSetting(response))
        .always(() => vm.$blockui('clear'));
    }

    /**
     * 全ての取得した締め日名称をJ10_2「締め日区分ドロップダウンリスト」に表示する
     * Set ClosureHistory
     */
    private setListClosureHistory(response: ClosureHistoryFindDto[]): JQueryPromise<any> {
      const dfd = $.Deferred();
      const vm = this;
      vm.listClosureDayAtr(response);
      return dfd.resolve();
    }

    /**
     * 「出力期間設定」の情報を画面に表示する
     * Set OutputPeriodSetting
     */
    private setOutputPeriodSetting(response: OutputPeriodSetDto): JQueryPromise<any> {
      const dfd = $.Deferred();
      const vm = this;
      if (response) {
        vm.isNew = false;
        vm.selectedPeriodSetting(response.periodSetting);
        vm.selectedClosureDayAtr(response.closureDayAtr);
        vm.selectedBaseDateSegment(response.baseDateClassification);
        vm.baseDateSpecified(response.baseDateSpecify);
        vm.selectedEndDateSegment(response.endDateClassification);
        vm.endDateSpecified(response.endDateSpecify);
        vm.endDateAdjustment(response.endDateAdjustment);
        vm.selectedStartDateSegment(response.startDateClassification);
        vm.startDateSpecified(response.startDateSpecify);
        vm.startDateAdjustment(response.startDateAdjustment);
      } else {
        vm.isNew = true;
      }
      return dfd.resolve();
    }

    /**
     * 期間設定を更新登録する
     * Save OutputPeriodSetting
     */
    public save() {
      const vm = this;
      const command: SaveOutputPeriodSetCommand = new SaveOutputPeriodSetCommand({
        isNew: vm.isNew,
        periodSetting: vm.selectedPeriodSetting(),
        conditionSetCode: vm.conditionSetCode,
        closureDayAtr: vm.selectedClosureDayAtr(),
        baseDateClassification: vm.selectedBaseDateSegment(),
        baseDateSpecify: vm.baseDateSpecified() ? moment.utc(vm.baseDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
        endDateClassification: vm.selectedEndDateSegment(),
        endDateSpecify: vm.endDateSpecified() ? moment.utc(vm.endDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
        endDateAdjustment: vm.endDateAdjustment() ? parseInt(vm.endDateAdjustment()) : null,
        startDateClassification: vm.selectedStartDateSegment(),
        startDateSpecify: vm.startDateSpecified() ? moment.utc(vm.startDateSpecified(), 'YYYY/MM/DD').toISOString() : null,
        startDateAdjustment: vm.startDateAdjustment() ? parseInt(vm.startDateAdjustment()) : null,
      });
      vm.$blockui('grayout');
      vm.$validate()
        .then((valid: boolean) => {
          if (!valid) {
            return $.Deferred().reject();
          }
          //「出力期間設定」に更新登録する
          return service.saveOutputPeriodSetting(command);
        })
        // 情報メッセージ（ID：Msg_15）を表示する
        .then((response) => {
          vm.$blockui('clear');
          return vm.$dialog.info({ messageId: 'Msg_15' });
        })
        // 画面を閉じる
        .then(() => {
          nts.uk.ui.windows.setShared('CMF002_B_PARAMS_FROM_W', command);
          vm.$window.close();
        })
        .always(() => vm.$blockui('clear'));
    }

    /**
     * キャンセルボタン押下時処理
     * Close dialog
     */
    public closeDialog() {
      const vm = this;
      // 閉じるの確認メッセージ => キャンセルの確認メッセージ
      vm.$dialog.confirm({ messageId: "Msg_19" })
        .then((result: 'no' | 'yes' | 'cancel') => {
          if (result === 'no') {
            //「閉じる処理をキャンセル」を選択した場合
            return;
          } else if (result === 'yes') {
            //「閉じる処理を実行」を選択した場合
            // 画面を閉じる
            vm.$window.close();
          }
        });
    }
  }

  // 開始日区分
  export class StartDateClassificationCode {
    static DEADLINE_START = 1;
    static DEADLINE_END = 2;
    static DEADLINE_PROCESSING = 3;
    static SYSTEM_DATE = 4;
    static DATE_SPECIFICATION = 5;
  }

  // 終了日区分
  export class EndDateClassificationCode {
    static DEADLINE_START = 1;
    static DEADLINE_END = 2;
    static DEADLINE_PROCESSING = 3;
    static SYSTEM_DATE = 4;
    static DATE_SPECIFICATION = 5;
  }

  // 基準日区分
  export class BaseDateClassificationCode {
    static DEADLINE_START = 1;
    static DEADLINE_END = 2;
    static SYSTEM_DATE = 3;
    static OUTPUT_PERIOD_START = 4;
    static OUTPUT_PERIOD_END = 5;
    static DATE_SPECIFICATION = 6;
  }

  export interface ClosureHistoryFindDto {
    /** The id. */
    id: number;
    /** The name. */
    name: string;
  }

  export interface OutputPeriodSetDto {
    cid: string;
    conditionSetCode: string;
    periodSetting: number;
    closureDayAtr: number;
    baseDateClassification: number;
    baseDateSpecify: string;
    startDateClassification: number;
    startDateSpecify: string;
    startDateAdjustment: number;
    endDateClassification: number;
    endDateSpecify: string;
    endDateAdjustment: number;
  }

  export class SaveOutputPeriodSetCommand {
    isNew: boolean;
    periodSetting: number;
    conditionSetCode: string;
    closureDayAtr: number;
    baseDateClassification: number;
    baseDateSpecify: string;
    startDateClassification: number;
    startDateSpecify: string;
    startDateAdjustment: number;
    endDateClassification: number;
    endDateSpecify: string;
    endDateAdjustment: number;

    constructor(init?: Partial<SaveOutputPeriodSetCommand>) {
      $.extend(this, init);
    }
  }
}
