var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ktg002;
                (function (ktg002) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.presenceAppData = ko.observableArray([
                                        { code: '0', name: nts.uk.resource.getText("KTG002_4") },
                                        { code: '1', name: nts.uk.resource.getText("KTG002_5") }
                                    ]);
                                    self.presenceAppTxt = ko.observable("");
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ktg002.a || (ktg002.a = {}));
                })(ktg002 = view.ktg002 || (view.ktg002 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ktg002.a.vm.js.map