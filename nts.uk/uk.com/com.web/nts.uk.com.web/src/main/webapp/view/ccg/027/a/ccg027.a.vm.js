var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var ccg027;
                (function (ccg027) {
                    var a;
                    (function (a) {
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    this.sendingAddressChecks = ko.observable(false);
                                    this.sendingAddressEnable = ko.observable(true);
                                    var self = this;
                                    self.ListReturnCC = ko.observableArray([]);
                                    self.ListReturnBCC = ko.observableArray([]);
                                    self.sendingAddressChecks(nts.uk.ui.windows.getShared("sendingAddressCheck"));
                                    self.senderAddress = ko.observable("");
                                    self.mailAddressCC = ko.observable(nts.uk.ui.windows.getShared("MailSettings").mailAddressCC.toString().replace(/,/g, ";"));
                                    self.mailAddressBCC = ko.observable(nts.uk.ui.windows.getShared("MailSettings").mailAddressBCC.toString().replace(/,/g, ";"));
                                    self.subject = ko.observable(nts.uk.ui.windows.getShared("MailSettings").subject);
                                    self.text = ko.observable(nts.uk.ui.windows.getShared("MailSettings").text);
                                    self.mailRely = ko.observable(nts.uk.ui.windows.getShared("MailSettings").mailRely);
                                    self.SetCC = ko.observable(nts.uk.ui.windows.getShared("SetCC"));
                                    self.SetBCC = ko.observable(nts.uk.ui.windows.getShared("SetBCC"));
                                    self.SetReply = ko.observable(nts.uk.ui.windows.getShared("SetReply"));
                                    self.SetSubject = ko.observable(nts.uk.ui.windows.getShared("SetSubject"));
                                    self.SetBody = ko.observable(nts.uk.ui.windows.getShared("SetBody"));
                                    self.wording = ko.observable(nts.uk.ui.windows.getShared("wording"));
                                }
                                ScreenModel.prototype.startPage = function () {
                                    var self = this;
                                    var dfd = $.Deferred();
                                    if (self.sendingAddressChecks()) {
                                        // initial screen
                                        a.service.mailServer().done(function (data) {
                                            if (data) {
                                                if (data.useAuth === 1) {
                                                    self.senderAddress = ko.observable(data.emailAuthencation);
                                                    self.sendingAddressEnable = ko.observable(false);
                                                }
                                                else {
                                                    self.senderAddress = ko.observable(nts.uk.ui.windows.getShared("senderAddress"));
                                                }
                                            }
                                            else {
                                                self.senderAddress = ko.observable(nts.uk.ui.windows.getShared("senderAddress"));
                                            }
                                            dfd.resolve();
                                        });
                                    }
                                    else {
                                        dfd.resolve();
                                    }
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.checkContenListMail = function () {
                                    var self = this;
                                    var kt = true;
                                    self.ListReturnCC(self.mailAddressCC().replace(/\s/g, '').split(";"));
                                    self.ListReturnBCC(self.mailAddressBCC().replace(/\s/g, '').split(";"));
                                    // remove email = ""
                                    self.ListReturnCC(self.ListReturnCC.remove(function (item) { return item.length > 0; }));
                                    self.ListReturnBCC(self.ListReturnBCC.remove(function (item) { return item.length > 0; }));
                                    //var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                                    //var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
                                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                    $('.nts-input').ntsError('clear');
                                    if (self.ListReturnCC().length > 0) {
                                        if (self.ListReturnCC().length > 100) {
                                            $('#mailAddressCC').ntsError('set', { messageId: "Msg_1098" });
                                            //nts.uk.ui.dialog.alertError({ messageId: "Msg_1098" });
                                            kt = false;
                                        }
                                        else {
                                            for (var _i = 0, _a = self.ListReturnCC(); _i < _a.length; _i++) {
                                                var entry = _a[_i];
                                                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                                if (!re.test(entry) || entry.length > 256) {
                                                    $('#mailAddressCC').ntsError('set', { messageId: "Msg_1097" });
                                                    //nts.uk.ui.dialog.alertError({ messageId: "Msg_1097" });
                                                    kt = false;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    if (self.ListReturnBCC().length > 0) {
                                        if (self.ListReturnBCC().length > 100) {
                                            $('#mailAddressBCC').ntsError('set', { messageId: "Msg_1100" });
                                            //nts.uk.ui.dialog.alertError({ messageId: "Msg_1100" });
                                            kt = false;
                                        }
                                        else {
                                            for (var _b = 0, _c = self.ListReturnBCC(); _b < _c.length; _b++) {
                                                var entry = _c[_b];
                                                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                                if (!re.test(entry) || entry.length > 256) {
                                                    $('#mailAddressBCC').ntsError('set', { messageId: "Msg_1099" });
                                                    //nts.uk.ui.dialog.alertError({ messageId: "Msg_1099" });
                                                    kt = false;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                    if (self.sendingAddressChecks() && self.senderAddress().length > 0) {
                                        if (self.clean(self.senderAddress().replace(/\s/g, '').split(";")).length > 1) {
                                            $('#senderAddress').ntsError('set', { messageId: "Msg_1113" });
                                            //nts.uk.ui.dialog.alertError({ messageId: "Msg_1113" });
                                            kt = false;
                                        }
                                        else {
                                            for (var _d = 0, _e = self.senderAddress().replace(/\s/g, '').split(";"); _d < _e.length; _d++) {
                                                var entry = _e[_d];
                                                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                                if (!re.test(entry) || entry.length > 256 || entry == "") {
                                                    $('#senderAddress').ntsError('set', { messageId: "Msg_1112" });
                                                    //nts.uk.ui.dialog.alertError({ messageId: "Msg_1097" });
                                                    kt = false;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                    re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                    if (self.clean(self.mailRely().replace(/\s/g, '').split(";")).length > 1 && self.mailRely().length > 0) {
                                        $('#mailRely').ntsError('set', { messageId: "Msg_1115" });
                                        //nts.uk.ui.dialog.alertError({ messageId: "Msg_1115" });
                                        kt = false;
                                    }
                                    else if (self.mailRely().length > 0) {
                                        for (var _f = 0, _g = self.mailRely().replace(/\s/g, '').split(";"); _f < _g.length; _f++) {
                                            var entry = _g[_f];
                                            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
                                            if (!re.test(entry) || entry.length > 256 || entry == "") {
                                                $('#mailRely').ntsError('set', { messageId: "Msg_1114" });
                                                //nts.uk.ui.dialog.alertError({ messageId: "Msg_1097" });
                                                kt = false;
                                                break;
                                            }
                                        }
                                    }
                                    return kt;
                                };
                                ScreenModel.prototype.clean = function (arr) {
                                    for (var i = 0; i < arr.length; i++) {
                                        if (arr[i] == "") {
                                            arr.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    return arr;
                                };
                                ScreenModel.prototype.decision = function () {
                                    //console.time('decision');
                                    var self = this;
                                    if (self.checkContenListMail() && !$(".nts-input").ntsError("hasError")) {
                                        var MailSettings = ({
                                            subject: self.subject(),
                                            text: self.text(),
                                            mailAddressCC: self.ListReturnCC(),
                                            mailAddressBCC: self.ListReturnBCC(),
                                            mailRely: self.mailRely()
                                        });
                                        nts.uk.ui.windows.setShared("senderAddress", self.senderAddress());
                                        nts.uk.ui.windows.setShared("MailSettings", MailSettings);
                                        nts.uk.ui.windows.close();
                                    }
                                    //console.timeEnd('decision');
                                };
                                ScreenModel.prototype.cancel_Dialog = function () {
                                    //console.time('cancel_Dialog');
                                    nts.uk.ui.windows.setShared("MailSettings", null);
                                    nts.uk.ui.windows.close();
                                    //console.timeEnd('cancel_Dialog');
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = ccg027.a || (ccg027.a = {}));
                })(ccg027 = view.ccg027 || (view.ccg027 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg027.a.vm.js.map