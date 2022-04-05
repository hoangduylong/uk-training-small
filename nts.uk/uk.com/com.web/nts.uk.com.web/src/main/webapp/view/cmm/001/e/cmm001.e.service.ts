module nts.uk.com.view.cmm001.e {
    export module service {
        var paths = {
            getAllMasterCopyCategory: "sys/assist/mastercopy/category/getAllMasterCopyCategory",
        }

        export function getAllMasterCopyCategory() {
            return nts.uk.request.ajax(paths.getAllMasterCopyCategory);
        }
    }
}