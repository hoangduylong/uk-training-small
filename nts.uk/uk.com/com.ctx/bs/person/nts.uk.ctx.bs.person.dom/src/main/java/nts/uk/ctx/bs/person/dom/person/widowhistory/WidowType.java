package nts.uk.ctx.bs.person.dom.person.widowhistory;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;

@AllArgsConstructor
@IntegerRange(max = 4, min = 1)
public enum WidowType {

	// 1:そうでない
	NONE(1),

	// 2:寡夫
	HUSBANDWIDOW(2),

	// 3:寡婦特別
	WIFEWIDOW(3),

	// 4:寡婦一般 
	WIDOWGENERAL(4);

	public final int value;

}
