module cps003.g.service {
    import ajax = nts.uk.request.ajax;

    export const push = {
        data: (command: any) => ajax('', command)
    }

    export const fetch = {
        person: (id: string) => ajax(`/ctx/person/${id}`),

    }
}