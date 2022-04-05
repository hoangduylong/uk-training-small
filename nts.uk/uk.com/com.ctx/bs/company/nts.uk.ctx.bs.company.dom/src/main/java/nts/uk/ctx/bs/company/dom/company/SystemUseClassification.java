package nts.uk.ctx.bs.company.dom.company;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;

@AllArgsConstructor
@IntegerRange(max = 1, min = 0)
public enum SystemUseClassification {

	// 0:利用しない
	NOT_USE(0),

	// 利用する
	TO_USE(1);

	public final int value;

}
