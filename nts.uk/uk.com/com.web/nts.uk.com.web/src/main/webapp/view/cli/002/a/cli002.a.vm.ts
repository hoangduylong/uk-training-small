/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />

module nts.uk.com.view.cli002.a {
  const API = {
    findBySystem: "sys/portal/pginfomation/findBySystem",
    updateLogSetting: "sys/portal/logsettings/update",
  };

  @bean()
  export class ScreenModel extends ko.ViewModel {
    $grid!: JQuery;

    public systemList: KnockoutObservableArray<SystemTypeModel> = ko.observableArray([
      new SystemTypeModel({
        index: 0,
        localizedName: this.$i18n("Enum_SystemType_PERSON_SYSTEM"),
      }),
      new SystemTypeModel({
        index: 1,
        localizedName: this.$i18n("Enum_SystemType_ATTENDANCE_SYSTEM"),
      }),
      new SystemTypeModel({
        index: 2,
        localizedName: this.$i18n("Enum_SystemType_PAYROLL_SYSTEM"),
      }),
      new SystemTypeModel({
        index: 3,
        localizedName: this.$i18n("Enum_SystemType_OFFICE_HELPER"),
      }),
    ]);

    public dataSourceItem: KnockoutObservableArray<PGInfomationModel> = ko.observableArray([]);
    public selectedSystemCode: KnockoutObservable<number> = ko.observable(0);

    public systemColumns = [
      {
        headerText: "",
        prop: "index",
        width: 160,
        hidden: true,
      },
      {
        headerText: this.$i18n("CLI002_3"),
        prop: "localizedName",
        width: 160,
      },
    ];

    mounted() {
      const vm = this;

      vm.$grid = $("#item-list");

      vm.selectedSystemCode.subscribe((newValue) => {
        if (vm.$grid.data("igGrid")) {
          vm.$grid.ntsGrid("destroy");
        }
        // アルゴリズム「ログ設定画面表示」を実行する
        vm.$nextTick(() => vm.getData(newValue));
      });
      vm.selectedSystemCode.valueHasMutated();
    }

    /**
     *
     */
    public register() {
      const vm = this;
      const logSettings: LogSettingSaveDto[] = _.map(
        vm.dataSourceItem(),
        (item) =>
          new LogSettingSaveDto({
            system: vm.selectedSystemCode(),
            programId: item.programId,
            menuClassification: item.menuClassification,
            loginHistoryRecord: item.logLoginDisplay ? 1 : 0,
            startHistoryRecord: item.logStartDisplay ? 1 : 0,
            updateHistoryRecord: item.logUpdateDisplay ? 1 : 0,
            programCd: item.programCd,
          })
      );
      const command = new LogSettingSaveCommand({
        logSettings: logSettings,
      });
      // ログ設定更新
      vm.$blockui("grayout");
      vm.$ajax(API.updateLogSetting, command)
        .then(() => {
          vm.$blockui("clear");
          // 情報メッセージ（Msg_15）を表示する
          vm.$dialog.info({ messageId: "Msg_15" });
        })
        .always(() => vm.$blockui("clear"));
    }

    /**
     * ログ設定画面を表示する
     * @param systemType
     */
    private getData(systemType: number) {
      const vm = this;
      vm.$blockui("grayout")
        .then(() => vm.$ajax(`${API.findBySystem}/${systemType}`))
        .then((response: PGListDto[]) => {
          const listPG: PGInfomationModel[] = _.map(
            response,
            (item, index) => new PGInfomationModel({
              rowNumber: index + 1,
              functionName: item.functionName,
              logLoginDisplay: item.loginHistoryRecord.usageCategory === 1,
              logStartDisplay: item.bootHistoryRecord.usageCategory === 1,
              logUpdateDisplay: item.editHistoryRecord.usageCategory === 1,
              programId: item.programId,
              menuClassification: item.menuClassification,
              programCd: item.programCd,
            })
          );
          vm.dataSourceItem(listPG);
          vm.initGrid(response);
        })
        .always(() => vm.$blockui("clear"));
    }

