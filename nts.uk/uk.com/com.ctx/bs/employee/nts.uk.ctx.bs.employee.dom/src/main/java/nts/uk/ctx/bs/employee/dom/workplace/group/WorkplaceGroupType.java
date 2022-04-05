package nts.uk.ctx.bs.employee.dom.workplace.group;

import lombok.AllArgsConstructor;
/**
 *
 * @author phongtq
 *
 */
@AllArgsConstructor
public enum WorkplaceGroupType {

	/** 通常 **/
	NORMAL(0, "通常"),
	/** 医療(病棟) **/
	MEDICAL_CARE(1, "医療"),
	/** 介護事業所 **/
	CARE_OFFICE(2, "介護事業所"),
	;

	public final int value;
	public final String name;


	/** The Constant values. */
	private final static WorkplaceGroupType[] values = WorkplaceGroupType.values();

	public static WorkplaceGroupType valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (WorkplaceGroupType val : WorkplaceGroupType.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}


	/**
	 * 病棟・事業所情報が必要か
	 * @return 医療(病棟)・介護事業所の場合はtrue
	 */
	public boolean isNeedHospitalOrBusinessOfficeInfo() {
		switch( this ) {
			case MEDICAL_CARE:	// 医療(病棟)
			case CARE_OFFICE:	// 介護事業所
				return true;
			default:
				return false;
		}
	}

}
