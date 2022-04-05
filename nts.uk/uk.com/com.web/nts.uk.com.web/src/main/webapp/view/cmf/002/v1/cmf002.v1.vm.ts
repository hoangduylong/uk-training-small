module nts.uk.com.view.cmf002.v1.viewmodel {
    import block = nts.uk.ui.block;
    import getText = nts.uk.resource.getText;
    import model = cmf002.share.model;
    import confirm = nts.uk.ui.dialog.confirm;
    import alertError = nts.uk.ui.dialog.alertError;
    import info = nts.uk.ui.dialog.info;
    import modal = nts.uk.ui.windows.sub.modal;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;

    export class ScreenModel {
        roleAuthority: any;
        listCategoryItem: KnockoutObservableArray<Category> = ko.observableArray([]);
        selectedCategoryCode: KnockoutObservable<Category>;
        currentCode: KnockoutObservable<string> = ko.observable('');
        hasData: boolean = true;
        constructor() {
            var self = this;
            self.selectedCategoryCode = ko.observable(new Category('', 0, '', 0, 0, 0, 0, 0, '', '', 0, true));
            
            let params = getShared("CMF002_V_PARAMS");
            if (params.categoryId !== '') {
                self.currentCode(params.categoryId);
            }        
            self.roleAuthority = params.roleAuthority;
            
            self.currentCode.subscribe( categoryId => {
                let getCategoryId = _.find(self.listCategoryItem(), function(x) { return x.categoryId == categoryId; });
                self.selectedCategoryCode(getCategoryId);
            });

        }
        start(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            block.invisible();

            service.getCategory(self.roleAuthority).done((data: Array<Category>) => {
                if (data && data.length) {
                    self.hasData = true;
                    let sortCategory = _.sortBy(data, ['categoryId']);
                    sortCategory.forEach(x => self.listCategoryItem.push(x));
                    if (self.currentCode() == '') {
                        self.currentCode(self.listCategoryItem()[0].categoryId);
                    }
                    let params = getShared("CMF002_V_PARAMS");
                    if (!_.isEmpty(params)) {
                        let getCategoryId = _.find(self.listCategoryItem(), function(x) { return x.categoryId == params.categoryId; });
                        if(!_.isEmpty(getCategoryId)) self.selectedCategoryCode(getCategoryId);
                    }
                }
                else {
                    self.hasData = false;
                    //alertError({ messageId: "Msg_656" });
                }
                dfd.resolve();
            }).fail(err => {
                alertError(err);
                dfd.reject();
            }).always(function() {
                block.clear();
            });

            return dfd.promise();
        }
        selectCategoryItem() {
            let self = this;
            if(!self.hasData){
                alertError({ messageId: "Msg_656" });
                return;
            }
            setShared('CMF002_B_PARAMS', {
                categoryName: self.selectedCategoryCode().categoryName,
                categoryId: self.selectedCategoryCode().categoryId
            });
            nts.uk.ui.windows.close();
        }
        cancelSelectCategoryItem() {
            nts.uk.ui.windows.close();
        }
    }
    export class Category {
        categoryId: string;
        officeHelperSysAtr: number;
        categoryName: string;
        categorySet: number;
        personSysAtr: number;
        attendanceSysAtr: number;
        payrollSysAtr: number;
        functionNo: number;
        functionName: string;
        explanation: string;
        displayOrder: number;
        defaultValue: boolean;
        constructor(categoryId: string, officeHelperSysAtr: number, categoryName: string,
            categorySet: number, personSysAtr: number, attendanceSysAtr: number,
            payrollSysAtr: number, functionNo: number, functionName: string,
            explanation: string, displayOrder: number, defaultValue: boolean) {
            this.categoryId = categoryId;
            this.officeHelperSysAtr = officeHelperSysAtr;
            this.categoryName = categoryName;
            this.categorySet = categorySet;
            this.personSysAtr = personSysAtr;
            this.attendanceSysAtr = attendanceSysAtr;
            this.payrollSysAtr = payrollSysAtr;
            this.functionNo = functionNo;
            this.functionName = functionName;
            this.explanation = explanation;
            this.displayOrder = displayOrder;
            this.defaultValue = defaultValue;
        }
    }
}