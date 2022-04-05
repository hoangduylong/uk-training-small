module nts.uk.com.view.cps001.g {
       
    export module service {
        import format = nts.uk.text.format;
        import ajax = nts.uk.request.ajax;
        /**
         *  Service paths
         */
        var servicePath: any = {
            getAllList: "at/record/remainnumber/annlea/getAnnLea/{0}",
            getAllListByCheckState: "at/record/remainnumber/annlea/getAnnLeaByCheckState",
            getDetails: "at/record/remainnumber/annlea/getDetail",
            lostFocus: "at/record/remainnumber/annlea/lostFocus",
            add: "at/record/remainnumber/annlea/add",
            update: "at/record/remainnumber/annlea/update",
            deleteLeav: "at/record/remainnumber/annlea/delete",
        };
        
        export function getAllList(empId: string): JQueryPromise<any> {
            return ajax('at', format(servicePath.getAllList, empId));
        }
        
        export function getAllListByCheckState(employeeId: string, checkState: boolean): JQueryPromise<any> {
            return ajax('at', servicePath.getAllListByCheckState,employeeId,checkState);
        }
        
        export function lostFocus(grantDate: Date): JQueryPromise<any> {
            return ajax('at', servicePath.lostFocus, moment.utc(grantDate,"YYYY/MM/DD"));
        }
        
        export function getDetail(id: string) {
            return ajax('at',servicePath.getDetails,id);
        }
        
        export function add(command: any): JQueryPromise<any> {
            return ajax('at', servicePath.add, command);
        }
        export function update(command: any) {
            return ajax('at', servicePath.update, command);
        }
        export function deleteLeav(command: any) {
            return ajax('at', servicePath.deleteLeav, command);
        }
        
        export function getItemDef(){
            let ctgId: string = "CS00037";
            return ajax('com',format("ctx/pereg/person/info/ctgItem/findby/ctg-cd/{0}", ctgId));
        }
    }
}
