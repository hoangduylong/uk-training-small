package nts.uk.ctx.basic.dom.training.position;

import lombok.*;
import nts.arc.layer.dom.objecttype.DomainAggregate;

public class Position implements DomainAggregate {

	/**
	 * Position Code
	 */
	@Getter
	@Setter
	private PositionCode positionCode;
	
	/**
	 * Position Name
	 */
	@Getter
	@Setter
	private PositionName positionName;
	
	/**
	 * Position Order
	 */
	@Getter
	@Setter
	private int positionOrder;

	
	
	/*
	 * Constructor
	 * @param positionCode
	 * @param positionName
	 * @param positionOrder
	 */
	public Position(PositionCode positionCode, PositionName positionName, int positionOrder) {
		super();
		this.positionCode = positionCode;
		this.positionName = positionName;
		this.positionOrder = positionOrder;
	}


	/**
	 * Convert java type to domain
	 * @param positionCode
	 * @param positionName
	 * @return
	 */
	public static Position toDomain(String positionCode, String positionName, int positionOrder) {
		return new Position(
			new PositionCode(positionCode),
			new PositionName(positionName),
			positionOrder);
	}

}

