var multiple = true;
var checkboxMode = multiple ? "biState" : "off";
__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            var data = [new Node("IG Touring", "IG Touring", [new Node("Rome", "Rome", [new Node("One Week", "$1178", [new Node("Hotel", "+$200", []), new Node("House", "+$100", [])]), new Node("Two Weeks", "$1997", [])]),
                    new Node("France", "France", [new Node("Paris", "Paris", [])])])];
            self.dataSource = data;
            self.selectedValue = ko.observable('');
            self.checkedValues = ko.observableArray([]);
            $("#tree").igTree({
                singleBranchExpand: false,
                initialExpandDepth: 1,
                //initialExpandDepth = x, where all nodes at level x are expanded
                checkboxMode: checkboxMode,
                bindings: {
                    textKey: 'text',
                    valueKey: 'value',
                    childDataProperty: 'childs',
                    bindings: {
                        textKey: 'text',
                        valueKey: 'value',
                        childDataProperty: 'childs',
                        bindings: {
                            textKey: 'text',
                            valueKey: 'value',
                            childDataProperty: 'childs',
                            bindings: {
                                textKey: 'text',
                                valueKey: 'value'
                            }
                        }
                    }
                },
                selectionChanged: function (evt, ui) {
                    self.selectedValue(ui.selectedNodes[0].element.attr('data-value'));
                },
                nodeCheckstateChanged: function (evt, ui) {
                    var selectedList = ui.newCheckedNodes;
                    var arr = [];
                    for (var i = 0; i < selectedList.length; i++)
                        arr.push(selectedList[i].element.attr('data-value'));
                    self.checkedValues(arr);
                    //console.log(arr);
                },
                dataSource: data
            });
        }
        return ScreenModel;
    }());
    var Node = /** @class */ (function () {
        function Node(text, value, childs) {
            var self = this;
            self.text = text;
            self.value = value;
            self.childs = childs;
        }
        return Node;
    }());
    this.bind(new ScreenModel());
});
//# sourceMappingURL=igTree.js.map