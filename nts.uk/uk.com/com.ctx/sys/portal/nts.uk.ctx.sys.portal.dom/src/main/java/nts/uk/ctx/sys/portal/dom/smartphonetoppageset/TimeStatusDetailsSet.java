package nts.uk.ctx.sys.portal.dom.smartphonetoppageset;

import java.util.List;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 勤怠状況詳細設定
 * 
 * @author sonnh1
 *
 */
@Getter
public class TimeStatusDetailsSet extends AggregateRoot {
	/**
	 * 会社ID
	 */
	private String companyId;
	/**
	 * 詳細項目
	 */
	private List<TimeStatusDisplayItem> detailedItem;
	
	public TimeStatusDetailsSet(String companyId, List<TimeStatusDisplayItem> detailedItem) {
		super();
		this.companyId = companyId;
		this.detailedItem = detailedItem;
	}
	
	public static TimeStatusDetailsSet createFromJavaType(String companyId, List<TimeStatusDisplayItem> detailedItem) {
		return new TimeStatusDetailsSet(companyId, detailedItem);
	}
}
