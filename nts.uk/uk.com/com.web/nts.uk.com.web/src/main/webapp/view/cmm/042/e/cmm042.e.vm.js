var cmm042;
(function (cmm042) {
    var e;
    (function (e) {
        var viewmodel;
        (function (viewmodel) {
            var modal = nts.uk.ui.windows.sub.modal;
            var setShared = nts.uk.ui.windows.setShared;
            var getShared = nts.uk.ui.windows.getShared;
            var close = nts.uk.ui.windows.close;
            var __viewContext = window['__viewContext'] || {}, block = window["nts"]["uk"]["ui"]["block"]["grayout"], unblock = window["nts"]["uk"]["ui"]["block"]["clear"], invisible = window["nts"]["uk"]["ui"]["block"]["invisible"];
            var ViewModel = /** @class */ (function () {
                function ViewModel() {
                    this.portType = ko.observable('A');
                    this.enaBtnshowDialogF = ko.observable(true);
                    this.resultFromF = ko.observable('NEC COMSTARZ MULTI 144');
                    this.codeCommand = ko.observable('ATQ0V0E0&D2X0&S0%C1&W');
                    this.id = ko.observable('1');
                    this.dataShare = null;
                    var self = this;
                    self.dataShare = getShared('CMM042E_PARAM');
                    self.portType(self.dataShare.selectedCode_PortType);
                    self.listCable = ko.observable([
                        { value: 1, text: 'RS-232C' },
                        { value: 2, text: 'RS-485' }
                    ]);
                    self.selectedCode_Cable = ko.observable(5);
                    self.listSpeed = ko.observable([
                        { value: 1, text: '1200' },
                        { value: 2, text: '2400' },
                        { value: 3, text: '4800' },
                        { value: 4, text: '9600' },
                        { value: 5, text: '19200' },
                        { value: 6, text: '38400' },
                    ]);
                    self.selectedCode_Speed = ko.observable(5);
                    self.itemList = ko.observable([
                        { id: 1, name: '一覧から選択' },
                        { id: 2, name: 'ATコマンド' }
                    ]);
                    self.selectedId = ko.observable(1);
                    self.selectedId.subscribe(function (id) {
                        if (id == 2) {
                            self.enaBtnshowDialogF(false);
                        }
                        else if (id == 1) {
                            self.enaBtnshowDialogF(true);
                        }
                    });
                    if (self.dataShare.code == '') {
                        self.resultFromF('');
                        self.codeCommand('');
                    }
                }
                ViewModel.prototype.start = function () {
                    var self = this, dfd = $.Deferred();
                    dfd.resolve();
                    return dfd.promise();
                };
                ViewModel.prototype.showDialogF = function () {
                    var self = this;
                    setShared('CMM042F_PARAM', '');
                    modal('../f/index.xhtml').onClosed(function () {
                        var dto = getShared('CMM042F_VALUE');
                        self.resultFromF(dto.resultFromF);
                        self.codeCommand(dto.codeCommand);
                    });
                };
                ViewModel.prototype.pushDataToAScreen = function () {
                    var self = this;
                    if (nts.uk.ui.errors.hasError()) {
                        return;
                    }
                    setShared('CMM042E_VALUE', {});
                    close();
                };
                ViewModel.prototype.close = function () {
                    close();
                };
                return ViewModel;
            }());
            viewmodel.ViewModel = ViewModel;
        })(viewmodel = e.viewmodel || (e.viewmodel = {}));
    })(e = cmm042.e || (cmm042.e = {}));
})(cmm042 || (cmm042 = {}));
//# sourceMappingURL=cmm042.e.vm.js.map