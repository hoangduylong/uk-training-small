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
                        var setShared = nts.uk.ui.windows.setShared;
                        var blockUI = nts.uk.ui.block;
                        var errors = nts.uk.ui.errors;
                        var viewmodel;
                        (function (viewmodel) {
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.mailServerData = null;
                                    _self.isEnableButtonTest = ko.observable(false);
                                    _self.useServerArray = ko.observableArray([
                                        { value: 1, name: nts.uk.resource.getText("CMM050_7") },
                                        { value: 0, name: nts.uk.resource.getText("CMM050_8") }
                                    ]);
                                    _self.authMethodArray = ko.observable(__viewContext.enums.AuthenticationMethod);
                                    _self.encryptionMethodArray = ko.observableArray(__viewContext.enums.EncryptionMethod);
                                    _self.authMethodEnable = ko.observable(false);
                                    _self.havePopSetting = ko.observable(false);
                                    _self.haveImapSetting = ko.observable(false);
                                    _self.haveEncryptMethod = ko.observable(false);
                                    _self.emailAuth = ko.observable("");
                                    _self.authMethod = ko.observable(0);
                                    _self.password = ko.observable("");
                                    _self.encryptionMethod = ko.observable(0);
                                    _self.useSmtpAuthen = ko.observable(false);
                                    _self.smtpPort = ko.observable(null);
                                    _self.smtpServer = ko.observable("");
                                    _self.imapPort = ko.observable(143);
                                    _self.imapUseServer = ko.observable(0);
                                    _self.imapServer = ko.observable("");
                                    _self.popPort = ko.observable(110);
                                    _self.popUseServer = ko.observable(0);
                                    _self.popServer = ko.observable("");
                                    _self.imapServerEnable = ko.observable(false);
                                    _self.popServerEnable = ko.observable(false);
                                    _self.computedText = ko.computed(function () {
                                        if (_self.useSmtpAuthen()) {
                                            return nts.uk.resource.getText("CMM050_13", [587]);
                                        }
                                        else {
                                            return nts.uk.resource.getText("CMM050_13", [25]);
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.useSmtpAuthen.subscribe(function (value) {
                                        _self.hasError();
                                        if (value) {
                                            _self.authMethodEnable(true);
                                            //                        _self.smtpPort(25);
                                            _self.fillUI(_self.authMethod());
                                        }
                                        else {
                                            //                       _self.smtpPort(587);
                                            _self.authMethodEnable(false);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(false);
                                            _self.haveEncryptMethod(false);
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.authMethod.subscribe(function (authMethodChanged) {
                                        errors.clearAll();
                                        _self.fillUI(authMethodChanged);
                                    });
                                    //handle when value have been changed
                                    _self.imapUseServer.subscribe(function (imapUseServerChanged) {
                                        errors.clearAll();
                                        if (imapUseServerChanged == ImapUseServer.USE) {
                                            _self.imapServerEnable(true);
                                        }
                                        else {
                                            _self.imapServerEnable(false);
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.popUseServer.subscribe(function (popUseServerChanged) {
                                        errors.clearAll();
                                        if (popUseServerChanged == PopUseServer.USE) {
                                            _self.popServerEnable(true);
                                        }
                                        else {
                                            _self.popServerEnable(false);
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.emailAuth.subscribe(function (emailString) {
                                        if (emailString.trim().length <= 0) {
                                            _self.emailAuth(emailString.trim());
                                        }
                                    });
                                    _self.password.subscribe(function (pass) {
                                        if (pass.trim().length <= 0) {
                                            _self.password(pass.trim());
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.popServer.subscribe(function (popServer) {
                                        if (popServer.trim().length <= 0) {
                                            _self.popServer(popServer.trim());
                                        }
                                    });
                                    _self.imapServer.subscribe(function (imapServer) {
                                        if (imapServer.trim().length <= 0) {
                                            _self.imapServer(imapServer.trim());
                                        }
                                    });
                                    //handle when value have been changed
                                    _self.smtpServer.subscribe(function (smtpServer) {
                                        if (smtpServer.trim().length <= 0) {
                                            _self.smtpServer(smtpServer.trim());
                                        }
                                    });
                                }
                                /**
                                 * Register Mail server setting
                                 */
                                ScreenModel.prototype.registerMailSetting = function () {
                                    blockUI.invisible();
                                    var _self = this;
                                    $(".nts-input").ntsError("validate");
                                    if (nts.uk.ui.errors.hasError()) {
                                        blockUI.clear();
                                        return;
                                    }
                                    // Validate
                                    if (_self.hasError()) {
                                        _self.validateDomain();
                                        blockUI.clear();
                                        return;
                                    }
                                    var dfd = $.Deferred();
                                    //prepare data
                                    if (!_.isNumber(_self.imapPort())) {
                                        _self.imapPort(_self.mailServerData.imapDto.imapPort);
                                    }
                                    if (!_.isNumber(_self.popPort())) {
                                        _self.popPort(_self.mailServerData.popDto.popPort);
                                    }
                                    var params = new a.model.MailServerDto(_self.useSmtpAuthen() ? 1 : 0, _self.encryptionMethod(), _self.authMethod(), _self.emailAuth(), _self.password(), new a.model.SmtpInfoDto(_self.smtpServer(), _self.smtpPort()), new a.model.PopInfoDto(_self.popServer(), _self.popUseServer(), _self.popPort()), new a.model.ImapInfoDto(_self.imapServer(), _self.imapUseServer(), _self.imapPort()));
                                    blockUI.grayout();
                                    _self.saveMailServerSetting(params).done(function () {
                                        dfd.resolve();
                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                            _self.startPage().done(function () { });
                                            $('#A8_6').focus();
                                        });
                                    }).fail(function () {
                                        alert('error');
                                    }).always(function () { return blockUI.clear(); });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.checkToUseOlDataOrNewData = function () {
                                };
                                ScreenModel.prototype.validateDomain = function () {
                                    var _self = this;
                                    // validate input pop info
                                    if (_self.useSmtpAuthen() && _self.authMethod() == AuthenticationMethod.POP_BEFORE_SMTP) {
                                        if (nts.uk.text.isNullOrEmpty(_self.popPort())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_542" });
                                        }
                                        if (_self.popUseServer() == UseServer.USE && nts.uk.text.isNullOrEmpty(_self.popServer())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_543" });
                                        }
                                    }
                                    // validate input imap info
                                    if (_self.useSmtpAuthen() && _self.authMethod() == AuthenticationMethod.IMAP_BEFORE_SMTP) {
                                        if (nts.uk.text.isNullOrEmpty(_self.imapPort())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_544" });
                                        }
                                        if (_self.imapUseServer() == UseServer.USE && nts.uk.text.isNullOrEmpty(_self.imapServer())) {
                                            nts.uk.ui.dialog.alertError({ messageId: "Msg_545" });
                                        }
                                    }
                                };
                                /**
                                 * Show dialog test
                                 */
                                ScreenModel.prototype.showDialogTest = function () {
                                    var _self = this;
                                    // Validate
                                    if (nts.uk.text.isNullOrEmpty(_self.emailAuth())) {
                                        nts.uk.ui.dialog.alert({ messageId: "Msg_533" });
                                        return;
                                    }
                                    // Validate
                                    if (_self.hasError()) {
                                        return;
                                    }
                                    //prepare data
                                    if (!_.isNumber(_self.imapPort())) {
                                        _self.imapPort(_self.mailServerData.imapDto.imapPort);
                                    }
                                    if (!_.isNumber(_self.popPort())) {
                                        _self.popPort(_self.mailServerData.popDto.popPort);
                                    }
                                    // テスト送信前チェック
                                    var param = new a.model.MailServerDto(_self.useSmtpAuthen() ? 1 : 0, _self.encryptionMethod(), _self.authMethod(), _self.emailAuth(), _self.password(), new a.model.SmtpInfoDto(_self.smtpServer(), _self.smtpPort()), new a.model.PopInfoDto(_self.popServer(), _self.popUseServer(), _self.popPort()), new a.model.ImapInfoDto(_self.imapServer(), _self.imapUseServer(), _self.imapPort()));
                                    a.service.checkDataChanged(param).then(function (result) {
                                        // 変更された項目はない
                                        if (!result) {
                                            // 終了状態：処理実行
                                            _self.proceedOpenDialogB();
                                        }
                                        else {
                                            // 確認メッセージ（ID：#Msg_2325）を表示
                                            nts.uk.ui.dialog.confirm({ messageId: "Msg_2325" })
                                                // 終了状態：処理中断
                                                .ifNo(function () { })
                                                .ifYes(function () {
                                                // 「A：登録時チェック処理」を実行
                                                _self.validateDomain();
                                                if (!nts.uk.ui.errors.hasError()) {
                                                    // ドメインモデル「メールサーバ」を登録する
                                                    _self.saveMailServerSetting(param).then(function () {
                                                        nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () { return _self.proceedOpenDialogB(); });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                };
                                ScreenModel.prototype.proceedOpenDialogB = function () {
                                    var _self = this;
                                    setShared('CMM050Params', {
                                        emailAuth: _self.emailAuth(),
                                    }, true);
                                    nts.uk.ui.windows.sub.modal("/view/cmm/050/b/index.xhtml").onClosed(function () {
                                    });
                                };
                                /**
                                 * Start Page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    _self.loadMailServerSetting().done(function (data) {
                                        _self.mailServerData = data;
                                        //check visible
                                        if (data.useAuth == UseServer.USE) {
                                            if (data.authMethod == AuthenticationMethod.POP_BEFORE_SMTP && data.popDto.popUseServer == PopUseServer.USE) {
                                                _self.popServerEnable(true);
                                            }
                                            else if (data.authMethod == AuthenticationMethod.IMAP_BEFORE_SMTP && data.imapDto.imapUseServer == ImapUseServer.USE) {
                                                _self.imapServerEnable(true);
                                            }
                                            _self.fillUI(data.authMethod);
                                        }
                                        else {
                                            _self.fillUI(99);
                                        }
                                        dfd.resolve();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * init UI
                                 */
                                ScreenModel.prototype.fillUI = function (authMethodChanged) {
                                    var _self = this;
                                    switch (authMethodChanged) {
                                        case AuthenticationMethod.POP_BEFORE_SMTP:
                                            _self.haveEncryptMethod(false);
                                            _self.havePopSetting(true);
                                            _self.haveImapSetting(false);
                                            break;
                                        case AuthenticationMethod.IMAP_BEFORE_SMTP:
                                            _self.haveEncryptMethod(false);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(true);
                                            break;
                                        case AuthenticationMethod.SMTP_AUTH_LOGIN:
                                            _self.haveEncryptMethod(true);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(false);
                                            break;
                                        case AuthenticationMethod.SMTP_AUTH_PLAIN:
                                            _self.haveEncryptMethod(true);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(false);
                                            break;
                                        case AuthenticationMethod.SMTP_AUTH_CRAM_MD5:
                                            _self.haveEncryptMethod(false);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(false);
                                            break;
                                        default:
                                            _self.haveEncryptMethod(false);
                                            _self.havePopSetting(false);
                                            _self.haveImapSetting(false);
                                            break;
                                    }
                                };
                                /**
                                 * Check Errors all input.
                                 */
                                ScreenModel.prototype.hasError = function () {
                                    var _self = this;
                                    _self.clearErrors();
                                    $('#A2_2').ntsEditor("validate");
                                    if (_self.useSmtpAuthen()) {
                                        $('#A5_2').ntsEditor("validate");
                                    }
                                    $('#A8_3').ntsEditor("validate");
                                    $('#A8_6').ntsEditor("validate");
                                    // validate input pop info
                                    if (_self.useSmtpAuthen() && _self.authMethod() == AuthenticationMethod.POP_BEFORE_SMTP) {
                                        $('#A9_3').ntsEditor("validate");
                                        if (_self.popUseServer() == UseServer.USE && nts.uk.text.isNullOrEmpty(_self.popServer())) {
                                            $('#A9_10').ntsEditor("validate");
                                        }
                                    }
                                    // validate input imap info
                                    if (_self.useSmtpAuthen() && _self.authMethod() == AuthenticationMethod.IMAP_BEFORE_SMTP) {
                                        $('#A10_3').ntsEditor("validate");
                                        if (_self.imapUseServer() == UseServer.USE && nts.uk.text.isNullOrEmpty(_self.imapServer())) {
                                            $('#A10_10').ntsEditor("validate");
                                        }
                                    }
                                    if ($('.nts-input').ntsError('hasError')) {
                                        return true;
                                    }
                                    return false;
                                };
                                /**
                                 * Clear Errors
                                 */
                                ScreenModel.prototype.clearErrors = function () {
                                    // Clear errors
                                    $('#email_auth').ntsEditor("clear");
                                    $('#password').ntsEditor("clear");
                                    $('#smtp_port').ntsEditor("clear");
                                    $('#smtp_server').ntsEditor("clear");
                                    $('#imap_port').ntsEditor("clear");
                                    $('#imap_server').ntsEditor("clear");
                                    $('#pop_port').ntsEditor("clear");
                                    $('#pop_server').ntsEditor("clear");
                                    // Clear error inputs
                                    $('.nts-input').ntsError('clear');
                                };
                                /**
                                 * Get mail server setting
                                 */
                                ScreenModel.prototype.loadMailServerSetting = function () {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    a.service.findMailServerSetting().done(function (data) {
                                        if (data === undefined) {
                                            _self.isEnableButtonTest(false);
                                            var data_1 = new a.model.MailServerDto(_self.useSmtpAuthen() ? 1 : 0, _self.encryptionMethod(), _self.authMethod(), _self.emailAuth(), _self.password(), new a.model.SmtpInfoDto(_self.smtpServer(), _self.smtpPort()), new a.model.PopInfoDto(_self.popServer(), _self.popUseServer(), _self.popPort()), new a.model.ImapInfoDto(_self.imapServer(), _self.imapUseServer(), _self.imapPort()));
                                            dfd.resolve(data_1);
                                        }
                                        else {
                                            //set common mail server setting data
                                            _self.isEnableButtonTest(true);
                                            _self.emailAuth(data.emailAuthencation);
                                            _self.useSmtpAuthen(data.useAuth === 1);
                                            _self.authMethod(data.authMethod);
                                            _self.password(data.password);
                                            _self.encryptionMethod(data.encryptionMethod);
                                            // set smtp info data
                                            _self.smtpPort(data.smtpDto.smtpPort);
                                            _self.smtpServer(data.smtpDto.smtpServer);
                                            // set pop info data
                                            _self.popPort(data.popDto.popPort);
                                            _self.popUseServer(data.popDto.popUseServer);
                                            _self.popServer(data.popDto.popServer);
                                            // set imap info data
                                            _self.imapPort(data.imapDto.imapPort);
                                            _self.imapUseServer(data.imapDto.imapUseServer);
                                            _self.imapServer(data.imapDto.imapServer);
                                            dfd.resolve(data);
                                        }
                                    }).fail(function () {
                                        alert("error");
                                    });
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.saveMailServerSetting = function (params) {
                                    var dfd = $.Deferred();
                                    var _self = this;
                                    a.service.registerMailServerSetting(params).done(function () {
                                        dfd.resolve();
                                    }).fail(function () {
                                        alert("error");
                                    });
                                    return dfd.promise();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                            /**
                             * Define constant Authentication Method
                             */
                            var AuthenticationMethod;
                            (function (AuthenticationMethod) {
                                AuthenticationMethod[AuthenticationMethod["POP_BEFORE_SMTP"] = 0] = "POP_BEFORE_SMTP";
                                AuthenticationMethod[AuthenticationMethod["IMAP_BEFORE_SMTP"] = 1] = "IMAP_BEFORE_SMTP";
                                AuthenticationMethod[AuthenticationMethod["SMTP_AUTH_LOGIN"] = 2] = "SMTP_AUTH_LOGIN";
                                AuthenticationMethod[AuthenticationMethod["SMTP_AUTH_PLAIN"] = 3] = "SMTP_AUTH_PLAIN";
                                AuthenticationMethod[AuthenticationMethod["SMTP_AUTH_CRAM_MD5"] = 4] = "SMTP_AUTH_CRAM_MD5";
                            })(AuthenticationMethod || (AuthenticationMethod = {}));
                            /**
                             * Define constant Use Server
                             */
                            var UseServer;
                            (function (UseServer) {
                                UseServer[UseServer["NOT_USE"] = 0] = "NOT_USE";
                                UseServer[UseServer["USE"] = 1] = "USE";
                            })(UseServer || (UseServer = {}));
                            /**
                            * Define constant Pop Use Server
                            */
                            var PopUseServer;
                            (function (PopUseServer) {
                                PopUseServer[PopUseServer["NOT_USE"] = 0] = "NOT_USE";
                                PopUseServer[PopUseServer["USE"] = 1] = "USE";
                            })(PopUseServer || (PopUseServer = {}));
                            /**
                            * Define constant Imap Use Server
                            */
                            var ImapUseServer;
                            (function (ImapUseServer) {
                                ImapUseServer[ImapUseServer["NOT_USE"] = 0] = "NOT_USE";
                                ImapUseServer[ImapUseServer["USE"] = 1] = "USE";
                            })(ImapUseServer || (ImapUseServer = {}));
                            /**
                            * Define constant Encrypt Method
                            */
                            var EncryptMethod;
                            (function (EncryptMethod) {
                                EncryptMethod[EncryptMethod["None"] = 0] = "None";
                                EncryptMethod[EncryptMethod["SSL"] = 1] = "SSL";
                                EncryptMethod[EncryptMethod["TLS"] = 2] = "TLS";
                            })(EncryptMethod || (EncryptMethod = {}));
                        })(viewmodel = a.viewmodel || (a.viewmodel = {}));
                    })(a = cmm050.a || (cmm050.a = {}));
                })(cmm050 = view.cmm050 || (view.cmm050 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm050.a.vm.js.map