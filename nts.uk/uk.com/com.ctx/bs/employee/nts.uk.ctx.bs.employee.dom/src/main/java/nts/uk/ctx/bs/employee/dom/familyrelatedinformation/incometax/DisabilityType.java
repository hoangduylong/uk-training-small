package nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;

@AllArgsConstructor
@IntegerRange(max = 4, min = 1)
public enum DisabilityType {

	// 0:なし
	NONE(1),

	/**  Handicapped - 障害者*/
	HANDI_CAPPED(2),

	/**  SpecialHandicapped - 特別障害者*/
	SPECIAL_HANDI_CAPPED(3),

	/** LivingTogetherSpecialHandicapped - 同居特別障害者 */
	LITO_SPECIAL_HANDI_CAPPED(4);


	public final int value;
}
