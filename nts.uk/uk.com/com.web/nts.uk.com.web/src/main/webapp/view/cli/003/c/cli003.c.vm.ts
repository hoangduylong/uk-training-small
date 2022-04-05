/// <reference path="../../../../lib/nittsu/viewcontext.d.ts" />
module nts.uk.com.view.cli003.c {
  import EmployeeSearchDto = nts.uk.com.view.ccg.share.ccg.service.model.EmployeeSearchDto;
  import Ccg001ReturnedData = nts.uk.com.view.ccg.share.ccg.service.model.Ccg001ReturnedData;
  import ListType = kcp.share.list.ListType;
  import SelectType = kcp.share.list.SelectType;


  export class UnitModel {
    id: string;
    code: string;
    name: string;
    affiliationName: string;
    constructor(id: string, code: string, name: string, affiliationName: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.affiliationName = affiliationName;
    }
  }

  @bean()
  export class ScreenModel extends ko.ViewModel {
    roundingRules: KnockoutObservableArray<any>;
    selectedRuleCode: any;
    employeeList: KnockoutObservableArray<UnitModel>;
    initEmployeeList: KnockoutObservableArray<EmployeeSearchDto>;
    enable: KnockoutObservable<boolean>;
    enableTargetDate: KnockoutObservable<boolean>;
    required: KnockoutObservable<boolean>;
    dateValue: KnockoutObservable<any>;
    startDateString: KnockoutObservable<string>;
    endDateString: KnockoutObservable<string>;
    dateCtoE: KnockoutObservable<string>;
    targetEmployeeIdList: KnockoutObservableArray<any>;

    //just add
    employeeDeletionList: KnockoutObservableArray<any>;
    categoryDeletionList: KnockoutObservableArray<any>;
    selectedEmployeeCodeTarget: KnockoutObservableArray<any>;
    alreadySettingPersonal: KnockoutObservableArray<any>;
    selectedTitleAtr: KnockoutObservable<number>;
    listComponentOption: any;
    ccg001ComponentOption: any;
    formLabelTitle: KnockoutObservable<string> = ko.observable('');
    targetNumber: KnockoutObservable<string>= ko.observable('');

    initComponentC() {
      const vm = this;
      vm.initEmployeeList = ko.observableArray([]);
      vm.employeeDeletionList = ko.observableArray([]);
      vm.categoryDeletionList = ko.observableArray([]);
      vm.selectedEmployeeCodeTarget = ko.observableArray([]);
      // update id sau check
      vm.targetEmployeeIdList = ko.observableArray([]);

      vm.alreadySettingPersonal = ko.observableArray([]);

      vm.employeeList = ko.observableArray([]);
      //Date
      vm.enable = ko.observable(true);
      vm.enableTargetDate = ko.observable(true);
      vm.required = ko.observable(true);

      vm.startDateString = ko.observable("");
      vm.endDateString = ko.observable("");
      vm.dateValue = ko.observable({});

      vm.startDateString.subscribe(function (value) {
        vm.dateValue().startDate = value;
        vm.dateValue.valueHasMutated();
      });

      vm.endDateString.subscribe(function (value) {
        vm.dateValue().endDate = value;
        vm.dateValue.valueHasMutated();
      });

      vm.dateValue = ko.observable({
        startDate: moment.utc().format("YYYY/MM/DD"),
        endDate: moment.utc().format("YYYY/MM/DD"),
      });

      vm.selectedRuleCode = ko.observable(1);
      vm.selectedTitleAtr = ko.observable(0);
      vm.selectedTitleAtr.subscribe(function (value) {
        if (value === 1) {
          vm.applyKCP005ContentSearch(vm.initEmployeeList());
        } else {
          vm.applyKCP005ContentSearch([]);
        }
      });
    }

