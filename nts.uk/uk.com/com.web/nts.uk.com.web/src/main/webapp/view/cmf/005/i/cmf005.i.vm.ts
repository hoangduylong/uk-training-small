/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.cmf005.i {
  import getText = nts.uk.resource.getText;

  @bean()
  export class ScreenModel extends ko.ViewModel {
    dateValue: KnockoutObservable<any> = ko.observable({
      startDate: null,
      endDate: null,
    });
    baseDateValue: KnockoutObservable<any> = ko.observable({
      startDate: null,
      endDate: null,
    });
    searchItems: KnockoutObservableArray<SaveSetHistoryDto> = ko.observableArray([
      { rowNumber: 1, patternCode: '', saveName: 'すべて' }
    ]);
    searchValue: KnockoutObservable<any> = ko.observable();
    resultItems: KnockoutObservableArray<DataDto> = ko.observableArray([]);
    resultValue: KnockoutObservable<DataDto> = ko.observable(null);
    columnHeaders: any[] = [
      { headerText: '', key: 'rowNumber', width: '40px' },
      { headerText: getText("CMF005_19"), key: 'patternCode', width: '100px', ntsControl: 'Label' },
      { headerText: getText('CMF005_20'), key: 'delName', width: '200px', ntsControl: 'Label' }
    ];
    columnHeadersRes: any[] = [
      { headerText: '', key: 'rowNumber', width: '30px' },
      { headerText: getText('CMF005_127'), key: 'deleteFile', width: '90px', dataType: 'string', ntsControl: "Button" },
      { headerText: getText('CMF005_128'), key: 'downloadFile', width: '90px', dataType: 'string', ntsControl: "FlexImage" },
      { headerText: getText('CMF005_129'), key: 'delete', width: '75px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_130'), key: 'startDateTimeDel', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_131'), key: 'practitioner', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_132'), key: 'delName', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_133'), key: 'delType', width: '75px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_134'), key: 'numberEmployees', width: '75px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_135'), key: 'fileName', width: '240px', dataType: 'string', ntsControl: "Label" },
      { headerText: getText('CMF005_136'), key: 'fileSize', width: '100px', dataType: 'string', ntsControl: "Label" },
    ];
    states: State[] = [];
    dataGrid: any;
    storageSize: KnockoutObservable<number> = ko.observable(0);

    created() {
      const vm = this;
      vm.dateValue.subscribe((value: any) => {
        if (value.startDate !== vm.baseDateValue().startDate || value.endDate !== vm.baseDateValue().endDate) {
          vm.baseDateValue({ startDate: value.startDate, endDate: value.endDate });
          vm.findSaveSet();
        }
      });
      vm.loadDataGrid();
    }

    mounted() {
      const vm = this;
      const previousDateText: string = moment.utc().subtract(1, 'months').add(1, 'days').format("YYYY/MM/DD");
      const currentDateText: string = moment.utc().format("YYYY/MM/DD");
      vm.dateValue({
        startDate: previousDateText,
        endDate: currentDateText
      });
      $("#I3_1_1 .ntsStartDate input").focus();
    }

    private findSaveSet() {
      const vm = this;
      vm.$blockui("grayout");
      const momentFrom = moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString();
      const momentTo = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString();
      service.findSaveSetHistory(momentFrom, momentTo)
        .then((data: SaveSetHistoryDto[]) => {
          const res: SaveSetHistoryDto[] = [
            { rowNumber: 1, patternCode: '', delName: 'すべて' }
          ];
          if (data && data.length) {
            _.each(data, (x, i) => {
              x.rowNumber = i + 2;
              res.push(x);
            });
          }
          vm.searchItems(res);
          vm.searchValue(1);
          //Create green rowNumber column
          $("document").ready(() => {
            $("#J3_1 tbody td:first-child").each(function (index) {
              $(this).css('background-color', '#cff1a5');
            });
          })
        })
        .then(() => vm.findData())
        .always(() => vm.$blockui("clear"));
    }

    public startFindData() {
      const vm = this;
      vm.$blockui("grayout");
      vm.findData().always(() => vm.$blockui("clear"));
    }

    public findData(): JQueryPromise<any> {
      const vm = this;
      let arr: FindDataHistoryDto[] = [];
      let searchValue: SaveSetHistoryDto;
      if (Number(vm.searchValue()) === 1) {
        arr = _.map(_.filter(vm.searchItems(), data => data.rowNumber !== 1), data => new FindDataHistoryDto(data.patternCode, data.delName));
      } else {
        searchValue = vm.getSearchValue(vm.searchValue());
        arr.push(new FindDataHistoryDto(searchValue.patternCode, searchValue.delName));
      }
      const param = {
        objects: arr,
        from: moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString(),
        to: moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString(),
      };
      return service.findData(param).then((data: DataDto[]) => {
        const res: DataDto[] = [];
        if (data && data.length) {
          _.each(data, (x, i) => {
            x.rowNumber = i + 1;
            x.id = nts.uk.util.randomId();
            x.numberEmployees += "人";
            x.fileSize = Math.round(Number(x.fileSize) / 1024) + "KB";
            x.saveStartDatetime = moment.utc(x.saveStartDatetime).format("YYYY/MM/DD HH:mm:ss");
            x.startDateTimeDel = moment.utc(x.startDateTimeDel).format("YYYY/MM/DD HH:mm:ss");
            x.delete = getText("CMF005_141");
            x.delType = getText(x.delType);
            x.deleteFile = !x.deletedFilesFlg ? "1" : null;
            x.downloadFile = !x.deletedFilesFlg ? "1" : null;
            res.push(x);
          });
        }
        vm.resultItems(res);
        vm.loadDataGrid();
      });
    }

    public getSearchValue(val: any): SaveSetHistoryDto {
      const vm = this;
      return _.filter(vm.searchItems(), data => data.rowNumber === Number(val)).pop();
    }

    public loadDataGrid() {
      const vm = this;
      if ($("#I5").data("mGrid")) {
        $("#I5").mGrid("destroy");
      }
      vm.states = [];
      _.forEach(vm.resultItems(), item => {
        if (item && item.deletedFilesFlg) {
          vm.states.push(new State(item.id, 'deleteFile', ['hidden-item']));
          vm.states.push(new State(item.id, 'downloadFile', ['hidden-item']));
        }
      });
      vm.dataGrid = new (nts.uk.ui as any).mgrid.MGrid($("#I5")[0], {
        height: 800,
        subHeight: 575,
        headerHeight: "40px",
        autoFitWindow: false,
        dataSource: vm.resultItems(),
        primaryKey: 'id',
        primaryKeyDataType: 'number',
        value: vm.resultValue(),
        rowVirtualization: true,
        virtualization: true,
        virtualizationMode: 'continuous',
        enter: 'right',
        useOptions: true,
        idGen: (id: any) => id + "_" + nts.uk.util.randomId(),
        columns: vm.columnHeadersRes,
        virtualrecordsrender: (e: any, args: any) => vm.updateGridUI(),
        features: [
          {
            name: 'Paging',
            pageSize: 20,
            currentPageIndex: 0,
            loaded: () => vm.updateGridUI()
          },
          {
            name: 'ColumnFixing', fixingDirection: 'left',
            showFixButtons: true,
            columnSettings: [
              { columnKey: 'rowNumber', isFixed: true }
            ]
          },
          {
            name: 'Resizing'
          },
          {
            name: 'CellStyles',
            states: vm.states
          },
        ],
        ntsControls: [
          { name: 'Button', controlType: 'Button', text: getText('CMF005_141'), enable: true, click: (i: any) => vm.deleteFile(i) },
          { name: 'FlexImage', controlType: 'Button', source: 'download-icon', text: ' ', enable: true, click: (i: any) => vm.download(i) },
        ]
      }).create();

      $("#I5").ready(function () {
        vm.updateGridUI();
      });

      $("#I5 .mgrid-free").scroll(function () {
        vm.updateGridUI();
      });
    }

    private updateGridUI() {
      $("#I5 .mcell").addClass("halign-center");
      $("#I5 .mcell:nth-child(2) button").addClass("download-icon");
    }

    private download(value: any) {
      const vm = this;
      nts.uk.request.specials.donwloadFile(value.fileId);
    }

    private deleteFile(value: any) {
      const vm = this;
      /**
       * 確認メッセージ（Msg_18）を表示する
       */
      vm.$dialog.confirm({ messageId: 'Msg_18' }).then((result: 'no' | 'yes' | 'cancel') => {
        /**
         * 「いいえ」（ID：Msg_36）をクリック
         */
        if (result === 'no') {
          /**
           * 終了状態：削除処理をキャンセル
           */
          return;
        }
        /**
         * 「はい」（ID：Msg_35）をクリック
         */
        if (result === 'yes') {
          if (value.fileId) {
            vm.$blockui("grayout");
            /**
             * 終了状態：削除処理を実行
             */
            (nts.uk.request as any).file.remove(value.fileId);
            service.deleteData(value.fileId).then(() => {
              const item = _.find(vm.resultItems(), { fileId: value.fileId });
              item.downloadFile = null;
              item.deleteFile = null;
              item.deletedFilesFlg = true;
              vm.resultItems.valueHasMutated();
              vm.loadDataGrid();
            }).always(() => {
              vm.$blockui("clear");
            });
          }
        }
      });
    }
  }

  export class FindDataHistoryDto {
    patternCode: string;
    saveName: string;

    constructor(patternCode: string, saveName: string) {
      this.patternCode = patternCode;
      this.saveName = saveName;
    }
  }

  export class State {
    rowId: string;
    columnKey: string;
    state: any[];

    constructor(rowId: string, columnKey: string, state: any[]) {
      this.rowId = rowId;
      this.columnKey = columnKey;
      this.state = state;
    }
  }

  export interface SaveSetHistoryDto {
    rowNumber: number;
    patternCode: string;
    delName: string;
  }

  export class DataDto {
    rowNumber: number;
    id: string;
    fileSize: string;
    delCode: string;
    fileName: string;
    delName: string;
    delType: string;
    saveStartDatetime: string;
    startDateTimeDel: string;
    deletedFilesFlg: boolean;
    sId: string;
    numberEmployees: string;
    fileId: string;
    delete: string;
    downloadFile: string;
    deleteFile: string;
  }
}
