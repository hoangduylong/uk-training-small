module cps008.b.vm {
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    import close = nts.uk.ui.windows.close;
    let __viewContext: any = window['__viewContext'] || {};

    export class ViewModel {
        layout: KnockoutObservable<Layout> = ko.observable(new Layout({ id: '', code: '', name: '' }));

        constructor() {
            let self = this,
                layout = self.layout();

            //self.start();

            var currentDialog = nts.uk.ui.windows.getSelf();
            if (currentDialog) {
                let doit = undefined;
                var rgc;
                if (currentDialog.parent) {
                    rgc = currentDialog.parent.globalContext
                } else {
                    rgc = currentDialog.rgc();
                }
                $(rgc).resize(function () {
                    clearTimeout(doit);
                    doit = setTimeout(self.resizedw(), 1000);
                });
            }
        }

        resizedw() {
            let self = this;
            var currentDialog;

            setTimeout(() => {
                currentDialog = nts.uk.ui.windows.getSelf();
                // $(currentDialog.parent.globalContext).css("overflow", "hidden");

                if (currentDialog) {
                    var rgc;
                    if (currentDialog.parent) {
                        rgc = currentDialog.parent.globalContext
                    } else {
                        rgc = currentDialog.rgc();
                    }
                    if (rgc.innerWidth <= 1275) {
                        currentDialog.setWidth(rgc.innerWidth - 50);
                    } else {
                        currentDialog.setWidth(1275);
                    }

                    if (rgc.innerHeight <= 750) {
                        currentDialog.setHeight(rgc.innerHeight - 50);
                    } else {
                        currentDialog.setHeight(750);
                    }
                }
            }, 100);
        }

        start() {
            let self = this,
                layout = self.layout(),
                dto: any = getShared('CPS008B_PARAM');

            layout.id = dto.id;
            layout.code = dto.code;
            layout.name = dto.name;
            // lấy list items classification ra theo layoutid của maintainece layout truyền từ màn a lên
            // Không có thì gọi service dưới lấy list items classification của new layout rồi truyền vào layout ở view model

            let cls: Array<any> = dto.classifications;

            if (cls && cls.length) {
                layout.itemsClassification(_.map(cls, x => _.omit(x, ["items", "renders"])));
            } else {
                layout.itemsClassification([]);
            }
        }

        pushData() {
            let self = this,
                layout: ILayout = ko.toJS(self.layout);

            // check item tren man hinh
            if (layout.itemsClassification.length == 0) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_203" });
                return;
            }

            let listItemIds = _(layout.itemsClassification)
                .map(x => _.map(x.listItemDf, m => m))
                .flatten()
                .filter(x => !!x)
                .groupBy((x: any) => x.id)
                .pickBy(x => x.length > 1)
                .keys()
                .value();
            // エラーメッセージ（#Msg_289#,２つ以上配置されている項目名）を表示する
            if (!!listItemIds.length) {
                nts.uk.ui.dialog.alert({ messageId: "Msg_289" });
                return;
            }

            setShared("CPS008B_VALUE", _.map(layout.itemsClassification, m => _.omit(m, ["items", "renders"])));

            close();

        }

        close() {
            setShared('CPS008B_VALUE', null);
            close();
        }
    }

    interface IItemClassification {
        layoutID?: string;
        dispOrder?: number;
        className?: string;
        personInfoCategoryID?: string;
        layoutItemType: IT_CLA_TYPE;
        listItemDf: Array<IItemDefinition>;
    }

    interface IItemDefinition {
        id: string;
        perInfoCtgId?: string;
        itemCode?: string;
        itemName: string;
    }

    interface ILayout {
        id: string;
        code: string;
        name: string;
        editable?: boolean;
        itemsClassification?: Array<IItemClassification>;
    }

    class Layout {
        id: KnockoutObservable<string> = ko.observable('');
        code: KnockoutObservable<string> = ko.observable('');
        name: KnockoutObservable<string> = ko.observable('');
        editable: KnockoutObservable<boolean> = ko.observable(true);
        itemsClassification: KnockoutObservableArray<any> = ko.observableArray([]);

        constructor(param: ILayout) {
            let self = this;

            self.id(param.id);
            self.code(param.code);
            self.name(param.name);

            if (param.editable != undefined) {
                self.editable(param.editable);
            }

            // replace x by class that implement this interface
            self.itemsClassification(param.itemsClassification || []);
        }
    }

    // define ITEM_CLASSIFICATION_TYPE
    enum IT_CLA_TYPE {
        ITEM = <any>"ITEM", // single item
        LIST = <any>"LIST", // list item
        SPER = <any>"SeparatorLine" // line item
    }
}