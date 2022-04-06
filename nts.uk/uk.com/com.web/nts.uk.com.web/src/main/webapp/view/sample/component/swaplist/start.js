__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            this.itemsSwap = ko.observableArray([]);
            this.disableMoveButton = ko.observable(false);
            var array = [];
            this.itemsSwap(array);
            this.columns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 100 },
                { headerText: '名称', key: 'name', width: 150 }
            ]);
            this.leftColumns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 200 }
            ]);
            var template = '${name} {{if ${code} == 3 || ${code} == 9}} <button class="setting" onclick="openDlg(${code})" data-code="${code}" style="margin-left: 20px;">設定</button> {{/if}}';
            this.rightColumns = ko.observableArray([
                { headerText: 'コード', key: 'code', width: 100 },
                { headerText: '名称', key: 'name', width: 150, template: template }
            ]);
            var x = [];
            //            x.push(_.cloneDeep(array[0]));
            //            x.push(_.cloneDeep(array[1]));
            //            x.push(_.cloneDeep(array[2]));
            this.currentCodeListSwap = ko.observableArray(x);
            this.currentCodeListSwap.subscribe(function (value) {
                console.log(value);
            });
            this.test = ko.observableArray([]);
        }
        ScreenModel.prototype.remove = function () {
            this.itemsSwap.shift();
        };
        ScreenModel.prototype.bindSource = function () {
            var self = this;
            var array = [];
            for (var i = 0; i < 10000; i++) {
                array.push(new ItemModel(i, '基本給', "description"));
            }
            self.itemsSwap(array);
        };
        ScreenModel.prototype.beforeLeft = function (toRight, oldSource, newI) {
            console.log("before Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.beforeRight = function (toRight, oldSource, newI) {
            console.log("before right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.beforeAllL = function (toRight, oldSource, newI) {
            console.log("before all Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.beforeAllR = function (toRight, oldSource, newI) {
            console.log("before all right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.afterLeft = function (toRight, oldSource, newI) {
            console.log("after Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.afterRight = function (toRight, oldSource, newI) {
            console.log("after right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.afterAllL = function (toRight, oldSource, newI) {
            console.log("after all Left");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        ScreenModel.prototype.afterAllR = function (toRight, oldSource, newI) {
            console.log("after all right");
            console.log(toRight);
            console.log(oldSource);
            console.log(newI);
        };
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name, description) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.deletable = code % 3 === 0;
        }
        return ItemModel;
    }());
    var screen;
    this.bind(screen = new ScreenModel());
});
var openDlg = function (code) {
    alert(code);
};
//# sourceMappingURL=start.js.map