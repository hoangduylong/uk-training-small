class ViewModel {
    drop: KnockoutObservable<boolean> = ko.observable(false);
    items: KnockoutObservableArray<any> = ko.observableArray([]);
    constructor() {
        let self = this;

        for (let i = 1; i < 5; i++) {
            self.items.push({ id: i, name: '000' + i, 'type': !!(i % 2) });
        }
    }

    removeItem(item) {
        let self = this;

        self.items.remove(x => x.id == item.id);
    }

    addItem() {
        let self = this,
            items = self.items();

        self.items.push({ id: items.length + 1, name: '000' + items.length + 1, 'type': false });
    }

    toggleDrop() {
        let self = this,
            drop = !ko.toJS(self.drop);

        self.drop(drop);
    }

    preventStopSort(data, event, ui) {        
        data.cancelDrop = __viewContext['viewModel'].drop();
    }
}

__viewContext.ready(() => {
    __viewContext['viewModel'] = new ViewModel();
    __viewContext.bind(__viewContext['viewModel']);
});