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
                    var f;
                    (function (f) {
                        var viewmodel;
                        (function (viewmodel) {
                            var SequenceMaster = cmm013.base.SequenceMaster;
                            var SequenceMasterSaveCommand = f.service.model.SequenceMasterSaveCommand;
                            var SequenceMasterRemoveCommand = f.service.model.SequenceMasterRemoveCommand;
                            var ScreenModel = /** @class */ (function () {
                                function ScreenModel() {
                                    var _self = this;
                                    _self.createMode = ko.observable(null);
                                    _self.createMode.subscribe(function (newValue) {
                                        _self.changeMode(newValue);
                                    });
                                    _self.items = ko.observableArray([]);
                                    _self.currentCode = ko.observable(null);
                                    _self.currentCode.subscribe(function (newValue) {
                                        _self.changeInput(newValue);
                                        if (!_.isEmpty(newValue)) {
                                            nts.uk.ui.errors.clearAll();
                                        }
                                    });
                                    _self.columns = ko.observableArray([
                                        { headerText: nts.uk.resource.getText('CMM013_23'), key: 'sequenceCode', width: 75 },
                                        { headerText: nts.uk.resource.getText('CMM013_24'), key: 'sequenceName', width: 135, formatter: _.escape }
                                    ]);
                                    _self.sequenceCode = ko.observable("");
                                    _self.sequenceName = ko.observable("");
                                    _self.order = ko.observable(0);
                                    // UI
                                    _self.enable_button_create_mode = ko.observable(null);
                                    _self.enable_button_delete = ko.observable(null);
                                    _self.enable_input_sequence_code = ko.observable(null);
                                }
                                // BEGIN PAGE BEHAVIOUR
                                /**
                                 * Run after page loaded
                                 */
                                ScreenModel.prototype.startPage = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    // Load sequence data list
                                    nts.uk.ui.block.grayout();
                                    _self.loadSequenceList()
                                        .done(function (data) {
                                        // Update mode
                                        _self.createMode(false);
                                        _self.items(data);
                                        _self.currentCode(data[0].sequenceCode);
                                    })
                                        .fail(function (res) {
                                        // Create mode
                                        _self.createMode(true);
                                        _self.items([]);
                                    })
                                        .always(function () {
                                        dfd.resolve();
                                        nts.uk.ui.block.clear();
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Start create mode
                                 */
                                ScreenModel.prototype.startCreateMode = function () {
                                    var _self = this;
                                    _self.createMode(true);
                                    _self.currentCode(null);
                                };
                                /**
                                 * Save sequence
                                 */
                                ScreenModel.prototype.save = function () {
                                    var _self = this;
                                    // Validate
                                    if (!_self.validate()) {
                                        return;
                                    }
                                    if (_self.createMode()) {
                                        // Create mode                                 
                                        var newCommand = new SequenceMasterSaveCommand(_self.createMode(), _self.sequenceCode(), _self.sequenceName(), null);
                                        _self.saveHandler(newCommand);
                                    }
                                    else {
                                        // Update mode
                                        var updateCommand = new SequenceMasterSaveCommand(_self.createMode(), _self.sequenceCode(), _self.sequenceName(), _self.order());
                                        _self.saveHandler(updateCommand);
                                    }
                                };
                                /**
                                 * Close this dialog
                                 */
                                ScreenModel.prototype.close = function () {
                                    nts.uk.ui.windows.close();
                                };
                                /**
                                 * Remove sequence
                                 */
                                ScreenModel.prototype.remove = function () {
                                    var _self = this;
                                    if (_self.sequenceCode() !== "") {
                                        nts.uk.ui.dialog.confirm({ messageId: "Msg_18" })
                                            .ifYes(function () {
                                            // Get item behind removed item
                                            var nextCode = null;
                                            //let currentIndex: number = _self.items().findIndex(item => item.sequenceCode == _self.currentCode()); // ES6 only :(      
                                            var currentIndex = null;
                                            for (var _i = 0, _a = _self.items(); _i < _a.length; _i++) {
                                                var item = _a[_i];
                                                if (item.sequenceCode === _self.currentCode()) {
                                                    currentIndex = _self.items.indexOf(item);
                                                }
                                            }
                                            if (currentIndex && _self.items()[currentIndex + 1]) {
                                                nextCode = _self.items()[currentIndex + 1].sequenceCode;
                                            }
                                            nts.uk.ui.block.grayout();
                                            f.service.removeSequenceMaster(new SequenceMasterRemoveCommand(_self.sequenceCode()))
                                                .done(function (data) {
                                                _.remove(_self.items(), function (item) { return item.sequenceCode === _self.sequenceCode(); });
                                                _self.updateOrder().done(function () {
                                                    nts.uk.ui.dialog.info({ messageId: "Msg_16" }).then(function () {
                                                        _self.loadSequenceList()
                                                            .done(function (dataList) {
                                                            // Update mode
                                                            _self.createMode(false);
                                                            _self.items(dataList);
                                                            if (nextCode) {
                                                                _self.currentCode(nextCode);
                                                            }
                                                            else {
                                                                _self.currentCode(dataList[dataList.length - 1].sequenceCode);
                                                            }
                                                        })
                                                            .fail(function (res) {
                                                            // Create mode
                                                            _self.createMode(true);
                                                            _self.items([]);
                                                            _self.currentCode(null);
                                                        });
                                                    });
                                                });
                                            })
                                                .fail(function (res) {
                                                _self.showMessageError(res);
                                            })
                                                .always(function () {
                                                nts.uk.ui.block.clear();
                                            });
                                        }).ifNo(function () {
                                            // Nothing happen
                                        });
                                    }
                                };
                                // END PAGE BEHAVIOUR
                                /**
                                 * Load all sequence
                                 */
                                ScreenModel.prototype.loadSequenceList = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    f.service.findAllSequenceMaster()
                                        .done(function (data) {
                                        dfd.resolve(data);
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Callback: change mode based on createMode value
                                 */
                                ScreenModel.prototype.changeMode = function (newValue) {
                                    var _self = this;
                                    _self.enable_button_create_mode(!newValue);
                                    _self.enable_button_delete(!newValue);
                                    _self.enable_input_sequence_code(newValue);
                                    if (newValue) {
                                        _self.sequenceCode("");
                                        _self.sequenceName("");
                                    }
                                };
                                /**
                                 * Callback: change form input value based on currentCode value
                                 */
                                ScreenModel.prototype.changeInput = function (newValue) {
                                    var _self = this;
                                    if (newValue) {
                                        // Find sequence by sequence code
                                        f.service.findBySequenceCode(newValue)
                                            .done(function (data) {
                                            if (data) {
                                                // Found sequence         
                                                _self.createMode(false);
                                                _self.sequenceCode(data.sequenceCode);
                                                _self.sequenceName(data.sequenceName);
                                                _self.order(data.order);
                                            }
                                            else {
                                                // Sequence not found
                                                _self.sequenceCode("");
                                                _self.sequenceName("");
                                            }
                                            // Set focus
                                            if (_self.createMode()) {
                                                $('#sequence-code').focus();
                                            }
                                            else {
                                                $('#sequence-name').focus();
                                            }
                                        })
                                            .fail(function (res) {
                                            _self.showMessageError(res);
                                        });
                                    }
                                    else {
                                        // No Sequence has been choosed, switch to create mode
                                        _self.createMode(true);
                                    }
                                };
                                ScreenModel.prototype.updateOrder = function () {
                                    var _self = this;
                                    var dfd = $.Deferred();
                                    var items = _self.items();
                                    var order = 1;
                                    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                                        var item = items_1[_i];
                                        item.order = order;
                                        order++;
                                    }
                                    f.service.updateOrder(items)
                                        .done(function (data) {
                                        dfd.resolve(data);
                                    })
                                        .fail(function (res) {
                                        dfd.reject(res);
                                    });
                                    return dfd.promise();
                                };
                                /**
                                 * Validate
                                 */
                                ScreenModel.prototype.validate = function () {
                                    var _self = this;
                                    // Clear error
                                    nts.uk.ui.errors.clearAll();
                                    $('#sequence-code').ntsEditor('validate');
                                    $('#sequence-name').ntsEditor('validate');
                                    return !$('.nts-input').ntsError('hasError');
                                };
                                /**
                                 * Save sequence (call service)
                                 */
                                ScreenModel.prototype.saveHandler = function (command) {
                                    var _self = this;
                                    nts.uk.ui.block.grayout();
                                    f.service.saveSequenceMaster(command)
                                        .done(function (data) {
                                        // Update list items
                                        var index = _.findIndex(_self.items(), function (item) { return item.sequenceCode == command.sequenceCode; }), newItem = new SequenceMaster(command.sequenceCode, command.sequenceName, command.order);
                                        if (index !== -1) {
                                            _self.items().splice(index, 1, newItem);
                                        }
                                        else {
                                            _self.items().push(newItem);
                                        }
                                        // Update order
                                        _self.updateOrder().done(function () {
                                            nts.uk.ui.dialog.info({ messageId: "Msg_15" }).then(function () {
                                                _self.loadSequenceList()
                                                    .done(function (dataList) {
                                                    if (dataList && dataList.length > 0) {
                                                        // Update mode
                                                        _self.createMode(false);
                                                        _self.items(dataList);
                                                        _self.currentCode(command.sequenceCode);
                                                    }
                                                    else {
                                                        // Create mode
                                                        _self.createMode(true);
                                                        _self.items([]);
                                                        _self.currentCode(null);
                                                    }
                                                })
                                                    .fail(function (res) {
                                                });
                                            });
                                        });
                                    })
                                        .fail(function (res) {
                                        _self.showMessageError(res);
                                    })
                                        .always(function () {
                                        nts.uk.ui.block.clear();
                                    });
                                };
                                /**
                                 * Show message error
                                 */
                                ScreenModel.prototype.showMessageError = function (res) {
                                    // check error business exception
                                    if (!res.businessException) {
                                        return;
                                    }
                                    // show error message
                                    if (Array.isArray(res.errors)) {
                                        nts.uk.ui.dialog.bundledErrors(res);
                                    }
                                    else {
                                        nts.uk.ui.dialog.alertError({ messageId: res.messageId, messageParams: res.parameterIds });
                                    }
                                };
                                return ScreenModel;
                            }());
                            viewmodel.ScreenModel = ScreenModel;
                        })(viewmodel = f.viewmodel || (f.viewmodel = {}));
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.vm.js.map