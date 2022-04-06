var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmm049;
                (function (cmm049) {
                    var b;
                    (function (b) {
                        var service;
                        (function (service) {
                            /**
                               *  Service paths
                               */
                            var servicePath = {
                                getPCMailCompany: "sys/env/userinfoset/pcmail/company",
                                getPCMailPerson: "sys/env/userinfoset/pcmail/person",
                                getMobileMailCompany: "sys/env/userinfoset/mobilemail/company",
                                getMobileMailPerson: "sys/env/userinfoset/mobilemail/person",
                                saveMailDestinationFunction: "sys/env/userinfoset/save/settingByMenu"
                            };
                            function getPCMailCompany() {
                                return nts.uk.request.ajax(servicePath.getPCMailCompany);
                            }
                            service.getPCMailCompany = getPCMailCompany;
                            function getPCMailPerson() {
                                return nts.uk.request.ajax(servicePath.getPCMailPerson);
                            }
                            service.getPCMailPerson = getPCMailPerson;
                            function getMobileMailCompany() {
                                return nts.uk.request.ajax(servicePath.getMobileMailCompany);
                            }
                            service.getMobileMailCompany = getMobileMailCompany;
                            function getMobileMailPerson() {
                                return nts.uk.request.ajax(servicePath.getMobileMailPerson);
                            }
                            service.getMobileMailPerson = getMobileMailPerson;
                            function saveMailDestinationFunction(data) {
                                return nts.uk.request.ajax(servicePath.saveMailDestinationFunction, data);
                            }
                            service.saveMailDestinationFunction = saveMailDestinationFunction;
                        })(service = b.service || (b.service = {}));
                    })(b = cmm049.b || (cmm049.b = {}));
                })(cmm049 = view.cmm049 || (view.cmm049 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmm049.b.service.js.map