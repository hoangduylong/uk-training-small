module cps002.f.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    import modal = nts.uk.ui.windows.sub.modal;
    import alert = nts.uk.ui.dialog.alert;
    import alertError = nts.uk.ui.dialog.alertError;
    import dialog = nts.uk.ui.dialog.info;
	import block = nts.uk.ui.block;


    export class ViewModel {
        lstCategory: KnockoutObservableArray<PerInfoCtg>;
        selectedCtgId: KnockoutObservable<string> = ko.observable("");
        lstPerInfoItemDef: KnockoutObservableArray<PerInforItemDef>;
        columns: KnockoutObservableArray<any>;
        columnPerInfoItemDef: KnockoutObservableArray<any>;
        checkedIds: KnockoutObservableArray<string> = ko.observableArray([]);
        txtSearch: KnockoutObservable<string> = ko.observable("");
        lstItem: KnockoutObservableArray<string> = ko.observableArray([]);

        constructor() {
            let self = this;
            self.lstCategory = ko.observableArray([]);
            self.lstPerInfoItemDef = ko.observableArray([]);

            self.columns = ko.observableArray([
                { headerText: "", key: 'id', width: 45, hidden: true },
                { headerText: nts.uk.resource.getText("CPS002_70"), key: 'alreadyCopy', width: 45, formatter: setPerInfoCtgFormat },
                { headerText: nts.uk.resource.getText("CPS002_71"), key: 'categoryName', width: 150 }
            ]);

            self.columnPerInfoItemDef = ko.observableArray([
                { headerText: "", key: 'id', width: 45, hidden: true },
                { headerText: nts.uk.resource.getText("CPS002_75"), key: 'itemName', width: 250 }
            ]);


            self.selectedCtgId.subscribe(id => {
                service.getPerInfoItemDef(id).done(function(data) {
                    //contant all item
                    self.lstItem(data);
                    //for no show child item
                    let datalist = _.filter(data, (item: any) => { return item.itemParentCd == null });
                    self.lstPerInfoItemDef(datalist);
                    setTimeout(() => {
                        $("#multiList_headers th:first-child").append(nts.uk.resource.getText("CPS002_74"));
                    }, 100);
                    //contant all checked id
                    let perItemCopy = _.filter(data, function(item: IPerInfoItemDef) { return item.alreadyItemDefCopy == true; }).map(function(item) { return item.id; });
                    self.checkedIds(perItemCopy);
                });
            });

            self.start();

        }
        register() {
            let self = this;
            // let dataBind = self.lstPerInfoItemDef();
            let itemIds = self.checkedIds();
            let categoryId = self.selectedCtgId();
            _.forEach(self.lstItem(), function(item: IPerInfoItemDef) {

                if (_.find(self.checkedIds(), function(o) { return o == item.id; })) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }

            });
			block.grayout();
            service.updatePerInfoItemCopy(categoryId, self.lstItem()).done(() => {

                dialog({ messageId: "Msg_15" }).then(() => {
                    self.start(self.selectedCtgId());
                });
            }).always(() => {
				block.clear();
			});


        }
        close() {
            close();
        }
        start(ctgid?) {
            let self = this;
            let ctgName = "";
			block.grayout();
            service.getPerInfoCtgHasItems(ctgName).done(function(data: Array<any>) {
                if (data.length > 0) {
                    self.lstCategory(data);
                    self.selectedCtgId(ctgid ? ctgid : data[0].id);
                    $("#searchCtg input").focus();
                } else {
                    alertError({ messageId: "Msg_352" });
                }
				 block.clear();
            }).fail((error) => {
                    if (error.messageId == "Msg_352") {
                       alertError({ messageId: "Msg_352" });     
                    }
					 block.clear();
                });
        }

        searchByName() {
            let self = this;
            service.getPerInfoCtgHasItems(self.txtSearch()).done(function(data) {
                self.lstCategory(data);
            }).fail(function() {
                alertError({ messageId: "Msg_352" });
            });
        }

    }

    interface IPerInfoCtg {
        id: string,
        alreadyCopy: boolean,
        categoryName: string
    }
    class PerInfoCtg {
        id: KnockoutObservable<string> = ko.observable("");
        alreadyCopy: KnockoutObservable<boolean> = ko.observable(false);
        categoryName: KnockoutObservable<string> = ko.observable("");
        constructor(param: IPerInfoCtg) {
            let self = this;
            self.id(param.id || "");
            self.alreadyCopy(param.alreadyCopy || false);
            self.categoryName(param.categoryName || "");
        }
    }

    interface IPerInfoItemDef {
        id: string,
        itemName: string,
        itemCd: string,
        perCtgId: string,
        alreadyItemDefCopy: boolean,
        itemParentCd: string
        checked: boolean
    }
    class PerInforItemDef {
        id: KnockoutObservable<string> = ko.observable("");
        itemName: KnockoutObservable<string> = ko.observable("");
        perCtgId: KnockoutObservable<string> = ko.observable("");
        alreadyItemDefCopy: KnockoutObservable<boolean> = ko.observable(false);
        itemParentCd: KnockoutObservable<string> = ko.observable("");
        constructor(param: IPerInfoItemDef) {
            let self = this;
            self.id(param.id || "");
            self.itemName(param.itemName || "");
            self.itemName(param.perCtgId || "");
            self.alreadyItemDefCopy(param.alreadyItemDefCopy || false);
            self.itemParentCd(param.itemParentCd || "");
        }
    }
}

function setPerInfoCtgFormat(value) {
    if (value == "true")
        return '<i class="icon icon-dot setStyleDot"></i>';
    return '';
}
