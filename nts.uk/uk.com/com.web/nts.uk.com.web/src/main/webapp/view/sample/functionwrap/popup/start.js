__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.itemList = ko.observableArray([
                new ItemModel("1", "基本給"),
                new ItemModel("2", "役職手当"),
                new ItemModel("3", "基本給")
            ]);
            self.selectedCode = ko.observable("1");
        }
        return ScreenModel;
    }());
    var ItemModel = /** @class */ (function () {
        function ItemModel(code, name) {
            this.code = code;
            this.name = name;
        }
        return ItemModel;
    }());
    $(".popup-area1").ntsPopup({
        trigger: ".show-popup1",
        position: {
            my: "left top",
            at: "left bottom",
            of: ".show-popup1"
        },
        showOnStart: false,
        dismissible: true
    });
    $(".destroy-popup1").click(function () {
        $(".popup-area1").ntsPopup("destroy");
    });
    $(".popup-area2").ntsPopup({
        position: {
            my: "left top",
            at: "left bottom",
            of: ".show-popup2"
        },
        showOnStart: false,
        dismissible: false
    });
    $(".show-popup2").click(function () {
        $(".popup-area2").ntsPopup("show");
    });
    $(".toggle-popup2").click(function () {
        $(".popup-area2").ntsPopup("toggle");
    });
    $(".close-popup").click(function () {
        $(this).parent().ntsPopup("hide");
    });
    this.bind(new ScreenModel());
});
//# sourceMappingURL=start.js.map