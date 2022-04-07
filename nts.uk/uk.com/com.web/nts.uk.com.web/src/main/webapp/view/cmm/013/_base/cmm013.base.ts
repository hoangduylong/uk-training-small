module nts.uk.com.view.cmm013 {

	export module base {

        /**
         * Position
         */
		export class Position {

			positionCode: string;
			positionName: string;
			order: number;

			constructor(positionCode: string, positionName: string, order: number) {
				this.positionCode = positionCode;
				this.positionName = positionName;
				this.order = order;
			}
		}

	}
}