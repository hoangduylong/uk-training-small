var testdata;
(function (testdata) {
    var HogeItem = /** @class */ (function () {
        function HogeItem(code, name) {
            this.code = ko.observable(code);
            this.name = ko.observable(name);
        }
        return HogeItem;
    }());
    testdata.HogeItem = HogeItem;
    function createHogeArray(numberOfItems) {
        var array = [];
        for (var i = 0; i < numberOfItems; i++) {
            array.push(new HogeItem("" + i, "ほげー" + i));
        }
        return array;
    }
    testdata.createHogeArray = createHogeArray;
    function createRandomHogeArray(numberOfItems) {
        var array = [];
        for (var i = 0; i < numberOfItems; i++) {
            array.push(new HogeItem("" + i, "ほげー" + Math.random()));
        }
        return array;
    }
    testdata.createRandomHogeArray = createRandomHogeArray;
})(testdata || (testdata = {}));
//# sourceMappingURL=testdata.js.map