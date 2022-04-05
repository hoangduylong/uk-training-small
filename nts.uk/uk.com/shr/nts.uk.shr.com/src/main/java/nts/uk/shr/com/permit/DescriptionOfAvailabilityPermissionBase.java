package nts.uk.shr.com.permit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * 利用できる／できない権限の説明
 */
@AllArgsConstructor
public abstract class DescriptionOfAvailabilityPermissionBase extends AggregateRoot {
	
	/** NO */
	@Getter
	private final int functionNo;
	
	/** 表示名 */
	@Getter
	private final String name;
	
	/** 説明文 */
	@Getter
	private final String explanation;
	
	/** 表示順 */
	@Getter
	private final int displayOrder;
	
	/** 初期値 */
	private final boolean defaultValue;
	
	public DescriptionOfAvailabilityPermissionBase(RestoreDescriptionOfAvailabilityPermission restore, int version) {
		super(version);
		this.functionNo = restore.functionNo();
		this.name = restore.name();
		this.explanation = restore.explanation();
		this.displayOrder = restore.displayOrder();
		this.defaultValue = restore.defaultValue();
	}
	
	public DescriptionOfAvailabilityPermissionBase(RestoreDescriptionOfAvailabilityPermission restore) {
		this(restore, 0);
	}

	/** 初期値 */
	public boolean getDefaultValue() {
		return this.defaultValue;
	}
}
