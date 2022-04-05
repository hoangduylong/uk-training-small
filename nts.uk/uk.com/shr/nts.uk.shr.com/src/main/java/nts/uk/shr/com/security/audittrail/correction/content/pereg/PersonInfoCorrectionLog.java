package nts.uk.shr.com.security.audittrail.correction.content.pereg;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import nts.uk.shr.com.security.audittrail.correction.content.UserInfo;

/**
 * 個人情報修正記録
 */
public class PersonInfoCorrectionLog {
	
	/** 操作ID */
	@Getter
	private final String operationId;
	
	/** 処理区分 */
	@Getter
	private final PersonInfoProcessAttr processAttr;
	
	/** 対象ユーザ */
	@Getter
	private final UserInfo targetUser;
	
	/** カテゴリ修正記録 */
	@Getter
	private final List<CategoryCorrectionLog> categoryCorrections;
	
	/** 備考(optional) */
	@Getter
	private final String remark;

	public PersonInfoCorrectionLog(
			String operationId,
			PersonInfoProcessAttr processAttr,
			UserInfo targetUser,
			List<CategoryCorrectionLog> categoryCorrections,
			String remark) {
		
		this.operationId = operationId;
		this.processAttr = processAttr;
		this.targetUser = targetUser;
		this.categoryCorrections = categoryCorrections != null ? categoryCorrections : new ArrayList<>();
		this.remark = remark != null ? remark : "";
	}

	/**
	 * 備考はOptional
	 * @param operationId
	 * @param processAttr
	 * @param targetUser
	 * @param categoryCorrections
	 */
	public PersonInfoCorrectionLog(
			String operationId,
			PersonInfoProcessAttr processAttr,
			UserInfo targetUser,
			List<CategoryCorrectionLog> categoryCorrections) {
		
		this(operationId, processAttr, targetUser, categoryCorrections, null);
	}

}
