module nts.uk.com.view.cmm013.f {

	import Position = base.Position;

	export module service {

		/* Service path */
		let servicePath: any = {
			findAllPosition: "basic/training/position/find/all",
			findByPositionCode: "basic/training/position/",
			addPosition: "basic/training/position/add",
			removePosition: "basic/training/position/remove",
			updatePosition: "basic/training/position/update",
		}

		/* findAllPosition */
		export function findAllPosition(): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.findAllPosition);
		}

		/* findByPositionCode */
		export function findByPositionCode(positionCode: String): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.findByPositionCode, { positionCode: positionCode });
		}

		/* addPosition */
		export function addPosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
		}

		/* removePosition */
		export function removePosition(positionCode: String): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { positionCode: positionCode });
		}

		/* updatePosition */
		export function updatePosition(position: Position): JQueryPromise<any> {
			return nts.uk.request.ajax(servicePath.addPosition, { Position: position });
		}



		export module model {
			/* Position save command */
			export class PositionSaveCommand {

				positionCode: string;
				positionName: string;
				order: number;

				constructor(positionCode: string, positionName: string, order: number) {
					this.positionCode = positionCode;
					this.positionName = positionName;
					this.order = order;
				}
			}

			/* Position remove command */
			export class PositionRemoveCommand {

				positionCode: string;

				constructor(positionCode: string) {
					this.positionCode = positionCode;
				}
			}
		}
	}
}