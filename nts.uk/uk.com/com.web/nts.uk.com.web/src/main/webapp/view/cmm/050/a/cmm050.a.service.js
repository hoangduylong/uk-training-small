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
                    var a;
                    (function (a) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                find: "sys/env/mailserver/find",
                                save: "sys/env/mailserver/save",
                                checkDataChanged: "sys/env/mailserver/checkDataChanged",
                            };
                            /**
                             *
                             */
                            function findMailServerSetting() {
                                return nts.uk.request.ajax(path.find);
                            }
                            service.findMailServerSetting = findMailServerSetting;
                            /**
                             *
                             */
                            function registerMailServerSetting(data) {
                                return nts.uk.request.ajax(path.save, data);
                            }
                            service.registerMailServerSetting = registerMailServerSetting;
                            function checkDataChanged(data) {
                                return nts.uk.request.ajax(path.checkDataChanged, data);
                            }
                            service.checkDataChanged = checkDataChanged;
                        })(service = a.service || (a.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var MailServerDto = /** @class */ (function () {
                                function MailServerDto(useAuth, encryptionMethod, authenticationMethod, emailAuthencation, password, smtpDto, popDto, imapDto) {
                                    this.useAuth = useAuth;
                                    this.encryptionMethod = encryptionMethod;
                                    this.authMethod = authenticationMethod;
                                    this.emailAuthencation = emailAuthencation;
                                    this.password = password;
                                    this.smtpDto = smtpDto;
                                    this.popDto = popDto;
                                    this.imapDto = imapDto;
                                }
                                return MailServerDto;
                            }());
                            model.MailServerDto = MailServerDto;
                            var SmtpInfoDto = /** @class */ (function () {
                                function SmtpInfoDto(smtpServer, smtpPort) {
                                    this.smtpServer = smtpServer;
                                    this.smtpPort = smtpPort;
                                }
                                return SmtpInfoDto;
                            }());
                            model.SmtpInfoDto = SmtpInfoDto;
                            var PopInfoDto = /** @class */ (function () {
                                function PopInfoDto(popServer, popUseServer, popPort) {
                                    this.popServer = popServer;
                                    this.popUseServer = popUseServer;
                                    this.popPort = popPort;
                                }
                                return PopInfoDto;
                            }());
                            model.PopInfoDto = PopInfoDto;
                            var ImapInfoDto = /** @class */ (function () {
                                function ImapInfoDto(imapServer, imapUseServer, imapPort) {
                                    this.imapServer = imapServer;
                                    this.imapUseServer = imapUseServer;
                                    this.imapPort = imapPort;
                                }
                                return ImapInfoDto;
                            }());
                            model.ImapInfoDto = ImapInfoDto;
                        })(model = a.model || (a.model = {}));
                    })(a = cmm050.a || (cmm050.a = {}));
                })(cmm050 = view.cmm050 || (view.cmm050 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm050.a.service.js.map