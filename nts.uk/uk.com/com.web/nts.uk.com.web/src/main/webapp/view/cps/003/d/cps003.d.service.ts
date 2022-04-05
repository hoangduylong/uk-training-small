module cps003.d.service {
    import ajax = nts.uk.request.ajax;

    export const push = {
        setting: (command: any) => ajax('ctx/pereg/grid-layout/save-setting/', command)
    }

    export const fetch = {
        setting: (cid: string) => ajax(`ctx/pereg/grid-layout/get-setting/${cid}`)
    }
}