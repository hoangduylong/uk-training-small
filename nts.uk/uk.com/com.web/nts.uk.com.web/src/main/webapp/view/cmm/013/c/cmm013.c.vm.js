var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm013;
                (function (cmm013) {
                    var b;
                    (function (b) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.createNew = ko.observable(null);
                                    self.positionList = ko.observableArray([]);
                                    self.positionCode = ko.observable("");
                                    self.positionName = ko.observable("");
                                    self.order = ko.observable(0);
                                    /*// Khi thay đổi code
                                    self.positionCode.subscribe((value) => {
                    
                                    })*/
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    self.loadPositionList()
                                        .done(function (data) {
                                        // Update position mode
                                        self.createNew(false);
                                        self.positionList(data);
                                    })
                                        .fail(function (res) {
                                        // Create new position mode
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                    ;
                                };
                                /* load position list */
                                ScreenModel.prototype.loadPositionList = function () {
                                    var dfd = $.Deferred();
                                    b.service.findAllPosition()
                                        .done(function (data) {
                                        dfd.resolve(data);
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                // /* create new position */
                                // public createNewPosition(): void {
                                // 	let self = this;
                                // 	self.createNew(true);
                                // 	self.positionCode("");
                                // 	self.positionName("");
                                // }
                                /* remove position */
                                ScreenModel.prototype.remove = function () {
                                    var self = this;
                                    if (self.positionCode() !== "") {
                                        var currentIndex = null;
                                        for (var _i = 0, _a = self.positionList(); _i < _a.length; _i++) {
                                            var item = _a[_i];
                                            if (item.positionCode === self.positionCode()) {
                                                currentIndex = self.positionList.indexOf(item);
                                            }
                                        }
                                        self.positionList.splice(currentIndex, 1);
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                        });
                                    }
                                };
                                /* close dialog */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /* validate */
                                ScreenModel.prototype.validate = function () {
                                    // clear error
                                    nts.uk.ui.errors.clearAll();
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                ScreenModel.prototype.execution = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    var positionList = self.positionList();
                                    // service.updateOrder(positionList)
                                    // 	.done((data: any) => {
                                    // 		dfd.resolve(data);
                                    // 	})
                                    // 	.fail((res: any) => {
                                    // 		dfd.reject(res);
                                    // 	});
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = b.viewmodel || (b.viewmodel = {}));
                    })(b = cmm013.b || (cmm013.b = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.c.vm.js.map