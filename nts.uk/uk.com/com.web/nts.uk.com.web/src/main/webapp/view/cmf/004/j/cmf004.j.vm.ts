/// <reference path='../../../../lib/nittsu/viewcontext.d.ts' />

module nts.uk.com.view.cmf004.j {

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
    resultItems: KnockoutObservableArray<any> = ko.observableArray([]);
    resultValue: KnockoutObservable<any> = ko.observable(null);
    columnHeaders: any[] = [
      { headerText: '', key: 'rowNumber', width: '40px' },
      { headerText: nts.uk.resource.getText("CMF004_227"), key: 'patternCode', width: '100px', ntsControl: 'Label' },
      { headerText: nts.uk.resource.getText('CMF004_228'), key: 'saveName', width: '200px', ntsControl: 'Label' }
    ];
    columnHeadersRes: any[] = [
      { headerText: '', key: 'rowNumber', width: '30px' },
      { headerText: nts.uk.resource.getText('CMF004_240'), key: 'startDatetime', width: '200px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_241'), key: 'practitioner', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_242'), key: 'saveName', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_243'), key: 'restoreCount', width: '75px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_244'), key: 'fileName', width: '150px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_245'), key: 'saveCount', width: '75px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_246'), key: 'saveStartDatetime', width: '200px', dataType: 'string', ntsControl: "Label" },
      { headerText: nts.uk.resource.getText('CMF004_247'), key: 'executionResult', width: '100px', dataType: 'string', ntsControl: "Label" }
    ];
    states: State[] = [];
    dataGrid: any;

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
      $("#J2_4 .ntsStartDate input").focus();
    }

    private findSaveSet() {
      const vm = this;
      vm.$blockui("grayout");
      const momentFrom = moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString();
      const momentTo = moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString();
      service.findSaveSetHistory(momentFrom, momentTo)
        .then((data: SaveSetHistoryDto[]) => {
          console.log(data);
          const res: SaveSetHistoryDto[] = [
            { rowNumber: 1, patternCode: '', saveName: 'すべて' }
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
            $("#J3 tbody td:first-child").each(function (index) {
              $(this).css('background-color', '#cff1a5');
            });
          });
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
        arr = vm.searchItems()
          .filter(data => data.rowNumber !== 1)
          .map(data => new FindDataHistoryDto(data.patternCode, data.saveName));
      } else {
        searchValue = vm.getSearchValue(vm.searchValue());
        arr.push(new FindDataHistoryDto(searchValue.patternCode, searchValue.saveName));
      }
      const param = {
        objects: arr,
        from: moment.utc(vm.dateValue().startDate, "YYYY/MM/DD HH:mm:ss").toISOString(),
        to: moment.utc(vm.dateValue().endDate, "YYYY/MM/DD HH:mm:ss").add(1, 'days').subtract(1, 'seconds').toISOString(),
      };
      return service.findData(param).then((data: Array<DataDto>) => {
        const res: DataDto[] = [];
        if (data && data.length) {
          _.each(data, (x, i) => {
            x.rowNumber = i + 1;
            x.id = nts.uk.util.randomId();
            x.restoreCount += "人";
            x.saveCount += "人";
            x.startDatetime = moment.utc(x.startDatetime).format("YYYY/MM/DD HH:mm:ss");
            x.saveStartDatetime = moment.utc(x.saveStartDatetime).format("YYYY/MM/DD HH:mm:ss");
            res.push(x);

            if (x.executionResult === 'Enum_SaveStatus_FAILURE') {
              _.each(vm.columnHeadersRes, col => {
                vm.states.push(new State(x.id, col.key, ["red-color"]));
              })
            }
            x.executionResult = nts.uk.resource.getText(x.executionResult); 
          });
        }
        vm.resultItems(res);
        vm.loadDataGrid();
      });
    }

    public getSearchValue(val: any): SaveSetHistoryDto {
      const vm = this;
      return vm.searchItems().filter(data => data.rowNumber === Number(val)).pop();
    }

    public loadDataGrid() {
      const vm = this;
      if ($("#J6").data("mGrid")) {
        $("#J6").mGrid("destroy");
      }
      vm.dataGrid = new (nts.uk.ui as any).mgrid.MGrid($("#J6")[0], {
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
            loaded: () => { }
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
            name: 'WidthSaving'
          },
          {
            name: 'CellStyles',
            states: vm.states
          },
        ]
      }).create();

      $("#J6").ready(function () {
        vm.updateGridUI();
      });

      $("#J6 .mgrid-free").scroll(function () {
        vm.updateGridUI();
      });
    }

    private updateGridUI() {
      $("#J6 .mcell").addClass("halign-center");
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
    saveName: string;
  }

  export interface DataDto {
    rowNumber: number;
    id: string;
    startDatetime: string;
    practitioner: string;
    saveName: string;
    restoreCount: string;
    fileName: string;
    saveCount: string;
    saveStartDatetime: string;
    executionResult: string;
  }
}
