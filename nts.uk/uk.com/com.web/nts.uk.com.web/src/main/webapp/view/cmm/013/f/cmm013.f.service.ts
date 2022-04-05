module nts.uk.com.view.cmm013.f {
       
    import SequenceMasterSaveCommand = service.model.SequenceMasterSaveCommand;  
    import SequenceMasterRemoveCommand = service.model.SequenceMasterRemoveCommand;
    
    export module service {
        
        /**
         *  Service paths
         */
        var servicePath: any = {
            findAllSequenceMaster: "bs/employee/jobtitle/sequence/findAll",
            findBySequenceCode: "bs/employee/jobtitle/sequence/find",
            saveSequenceMaster: "bs/employee/jobtitle/sequence/save",
            removeSequenceMaster: "bs/employee/jobtitle/sequence/remove",
            updateOrder: "bs/employee/jobtitle/sequence/updateOrder",
        };
        
        /**
         * findAllSequenceMaster
         */
        export function findAllSequenceMaster(): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findAllSequenceMaster);
        }
        
        /**
         * findBySequenceCode
         */
        export function findBySequenceCode(sequenceCode: string): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.findBySequenceCode, {sequenceCode: sequenceCode});
        }
        
        /**
         * saveSequenceMaster
         */
        export function saveSequenceMaster(command: SequenceMasterSaveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.saveSequenceMaster, command);
        }
        
        /**
         * removeSequenceMaster
         */
        export function removeSequenceMaster(command: SequenceMasterRemoveCommand): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.removeSequenceMaster, command);
        }
               
        /**
         * updateOrder
         */
        export function updateOrder(command: SequenceMasterSaveCommand[]): JQueryPromise<any> {
            return nts.uk.request.ajax(servicePath.updateOrder, command);
        }
        
        /**
        * Model namespace.
        */
        export module model {
            
            /**
             * SequenceMaster save command
             */
            export class SequenceMasterSaveCommand {
                
                isCreateMode: boolean;
                sequenceCode: string;
                sequenceName: string;
                order: number;
                
                constructor(isCreateMode: boolean, sequenceCode: string, sequenceName: string, order: number) {
                    this.isCreateMode = isCreateMode;
                    this.sequenceCode = sequenceCode;
                    this.sequenceName = sequenceName;
                    this.order = order;
                }
            }
            
            /**
             * SequenceMaster remove command
             */
            export class SequenceMasterRemoveCommand {
                
                sequenceCode: string;
                
                constructor(sequenceCode: string) {
                    this.sequenceCode = sequenceCode;
                }
            }   
        }
    }
}
