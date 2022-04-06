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
                    var c;
                    (function (c) {
                        var viewmodel;
                        (function (viewmodel) {
                            var Constants = cmm013.base.Constants;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.items = ko.observableArray([]);
                                    _self.currentCode = ko.observable(null);
                                    _self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText('CMM013_23'), key: 'sequenceCode', width: 75 },
                                        { headerText: nts.uk.resource.getText('CMM013_24'), key: 'sequenceName', width: 135 }
                                    ]);
                                }
                                /**
                                 * Start page
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    // Load sequence data list
                                    var data = nts.uk.ui.windows.getShared(Constants.SHARE_IN_DIALOG_SELECT_SEQUENCE);
                                    _self.initNotSelectItem(data);
                                    var currentSelectedCode = nts.uk.ui.windows.getShared("currentSelectedCode");
                                    if (data) {
                                        _self.items(data);
                                        if (_.isEmpty(currentSelectedCode)) {
                                            _self.currentCode(data[0].sequenceCode);
                                        }
                                        else {
                                            _self.currentCode(currentSelectedCode);
                                        }
                                    }
                                    dfd.resolve();
                                    return dfd.promise();
                                };
                                ScreenModel.prototype.initNotSelectItem = function (data) {
                                    var self = this;
                                    var noSelectItem = {
                                        order: 0,
                                        sequenceName: '選択なし',
                                        sequenceCode: '',
                                    };
                                    data.unshift(noSelectItem);
                                };
                                /**
                                 * Select sequence master
                                 */
                                ScreenModel.prototype.selectSequence = function () {
                                    var _self = this;
                                    nts.uk.ui.windows.setShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE, true);
                                    if (_self.currentCode()) {
                                        nts.uk.ui.block.grayout();
                                        c.service.findBySequenceCode(_self.currentCode())
                                            .done(function (data) {
                                            nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, data);
                                        })
                                            .fail(function (res) {
                                            nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, null);
                                        })
                                            .always(function () {
                                            nts.uk.ui.block.clear();
                                            nts.uk.ui.windows.close();
                                        });
                                    }
                                    else {
                                        nts.uk.ui.windows.setShared(Constants.SHARE_OUT_DIALOG_SELECT_SEQUENCE, null);
                                        nts.uk.ui.windows.close();
                                    }
                                };
                                /**
                                 * Close
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.setShared(Constants.IS_ACCEPT_DIALOG_SELECT_SEQUENCE, false);
                                    nts.uk.ui.windows.close();
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = c.viewmodel || (c.viewmodel = {}));
                    })(c = cmm013.c || (cmm013.c = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.c.vm.js.map