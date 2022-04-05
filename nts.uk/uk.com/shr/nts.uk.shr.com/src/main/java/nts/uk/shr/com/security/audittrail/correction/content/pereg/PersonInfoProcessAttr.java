package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;

/**
 * 処理区分
 */
@RequiredArgsConstructor
public enum PersonInfoProcessAttr {

	/** 新規 */
	ADD(1),
	
	/** 更新 */
	UPDATE(2),
	
	/** 論理削除 */
	LOGICAL_DELETE(3),
	
	/** 完全削除 */
	COMPLETE_DELETE(4),
	
	/** 論理削除からの復旧 */
	RESTORE_LOGICAL_DELETE(5),
	
	/** 出向転籍 */
	TRANSFER(6),
	
	/** 帰任 */
	RETURN(7),
	;
	public final int value;
	
	public static PersonInfoProcessAttr valueOf(int value) {
		return EnumAdaptor.valueOf(value, PersonInfoProcessAttr.class);
	}
}
