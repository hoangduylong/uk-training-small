var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg008;
                (function (ccg008) {
                    var d;
                    (function (d) {
                        var alertmessage;
                        (function (alertmessage) {
                            var paths = {
                                findPersonInfo: "myprofile/birthday"
                            };
                            function findPersonInfo() {
                                return nts.uk.request.ajax("com", paths.findPersonInfo);
                            }
                            alertmessage.findPersonInfo = findPersonInfo;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var self = this;
                                    self.message = ko.observable("");
                                }
                                ScreenModel.prototype.start = function () {
                                    var self = this;
                                    findPersonInfo().done(function (res) {
                                        if (res.checkBirthday) {
                                            // kiem tra lan sau co được phép hiển thị thông báo nữa không?
                                            var key = "isBirthDay";
                                            nts.uk.characteristics.restore(key).done(function (data) {
                                                if (!data) {
                                                    nts.uk.ui.windows.setShared("ALERT_MESSAGE", res.message);
                                                    //Display birthday dialog
                                                    nts.uk.ui.windows.sub.modeless("/view/ccg/008/d/index.xhtml");
                                                }
                                            });
                                        }
                                    });
                                };
                                return ScreenModel;
                            }());
                            alertmessage.ScreenModel = ScreenModel;
                        })(alertmessage = d.alertmessage || (d.alertmessage = {}));
                    })(d = ccg008.d || (ccg008.d = {}));
                })(ccg008 = view.ccg008 || (view.ccg008 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg008.d.main.js.map