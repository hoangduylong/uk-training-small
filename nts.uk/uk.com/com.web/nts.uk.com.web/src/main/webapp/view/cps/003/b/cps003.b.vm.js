var cps003;
(function (cps003) {
    var b;
    (function (b) {
        var vm;
        (function (vm) {
            var text = nts.uk.resource.getText;
            var alert = nts.uk.ui.dialog.alert;
            var alertError = nts.uk.ui.dialog.alertError;
            var close = nts.uk.ui.windows.close;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var format = nts.uk.text.format;
            var block = nts.uk.ui.block;
            var __viewContext = window['__viewContext'] || {};
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.currentMode = ko.observable(null);
                    this.currentFile = ko.observable(new FileData());
                    var self = this;
                    self.pushData();
                }
                ViewModel.prototype.pushData = function () {
                    var self = this, params = getShared('CPS003B_VALUE');
                    self.currentMode(new ModelData(params));
                };
                ViewModel.prototype.decide = function () {
                    var self = this, params = {
                        fileId: self.currentFile().fileId(),
                        fileName: self.currentFile().filename(),
                        categoryId: self.currentMode().categoryId,
                        modeUpdate: self.currentMode().mode(),
                        columnChange: self.currentMode().columnChange,
                        sids: self.currentMode().sids,
                        baseDate: moment.utc(self.currentMode().systemDate, "YYYY/MM/DD").toISOString()
                    };
                    if (_.isEmpty(self.currentFile().filename())) {
                        alertError({ messageId: "Msg_722" });
                        return;
                    }
                    block.invisible();
                    b.service.checkColums(params).done(function (data) {
                        setShared('CPS003C_VALUE', data);
                        block.clear();
                        close();
                    }).fail(function (res) {
                        alertError({ messageId: res.messageId, messageParams: [self.currentMode().categoryName] });
                        block.clear();
                    });
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            vm.ViewModel = ViewModel;
            var ModelData = /** @class */ (function () {
                function ModelData(data) {
                    this.mode = ko.observable(1);
                    this.updateModeEnable = ko.observable(true);
                    this.columnChange = [];
                    this.mode = ko.observable(1);
                    this.roundingRules = [
                        { id: 1, name: text("CPS003_19") },
                        { id: 2, name: text("CPS003_20") },
                    ];
                    var self = this;
                    self.categoryId = data.categoryId;
                    self.categoryName = data.categoryName;
                    self.systemDate = data.systemDate;
                    self.mode(data.mode);
                    self.updateModeEnable(data.updateModeEnable);
                    self.columnChange = data.columnChange;
                    self.sids = data.sids;
                }
                return ModelData;
            }());
            var FileData = /** @class */ (function () {
                function FileData() {
                    this.fileId = ko.observable("");
                    this.filename = ko.observable("");
                    this.fileInfo = ko.observable(null);
                    this.textId = ko.observable("CPS003_41");
                    this.accept = ko.observableArray(['.xlsx']);
                    this.asLink = ko.observable(true);
                    this.enable = ko.observable(true);
                    this.stereoType = ko.observable("CPS003_41");
                    this.imageSize = ko.observable("");
                }
                FileData.prototype.contructor = function () {
                    var self = this;
                    self.onchange = function (filename) {
                        console.log(filename);
                    };
                    self.onfilenameclick = function (filename) {
                        alert(filename);
                    };
                };
                FileData.prototype.upload = function () {
                    var self = this, option = {
                        stereoType: "excelFile",
                        onSuccess: function () { alert('upload Success'); },
                        onFail: function () { alert('upload Fails'); }
                    };
                    block.invisible();
                    $("#file-upload").ntsFileUpload({ stereoType: "excelFile" }).done(function (res) {
                        self.fileId(res[0].id);
                        self.imageSize("(" + format(text('CCG013_99'), res[0].originalSize) + ")");
                        block.clear();
                    }).fail(function (err) {
                        __viewContext.viewModel.currentFile().filename("");
                        __viewContext.viewModel.currentFile().imageSize("");
                        alertError({ messageId: "Msg_1466" });
                        block.clear();
                    });
                };
                return FileData;
            }());
        })(vm = b.vm || (b.vm = {}));
    })(b = cps003.b || (cps003.b = {}));
})(cps003 || (cps003 = {}));
//# sourceMappingURL=cps003.b.vm.js.map