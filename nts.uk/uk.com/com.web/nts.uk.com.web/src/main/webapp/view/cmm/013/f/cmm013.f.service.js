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
                            /* Service path */
                            var servicePath = {
                                findAllPosition: "basic/training/position/find/all",
                                findByPositionCode: "basic/training/position/",
                                addPosition: "basic/training/position/add",
                                removePosition: "basic/training/position/remove",
                                updatePosition: "basic/training/position/update",
                                updateOrder: "basic/training/position/updateOrder",
                            };
                            /* findAllPosition */
                            function findAllPosition() {
                                return nts.uk.request.ajax(servicePath.findAllPosition);
                            }
                            service.findAllPosition = findAllPosition;
                            /* findByPositionCode */
                            function findByPositionCode(positionCode) {
                                return nts.uk.request.ajax(servicePath.findByPositionCode, { positionCode: positionCode });
                            }
                            service.findByPositionCode = findByPositionCode;
                            /* addPosition */
                            function addPosition(position) {
                                return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
                            }
                            service.addPosition = addPosition;
                            /* removePosition */
                            function removePosition(positionCode) {
                                return nts.uk.request.ajax(servicePath.addPosition, { positionCode: positionCode });
                            }
                            service.removePosition = removePosition;
                            /* updatePosition */
                            function updatePosition(position) {
                                return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
                            }
                            service.updatePosition = updatePosition;
                            /* update order */
                            function updateOrder(position) {
                                return nts.uk.request.ajax(servicePath.updateOrder, { positionList: position });
                            }
                            service.updateOrder = updateOrder;
                            var model;
                            (function (model) {
                                /* Position save command */
                                var PositionSaveCommand = /** @class */ (function () {
                                    function PositionSaveCommand(positionCode, positionName, order) {
                                        this.positionCode = positionCode;
                                        this.positionName = positionName;
                                        this.order = order;
                                    }
                                    return PositionSaveCommand;
                                }());
                                model.PositionSaveCommand = PositionSaveCommand;
                                /* Position remove command */
                                var PositionRemoveCommand = /** @class */ (function () {
                                    function PositionRemoveCommand(positionCode) {
                                        this.positionCode = positionCode;
                                    }
                                    return PositionRemoveCommand;
                                }());
                                model.PositionRemoveCommand = PositionRemoveCommand;
                            })(model = service.model || (service.model = {}));
                        })(service = f.service || (f.service = {}));
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.service.js.map