package nts.uk.ctx.basic.dom.training.position;

import lombok.*;
import nts.arc.layer.dom.objecttype.DomainAggregate;

public class PositionTraining implements DomainAggregate {

	/**
	 * Position Code
	 */
	@Getter
	private PositionCodeTraining positionCodeTraining;
	
	/**
	 * Position Name
	 */
	@Getter
	private PositionNameTraining positionNameTraining;

	
	/**
	 * 
	 * @param positionCodeTraining
	 * @param positionNameTraining
	 */
	public PositionTraining(PositionCodeTraining positionCodeTraining, PositionNameTraining positionNameTraining) {
		super();
		this.positionCodeTraining = positionCodeTraining;
		this.positionNameTraining = positionNameTraining;
	}

	/**
	 * 
	 * @param code
	 * @param name
	 * @return
	 */
	public boolean checkExistPosition(PositionCodeTraining code, PositionNameTraining name) {
//		if( ) {
//			
//			return true;
//		}
//		
		return false;
	}

	/**
	 * Convert java type to domain
	 * @param positionCode
	 * @param positionName
	 * @return
	 */
	public static PositionTraining createFromJavaType(String positionCode, String positionName) {
		return new PositionTraining(
			new PositionCodeTraining(positionCode),
			new PositionNameTraining(positionName));
	}

}

