module cli001.b.service {
    import ajax = nts.uk.request.ajax;

    var paths = {
        findUserByUserIDName: "ctx/sys/auth/user/searchUser",
        lockUserByID: "ctx/sys/gateway/securitypolicy/lockoutdata/lockUserByID"
    }

    export function findUserByUserIDName(searchInput: any): JQueryPromise<any> {
        return ajax("com", paths.findUserByUserIDName, searchInput);
    };

    export function lockUserByID(userId: any): JQueryPromise<any> {
        return ajax("com", paths.lockUserByID, { userID: userId });
    };
}
