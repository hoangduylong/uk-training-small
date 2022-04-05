import model = nts.uk.at.view.cdl024.viewmodel;
import service = nts.uk.at.view.cdl024.service;

__viewContext.ready(function () {
    class ScreenModel {
        items: KnockoutObservableArray<ItemModel>;
        selectedItems: KnockoutObservableArray<string>;
        
        constructor() {
            var self = this;
            this.items = ko.observableArray([]);
            service.getAll().done((data: Array<model.IItemModel>) => {
                data = _.sortBy(data, ["code"]);
                this.items(data);
            });
            this.selectedItems = ko.observableArray([]);
        }
        
        openDialog() {
            var param: model.InputParam = {
                codeList: this.selectedItems()
            };
            nts.uk.ui.windows.setShared("CDL024", param);

            nts.uk.ui.windows.sub.modal("/view/cdl/024/index.xhtml").onClosed(() => {
                this.selectedItems(nts.uk.ui.windows.getShared("currentCodeList"));
            });
        }
    }
    
    class ItemModel {
        code: string;
        constructor(code: string) {
            this.code = code;    
        }
    }
    
    this.bind(new ScreenModel());
    
});