module cps001.h.service {
    import ajax = nts.uk.request.ajax;
    import format = nts.uk.text.format;
    let parentPath = "record/remainnumber/resv-lea/";
    let paths: any = {
            getAll: "get-resv-lea/{0}/{1}",
            getById: "get-resv-lea-by-id/{0}",
            generateDeadline: "generate-deadline",
            add: "add",
            update: "update",
            remove: "remove"
    };
    
    export function getAll(emId: string, isAll: boolean){
        return ajax('at',format(parentPath + paths.getAll, emId, isAll));
    }
    
    export function getByGrantDate(id: string){
        return ajax('at',format(parentPath + paths.getById, id));
    }
    
    export function generateDeadline(grantDate: Date){
        return ajax('at',parentPath + paths.generateDeadline,  grantDate);
    }
    
    export function remove(id: string){
        let command = {"rvsLeaId": id};
        return ajax("at", parentPath + paths.remove, command);
    }
    
    export function update(id: string,employeeId: string, grantDate: Date, deadline: Date, expirationStatus: number,
        grantDays: string, useDays: string, overLimitDays: string, remainingDays: string){
        let command = {
            "rvsLeaId": id,
            "employeeId": employeeId,
            "grantDate": grantDate,
            "deadline": deadline,
            "expirationStatus": expirationStatus,
            "grantDays": grantDays,
            "useDays": useDays,
            "overLimitDays": overLimitDays,
            "remainingDays": remainingDays
        };
        return ajax('at', parentPath + paths.update, command);
    }
    
    export function create(employeeId: string, grantDate: string, deadline: string, expirationStatus: number,
        grantDays: string, useDays: string, overLimitDays: string, remainingDays: string){
        let command = {
            "employeeId": employeeId,
            "grantDate": grantDate,
            "deadline": deadline,
            "expirationStatus": expirationStatus,
            "grantDays": grantDays,
            "useDays": useDays,
            "overLimitDays": overLimitDays,
            "remainingDays": remainingDays
        };
        return ajax('at', parentPath + paths.add, command);
    }
    
    export function getItemDef(){
        let ctgId: string = "CS00038";
        return ajax('com',format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgId));
    }
}