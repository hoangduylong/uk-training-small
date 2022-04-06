__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            this.igConfig = {};
            this.igConfig.columns = [
                { headerText: 'Customer ID', key: 'ID', dataType: 'string', width: '25%',
                    template: "<button class='btn' >${ID}</button>" },
                { headerText: 'Contact Name', key: 'testSwitch', dataType: 'string', width: '25%',
                    template: "<div data-bind='ntsSwitchButton: {options: $data.switchList, optionsValue: \"code\", optionsText: \"name\", value: ko.observable(${testSwitch}) } '></div>" },
                { headerText: 'City', key: 'City', dataType: 'string', width: '25%',
                    template: "<div data-bind='ntsCheckBox: { checked: true }'>${City}</div>" },
                { headerText: 'Country', key: 'Country', dataType: 'string', width: '25%',
                    template: "<input data-bind='ntsTextEditor: { value: ko.observable(\"${Country}\") }' />" }
            ];
            this.igConfig.features = [{
                    name: 'Selection',
                    mode: 'row',
                    multipleSelection: false,
                    activation: false,
                    rowSelectionChanged: this.selectionChanged.bind(this)
                }];
            this.dataSource = [];
            this.dataSourceObs = ko.observableArray([]);
            for (var i = 0; i < 500000; i++) {
                this.dataSource.push(new Item(i.toString(), "Contact name " + i, "City " + i, "Country " + i, (i % 2 == 0) ? 1 : 2));
                //this.dataSourceObs.push(new ItemObs(i.toString(), "Contact name " + i, "City " + i, "Country " + i, (i % 2 == 0) ? 1 : 2));
            }
            this.selectedItemID = ko.observable(0);
            this.selectedItem = ko.computed(function () {
                var dataArr = self.dataSourceObs();
                if (self.selectedItemID() >= 0)
                    return dataArr[self.selectedItemID()];
                return new ItemObs('', '', '', '', '');
            });
            this.switchList = ko.observableArray([
                { code: '1', name: '四捨五入' },
                { code: '2', name: '切り上げ' }
            ]);
            $("#grid").igGrid({
                dataSource: this.dataSource,
                primaryKey: 'ID',
                width: '100%',
                height: "350px",
                autoCommit: true,
                features: [{
                        name: 'Selection',
                        mode: 'row',
                        multipleSelection: false,
                        activation: false,
                        rowSelectionChanged: this.selectionChanged.bind(this)
                    }],
                virtualization: true,
                virtualizationMode: 'continuous',
                autoGenerateColumns: false,
                columns: this.igConfig.columns
            });
        }
        ScreenModel.prototype.selectionChanged = function (evt, ui) {
            var rowdata = ui.row;
            var selectedItemInArray = ko.utils.arrayFirst(this.dataSourceObs(), function (item) {
                return item.ID() === rowdata.id;
            });
            if (selectedItemInArray != null) {
                this.selectedItemID(parseInt(rowdata.index));
            }
            else {
                this.selectedItemID(0);
            }
        };
        ;
        ScreenModel.prototype.test = function () {
            console.log("OK");
        };
        return ScreenModel;
    }());
    $("body").on("click", ".btn", function () {
        console.log("OK");
    });
    var Item = /** @class */ (function () {
        function Item(ID, ContactName, City, Country, testSwitch) {
            this.ID = ID;
            this.ContactName = ContactName;
            this.City = City;
            this.Country = Country;
            this.testCheck = true;
            this.testSwitch = testSwitch;
        }
        return Item;
    }());
    var ItemObs = /** @class */ (function () {
        function ItemObs(ID, ContactName, City, Country, testSwitch) {
            this.ID = ko.observable(ID);
            this.ContactName = ko.observable(ContactName);
            this.City = ko.observable(City);
            this.Country = ko.observable(Country);
            this.testCheck = ko.observable(true);
            this.testSwitch = ko.observable(testSwitch);
        }
        return ItemObs;
    }());
    var vm = new ScreenModel();
    this.bind(vm);
});
//# sourceMappingURL=start-ko.js.map