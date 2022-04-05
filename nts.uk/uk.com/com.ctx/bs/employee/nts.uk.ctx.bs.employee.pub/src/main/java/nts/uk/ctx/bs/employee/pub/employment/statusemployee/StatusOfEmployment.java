/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.pub.employment.statusemployee;

/**
 * The Enum StatusOfEmployment.
 */
// 在職状態
public enum StatusOfEmployment {

	//在職 
	INCUMBENT(1),
	//休職
	LEAVE_OF_ABSENCE(2),
	//休業
	HOLIDAY(3),
	//入社前
	BEFORE_JOINING(4),
	//出向中
	ON_LOAN(5),
	//退職
	RETIREMENT(6);
	
	public int value;
	StatusOfEmployment(int value){
		this.value = value;
	}
}
