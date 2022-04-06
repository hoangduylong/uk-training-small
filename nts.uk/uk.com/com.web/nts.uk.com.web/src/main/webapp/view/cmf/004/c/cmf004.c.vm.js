var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var setShared = nts.uk.ui.windows.setShared;
                            var getShared = nts.uk.ui.windows.getShared;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.fileName = ko.observable('');
                                    this.fileId = ko.observable('');
                                    this.password = ko.observable('');
                                    this.storeProcessingId = ko.observable('');
                                    this.fromServerFile = ko.observable(false);
                                    var self = this;
                                    var fileInfo = getShared('CMF004lParams');
                                    if (fileInfo) {
                                        self.fileName(fileInfo.fileName);
                                        self.fileId(fileInfo.fileId);
                                        self.storeProcessingId(fileInfo.storeProcessingId);
                                        self.fromServerFile(fileInfo.fromServerFile);
                                    }
                                }
                                ScreenModel.prototype.processing = function () {
                                    var self = this;
                                    var fileInfo = {
                                        fileId: self.fileId(),
                                        fileName: self.fileName(),
                                        password: self.password()
                                    };
                                    if (self.fromServerFile()) {
                                        var param = { storeProcessingId: self.storeProcessingId(), password: self.password() };
                                        var data;
                                        c.service.checkPassword(param).done(function (res) {
                                            if (!res) {
                                                data = { continuteProcessing: false, message: 'Msg_606' };
                                            }
                                            else {
                                                data = { fileInfo: fileInfo, continuteProcessing: true };
                                            }
                                        }).always(function () {
                                            console.log(data);
                                            setShared("CMF004_D_PARAMS", data);
                                            nts.uk.ui.windows.close();
                                        });
                                    }
                                    else {
                                        setShared("CMF004_D_PARAMS", { storeProcessingId: self.storeProcessingId(), fileInfo: fileInfo, continuteProcessing: true });
                                        nts.uk.ui.windows.close();
                                    }
                                };
                                ScreenModel.prototype.cancelProcessing = function () {
                                    setShared("CMF004_D_PARAMS", { continuteProcessing: false });
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cmf004.c || (cmf004.c = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.c.vm.js.map