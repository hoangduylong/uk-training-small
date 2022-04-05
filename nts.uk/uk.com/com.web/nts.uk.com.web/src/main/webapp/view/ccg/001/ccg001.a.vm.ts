module nts.uk.com.view.ccg001.a {  

    import Ccg001ReturnedData = nts.uk.com.view.ccg.share.ccg.service.model.Ccg001ReturnedData;
    import EmployeeSearchDto = nts.uk.com.view.ccg.share.ccg.service.model.EmployeeSearchDto;
    import GroupOption = nts.uk.com.view.ccg.share.ccg.service.model.GroupOption;
    export module viewmodel {
        export class ScreenModel {
           
            ccg001ComponentOption: GroupOption;
            systemTypes: KnockoutObservableArray<any>;

            // Options
            isQuickSearchTab: KnockoutObservable<boolean>;
            isAdvancedSearchTab: KnockoutObservable<boolean>;
            isAllReferableEmployee: KnockoutObservable<boolean>;
            isOnlyMe: KnockoutObservable<boolean>;
            isEmployeeOfDepartment: KnockoutObservable<boolean>;
            isEmployeeDepartmentFollow: KnockoutObservable<boolean>;
            isEmployeeOfWorkplace: KnockoutObservable<boolean>;
            isEmployeeWorkplaceFollow: KnockoutObservable<boolean>;
            isMutipleCheck: KnockoutObservable<boolean>;
            isSelectAllEmployee: KnockoutObservable<boolean>;
            periodStartDate: KnockoutObservable<moment.Moment>;
            periodEndDate: KnockoutObservable<moment.Moment>;
            baseDate: KnockoutObservable<moment.Moment>;
            selectedEmployee: KnockoutObservableArray<EmployeeSearchDto>;
            showEmployment: KnockoutObservable<boolean>; // 雇用条件
            showDepartment: KnockoutObservable<boolean>; // 部門条件
            showWorkplace: KnockoutObservable<boolean>; // 職場条件
            showClassification: KnockoutObservable<boolean>; // 分類条件
            showJobTitle: KnockoutObservable<boolean>; // 職位条件
            showWorktype: KnockoutObservable<boolean>; // 勤種条件
            inService: KnockoutObservable<boolean>; // 在職区分
            leaveOfAbsence: KnockoutObservable<boolean>; // 休職区分
            closed: KnockoutObservable<boolean>; // 休業区分
            retirement: KnockoutObservable<boolean>; // 退職区分
            systemType: KnockoutObservable<number>;
			employeesDoNotManageSchedules: KnockoutObservable<boolean>;
            showClosure: KnockoutObservable<boolean>; // 就業締め日利用
            showBaseDate: KnockoutObservable<boolean>; // 基準日利用
            showAllClosure: KnockoutObservable<boolean>; // 全締め表示
            showPeriod: KnockoutObservable<boolean>; // 対象期間利用
            periodFormatYM: KnockoutObservable<boolean>; // 対象期間精度
            maxPeriodRange: KnockoutObservable<string>;
            periodRanges: Array<any>;
            lazyLoad: KnockoutObservable<boolean>;

            constructor() {
                var self = this;
                self.systemTypes = ko.observableArray([
                    { name: '個人情報', value: 1 }, // PERSONAL_INFORMATION
                    { name: '就業', value: 2 }, // EMPLOYMENT
                    { name: '給与', value: 3 }, // SALARY
                    { name: '人事', value: 4 }, // HUMAN_RESOURCES
                    { name: '管理者', value: 5 } // ADMINISTRATOR
                ]);
                self.periodRanges = [
                    {name: 'なし', value: 'none'},
                    {name: '１ヶ月', value: 'oneMonth'},
                    {name: '１年', value: 'oneYear'}
                    
                ];
                self.selectedEmployee = ko.observableArray([]);

                // initial ccg options
                self.setDefaultCcg001Option();
                
                // Init component.
                self.reloadCcg001();
                
                self.periodFormatYM.subscribe(item => {
                    if (item){
                        self.showClosure(true);    
                    }
                });
            }

            /**
             * Set default ccg001 options
             */
            public setDefaultCcg001Option(): void {
                let self = this;
                self.isQuickSearchTab = ko.observable(true);
                self.isAdvancedSearchTab = ko.observable(true);
                self.isAllReferableEmployee = ko.observable(true);
                self.isOnlyMe = ko.observable(true);
                self.isEmployeeOfDepartment = ko.observable(true);
                self.isEmployeeWorkplaceFollow = ko.observable(true);
                self.isEmployeeOfWorkplace = ko.observable(true);
                self.isEmployeeDepartmentFollow = ko.observable(true);
                self.isMutipleCheck = ko.observable(true);
                self.isSelectAllEmployee = ko.observable(true);
                self.baseDate = ko.observable(moment());
                self.periodStartDate = ko.observable(moment());
                self.periodEndDate = ko.observable(moment());
                self.showEmployment = ko.observable(true);
                self.showDepartment = ko.observable(true); // 部門条件
                self.showWorkplace = ko.observable(true); // 職場条件
                self.showClassification = ko.observable(true); // 分類条件
                self.showJobTitle = ko.observable(true); // 職位条件
                self.showWorktype = ko.observable(true); // 勤種条件
                self.inService = ko.observable(true); // 在職区分
                self.leaveOfAbsence = ko.observable(true); // 休職区分
                self.closed = ko.observable(true); // 休業区分
                self.retirement = ko.observable(true); // 退職区分
                self.systemType = ko.observable(1);
				self.employeesDoNotManageSchedules = ko.observable(false);
                self.showClosure = ko.observable(true); // 就業締め日利用
                self.showBaseDate = ko.observable(true); // 基準日利用
                self.showAllClosure = ko.observable(true); // 全締め表示
                self.showPeriod = ko.observable(false); // 対象期間利用
                self.periodFormatYM = ko.observable(false); // 対象期間精度
                self.maxPeriodRange = ko.observable('none');
                self.lazyLoad = ko.observable(false);
            }

            /**
             * Reload component CCG001
             */
            public reloadCcg001(): void {
                let self = this;
                if ($('.ccg-sample-has-error').ntsError('hasError')) {
                    return;
                }
                // clear ccg001 errors
                $('#ccg001-search-period .ntsDateRangeComponent').ntsError('clear');
                $('#ccg001-search-period .ntsStartDate input').ntsError('clear');
                $('#ccg001-search-period .ntsEndDate input').ntsError('clear');
                $('#inp_baseDate').ntsError('clear');
                $('#inp-period-startYMD').ntsError('clear');
                $('#inp-period-endYMD').ntsError('clear');
                $('#inp-period-startYM').ntsError('clear');
                $('#inp-period-endYM').ntsError('clear');
                $('#ccg001-partg-start').ntsError('clear');
                $('#ccg001-partg-end').ntsError('clear');
                
                if (!self.showBaseDate() && !self.showClosure() && !self.showPeriod()){
                    nts.uk.ui.dialog.alertError("Base Date or Closure or Period must be shown!" );
                    return;
                }
                self.ccg001ComponentOption = {
                    /** Common properties */
                    systemType: self.systemType(), // システム区分
					employeesDoNotManageSchedules: self.employeesDoNotManageSchedules,
                    showEmployeeSelection: self.isSelectAllEmployee(), // 検索タイプ
                    showQuickSearchTab: self.isQuickSearchTab(), // クイック検索
                    showAdvancedSearchTab: self.isAdvancedSearchTab(), // 詳細検索
                    showBaseDate: self.showBaseDate(), // 基準日利用
                    showClosure: self.showClosure(), // 就業締め日利用
                    showAllClosure: self.showAllClosure(), // 全締め表示
                    showPeriod: self.showPeriod(), // 対象期間利用
                    periodFormatYM: self.periodFormatYM(), // 対象期間精度
                    maxPeriodRange: self.maxPeriodRange(),

                    /** Required parameter */
                    baseDate: self.baseDate, // 基準日
                    periodStartDate: self.periodStartDate, // 対象期間開始日
                    periodEndDate: self.periodEndDate, // 対象期間終了日
                    inService: self.inService(), // 在職区分
                    leaveOfAbsence: self.leaveOfAbsence(), // 休職区分
                    closed: self.closed(), // 休業区分
                    retirement: self.retirement(), // 退職区分

                    /** Quick search tab options */
                    showAllReferableEmployee: self.isAllReferableEmployee(), // 参照可能な社員すべて
                    showOnlyMe: self.isOnlyMe(), // 自分だけ
                    showSameDepartment: self.isEmployeeOfDepartment(), //同じ部門の社員
                    showSameDepartmentAndChild: self.isEmployeeDepartmentFollow(), // 同じ部門とその配下の社員
                    showSameWorkplace: self.isEmployeeOfWorkplace(), // 同じ職場の社員
                    showSameWorkplaceAndChild: self.isEmployeeWorkplaceFollow(), // 同じ職場とその配下の社員

                    /** Advanced search properties */
                    showEmployment: self.showEmployment(), // 雇用条件
                    showDepartment: self.showDepartment(), // 部門条件
                    showWorkplace: self.showWorkplace(), // 職場条件
                    showClassification: self.showClassification(), // 分類条件
                    showJobTitle: self.showJobTitle(), // 職位条件
                    showWorktype: self.showWorktype(), // 勤種条件
                    isMutipleCheck: self.isMutipleCheck(), // 選択モード
                    isTab2Lazy: self.lazyLoad(),

                    /** Return data */
                    returnDataFromCcg001: function(data: Ccg001ReturnedData) {
                        self.selectedEmployee(data.listEmployee);
                    }
                }

                // Start component
                $('#com-ccg001').ntsGroupComponent(self.ccg001ComponentOption);
            }
            
            
        }
    }
}