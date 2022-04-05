package nts.uk.shr.com.permit;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * できる／できない権限の設定
 */
@Getter
@AllArgsConstructor
public abstract class AvailabilityPermissionBase extends AggregateRoot {

	/** 会社ID */
	private final String companyId;
	
	/** ロールID */
	private final String roleId;
	
	/** 機能NO */
	private final int functionNo;
	
	/** 利用できる */
	private boolean isAvailable;
	
	public AvailabilityPermissionBase(RestoreAvailabilityPermission restore, int version) {
		super(version);
		this.companyId = restore.companyId();
		this.roleId = restore.roleId();
		this.functionNo = restore.functionNo();
		this.isAvailable = restore.isAvailable();
	}
		
	public AvailabilityPermissionBase(RestoreAvailabilityPermission restore) {
		this(restore, 0);
	}
	
	public void changeAvailablity(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
	
}
