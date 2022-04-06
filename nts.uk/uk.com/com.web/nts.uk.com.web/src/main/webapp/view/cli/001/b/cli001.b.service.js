var cli001;
(function (cli001) {
    var b;
    (function (b) {
        var service;
        (function (service) {
            var ajax = nts.uk.request.ajax;
            var paths = {
                findUserByUserIDName: "ctx/sys/auth/user/searchUser",
                lockUserByID: "ctx/sys/gateway/securitypolicy/lockoutdata/lockUserByID"
            };
            function findUserByUserIDName(searchInput) {
                return ajax("com", paths.findUserByUserIDName, searchInput);
            }
            service.findUserByUserIDName = findUserByUserIDName;
            ;
            function lockUserByID(userId) {
                return ajax("com", paths.lockUserByID, { userID: userId });
            }
            service.lockUserByID = lockUserByID;
            ;
        })(service = b.service || (b.service = {}));
    })(b = cli001.b || (cli001.b = {}));
})(cli001 || (cli001 = {}));
//# sourceMappingURL=cli001.b.service.js.map