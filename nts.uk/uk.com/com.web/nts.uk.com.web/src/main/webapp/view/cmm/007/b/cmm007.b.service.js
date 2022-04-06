var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm007;
                (function (cmm007) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            /**
                             * define path to service
                             */
                            var path = {
                                findList: "screen/com/systemresource/findList",
                                save: "screen/com/systemresource/save",
                            };
                            /**
                             *
                             */
                            function findListSystemResource() {
                                return nts.uk.request.ajax(path.findList);
                            }
                            service.findListSystemResource = findListSystemResource;
                            /**
                             *
                             */
                            function saveSysResourceSetting(data) {
                                return nts.uk.request.ajax(path.save, data);
                            }
                            service.saveSysResourceSetting = saveSysResourceSetting;
                        })(service = b.service || (b.service = {}));
                        /**
                         * Model define.
                         */
                        var model;
                        (function (model) {
                            var SystemResourceDto = /** @class */ (function () {
                                function SystemResourceDto(id, content) {
                                    this.resourceId = id;
                                    this.resourceContent = content;
                                }
                                return SystemResourceDto;
                            }());
                            model.SystemResourceDto = SystemResourceDto;
                            var SystemResourceSaveCommand = /** @class */ (function () {
                                function SystemResourceSaveCommand(data) {
                                    this.listData = data;
                                }
                                return SystemResourceSaveCommand;
                            }());
                            model.SystemResourceSaveCommand = SystemResourceSaveCommand;
                        })(model = b.model || (b.model = {}));
                    })(b = cmm007.b || (cmm007.b = {}));
                })(cmm007 = view.cmm007 || (view.cmm007 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm007.b.service.js.map