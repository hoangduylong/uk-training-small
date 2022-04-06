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
                    var h;
                    (function (h) {
                        var service;
                        (function (service) {
                            var servicePath = {
                                findAll: "bs/employee/approver/group/findAll",
                                register: "bs/employee/approver/group/register",
                                update: "bs/employee/approver/group/update",
                                remove: "bs/employee/approver/group/delete",
                                findAllJobTitle: "bs/employee/jobtitle/findAll",
                                multiInsert: "bs/employee/approver/group/multiInsert"
                            };
                            function findAll() {
                                return nts.uk.request.ajax("com", servicePath.findAll);
                            }
                            service.findAll = findAll;
                            function register(command) {
                                return nts.uk.request.ajax("com", servicePath.register, command);
                            }
                            service.register = register;
                            function update(command) {
                                return nts.uk.request.ajax("com", servicePath.update, command);
                            }
                            service.update = update;
                            function remove(command) {
                                return nts.uk.request.ajax("com", servicePath.remove, command);
                            }
                            service.remove = remove;
                            function findAllJobTitle(param) {
                                return nts.uk.request.ajax("com", servicePath.findAllJobTitle, param);
                            }
                            service.findAllJobTitle = findAllJobTitle;
                            function multiInsert(command) {
                                return nts.uk.request.ajax("com", servicePath.multiInsert, command);
                            }
                            service.multiInsert = multiInsert;
                        })(service = h.service || (h.service = {}));
                    })(h = cmm013.h || (cmm013.h = {}));
                })(cmm013 = view.cmm013 || (view.cmm013 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm013.h.service.js.map