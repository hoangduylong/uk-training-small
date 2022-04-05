package nts.uk.ctx.sys.auth.dom.wplmanagementauthority;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * class : 職場管理機能
 * @author tutk
 *
 */
@Getter
public class WorkPlaceFunction extends AggregateRoot {

	/**
	 * NO
	 */
	private DailyPerformanceFunctionNo functionNo;
	
	/**
	 * 初期値
	 */
	private boolean initialValue;

	/**
	 * 表示名
	 */
	private FeatureNameOfDailyPerformance displayName;

	/**
	 * 表示順
	 */
	private int displayOrder;
	
	/**
	 * 説明文
	 */
	private FeatureDescriptionOfDailyPerformance description;

	public WorkPlaceFunction(DailyPerformanceFunctionNo functionNo, boolean initialValue,
			FeatureNameOfDailyPerformance displayName, int displayOrder,
			FeatureDescriptionOfDailyPerformance description) {
		super();
		this.functionNo = functionNo;
		this.initialValue = initialValue;
		this.displayName = displayName;
		this.displayOrder = displayOrder;
		this.description = description;
	}
	
	
}
