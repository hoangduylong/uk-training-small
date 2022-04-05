package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;

@AllArgsConstructor
@IntegerRange(max = 3, min = 1)
public enum DeductionTargetType {

	/** NotTarget - 控除対象外 */
	NOT_TARGET(1),

	/** Spouse - 控除対象配偶者 */
	SPOUSE(2),

	/** OldSpouse - 老人控除対象配偶者 */
	OLD_SPOUSE(3);

	public final int value;

}
