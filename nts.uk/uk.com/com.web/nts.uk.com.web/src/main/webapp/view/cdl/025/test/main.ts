module nts.uk.at.view.cdl025.test.viewmodel {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import windows = nts.uk.ui.windows;
    export class ScreenModel {
        listRoleType: Array<any>;
        selectRoleTypeMulti: KnockoutObservable<any>;
        selectRoleTypeSingle: KnockoutObservable<any>;
        
        currentCode: KnockoutObservable<string>;
        currentCodes: KnockoutObservableArray<string>;
        constructor() {
            var self = this;
            self.currentCode = ko.observable("");
            self.currentCodes = ko.observableArray([]);
            self.listRoleType = __viewContext.enums.RoleType;
            self.selectRoleTypeMulti = ko.observable(0);
            self.selectRoleTypeSingle = ko.observable(0);
        }

        openCDL025() {
            var self = this;
            let param = {
                roleType: self.selectRoleTypeMulti(),
                multiple: true,
                currentCode: self.currentCodes()
            };
            nts.uk.ui.windows.setShared("paramCdl025", param);
            nts.uk.ui.windows.sub.modal("/view/cdl/025/index.xhtml").onClosed(() => {
                let data = nts.uk.ui.windows.getShared("dataCdl025");
                if (!nts.uk.util.isNullOrUndefined(data))
                    self.currentCodes(data);
            });
        }

        openCDL025Single() {
            var self = this;
            let param = {
                roleType: self.selectRoleTypeSingle(),
                multiple: false,
                currentCode: self.currentCode()
            };
            nts.uk.ui.windows.setShared("paramCdl025", param);
            nts.uk.ui.windows.sub.modal("/view/cdl/025/index.xhtml").onClosed(() => {
                let data = nts.uk.ui.windows.getShared("dataCdl025");
                if (!nts.uk.util.isNullOrUndefined(data))
                    self.currentCode(data);
            });
        }
    }

}