    initComponentCCG001() {
      const vm = this;
      // Set component option
      vm.ccg001ComponentOption = {
        showEmployeeSelection: false,
        systemType: 5,
        showQuickSearchTab: false,
        showAdvancedSearchTab: true,
        showBaseDate: true,
        showClosure: false,
        showAllClosure: false,
        showPeriod: false,
        periodFormatYM: false,
        isInDialog: true,
        /** Quick search tab options */
        showAllReferableEmployee: false,
        showOnlyMe: false,
        showSameWorkplace: false,
        showSameWorkplaceAndChild: false,

        /** Advanced search properties */
        showEmployment: true,
        showWorkplace: true,
        showClassification: true,
        showJobTitle: true,
        showWorktype: false,
        isMutipleCheck: true,

        /** Required parameter */
        baseDate: moment().toISOString(),
        periodStartDate: moment().toISOString(),
        periodEndDate: moment().toISOString(),
        inService: true,
        leaveOfAbsence: true,
        closed: true,
        retirement: true,
        /**
         * vm-defined function: Return data from CCG001
         * @param: data: the data return from CCG001
         */
        returnDataFromCcg001: function (data: Ccg001ReturnedData) {
          vm.selectedTitleAtr(1);
          data.listEmployee = _.orderBy(
            data.listEmployee,
            ["employeeCode"],
            ["asc", "asc"]
          );
          vm.employeeList();
            vm.applyKCP005ContentSearch(data.listEmployee);
        },
      };
    }

    initComponentKCP005() {
      //KCP005
      const vm = this;
      vm.listComponentOption = {
        isShowAlreadySet: false,
        isMultiSelect: true,
        listType: ListType.EMPLOYEE,
        employeeInputList: vm.employeeList,
        selectType: SelectType.SELECT_ALL,
        selectedCode: vm.selectedEmployeeCodeTarget,
        isDialog: true,
        isShowNoSelectRow: false,
        alreadySettingList: vm.alreadySettingPersonal,
        isShowWorkPlaceName: true,
        isShowSelectAllButton: true,
        maxWidth: 550,
        maxRows: 13,
      };
    }

    applyKCP005ContentSearch(dataEmployee: EmployeeSearchDto[]) {
      const vm = this;
      const employeeSearchs: UnitModel[] = [];
      _.forEach(dataEmployee, function(item: EmployeeSearchDto) {
          employeeSearchs.push(new UnitModel(item.employeeId, item.employeeCode,
              item.employeeName, item.affiliationName));
      });
      vm.employeeList(employeeSearchs);
    }


    closeDialog() {
      const vm = this;
      if(vm.formLabelTitle() === vm.$i18n("CLI003_23")){
        vm.$window
        .storage("operatorEmployeeCount", undefined)
        .then(() => vm.$window.storage("selectedEmployeeCodeOperator", undefined))
        .then( () => vm.$window.close());
      }
      if(vm.formLabelTitle() === vm.$i18n("CLI003_16")){
        vm.$window
        .storage("targetEmployeeCount", undefined)
        .then(() => vm.$window.storage("selectedEmployeeCodeTarget", undefined))
        .then( () => vm.$window.close());
      }
    }

    private getListEmployeeId() : string[] {
      const vm = this;
      const listEmployeeId : string[] = [];
      _.map(vm.selectedEmployeeCodeTarget(), (employeeCode) => {
        const employeeId : string = _.find(vm.employeeList(), (employee) => employee.code === employeeCode).id;
        listEmployeeId.push(employeeId);
      });
      return listEmployeeId;
    }

    setEmployee() {
      const vm = this;
      vm.targetNumber(nts.uk.text.format(vm.$i18n("CLI003_57"), vm.selectedEmployeeCodeTarget().length));
      if(vm.formLabelTitle() === vm.$i18n("CLI003_16")){
        vm.$window.storage("targetEmployeeCount", vm.targetNumber())
        .then(() => vm.$window.storage("selectedEmployeeCodeTarget", vm.getListEmployeeId()))
        .then(() => vm.$window.close());
      }
      if(vm.formLabelTitle() === vm.$i18n("CLI003_23")){
        vm.$window.storage("operatorEmployeeCount", vm.targetNumber())
        .then(() => vm.$window.storage("selectedEmployeeCodeOperator", vm.getListEmployeeId()))
        .then(() => vm.$window.close());
      }
    }

    constructor(params: any) {
      super();
      const vm = this;
      vm.initComponentC();
      vm.initComponentKCP005();
      vm.initComponentCCG001();
      vm.$window
      .storage("CLI003_C_FormLabel")
      .then((data) =>{
        vm.formLabelTitle(data);
      });
    }

    mounted() {
      const vm = this;
      $('#ccgComponent').ntsGroupComponent(vm.ccg001ComponentOption).done(function() {
        vm.applyKCP005ContentSearch([]);
        $('#employeeSearch').ntsListComponent(vm.listComponentOption);
    });
    }
  }
}
