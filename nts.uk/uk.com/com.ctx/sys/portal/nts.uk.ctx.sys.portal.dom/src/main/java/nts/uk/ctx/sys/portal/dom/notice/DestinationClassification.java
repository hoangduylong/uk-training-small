package nts.uk.ctx.sys.portal.dom.notice;

import lombok.AllArgsConstructor;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.お知らせ.宛先区分
 * @author DungDV
 *
 */
@AllArgsConstructor
public enum DestinationClassification {
	
	/** 12 */
	ALL(0, "全社員"),
	
	/** 123 */
	WORKPLACE(1, "職場選択"),
	
	/** 123 */
	EMPLOYEE(2, "社員選択");
	
	public final int value;

	public final String destination;
	
	/** The Constant values. */
	private static final DestinationClassification[] values = DestinationClassification.values();
	
	public static DestinationClassification valueOf(Integer value) {
		// Invalid object.
		if (value == null) {
			return null;
		}
		
		// Find value.
		for (DestinationClassification val : DestinationClassification.values) {
			if (val.value == value) {
				return val;
			}
		}
		
		// Not found.
		return null;
	}
}
