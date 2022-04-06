var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm050;
                (function (cmm050) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                testMailServerSetting: "sys/env/mailserver/testMailSetting",
                            };
                            /**
                             *
                             */
                            function testMailServerSetting(data) {
                                return nts.uk.request.ajax(path.testMailServerSetting, data);
                            }
                            service.testMailServerSetting = testMailServerSetting;
                        })(service = b.service || (b.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var MailServerTest = /** @class */ (function () {
                                function MailServerTest(mailFrom, mailTo, contents) {
                                    this.mailFrom = mailFrom;
                                    this.mailTo = mailTo;
                                    this.contents = contents;
                                }
                                return MailServerTest;
                            }());
                            model.MailServerTest = MailServerTest;
                            var MailContents = /** @class */ (function () {
                                function MailContents() {
                                    this.subject = nts.uk.resource.getText("CMM050_31");
                                    this.body = nts.uk.resource.getText("CMM050_32");
                                }
                                return MailContents;
                            }());
                            model.MailContents = MailContents;
                        })(model = b.model || (b.model = {}));
                    })(b = cmm050.b || (cmm050.b = {}));
                })(cmm050 = view.cmm050 || (view.cmm050 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm050.b.service.js.map