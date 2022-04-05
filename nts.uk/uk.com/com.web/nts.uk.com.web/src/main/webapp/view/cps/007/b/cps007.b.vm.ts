module cps007.b.vm {
    import text = nts.uk.resource.getText;
    import alert = nts.uk.ui.dialog.alert;
    import close = nts.uk.ui.windows.close;
    import setShared = nts.uk.ui.windows.setShared;
    import getShared = nts.uk.ui.windows.getShared;
    let __viewContext: any = window['__viewContext'] || {};

    export class ViewModel {
        allItems: KnockoutObservableArray<IItemDefinition> = ko.observableArray([]);
        chooseItems: KnockoutObservableArray<IItemDefinition> = ko.observableArray([]);
        category: KnockoutObservable<ItemCategory> = ko.observable(new ItemCategory({ id: undefined }));

        constructor() {
            let self = this,
                cat = self.category(),
                dto: IModelDto = getShared('CPS007B_PARAM') || { chooseItems: [] };

            if (dto.category && dto.category.id) {
                cat.id(dto.category.id);
            } else {
                self.close();
            }

            // paser default choose item
            self.chooseItems(dto.chooseItems);

            // when cat id is change
            // get category info and get all item define in this category
            cat.id.subscribe(x => {
                if (x) {
                    service.getCategory(x).done((data: IItemCategory) => {
                        if (data && !data.isAbolition) {
                            cat.categoryType(data.categoryType);
                            cat.categoryName(data.categoryName);

                            // get all item in category
                            service.getItemDefinitions(data.id).done((data: Array<IItemDefinition>) => {
                                data = _.filter(data, x => !x.isAbolition);
                                self.allItems(data)
                            });
                        } else {
                            cat.id(undefined);
                        }
                    });
                } else {
                    // close dialog if category is not present
                    self.close();
                }
            });
            cat.id.valueHasMutated();
        }

        pushData() {
            let self = this,
                cat = ko.toJS(self.category),
                data: Array<IItemDefinition> = ko.unwrap(self.chooseItems);

            if (!data.length) {
                alert({ messageId: 'Msg_203' });
                return;
            }

            setShared('CPS007B_VALUE', { category: cat, chooseItems: data });
            self.close();
        }

        close() {
            close();
        }
    }

    interface IItemDefinition {
        id: string;
        perInfoCtgId?: string;
        itemCode?: string;
        itemName: string;
        isAbolition?: number;
        isFixed?: number;
        isRequired?: number;
        systemRequired?: number;
        requireChangable?: number;
        itemTypeState: any; //IItemTypeState;
    }

    interface IItemCategory {
        id: string;
        categoryName?: string;
        categoryType?: number;
        isAbolition?: number;
    }

    class ItemCategory {
        id: KnockoutObservable<string> = ko.observable('');
        categoryName: KnockoutObservable<string> = ko.observable('');
        categoryType: KnockoutObservable<number> = ko.observable(-1);

        constructor(param: IItemCategory) {
            let self = this;

            self.id(param.id || '');
            self.categoryName(param.categoryName || '');
            self.categoryType(param.categoryType || -11);
        }
    }

    interface IModelDto {
        category: IItemCategory;
        allItems?: Array<IItemDefinition>;
        chooseItems?: Array<IItemDefinition>;
    }
}