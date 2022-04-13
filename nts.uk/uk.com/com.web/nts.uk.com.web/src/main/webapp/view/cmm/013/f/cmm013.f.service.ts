module nts.uk.com.view.cmm013.f {

	import Position = base.Position;

	export module service {

		// Service path
		let servicePath: any = {
			findAllPosition: "basic/training/position/findAll",
			findByPositionCode: "basic/training/position/findByPositionCode",
			addPosition: "basic/training/position/add",
			removePosition: "basic/training/position/remove",
			updatePosition: "basic/training/position/update",
			updateOrder: "basic/training/position/updateOrder",
		}

		// findAllPosition
		export function findAllPosition(): JQueryPromise<Array<Position>> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}

		// findByPositionCode
		export function findByPositionCode(positionCode: string): JQueryPromise<any> {			
			return nts.uk.request.ajax(servicePath.findByPositionCode + '/' + positionCode);
		}
		
		// addPosition
		export function addPosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, position);
		}
		
		// removePosition
		export function removePosition(removeCommand: model.RemovePositionCommand): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.removePosition, removeCommand);
		}

		// updatePosition
		export function updatePosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.updatePosition, position);
		}

		// update order
		export function updateOrder(positionList: Position[]): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.updateOrder, positionList);
		}
		
		
		export module model {
			
			// add position command        
            export class AddPositionCommand {
                positionCode: string;
                positionName: string;
                positionOrder: number;
                
                constructor(positionCode: string, positionName: string, positionOrder: number) {
                    this.positionCode = positionCode;
                    this.positionName = positionName;
                    this.positionOrder = positionOrder;
                }
            }

			// update position command        
            export class UpdatePositionCommand {
                positionCode: string;
                positionName: string;
                positionOrder: number;
                
                constructor(positionCode: string, positionName: string, positionOrder: number) {
                    this.positionCode = positionCode;
                    this.positionName = positionName;
                    this.positionOrder = positionOrder;
                }
            }

            // remove position command
            export class RemovePositionCommand {            
                positionCode: string;
                
                constructor(positionCode: string) {
                    this.positionCode = positionCode;
                }
            }   
        }
	}
}