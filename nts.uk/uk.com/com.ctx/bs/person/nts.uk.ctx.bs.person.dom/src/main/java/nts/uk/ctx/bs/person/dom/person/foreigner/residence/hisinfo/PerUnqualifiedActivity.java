package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import lombok.AllArgsConstructor;

/**
 * 資格外活動許可
 */
@AllArgsConstructor
public enum PerUnqualifiedActivity {
	// 無
	No(0),
	// 有
	Yes(1);

	public final int value;
}
