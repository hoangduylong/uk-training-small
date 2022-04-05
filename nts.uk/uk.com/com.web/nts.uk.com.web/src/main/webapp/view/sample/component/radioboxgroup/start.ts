module nts.uk.ui.sample.radiogroup {
    @bean()
    export class ScreenModel extends ko.ViewModel {
        itemList: KnockoutObservableArray<any>;
        selectedValue: KnockoutObservable<any>;
        selectedId: KnockoutObservable<number>;
        enable: KnockoutObservable<boolean>;
        defaultValue: KnockoutObservable<number>;
        count: any = 10;
        value: KnockoutObservable<number>;

        focusable: KnockoutObservable<boolean> = ko.observable(false);

        constructor() {
            super();

            var self = this;
            self.itemList = ko.observableArray([]);
            
            for (let i = 1; i < 10; i++) {
                self.itemList.push(new BoxModel(i, 'box ' + i));
            }

            self.selectedValue = ko.observable(new BoxModel(3, 'box 3'));
            self.selectedId = ko.observable(null);
            self.enable = ko.observable(true);
            self.value = ko.observable(0);
            self.defaultValue = ko.observable();
        }

        addBoxes() {
            var self = this;
            self.itemList.push(new BoxModel(self.count, 'box ' + self.count));
            self.count++;
        }

        removeBoxes() {
            var self = this;
            self.itemList.pop();
        }

        enableCheckBox() {
            var self = this;
            if (self.value() < self.itemList().length - 1) {
                self.itemList()[self.value()].enable(true);
            }
        }

        setDefault() {
            var self = this;
            // nts.uk.util.value.reset($("#second-list"), self.defaultValue() !== undefined ? parseInt(self.defaultValue()) : undefined);
        }

        focus() {
            const vm = this;

            vm.focusable(true);
        }
    }

    class BoxModel {
        id: number;
        name: string;
        enable: KnockoutObservable<boolean>;

        constructor(id, name) {
            var self = this;
            self.id = id;
            self.name = name;
            self.enable = ko.observable(id % 3 === 0);
        }
    }
}