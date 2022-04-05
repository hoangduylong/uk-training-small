package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * 情報操作区分
 */
@RequiredArgsConstructor
public enum InfoOperateAttr {

	/** 追加 */
	ADD(1),
	
	/** 更新 */
	UPDATE(2),
	
	/** 削除 */
	DELETE(3),
	
	/** 履歴追加 */
	ADD_HISTORY(4),
	
	/** 履歴削除 */
	DELETE_HISTORY(5),
	
	;
	public final int value;
	
	public static InfoOperateAttr valueOf(int value) {
		return EnumAdaptor.valueOf(value, InfoOperateAttr.class);
	}
	
	/*
	 * SINGLEINFO(1), MULTIINFO(2), CONTINUOUSHISTORY(3), NODUPLICATEHISTORY(4),
	 * DUPLICATEHISTORY(5), CONTINUOUS_HISTORY_FOR_ENDDATE(6);
	 */
	public static InfoOperateAttr addOf(int value) {
		switch (value) {
		case 1:
		case 2:
			return ADD;
		case 3:
		case 4:
		case 5:
		case 6:
			return ADD_HISTORY;
		default:
			throw new RuntimeException("invalid attribute value: " + value);
		}
	}

	public static InfoOperateAttr deleteOf(int value) {
		switch (value) {
		case 1:
		case 2:
			return DELETE;
		case 3:
		case 4:
		case 5:
		case 6:
			return DELETE_HISTORY;
		default:
			throw new RuntimeException("invalid attribute value: " + value);
		}
	}
}
