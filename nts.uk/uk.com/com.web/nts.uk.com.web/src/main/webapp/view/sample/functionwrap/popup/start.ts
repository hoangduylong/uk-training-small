__viewContext.ready(function() {
    class ScreenModel {
        itemList: KnockoutObservableArray<ItemModel>;
        selectedCode: KnockoutObservable<string>;

        constructor() {
            var self = this;
            self.itemList = ko.observableArray([
                new ItemModel("1", "基本給"),
                new ItemModel("2", "役職手当"),
                new ItemModel("3", "基本給")
            ]);
            self.selectedCode = ko.observable("1");
        }
    }

    class ItemModel {
        code: string;
        name: string;

        constructor(code: string, name: string) {
            this.code = code;
            this.name = name;
        }
    }

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
    
    $(".destroy-popup1").click(function() {
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
    $(".show-popup2").click(function() {
        $(".popup-area2").ntsPopup("show");
    });
    $(".toggle-popup2").click(function() {
        $(".popup-area2").ntsPopup("toggle");
    });
    
    $(".close-popup").click(function() {
        $(this).parent().ntsPopup("hide");
    });
    this.bind(new ScreenModel());

});