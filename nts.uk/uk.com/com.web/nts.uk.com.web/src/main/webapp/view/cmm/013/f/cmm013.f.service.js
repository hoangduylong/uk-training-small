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
                        var service;
                        (function (service) {
                            /**
                             *  Service paths
                             */
                            var servicePath = {
                                findAllSequenceMaster: "bs/employee/jobtitle/sequence/findAll",
                                findBySequenceCode: "bs/employee/jobtitle/sequence/find",
                                saveSequenceMaster: "bs/employee/jobtitle/sequence/save",
                                removeSequenceMaster: "bs/employee/jobtitle/sequence/remove",
                                updateOrder: "bs/employee/jobtitle/sequence/updateOrder",
                            };
                            /**
                             * findAllSequenceMaster
                             */
                            function findAllSequenceMaster() {
                                return nts.uk.request.ajax(servicePath.findAllSequenceMaster);
                            }
                            service.findAllSequenceMaster = findAllSequenceMaster;
                            /**
                             * findBySequenceCode
                             */
                            function findBySequenceCode(sequenceCode) {
                                return nts.uk.request.ajax(servicePath.findBySequenceCode, { sequenceCode: sequenceCode });
                            }
                            service.findBySequenceCode = findBySequenceCode;
                            /**
                             * saveSequenceMaster
                             */
                            function saveSequenceMaster(command) {
                                return nts.uk.request.ajax(servicePath.saveSequenceMaster, command);
                            }
                            service.saveSequenceMaster = saveSequenceMaster;
                            /**
                             * removeSequenceMaster
                             */
                            function removeSequenceMaster(command) {
                                return nts.uk.request.ajax(servicePath.removeSequenceMaster, command);
                            }
                            service.removeSequenceMaster = removeSequenceMaster;
                            /**
                             * updateOrder
                             */
                            function updateOrder(command) {
                                return nts.uk.request.ajax(servicePath.updateOrder, command);
                            }
                            service.updateOrder = updateOrder;
                            /**
                            * Model namespace.
                            */
                            var model;
                            (function (model) {
                                /**
                                 * SequenceMaster save command
                                 */
                                var SequenceMasterSaveCommand = /** @class */ (function () {
                                    function SequenceMasterSaveCommand(isCreateMode, sequenceCode, sequenceName, order) {
                                        this.isCreateMode = isCreateMode;
                                        this.sequenceCode = sequenceCode;
                                        this.sequenceName = sequenceName;
                                        this.order = order;
                                    }
                                    return SequenceMasterSaveCommand;
                                }());
                                model.SequenceMasterSaveCommand = SequenceMasterSaveCommand;
                                /**
                                 * SequenceMaster remove command
                                 */
                                var SequenceMasterRemoveCommand = /** @class */ (function () {
                                    function SequenceMasterRemoveCommand(sequenceCode) {
                                        this.sequenceCode = sequenceCode;
                                    }
                                    return SequenceMasterRemoveCommand;
                                }());
                                model.SequenceMasterRemoveCommand = SequenceMasterRemoveCommand;
                            })(model = service.model || (service.model = {}));
                        })(service = f.service || (f.service = {}));
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.service.js.map