    private initGrid(response: PGListDto[]) {
      const vm = this;
      const statesTable: CellStateModel[] = [];
      const { color } = (nts.uk.ui.jqueryExtentions as any).ntsGrid;
      const stateDisabled = [color.Disable];

      response.forEach((item: PGListDto, index) => {
        // ※１ PG一覧．PG情報．ログイン履歴の記録．活性区分　＝　True
        if (item.loginHistoryRecord.activeCategory === 0) {
          statesTable.push(
            new CellStateModel({
              rowId: index + 1,
              columnKey: "logLoginDisplay",
              state: stateDisabled,
            })
          );
        }
        // ※2 PG一覧．PG情報．起動履歴記録．活性区分　＝　True
        if (item.bootHistoryRecord.activeCategory === 0) {
          statesTable.push(
            new CellStateModel({
              rowId: index + 1,
              columnKey: "logStartDisplay",
              state: stateDisabled,
            })
          );
        }
        // ※3 PG一覧．PG情報．起動履歴記録．活性区分　＝　True
        if (item.editHistoryRecord.activeCategory === 0) {
          statesTable.push(
            new CellStateModel({
              rowId: index + 1,
              columnKey: "logUpdateDisplay",
              state: stateDisabled,
            })
          );
        }
      });

      vm.$grid.ntsGrid({
        primaryKey: "rowNumber",
        height: "445px",
        dataSource: vm.dataSourceItem(),
        rowVirtualization: true,
        virtualization: true,
        virtualizationMode: "continuous",
        columns: [
          {
            headerText: "",
            key: "rowNumber",
            dataType: "number",
            width: "30px",
          },
          {
            headerText: this.$i18n("CLI002_7"),
            key: "functionName",
            dataType: "string",
            width: "350x",
          },
          {
            headerText: this.$i18n("CLI002_4"),
            key: "logLoginDisplay",
            dataType: "boolean",
            width: "200px",
            ntsControl: "Checkbox",
            showHeaderCheckbox: true,
          },
          {
            headerText: this.$i18n("CLI002_5"),
            key: "logStartDisplay",
            dataType: "boolean",
            width: "200px",
            ntsControl: "Checkbox",
            showHeaderCheckbox: true,
          },
          {
            headerText: this.$i18n("CLI002_6"),
            key: "logUpdateDisplay",
            dataType: "boolean",
            width: "200px",
            ntsControl: "Checkbox",
            showHeaderCheckbox: true,
          },
        ],
        features: [
          {
            name: "Selection",
            mode: "row",
            multipleSelection: false,
            activation: false
          },
        ],
        ntsFeatures: [
          // { name: 'CopyPaste' },
          {
            name: "CellState",
            rowId: "rowId",
            columnKey: "columnKey",
            state: "state",
            states: statesTable,
          },
        ],
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
      $("#item-list").setupSearchScroll("igGrid", true);
    }
  }

  export interface TargetSettingDto {
    usageCategory: number;
    activeCategory: number;
  }

  export interface PGListDto {
    functionName: string;
    loginHistoryRecord: TargetSettingDto;
    bootHistoryRecord: TargetSettingDto;
    editHistoryRecord: TargetSettingDto;
    programId: string;
    menuClassification: number;
    programCd: string;
  }

  export class PGInfomationModel {
    rowNumber: number;
    functionName: string;
    logLoginDisplay: boolean;
    logStartDisplay: boolean;
    logUpdateDisplay: boolean;
    programId: string;
    menuClassification: number;
    programCd: string;

    constructor(init?: Partial<PGInfomationModel>) {
      $.extend(this, init);
    }
  }

  export class LogSettingSaveDto {
    system: number;
    programId: string;
    menuClassification: number;
    loginHistoryRecord: number;
    startHistoryRecord: number;
    updateHistoryRecord: number;
    programCd: string;

    constructor(init?: Partial<LogSettingSaveDto>) {
      $.extend(this, init);
    }
  }

  export class LogSettingSaveCommand {
    logSettings: LogSettingSaveDto[];

    constructor(init?: Partial<LogSettingSaveCommand>) {
      $.extend(this, init);
    }
  }

  export class SystemTypeModel {
    index: number;
    localizedName: string;

    constructor(init?: Partial<SystemTypeModel>) {
      $.extend(this, init);
    }
  }

  export class CellStateModel {
    rowId: number;
    columnKey: string;
    state: any[];

    constructor(init?: Partial<CellStateModel>) {
      $.extend(this, init);
    }
  }
}
