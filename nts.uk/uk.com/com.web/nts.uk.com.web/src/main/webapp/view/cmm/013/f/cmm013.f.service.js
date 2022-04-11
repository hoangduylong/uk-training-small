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
                            // Service path
                            var servicePath = {
                                findAllPosition: "basic/training/position/findAll",
                                findByPositionCode: "basic/training/position/findByPositionCode",
                                addPosition: "basic/training/position/add",
                                removePosition: "basic/training/position/remove",
                                updatePosition: "basic/training/position/update",
                                updateOrder: "basic/training/position/updateOrder",
                            };
                            // findAllPosition
                            function findAllPosition() {
                                return nts.uk.request.ajax(servicePath.findAllPosition);
                            }
                            service.findAllPosition = findAllPosition;
                            // findByPositionCode
                            function findByPositionCode(positionCode) {
                                return nts.uk.request.ajax(servicePath.findByPositionCode, { positionCode: positionCode });
                            }
                            service.findByPositionCode = findByPositionCode;
                            // addPosition
                            function addPosition(addCommand) {
                                console.log("okeeeee");
                                return nts.uk.request.ajax(servicePath.addPosition, addCommand);
                            }
                            service.addPosition = addPosition;
                            // removePosition
                            function removePosition(removeCommand) {
                                return nts.uk.request.ajax(servicePath.removePosition, removeCommand);
                            }
                            service.removePosition = removePosition;
                            // updatePosition
                            function updatePosition(updateCommand) {
                                return nts.uk.request.ajax(servicePath.addPosition, updateCommand);
                            }
                            service.updatePosition = updatePosition;
                            // update order
                            function updateOrder(updateCommand) {
                                return nts.uk.request.ajax(servicePath.updateOrder, updateCommand);
                            }
                            service.updateOrder = updateOrder;
                            var model;
                            (function (model) {
                                // add position command        
                                var AddPositionCommand = /** @class */ (function () {
                                    function AddPositionCommand(positionCode, positionName, positionOrder) {
                                        this.positionCode = positionCode;
                                        this.positionName = positionName;
                                        this.positionOrder = positionOrder;
                                    }
                                    return AddPositionCommand;
                                }());
                                model.AddPositionCommand = AddPositionCommand;
                                // update position command        
                                var UpdatePositionCommand = /** @class */ (function () {
                                    function UpdatePositionCommand(positionCode, positionName, positionOrder) {
                                        this.positionCode = positionCode;
                                        this.positionName = positionName;
                                        this.positionOrder = positionOrder;
                                    }
                                    return UpdatePositionCommand;
                                }());
                                model.UpdatePositionCommand = UpdatePositionCommand;
                                // remove position command
                                var RemovePositionCommand = /** @class */ (function () {
                                    function RemovePositionCommand(positionCode) {
                                        this.positionCode = positionCode;
                                    }
                                    return RemovePositionCommand;
                                }());
                                model.RemovePositionCommand = RemovePositionCommand;
                            })(model = service.model || (service.model = {}));
                        })(service = f.service || (f.service = {}));
                    })(f = cmm013.f || (cmm013.f = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.f.service.js.map