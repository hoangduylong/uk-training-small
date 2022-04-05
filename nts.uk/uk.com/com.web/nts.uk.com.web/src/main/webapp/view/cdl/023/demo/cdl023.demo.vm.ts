module nts.uk.com.view.cdl023.demo.viewmodel {

    export class ScreenModel {

        code: KnockoutObservable<string>;
        name: KnockoutObservable<string>;
        roleType : KnockoutObservable<number>;
        listRoleType: Array<any>;
        valueReturn: KnockoutObservable<string>;
        
        // list target type
        targetList: KnockoutObservableArray<any>;
        selectedTarget: KnockoutObservable<number>;
        
        // base date
        baseDate: KnockoutObservable<Date>;
        enableBaseDate: KnockoutObservable<boolean>;
        requiredRoleType : KnockoutObservable<boolean>;
        
        // list item setting
        itemSetting: KnockoutObservable<string>;
        selectedItems: KnockoutObservableArray<string>;
        workFrameNoSelection: KnockoutObservable<number>;

        constructor() {
            let self = this;
            self.code = ko.observable(null);
            self.name = ko.observable(null);
            self.listRoleType = __viewContext.enums.RoleType;
            self.roleType = ko.observable(0);
            self.valueReturn = ko.observable(null); 
            self.workFrameNoSelection = ko.observable(1);

            self.targetList = ko.observableArray([
                {value: TargetType.EMPLOYMENT, name: '雇用'},
                {value: TargetType.CLASSIFICATION, name: '分類'},
                {value: TargetType.JOB_TITLE, name: '職位'},
                {value: TargetType.WORKPLACE, name: '職場'},
                {value: TargetType.DEPARTMENT, name: '部門'},
                {value: TargetType.WORKPLACE_PERSONAL, name: '職場個人'},
                {value: TargetType.DEPARTMENT_PERSONAL, name: '部門個人'},
                {value: TargetType.ROLE, name: 'ロール'},
                {value: TargetType.WORK_TYPE, name: '勤務種別'},
                {value: TargetType.WORK, name: '作業'}
                
            ]);
            self.selectedTarget = ko.observable(1);
            
            self.baseDate = ko.observable(moment(new Date()).toDate());
            
            self.enableBaseDate = ko.computed(() => {
                return self.isHasBaseDate();
            });
            
            self.requiredRoleType = ko.computed(() => {
                return TargetType.ROLE == self.selectedTarget(); 
            });
            self.itemSetting = ko.observable(null);
            self.selectedItems = ko.observableArray([]);
            
            // subscribe
            self.selectedTarget.subscribe(newValue => {
                self.itemSetting("");
                self.selectedItems([]);
                    
            });
            self.itemSetting.subscribe((newValue) => {
                if (nts.uk.text.isNullOrEmpty(self.itemSetting())) {
                    self.selectedItems([]);
                }
                
                // trim space
                self.itemSetting(self.itemSetting().replace(/\s/g, ''));
                
                self.selectedItems(self.itemSetting().split(','));
            })
        }
        
        /**
         * startPage
         */
        public startPage(): JQueryPromise<any> {
            let self = this;
            let dfd = $.Deferred();

            dfd.resolve();
            return dfd.promise();
        }
        
        /**
         * closeDialog
         */
        public openDialog() {
            let self = this;
            
            // validate
            if (!self.validate()) {
                 nts.uk.ui.dialog.alert("Something fields are required or wrong.");
                return;
            }
            
            // share data
            let object: IObjectDuplication = {
                code: self.code(),
                name: self.name(),
                targetType: self.selectedTarget(),
                itemListSetting: self.selectedItems(),
                baseDate: moment(self.baseDate()).toDate(),
                workFrameNoSelection: self.workFrameNoSelection()
            };
            if( self.requiredRoleType()) object.roleType = self.roleType();
            nts.uk.ui.windows.setShared("CDL023Input", object);
            
            // open dialog
            nts.uk.ui.windows.sub.modal('/view/cdl/023/a/index.xhtml').onClosed(() => {
                // show data respond
                let lstSelection: Array<string> = nts.uk.ui.windows.getShared("CDL023Output");
                if (!lstSelection) {
                    return;
                }
                self.valueReturn(lstSelection.join(", "));
            });
        }
        
        /**
         * isHasBaseDate
         */
        private isHasBaseDate(): boolean {
            let self = this;
            return self.selectedTarget() == TargetType.WORKPLACE
                || self.selectedTarget() == TargetType.WORKPLACE_PERSONAL
                || self.selectedTarget() == TargetType.DEPARTMENT
                || self.selectedTarget() == TargetType.DEPARTMENT_PERSONAL
                || self.selectedTarget() == TargetType.WORK;
        }
        
        /**
         * validate
         */
        private validate(): boolean  {
            let self = this;
            
            // clear error
            $('#code').ntsError('clear');
            $('#name').ntsError('clear');
            
            // validate
            $('#code').ntsEditor('validate');
            $('#name').ntsEditor('validate');
            
            // validate base date
            if (self.enableBaseDate() && nts.uk.text.isNullOrEmpty(self.baseDate())) {
                return false;
            }
            
            return !$('.nts-input').ntsError('hasError');
        }
        
    }
    
    /**
     * IObjectDuplication
     */
    interface IObjectDuplication {
        code: string;
        name: string;
        targetType: number;
        itemListSetting: Array<string>;
        baseDate?: Date;
        roleType?: number;
        workFrameNoSelection?: number
    }
    
    /**
     * TargetType
     */
    class TargetType {
        
        // 雇用
        static EMPLOYMENT = 1;
        
        // 分類
        static CLASSIFICATION = 2;
        
        // 職位
        static JOB_TITLE = 3;
        
        // 職場
        static WORKPLACE = 4;
        
        // 部門
        static DEPARTMENT = 5;
        
        // 職場個人
        static WORKPLACE_PERSONAL = 6;
        
        // 部門個人
        static DEPARTMENT_PERSONAL = 7;
                
        // ロール
        static ROLE = 8;
        
        // 勤務種別
        static WORK_TYPE = 9;

        //作業
        static  WORK = 10; //ver 6
    }
}