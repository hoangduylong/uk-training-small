module nts.uk.com.view.cdl009.parent.viewmodel {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    export class ScreenModel {
        isMultiSelect: KnockoutObservable<boolean>;
        selectedIds: KnockoutObservableArray<string>;
        inputWorkplaceIds: KnockoutObservable<string>;
        baseDate: KnockoutObservable<Date>;
        target: KnockoutObservable<number>;
        selectedEmployeeId: KnockoutObservable<string>;
        selectedEmps: KnockoutObservableArray<string>;

        selectionOption: KnockoutObservableArray<any>;
        selectedOption: KnockoutObservable<number>;
        targetList: KnockoutObservableArray<any>;
        selectedTarget: KnockoutObservable<number>;
        selectFirst: KnockoutObservable<boolean>;
        constructor() {
            var self = this;
            self.selectFirst = ko.observable(true);
            self.isMultiSelect = ko.observable(true);
            self.inputWorkplaceIds = ko.observable('');
            self.selectedIds = ko.observableArray([]);
            self.inputWorkplaceIds.subscribe(function(item: string) {
                if (item) {
                    self.selectedIds(item.split(","));
                } else {
                    self.selectedIds([]);
                }
            });
            self.baseDate = ko.observable(moment(new Date()).toDate());
            self.target = ko.observable(TargetClassification.WORKPLACE);
            self.selectedEmployeeId = ko.observable('');
            self.selectedEmps = ko.observableArray([]);

            self.selectionOption = ko.observableArray([
                { code: 0, name: 'Single' },
                { code: 1, name: 'Multiple' },
            ]);
            self.selectedOption = ko.observable(self.isMultiSelect() ? 1 : 0);
            self.selectedOption.subscribe(function(data: number) {
                if (data == 0) {
                    self.isMultiSelect(false);
                }
                else {
                    self.isMultiSelect(true);
                }
            });
            self.targetList = ko.observableArray([
                { code: 1, name: 'WorkPlace' },
                { code: 2, name: 'Department' },
            ]);
            self.selectedTarget = ko.observable(self.target());
            self.selectedTarget.subscribe(function(data: number) {
                if (data == TargetClassification.DEPARTMENT) {
                    nts.uk.ui.dialog.alert("Department Target is not covered this time!");
                    self.selectedTarget(TargetClassification.WORKPLACE);
                }
            });
        }
        // Open Dialog CDL009
        private openDialog() {
            let self = this;
//            self.inputWorkplaceIds.subscribe(function(item: string) {
//                if (item) {
//                    self.selectedIds(item.split(","));
//                }
//            });
            
            // Set Param
            setShared('CDL009Params', {
                // isMultiSelect For Employee List Kcp005
                isMultiple: self.isMultiSelect(),
                // For Workplace List Kcp004
                selectedIds: self.selectedIds(),
                // For Workplace List Kcp004
                baseDate: self.baseDate(),
                // Workplace or Department
                target: self.target(),
                // fist item is selected
                selectFirst: self.selectFirst()
            }, true);

            nts.uk.ui.windows.sub.modal("/view/cdl/009/a/index.xhtml").onClosed(function() {
                var isCancel = getShared('CDL009Cancel');
                if (isCancel) {
                    return;
                }
                var output = getShared('CDL009Output');
                if (self.isMultiSelect()) {
                    self.selectedEmps(output);
                } else {
                    self.selectedEmployeeId(output);
                }
                
            });
        }
        
        // Get Code of Selected Employee(s)
        private getSelectedEmp(): string {
            var self = this;
            if (self.isMultiSelect()) {
                    return self.selectedEmps() ? self.selectedEmps().join(', ') : "";
            } else {
                return self.selectedEmployeeId() ? self.selectedEmployeeId(): "";
            }
        }
    }

    /**
     * Class TargetClassification
     */
    export class TargetClassification {
        static WORKPLACE = 1;
        static DEPARTMENT = 2;
    }
}