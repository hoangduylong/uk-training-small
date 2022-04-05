package nts.uk.shr.com.security.audittrail.correction.content;

public interface DataCorrection {
	
	/** 対象ユーザ */
	UserInfo getTargetUser();
	
	/** 対象データ */
	TargetDataType getTargetDataType();
	
	/** 対象データKEY情報 */
	TargetDataKey getTargetDataKey();
	
	/** 修正区分 */
	CorrectionAttr getCorrectionAttr();
	
	/** 修正項目 */
	ItemInfo getCorrectedItem();
	
	/** 並び順 */
	int getShowOrder();
	
	/** 備考 */
	default String getRemark() {
		return "";
	}
}
