module nts.uk.at.view.cdl024 {
    export module service {
        let servicePath = {
            getAll: 'at/record/worktypeselection/getall'

        }

        export function getAll() {
            return nts.uk.request.ajax('at',servicePath.getAll);
        }
    }
}
