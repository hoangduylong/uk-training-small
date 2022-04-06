var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf005;
                (function (cmf005) {
                    var f;
                    (function (f) {
                        var ajax = nts.uk.request.ajax;
                        var format = nts.uk.text.format;
                        var service;
                        (function (service) {
                            var paths = {
                                addManualSetDel: "ctx/sys/assist/app/addManualSetDel",
                                findManagementDel: "ctx/sys/assist/app/findManagementDel/{0}",
                                setInterruptDeleting: "ctx/sys/assist/app/setInterruptDeleting",
                                deleteManagementDel: "ctx/sys/assist/app/deleteManagementDel"
                            };
                            function addManualSetDel(manualSet) {
                                return ajax('com', paths.addManualSetDel, manualSet);
                            }
                            service.addManualSetDel = addManualSetDel;
                            ;
                            /**
                             * get Management Deletion
                             */
                            function findManagementDel(delId) {
                                var _path = format(paths.findManagementDel, delId);
                                return ajax('com', _path);
                            }
                            service.findManagementDel = findManagementDel;
                            /**
                             * delete Management Deletion when interupt/error/done
                             */
                            function deleteManagementDel(command) {
                                return ajax("com", paths.deleteManagementDel, command);
                            }
                            service.deleteManagementDel = deleteManagementDel;
                            /**
                             * update interrupt process
                             */
                            function setInterruptDeleting(command) {
                                return ajax("com", paths.setInterruptDeleting, command);
                            }
                            service.setInterruptDeleting = setInterruptDeleting;
                        })(service = f.service || (f.service = {}));
                    })(f = cmf005.f || (cmf005.f = {}));
                })(cmf005 = view.cmf005 || (view.cmf005 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf005.f.service.js.map