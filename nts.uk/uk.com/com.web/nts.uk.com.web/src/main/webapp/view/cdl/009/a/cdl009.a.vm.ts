module nts.uk.com.view.cdl009.a {
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import SelectType = kcp.share.list.SelectType;
    import UnitModel = kcp.share.tree.UnitModel;
    import ListType = kcp.share.list.ListType;
    export module viewmodel {
        export class ScreenModel {
            multiSelectedTree: KnockoutObservableArray<string>;
            isMultiSelect: KnockoutObservable<boolean>;
            baseDate: KnockoutObservable<Date>;
            target: KnockoutObservable<TargetClassification>;
            treeGrid: any;
            listComponentOpt: any;
            employeeList: KnockoutObservableArray<any>;
            selectedEmpCode: KnockoutObservable<string>;
            selectedEmps: KnockoutObservableArray<string>;
            
            isIncumbent: KnockoutObservable<boolean>;
            isLeaveOfAbsence: KnockoutObservable<boolean>;
            isHoliday: KnockoutObservable<boolean>;
            isRetirement: KnockoutObservable<boolean>;
            
            enrollmentStatusList: KnockoutObservableArray<number>;
            selectFirst: KnockoutObservable<boolean>;

            constructor() {
                let self = this;
                var params = getShared('CDL009Params');
                self.selectFirst= ko.observable(params.selectFirst || params.selectFirst === false ? params.selectFirst : true);
                self.multiSelectedTree = ko.observableArray([]);
                self.multiSelectedTree(params.selectedIds ? params.selectedIds : []);
                self.isMultiSelect = ko.observable(params.isMultiple);
                self.baseDate = ko.observable(params.baseDate ? params.baseDate : moment(new Date()).toDate());
                self.target = ko.observable(params.target ? params.target : TargetClassification.WORKPLACE);

                self.employeeList = ko.observableArray<any>();
                self.selectedEmpCode = ko.observable('');
                self.selectedEmps = ko.observableArray([]);
                // Initial listComponentOption
                self.treeGrid = {
                    isMultipleUse: true,
                    isMultiSelect: true,
                    treeType: TreeType.WORK_PLACE,
                    selectType: self.selectFirst() == true ? SelectType.SELECT_FIRST_ITEM : SelectType.SELECT_BY_SELECTED_CODE,
                    baseDate: self.baseDate,
                    selectedId: self.multiSelectedTree,
                    isShowSelectButton: true,
                    isDialog: true,
                    maxRows: 12,
                    systemType : 2
                };
                self.listComponentOpt = {
                    isMultiSelect: self.isMultiSelect(),
                    listType: ListType.EMPLOYEE,
                    selectType: SelectType.NO_SELECT,
                    selectedCode: ko.observable(),
                    isDialog: true,
                    employeeInputList: self.employeeList,
                    maxRows: 12,
                    width: 445
                };
                // Set SelectedCode to listComponentOpt (Depend on isMultiSelect)
                if (self.isMultiSelect()) {
                    self.listComponentOpt.selectedCode = self.selectedEmps;
                    self.listComponentOpt.isShowSelectAllButton = false;
                } else {
                    self.listComponentOpt.selectedCode = self.selectedEmpCode;
                }
                
                self.enrollmentStatusList = ko.observableArray<number>();
                self.isIncumbent = ko.observable(true);
                self.isLeaveOfAbsence = ko.observable(false);
                self.isHoliday = ko.observable(false);
                self.isRetirement = ko.observable(false);
                
            }

            /**
             * Search Employee
             */
            private searchEmp(): void {
                nts.uk.ui.block.grayout(); // block ui
                
                let self = this;
                let treeData = $('#workplace-component').getDataList();
                let selectedRow = $('#workplace-component').getRowSelected();
                if (treeData.length == 0 || selectedRow.length <= 0) {
                    if (self.target() == TargetClassification.WORKPLACE) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_643" });
                    } else {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_647" });
                    }
                    nts.uk.ui.block.clear();
                    return;
                }

                // Search Employees
                self.findEmployee().done(() => {
                    $('#emp-component').focus();
                }).always(() => nts.uk.ui.block.clear());
            }
            
            /**
             * Find Employee
             */
            findEmployee(): JQueryPromise<any> {
                var self = this,
                    dfd = $.Deferred();
                let empStatusList: Array<number> = [];
                // Enrollment is INCUMBENT
                if (self.isIncumbent()) {
                    empStatusList.push(EnrollmentStatus.INCUMBENT);
                } 
                // Enrollment is LEAVE_OF_ABSENCE
                if (self.isLeaveOfAbsence()) {
                    empStatusList.push(EnrollmentStatus.LEAVE_OF_ABSENCE);
                }
                // Enrollment is HOLIDAY
                if (self.isHoliday()) {
                    empStatusList.push(EnrollmentStatus.HOLIDAY);
                } 
                // Enrollment is RETIREMENT
                if (self.isRetirement()) {
                    empStatusList.push(EnrollmentStatus.RETIREMENT);
                } 
//                let selectedRow = $('#workplace-component').getRowSelected();
//                let wkpIds = selectedRow.map(item => item.workplaceId);
//                self.multiSelectedTree(selectedRow);
                var query = {
                    workplaceIdList: self.multiSelectedTree(),
                    referenceDate: self.baseDate(),
                    empStatus: empStatusList
                };
                service.findEmployees(query).done(function(res: Array<service.model.EmployeeResult>) {
                    if (res) {
                        // Set Employee List
                        let empList: Array<any> = [];
                        res.forEach(item => {
                            empList.push({ id: item.employeeId, code: item.employeeCode, name: item.employeeName, workplaceName: item.workplaceName });
                        });
                        
                        let data = _.orderBy(empList, ["code"], ['asc']);
                        
                        self.employeeList(data);
                    } else {
                        self.employeeList([]);
                    }
                    
                    dfd.resolve();
                }).fail(function(error) {
                    dfd.reject(error);
                });
                return dfd.promise();
            }

            /**
             * Close dialog.
             */
            closeDialog(): void {
                setShared('CDL009Cancel', true);
                nts.uk.ui.windows.close();
            }

            /**
             * Decide Employee
             */
            decideData(): void {
                let self = this;
                
                var isNoSelectRowSelected = $("#emp-component").isNoSelectRowSelected();
                if (self.isMultiSelect()) {
                    if ((!self.selectedEmps() || self.selectedEmps().length == 0)) {
                        nts.uk.ui.dialog.alertError({ messageId: "Msg_644" });
                    } else {
                        let empIds = self.getEmpIds();
                        setShared('CDL009Output', empIds);
                        close();
                    }
                    
                } else if (!self.selectedEmpCode() && !isNoSelectRowSelected) {
                    nts.uk.ui.dialog.alertError({ messageId: "Msg_644" });
                } else {
                    // Get Emp Id
                    let emp: any = self.employeeList().filter((item) => {
                        return item.code == self.selectedEmpCode();
                    })[0];
                    setShared('CDL009Output', emp.id);
                    close();
                }
                
            }
            /**
             * Get employee Ids
             */
            private getEmpIds(): Array<any> {
                let self = this;
                let data: Array<string> = [];
                for (let empCode of self.selectedEmps()) {
                    let emp: any = self.employeeList().filter((item) => {
                        return item.code == empCode;
                    })[0];
                    data.push(emp.id);
                }
                return data;
            }

            /**
             * function check employment
             */
            public checkExistWorkplace(code: string, data: any[]): boolean {
                for (var item of data) {
                    if (code === item.workplaceId) {
                        return true;
                    }
                }
                return false;
            }
        }

        /**
        * Tree Type
        */
        export class TreeType {
            static WORK_PLACE = 1;
            static DEPARTMENT = 2;
        }

        /**
     * Class TargetClassification
     */
        export class TargetClassification {
            static WORKPLACE = 1;
            static DEPARTMENT = 2;
        }

        /**
         * class EnrollmentStatus
         */
        export class EnrollmentStatus {
            //在職者
            static INCUMBENT = 1;
            
            //休業者
            static LEAVE_OF_ABSENCE = 2;
            
            //休職者
            static HOLIDAY = 3;
            
            //退職者
            static RETIREMENT = 6;
        }
    }
}