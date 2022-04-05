module cps003.c.service {
    import ajax = nts.uk.request.ajax;
    
    export const push = {
        register: (command: any) => ajax(`facade/pereg/grid/register`, command)
    }
}
