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
                    var template;
                    (function (template) {
                        var vm;
                        (function (vm) {
                            var ntsWindows = nts.uk.ui.windows;
                            var ViewModel = /** @class */ (function () {
                                function ViewModel() {
                                    var self = this;
                                    self.sendingAddressCheck = ko.observable(true);
                                    self.setCC = ko.observable(true);
                                    self.setBCC = ko.observable(true);
                                    self.setReply = ko.observable(true);
                                    self.setSubject = ko.observable(true);
                                    self.setBody = ko.observable(true);
                                    self.wording = ko.observable('');
                                    self.mailSetting = ko.observable(new MailSetting('', '', [], [], ''));
                                }
                                ViewModel.prototype.openDialogCCG207 = function () {
                                    var self = this;
                                    ntsWindows.setShared("sendingAddressCheck", self.sendingAddressCheck());
                                    ntsWindows.setShared("SetCC", self.setCC());
                                    ntsWindows.setShared("SetBCC", self.setBCC());
                                    ntsWindows.setShared("SetReply", self.setReply());
                                    ntsWindows.setShared("SetSubject", self.setSubject());
                                    ntsWindows.setShared("SetBody", self.setBody());
                                    ntsWindows.setShared("wording", self.wording());
                                    ntsWindows.setShared("MailSettings", self.mailSetting());
                                    ntsWindows.sub.modal("../a/index.xhtml").onClosed(function () {
                                    });
                                };
                                return ViewModel;
                            }());
                            vm.ViewModel = ViewModel;
                            var MailSetting = /** @class */ (function () {
                                function MailSetting(subject, text, mailAddressCC, mailAddressBCC, mailReply) {
                                    this.subject = subject;
                                    this.text = text;
                                    this.mailAddressCC = mailAddressCC;
                                    this.mailAddressBCC = mailAddressBCC;
                                    this.mailReply = mailReply;
                                }
                                return MailSetting;
                            }());
                        })(vm = template.vm || (template.vm = {}));
                    })(template = ccg027.template || (ccg027.template = {}));
                })(ccg027 = view.ccg027 || (view.ccg027 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=ccg027.temp.vm.js.map