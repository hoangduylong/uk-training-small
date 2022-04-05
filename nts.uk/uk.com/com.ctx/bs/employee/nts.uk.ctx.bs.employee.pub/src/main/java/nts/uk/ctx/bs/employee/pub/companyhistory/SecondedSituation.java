package nts.uk.ctx.bs.employee.pub.companyhistory;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
public enum SecondedSituation {
	
	//  0 --- なし
	NONE(0, "なし"),
	// 1 --- 出向中
	SECONDED(1, "出向中"),
	// 2 --- 受入中
	ACCEPTING(2 , "受入中");

	public final int value;

	public final String nameId;


	private final static SecondedSituation[] values = SecondedSituation.values();

	public static SecondedSituation valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}

		// Find value.
		for (SecondedSituation val : SecondedSituation.values) {
			if (val.value == value) {
				return val;
			}
		}
		// Not found.
		return null;
	}
}
