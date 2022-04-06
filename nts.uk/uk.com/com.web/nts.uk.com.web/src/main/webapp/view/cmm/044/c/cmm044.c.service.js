var cmm044;
(function (cmm044) {
    var c;
    (function (c) {
        var service;
        (function (service) {
            var paths = {
                sendMail: "com/screen/cmm044/sendMail",
            };
            function sendMail(data) {
                return nts.uk.request.ajax("com", paths.sendMail, data);
            }
            service.sendMail = sendMail;
        })(service = c.service || (c.service = {}));
    })(c = cmm044.c || (cmm044.c = {}));
})(cmm044 || (cmm044 = {}));
//# sourceMappingURL=cmm044.c.service.js.map