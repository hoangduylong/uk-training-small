package nts.uk.shr.com.security.audittrail.correction.content;

import lombok.Getter;

/**
 * データ修正記録
 */
public class DataCorrectionLog {
	
	/** 操作ID */
	@Getter
	private final String operationId;
	
	/** 対象ユーザ */
	@Getter
	private final UserInfo targetUser;
	
	/** 対象データ */
	@Getter
	private final TargetDataType targetDataType;
	
	/** 対象データKEY情報 */
	@Getter
	private final TargetDataKey targetDataKey;
	
	/** 修正区分 */
	@Getter
	private final CorrectionAttr correctionAttr;
	
	/** 修正項目 */
	@Getter
	private final ItemInfo correctedItem;
	
	/** 並び順 */
	@Getter
	private final int showOrder;
	
	/** 備考 */
	@Getter
	private final String remark;

	/**
	 * 備考はOptional
	 * @param targetUser
	 * @param targetDataType
	 * @param targetDataKey
	 * @param correctionAttr
	 * @param correctedItem
	 * @param showOrder
	 */
	public DataCorrectionLog(
			String operationId,
			UserInfo targetUser,
			TargetDataType targetDataType,
			TargetDataKey targetDataKey,
			CorrectionAttr correctionAttr,
			ItemInfo correctedItem,
			int showOrder) {
		
		this(operationId, targetUser, targetDataType, targetDataKey, correctionAttr, correctedItem, showOrder, "");
	}
	
	public DataCorrectionLog(
			String operationId,
			UserInfo targetUser,
			TargetDataType targetDataType,
			TargetDataKey targetDataKey,
			CorrectionAttr correctionAttr,
			ItemInfo correctedItem,
			int showOrder,
			String remark) {
		
		this.operationId = operationId;
		this.targetUser = targetUser;
		this.targetDataType = targetDataType;
		this.targetDataKey = targetDataKey;
		this.correctionAttr = correctionAttr;
		this.correctedItem = correctedItem;
		this.showOrder = showOrder;
		this.remark = remark != null ? remark : ""; 
	}
	
	public static DataCorrectionLog of(String operationId, DataCorrection correction) {
		return new DataCorrectionLog(
				operationId,
				correction.getTargetUser(),
				correction.getTargetDataType(),
				correction.getTargetDataKey(),
				correction.getCorrectionAttr(),
				correction.getCorrectedItem(),
				correction.getShowOrder(),
				correction.getRemark());
	}
}
