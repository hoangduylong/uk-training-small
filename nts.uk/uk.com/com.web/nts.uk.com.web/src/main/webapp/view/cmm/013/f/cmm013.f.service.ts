module nts.uk.com.view.cmm013.f {

	import Position = base.Position;

	export module service {

		// service path
		let servicePath: any = {
			findAllPosition: "basic/training/position/findAll",
			findByPositionCode: "basic/training/position/findByPositionCode",
			addPosition: "basic/training/position/add",
			removePosition: "basic/training/position/remove",
			updatePosition: "basic/training/position/update",
			updateOrder: "basic/training/position/updateOrder",
		}

		// get all positions
		export function findAllPosition(): JQueryPromise<Array<Position>> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}

		// find position by position's code
		export function findByPositionCode(positionCode: string): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.findByPositionCode + '/' + positionCode);
		}

		// add position
		export function addPosition(addCommand: model.AddPositionCommand): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, addCommand);
		}

		// remove position
		export function removePosition(removeCommand: model.RemovePositionCommand): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.removePosition, removeCommand);
		}

		// update position
		export function updatePosition(updateCommand: model.UpdatePositionCommand): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.updatePosition, updateCommand);
		}

		// update all positions' order
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