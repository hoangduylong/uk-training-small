var sample;
(function (sample) {
    var sidebar;
    (function (sidebar) {
        var viewmodel;
        (function (viewmodel) {
            var ScreenModel = /** @class */ (function () {
                function ScreenModel() {
                    var self = this;
                    self.tabs = ko.observableArray([
                        { id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
                    ]);
                    self.selectedTab = ko.observable('tab-2');
                    self.show = ko.observable(true);
                    self.show.subscribe(function (newVal) {
                        if (newVal)
                            $("#sidebar").ntsSideBar("show", 1);
                        else
                            $("#sidebar").ntsSideBar("hide", 1);
                    });
                    this.items = ko.observableArray([]);
                    self.tabs = ko.observableArray([
                        { id: 'tab-1', title: 'Tab Title 1', content: '.tab-content-1', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-2', title: 'Tab Title 2', content: '.tab-content-2', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-3', title: 'Tab Title 3', content: '.tab-content-3', enable: ko.observable(true), visible: ko.observable(true) },
                        { id: 'tab-4', title: 'Tab Title 4', content: '.tab-content-4', enable: ko.observable(true), visible: ko.observable(true) }
                    ]);
                    self.selectedTab = ko.observable('tab-1');
                    for (var i = 1; i < 5; i++) {
                        this.items.push(new ItemModel('00' + i, '基本給', "description " + i, i % 3 === 0, "2010/1/1"));
                    }
                    this.columns = ko.observableArray([
                        { headerText: 'コード', key: 'code', width: 100, hidden: true },
                        { headerText: '名称', key: 'name', width: 150, hidden: true },
                        { headerText: '説明', key: 'description', width: 150 },
                        { headerText: '説明1', key: 'other1', width: 150 },
                        { headerText: '説明2', key: 'other2', width: 150, isDateColumn: true, format: 'YYYY/MM/DD' }
                    ]);
                    self.currentCode = ko.observable("001");
                    self.currentCodeList = ko.observableArray([]);
                    self.enable = ko.observable(true);
                    self.enable.subscribe(function (newVal) {
                        if (newVal) {
                            $("#sidebar").ntsSideBar("enable", 1);
                            $("#sidebar").ntsSideBar("enable", 2);
                        }
                        else {
                            $("#sidebar").ntsSideBar("disable", 1);
                            $("#sidebar").ntsSideBar("disable", 2);
                        }
                    });
                    $("#grid").igGrid({
                        dataSource: self.items(),
                        primaryKey: "code",
                        width: '100%',
                        height: '350px',
                        columns: [
                            { headerText: 'コード', key: 'code', width: '30%' },
                            { headerText: '名称', key: 'name', width: '30%' },
                            { headerText: '説明', key: 'description', width: '30%' },
                        ],
                        virtualization: true,
                        virtualizationMode: 'continuous',
                    });
                }
                ScreenModel.prototype.testSideMenu = function () {
                    alert($("#sidebar").ntsSideBar("getCurrent"));
                };
                ScreenModel.prototype.openSubWindow = function () {
                    nts.uk.ui.windows.sub.modeless("/view/sample/functionwrap/sidebar/sidebar-sub.xhtml");
                };
                ScreenModel.prototype.openNewTab = function () {
                    window.open("/nts.uk.com.web/view/sample/functionwrap/sidebar/sidebar-sub.xhtml", "_blank").focus();
                };
                ScreenModel.prototype.setError = function () {
                    $(".nts-input").ntsError("set", "Errors.");
                };
                ScreenModel.prototype.clearError = function () {
                    $(".nts-input").ntsError("clear");
                };
                return ScreenModel;
            }());
            viewmodel.ScreenModel = ScreenModel;
            var ItemModel = /** @class */ (function () {
                function ItemModel(code, name, description, deletable, other1, other2) {
                    this.code = code;
                    this.name = name;
                    this.description = description;
                    this.other1 = other1;
                    this.other2 = other2 || other1;
                    this.deletable = deletable;
                }
                return ItemModel;
            }());
        })(viewmodel = sidebar.viewmodel || (sidebar.viewmodel = {}));
    })(sidebar = sample.sidebar || (sample.sidebar = {}));
})(sample || (sample = {}));
//# sourceMappingURL=viewmodel.js.map