var editorOption = nts.uk.ui.option;
__viewContext.ready(function () {
    var ScreenModel = /** @class */ (function () {
        function ScreenModel() {
            var self = this;
            self.value = ko.observable(12);
            self.constraint = '';
            self.option = ko.mapping.fromJS(new editorOption.NumberEditorOption({ grouplength: 3, decimallength: 2 }));
            self.enable = ko.observable(true);
            self.readonly = ko.observable(false);
            self.dirty = new nts.uk.ui.DirtyChecker(self.value);
        }
        ScreenModel.prototype.reset = function () {
            var self = this;
            self.dirty.reset();
        };
        ;
        ScreenModel.prototype.checkDirty = function () {
            var self = this;
            if (self.dirty.isDirty()) {
                alert("Data is changed.");
            }
            else {
                alert("Data isn't changed.");
            }
        };
        ;
        ScreenModel.prototype.reload = function () {
            var self = this;
            location.reload(true);
        };
        return ScreenModel;
    }());
    var viewmodel = new ScreenModel();
    nts.uk.ui.confirmSave(viewmodel.dirty);
    this.bind(viewmodel);
});
//# sourceMappingURL=start.js.map