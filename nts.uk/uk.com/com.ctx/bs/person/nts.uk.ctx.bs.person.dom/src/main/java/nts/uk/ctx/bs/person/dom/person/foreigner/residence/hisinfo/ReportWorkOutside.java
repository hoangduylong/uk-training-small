/**
 * 
 */
package nts.uk.ctx.bs.person.dom.person.foreigner.residence.hisinfo;

import lombok.AllArgsConstructor;

/**
 * 届出事業所外就労区分
 */
@AllArgsConstructor
public enum ReportWorkOutside {
	// 該当しない
	NotApplicable(0),
	// 該当する
	Applicable(1);

	public final int value;
}
