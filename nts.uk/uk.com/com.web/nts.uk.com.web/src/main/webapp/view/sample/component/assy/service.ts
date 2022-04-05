module service {
    import ajax = nts.uk.request.ajax;
    
    export const fetch = {
        histList: (masterId: string) => ajax(`/bs/employee/workplace/hist/${masterId}`)
    };
}