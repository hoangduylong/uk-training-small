package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;

@AllArgsConstructor
@IntegerRange(max = 7, min = 0)
public enum SupportedCareClassifi {

	// 0:なし
	NONE(0),
	
	/** 要支援1 */
	TOSUPPORT1(1),
	
	/** 要支援2 */
	TOSUPPORT2(2),
	
	/** 要介護1 */
	TOGUARD1(3),
	
	/** 要介護2 */
	TOGUARD2(4),
	
	/** 要介護3 */
	TOGUARD3(5),
	
	/** 要介護4 */
	TOGUARD4(6),
	
	/** 要介護5 */
	TOGUARD5(7);

	public final int value;

}
